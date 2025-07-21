/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Provides an API to call and fetch a remote server.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2024-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 * @file fetch.ts
 */

// Plugin dependencies.
import i18next from "i18next";

// Custom dependencies.
import {ACCESS_TOKEN_SAVE_KEY} from "@/common/constants/storage_keys.ts";
import {ButtonOption} from "@/common/components/message_box.tsx";
import {normalizeAPILink, isValidJSObject} from "./std.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {sendFeedback, ToastType} from "./toast.ts";
import {getTokens, clearData} from "./tokens.ts";
import {checkNetworkState} from "./network.ts";

// Enumerations.
enum FetchMethod {
  DELETE = "DELETE",
  POST = "POST",
  GET = "GET",
  PUT = "PUT"
}

// Types.
type ResponseData = {access: string};
type SecureFetchProps = {
  configs: FetchAPIProps,
  onLogout: () => void
};
type APIParserProps = {
  identifier: string,
  i18n: string,
  url: string
};
type ErrorConfigs = {
  options: Array<ButtonOption>,
  closable: boolean,
  details?: string,
  message: string,
  type: ToastType,
  title: string
};
type FetchAPIProps = {
  onError?: (message?: string, details?: string) => void,
	onTimeout?: (message?: string) => void,
  useDynamicHostName?: boolean,
  skipNetworkCheck?: boolean,
  useFeedBack?: boolean,
	headers?: HeadersInit,
	method: FetchMethod,
	body?: BodyInit,
	url: string
};

/**
 * @classdesc Provides an API to call and fetch a remote server.
 * @type {FetchManager}
 * @public
 * @class
 * @returns {FetchManager}
 */
export default class FetchManager {
  // Attributes.
  private isRequestCanceled_: boolean = false;
  private timeoutProcessId_: number = -1;
  private useFeedback_: boolean = true;
  private timeout_: number = 60000;
  private commonErrorMessageConfigs_: ErrorConfigs = {
    options: [{text: i18next.t(`${GLOBAL_LANG}:ok`), primary: true}],
    message: i18next.t(`${GLOBAL_LANG}:requestErrorDesc`),
    title: i18next.t(`${GLOBAL_LANG}:requestFailedTitle`),
    type: ToastType.ERROR,
    closable: true
  };
  private commonTimeoutErrorConfigs_: ErrorConfigs = {
    ...this.commonErrorMessageConfigs_,
    message: i18next.t(`${GLOBAL_LANG}:requestTimeoutDesc`)
  };

  /**
   * @description Parses api link according to selected language.
   * @param {APIParserProps} parser Supports the following keys:
   *  - String identifier: The language identifier to replace.
   *  - String i18n: The current language.
   *  - String url: The api url to parse.
   * @function parseAPILink_
   * @private {function}
   * @type {string}
   * @returns {string}
   */
  private parseAPILink_ ({identifier, i18n, url}: APIParserProps): string {
    // Sends final result.
    return url.replace(identifier, i18n);
  }

  /**
   * @description Checks whether a request succeeded or not.
   * @param {Response} response The request's response.
   * @function isRequestSucceedded
   * @type {boolean}
   * @public
   * @returns {boolean}
   */
  public isRequestSucceedded (response: Response): boolean {
    // Checks whether that request succeeded or not.
    return (response.status >= 200 && response.status <= 299);
  }

  /**
	 * @description Sets the request timeout.
	 * @param {number} timeout The new timeout.
	 * @function setTimeout
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setTimeout (timeout: number): void {
		// Overrides the old timeout value.
		this.timeout_ = timeout;
	}

  /**
	 * @description Returns the request timeout.
	 * @function getTimeout
	 * @type {number}
	 * @public
	 * @returns {number}
	 */
	public getTimeout (): number {
		// Sends the request timeout.
		return this.timeout_;
	}

