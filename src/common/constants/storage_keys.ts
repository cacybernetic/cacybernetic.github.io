/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Contains storage keys for app's persistent data.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file storage_keys.ts
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 */

// Local storage keys.
const LOGGED_USER_ID_SAVE_KEY: string = "app_logged_userid_sk";
const REFRESH_TOKEN_SAVE_KEY: string = "app_refresh_token_sk";
const ACCESS_TOKEN_SAVE_KEY: string = "app_access_token_sk";
const ACTIVE_LANGUAGE_SAVE_KEY: string = "app_act_lang_sk";

/**
 * @description Exports only public features.
 * @exports *
 */
export {
  ACTIVE_LANGUAGE_SAVE_KEY,
  LOGGED_USER_ID_SAVE_KEY,
  REFRESH_TOKEN_SAVE_KEY,
  ACCESS_TOKEN_SAVE_KEY
};
