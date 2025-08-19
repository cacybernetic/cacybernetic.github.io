/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Manages application internationalization.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file localization.ts
 * @created 2025-07-21
 * @updated 2025-08-19
 * @version 0.0.2
 */

// Plugin dependencies.
import {initReactI18next} from "react-i18next";
import i18next from "i18next";

// Custom dependencies.
import {ACTIVE_LANGUAGE_SAVE_KEY} from "@/common/constants/storage_keys.ts";
import english from "@/common/i18n/english.json";
import french from "@/common/i18n/french.json";

// Attributes.
export const GLOBAL_LANG: string = "activeLanguage";

/**
 * @description Gets browser active language.
 * @function getBrowserLanguage
 * @type {string}
 * @public
 * @returns {string}
 */
export function getBrowserLanguage (): string {
	// The active browser language.
  const activeLanguage: string = navigator.language.toLowerCase();
  // Whether detected language is english.
  if (activeLanguage === "en-us") return "gb";
	// Whether detected language is french.
	else if (activeLanguage === "fr-fr") return "fr";
  // Otherwise.
  else return "gb";
}

// Configures internationalization system (I18N).
// eslint-disable-next-line
// @ts-expect-error.
export default i18next.use(initReactI18next).init({
	interpolation: {escapeValue: false},
	keySeparator: false,
	defaultNS: "react",
	fallbacklng: "gb",
	debug: false,
	lng: (
		window.localStorage.getItem(ACTIVE_LANGUAGE_SAVE_KEY) ??
		getBrowserLanguage()
	),
	resources: {
		gb: {activeLanguage: english},
		fr: {activeLanguage: french}
	}
});
