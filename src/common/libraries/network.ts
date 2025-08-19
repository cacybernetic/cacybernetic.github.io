/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Provides common methods to listen network state.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-08-19
 * @file network.ts
 * @version 0.0.2
 */

// Plugin dependencies.
import i18next from "i18next";

// Custom dependencies.
import {showToast, ToastType} from "@/common/libraries/toast.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";

// Types.
type CheckNetworkStateProps = {verbose?: boolean, state: boolean};

/**
 * @description Checks whether the browser is offline or online.
 * @function checkNetworkOfflineAndOnlineStates
 * @type {void}
 * @public
 * @returns {void}
 */
function checkNetworkOfflineAndOnlineStates (): void {
	// Displays a toaster whether needed.
	checkNetworkState({state: window.navigator.onLine});
}

/**
 * @description Listens network state mutation.
 * @function listenNetworkState
 * @type {void}
 * @public
 * @returns {void}
 */
function listenNetworkState (): void {
	// Destroys the old callback from the `offline` event.
	window.removeEventListener("offline", checkNetworkOfflineAndOnlineStates);
	// Destroys the old callback from the `offline` event.
	window.removeEventListener("online", checkNetworkOfflineAndOnlineStates);
	// Listens `offline` event.
	window.addEventListener("offline", checkNetworkOfflineAndOnlineStates);
	// Listens `online` event.
	window.addEventListener("online", checkNetworkOfflineAndOnlineStates);
	// Whether browser is offline.
	if (!window.navigator.onLine) checkNetworkState({state: false});
}

/**
 * @description Checks whether browser is offline or not.
 * @param {CheckNetworkStateProps} data Supports the following keys:
 * 	- Boolean verbose: Do you want to show the success message ?
 * 	- Boolean state: The current network state.
 * @function checkNetworkState
 * @type {boolean}
 * @public
 * @returns {boolean}
 */
function checkNetworkState (
	{verbose, state}: CheckNetworkStateProps
): boolean {
	// Applies a default value.
	verbose = (typeof verbose === "boolean" ? verbose : true);
	// Whether navigator is offline.
	if (!state) showToast({
		message: i18next.t(`${GLOBAL_LANG}:networkOff`),
		title: i18next.t(`${GLOBAL_LANG}:networkError`),
		type: ToastType.ERROR
	});
	// Otherwise.
 	else if (verbose) showToast({
		message: i18next.t(`${GLOBAL_LANG}:networkOn`),
		type: ToastType.SUCCESS
	});
	// Sends received state.
	return state;
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {
	checkNetworkOfflineAndOnlineStates,
	listenNetworkState,
	checkNetworkState
};