  /**
   * @description Materializes a request feedback across message box/toast.
   * @param {ErrorConfigs} commonConfigs The configurations to use for both.
   * @function makeFeedBack_
   * @private {function}
   * @type {void}
   * @returns {void}
   */
  private makeFeedBack_ (commonConfigs: ErrorConfigs): void {
    // Configures feedback management.
    if (this.useFeedback_) sendFeedback({
      alertConfigs: commonConfigs, toastConfigs: commonConfigs
    });
  }

  /**
   * @description Destroys the launched timeout background process.
   * @function killTimeoutBackgroundProcess_
   * @private {function}
   * @type {void}
   * @returns {void}
   */
  private killTimeoutBackgroundProcess_ (): void {
    // Checks the network state.
    if (!window.navigator.onLine) checkNetworkState({state: false});
    // Kills launched timeout background process.
    window.clearTimeout(this.timeoutProcessId_);
    // Cancels launched request.
    this.isRequestCanceled_ = true;
  }

  /**
   * @description Initializes the request's timeout for long requests.
   * @param {undefined|Function} onTimeout When request timeout reached.
   * @function initializeRequestTimeout_
   * @private {function}
   * @type {void}
   * @returns {void}
   */
  private initializeRequestTimeout_ (
    onTimeout?: (message?: string) => void
  ): void {
    // Initializes the request timeout.
    this.timeoutProcessId_ = window.setTimeout((): void => {
      // Whether the request isn't canceled yet.
      if (!this.isRequestCanceled_) {
        // The request timeout is reached.
        this.makeFeedBack_(this.commonTimeoutErrorConfigs_);
        // Whether `timeout` event is listening.
        if (typeof onTimeout === "function") onTimeout(
          this.commonTimeoutErrorConfigs_.message
        );
        // Cancels the launched request.
        this.isRequestCanceled_ = true;
      }
    // Waits for the provided delay.
    }, this.timeout_) ?? -1;
  }

