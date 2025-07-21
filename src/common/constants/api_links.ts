/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Contains all endpoints for remote APIs call.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @file api_links.ts
 * @version 0.0.1
 */

// Remote API middlewares.
const API_TEST: string = "https://jsonplaceholder.typicode.com/todos/1";
const SOCKET_HOST: string = "ws://0.0.0.0:8000";
const HOST: string = "http://0.0.0.0:8000";

/**
 * @description Exports only public features.
 * @exports *
 */
export {SOCKET_HOST, API_TEST, HOST};
