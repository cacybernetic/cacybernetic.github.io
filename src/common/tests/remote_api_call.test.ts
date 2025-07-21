/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Defines methods to test my custom remote API call.
 * @author Obrymec - https://obrymec.vercel.app
 * @file remote_api_call.test.ts
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 */

// Custom dependencies.
import FetchManager, {FetchMethod} from "@/common/libraries/fetch.ts";
import {API_TEST} from "@/common/constants/api_links.ts";

// Attributes.
const fetcher: FetchManager = new FetchManager();

/**
 * @description Tests the `apiFetch` method.
 * @function apiFetchTest
 * @type {Promise<void>}
 * @public
 * @returns {Promise<void>}
 */
async function apiFetchTest (): Promise<void> {
  // Calls a free remote back-end server for testing.
  const response: (Response | null) = await fetcher.apiFetch({
    method: FetchMethod.GET, url: API_TEST
  });
  // Whether we have something.
  if (response != null && fetcher.isRequestSucceedded(response)) {
    // Displays request response's data.
    console.log("FREE_REMOTE_API_TEST: ", await response.json());
  }
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {apiFetchTest};
