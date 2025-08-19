/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Provides common methods to manage user tokens.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-08-19
 * @file tokens.ts
 * @version 0.0.2
 */

// Custom dependencies.
import {correctString} from "@/common/libraries/std.ts";
import {
	LOGGED_USER_ID_SAVE_KEY,
	REFRESH_TOKEN_SAVE_KEY,
	ACCESS_TOKEN_SAVE_KEY
} from "@/common/constants/storage_keys.ts";

// Types.
type Tokens = {
	refresh: string,
	access: string,
	isOk: boolean
};

/**
 * @description Destroys all local storage data about this website.
 * @param {Function} onReady Called when all data have been free.
 * @function signOut
 * @type {void}
 * @public
 * @returns {void}
 */
function clearData (onReady: () => void): void {
  // Clears user name.
  window.localStorage.removeItem(LOGGED_USER_ID_SAVE_KEY);
  // Clears refresh token.
  window.localStorage.removeItem(REFRESH_TOKEN_SAVE_KEY);
  // Clears access token.
  window.localStorage.removeItem(ACCESS_TOKEN_SAVE_KEY);
  // Throws `ready` event.
  onReady();
}

/**
 * @description Loads required tokens from the local storage.
 * @function getTokens
 * @type {Tokens}
 * @public
 * @returns {Tokens}
 */
function getTokens (): Tokens {
  // Gets logged user name.
  const user: string = correctString<string>({
    input: window.localStorage.getItem(LOGGED_USER_ID_SAVE_KEY)
  });
  // Gets refresh token from local storage.
  const refresh: string = correctString<string>({
    input: window.localStorage.getItem(REFRESH_TOKEN_SAVE_KEY)
  });
  // Gets access token from local storage.
  const access: string = correctString<string>({
    input: window.localStorage.getItem(ACCESS_TOKEN_SAVE_KEY)
  });
  // Sends final tokens state.
  return {
    isOk: (refresh.length > 0 && access.length > 0 && user.length > 0),
    refresh, access
  };
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {getTokens, clearData, Tokens};