  /**
   * @description Makes a fetch request with secure jwt token.
   * @param {SecureFetchProps} data Supports the following keys:
   * 	- FetchAPIProps configs: Contains basic fetch api configurations.
   * 	- Function onLogout: Called when user isn't connected yet.
   * @type {Promise<?Response>}
   * @function secureFetch
   * @public
   * @async
   * @returns {Promise<?Response>}
   */
  public async secureFetch (
    {onLogout, configs}: SecureFetchProps
  ): Promise<(Response | null)> {
    // Gets tokens.
    const {refresh, access, isOk} = getTokens();
    // Whether refresh and access tokens are valid.
    if (isOk) {
      // Makes a fetch request with access token.
      const response1: (Response | null) = await this.apiFetch({
        ...configs,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
          Accept: "application/json"
        }
      });
      // Whether we found something.
      if (response1 != null) {
        // Whether request succeeded.
        if (this.isRequestSucceedded(response1)) return response1;
        // Otherwise.
        else {
          // Tries to refresh access token.
          const response2: (Response | null) = await this.apiFetch({
            ...configs,
            body: JSON.stringify({refresh: refresh}),
            method: FetchMethod.POST,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          });
          // Whether request succeeded.
          if (response2 != null && this.isRequestSucceedded(response2)) {
            // Gets response data.
            const {access}: ResponseData = await response2.json();
            // Updates access token into local storage.
            window.localStorage.setItem(ACCESS_TOKEN_SAVE_KEY, access);
            // Retries the initial request again.
            return await this.secureFetch({onLogout, configs});
          // Otherwise.
          } else clearData(onLogout);
        }
      }
    // Otherwise.
    } else clearData(onLogout);
    // Nothing to send for others cases.
    return null;
  }

  /**
   * @description Makes a fetch request to a remote back-end server.
   * @param {FetchAPIProps} data Supports the following keys:
   *  - Function onError: Called when something wrong with the request.
   *  - Function onTimeout: Called when request timeout is reached.
   *  - FetchMethod method: The request method to be used.
   *  - BodyInit body: The body of request whether needed.
   *  - String url: The request url to be called.
   *  - HeadersInit headers: The request headers.
   *  - Boolean useFeedBack: Whether we want to show a UI message
   *    when the request failed (message box or toast).
   *  - boolean skipNetworkCheck: Whether we mustn't consider the
   *    connection of browser to internet.
   *  - boolean useDynamicHostName: Whether we want to adjust the
   *    server host name when the front-end is requested from
   *    another computer.
   * @type {Promise<?Response>}
   * @function apiFetch 
   * @public
   * @async
   * @returns {Promise<?Response>}
   */
  public async apiFetch ({
    useDynamicHostName = true,
    skipNetworkCheck = false,
    useFeedBack = true,
    onTimeout,
    onError,
    headers,
    method,
    body,
    url
  }: FetchAPIProps): Promise<(Response | null)> {
    // Enables UI feedback by default.
    this.useFeedback_ = (
      typeof useFeedBack === "boolean" ? useFeedBack : true
    );
    // Whether the browser is connected to internet.
    if (window.navigator.onLine || skipNetworkCheck) {
      // Initializes request background timeout.
      this.initializeRequestTimeout_(onTimeout);
      // Resets the request state.
      this.isRequestCanceled_ = false;
      // Corrects the passed link according to app active language.
      url = this.parseAPILink_({
        i18n: (i18next.language === "gb" ? "en" : i18next.language),
        url: (useDynamicHostName ? normalizeAPILink(url) : url),
        identifier: "lg"
      });
      // Listens `offline` event on the browser.
      window.addEventListener("offline", this.killTimeoutBackgroundProcess_);
      // Tries to fetch the target resource.
      try {
        // Makes a fetch request with provided configurations.
        const response: Response = await window.fetch(
          url,
          {
            body: (!isValidJSObject(body) ? undefined : body),
            method,
            headers: (
              isValidJSObject(headers) ? headers :
              {
                "Content-Type": "application/json",
                Accept: "application/json"
              }
            )
          }
        );
        // Whether the request hasn't been canceled.
        if (!this.isRequestCanceled_) {
          // Kills launched timeout in background process.
          this.killTimeoutBackgroundProcess_();
          // Whether request failed.
          if (!this.isRequestSucceedded(response)) {
            // The common request error configurations.
            const commonLocalErrorConfigs: ErrorConfigs = {
              ...this.commonErrorMessageConfigs_,
              details: `
                StatusText: <b>${response.statusText}</b>,
                Status: <b>${response.status}</b>
              `
            };
            // Request failed with a server code.
            this.makeFeedBack_(commonLocalErrorConfigs);
            // Throws `error` event.
            if (typeof onError === "function") onError(
              commonLocalErrorConfigs.message,
              commonLocalErrorConfigs.details
            );
          }
          // Sends the final request result.
          return response;
        }
      // An error thrown.
      } catch (error) {
        // Cancels any timeout background process.
        this.killTimeoutBackgroundProcess_();
        // The common request error configurations.
        const commonLocalErrorConfigs: ErrorConfigs = {
          ...this.commonErrorMessageConfigs_,
          message: i18next.t(`${GLOBAL_LANG}:requestLaunchError`),
          details: `
            Name: <b>${(error as Error).name}</b>,<br/>
            Message: <b>${(error as Error).message}</b>,<br/>
            Stack: <b>${(error as Error).stack}</b>
          `
        };
        // Failed to launch the target request.
        this.makeFeedBack_(commonLocalErrorConfigs);
        // Throws `error` event.
        if (typeof onError === "function") onError(
          commonLocalErrorConfigs.message,
          commonLocalErrorConfigs.details
        );
      }
    // Otherwise.
    } else {
      // The common request error configurations.
      const commonLocalErrorConfigs: ErrorConfigs = {
        ...this.commonErrorMessageConfigs_,
        message: i18next.t(`${GLOBAL_LANG}:browserNotOnline`)
      };
      // The browser is offline.
      this.makeFeedBack_(commonLocalErrorConfigs);
      // Throws `error` event.
      if (typeof onError === "function") onError(
        commonLocalErrorConfigs.message
      );
    }
    // Nothing to send.
    return null;
  }
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {FetchAPIProps, FetchMethod};
