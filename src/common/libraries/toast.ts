/**
 * @fileoverview Provides an API to display a toast with details section.
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 * @file toast.ts
 */

// Chakra dependencies.
import {createToaster} from "@chakra-ui/react";

// Plugin dependencies.
// https://www.npmjs.com/package/htmlstring-to-react
import HTMLReactParser from "html-react-parser/lib/index";
import {UnknownAction} from "@reduxjs/toolkit";
import i18next from "i18next";

// Custom dependencies.
import {MessageBoxProps} from "@/common/components/message_box.tsx";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {showWith} from "@/common/states/alert.ts";
import {store} from "@/common/states/store.ts";
import {correctString} from "./std.ts";

// Enumerations.
enum ToastType {
	INFORMATION = "info",
	WARNING = "warning",
	SUCCESS = "success",
	ERROR = "error"
};

// Types.
type SendFeedbackProps = {
  alertConfigs?: MessageBoxProps,
  toastConfigs?: ToastProps
};
type ToastProps = {
	details?: (string | null),
	message: (string | null),
	title?: (string | null),
	type: ToastType
};

// Attributes.
const toaster = createToaster({
  placement: (window.innerWidth <= 480 ? "bottom" : "bottom-end"),
  pauseOnPageIdle: true,
  duration: 8000,
  overlap: true,
  max: 3
});

/**
 * @description Materializes a feedback reaction across a message box
 *  or a toast.
 * @param {SendFeedbackProps} data Supports the following keys:
 *  - ToastProps toastConfigs: All things used by the chakra UI toast.
 *  - MessageBoxProps alertConfigs: All things used by the alert.
 * @function sendFeedback
 * @type {void}
 * @public
 * @returns {void}
 */
function sendFeedback (
  {toastConfigs, alertConfigs}: SendFeedbackProps
): void {
  // Whether a toast instance is provided.
  if (toastConfigs != null) showToast(toastConfigs);
  // Uses the default global message box instead.
  else if (alertConfigs != null) window.setTimeout(
    (): UnknownAction => store.dispatch(showWith(alertConfigs)), 100
  );
}

/**
 * @description Displays a toast message.
 * @param {ToastProps} configs The toast configurations.
 * @function showToast
 * @type {void}
 * @public
 * @return {void}
 */
function showToast ({message, details, title, type}: ToastProps): void {
	// Corrects the given details.
	details = correctString<string>({input: details});
	// Corrects the given message.
	message = correctString<string>({input: message});
	// Corrects the given title.
	title = correctString<string>({input: title});
	// Displays that toast from its object reference.
	if (message.length > 0) toaster.create({
		title, type,
		description: HTMLReactParser(`
			<span>${message}</span>
			${
        details.length > 0 ?
        `
					<br/><br/>
				  <details>
					  <summary>${i18next.t(`${GLOBAL_LANG}:moreDetails`)}</summary>
					  <p>${details}</p>
				  </details>
			  ` : ''
      }
    `.replace(/\n\t/, ''))
	});
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {sendFeedback, showToast, ToastType, toaster};
