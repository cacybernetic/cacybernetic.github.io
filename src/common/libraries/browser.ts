/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Defines common methods used with the browser.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @file browser.ts
 * @version 0.0.1
 */

// Custom dependencies.
import {setWindowHeight, setWindowWidth} from "@/common/states/app.ts";
import {store} from "@/common/states/store.ts";

// Types.
type WindowHeightEvent = (height?: number) => void;
type WindowWidthEvent = (width?: number) => void;

// Attributes.
const windowHeightListeners: Array<WindowHeightEvent> = [];
const windowWidthListeners: Array<WindowWidthEvent> = [];

/**
 * @description Listens window `resize` event to extract his size.
 * @function listenWindowResizeToExtractHisSize
 * @type {void}
 * @public
 * @returns {void}
 */
function listenWindowResizeToExtractHisSize (): void {
  // Destroys old attached callback from the `resize` event.
  window.removeEventListener("resize", fetchWindowInnerSize_);
  // Hooks another method to the `resize` event.
  window.addEventListener("resize", fetchWindowInnerSize_);
}

/**
 * @description Add a new window height listener.
 * @param {WindowHeightEvent} listener The callback method.
 * @function addWindowHeightListener
 * @type {void}
 * @public
 * @returns {void}
 */
function addWindowHeightListener(listener: WindowHeightEvent): void {
   // Whether this listener not exists.
   for (const event of windowHeightListeners) {
    // Don't add anything.
    if (listener === event) return;
  }
  // Updates the listener.
  windowHeightListeners.push(listener);
}

/**
 * @description Adds a new window width listener.
 * @param {WindowWidthEvent} listener The callback method.
 * @function addWindowWidthListener
 * @type {void}
 * @public
 * @returns {void}
 */
function addWindowWidthListener(listener: WindowWidthEvent): void {
  // Whether this listener not exists.
  for (const event of windowWidthListeners) {
    // Don't add anything.
    if (listener === event) return;
  }
  // Updates the listener.
  windowWidthListeners.push(listener);
}

/**
 * @description Gets current window inner size for custom responsive.
 * @function fetchWindowInnerSize_
 * @private {function}
 * @type {void}
 * @returns {void}
 */
function fetchWindowInnerSize_ (): void {
  // Throws `windowHeight` event(s).
  for (const event of windowHeightListeners) event(window.innerHeight);
  // Throws `windowWidth` event.
  for (const event of windowWidthListeners) event(window.innerWidth);
  // Sets application global page height.
  store.dispatch(setWindowHeight(window.innerHeight));
  // Sets application global page width.
  store.dispatch(setWindowWidth(window.innerWidth));
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {
  listenWindowResizeToExtractHisSize,
  addWindowHeightListener,
  addWindowWidthListener,
  windowHeightListeners,
  windowWidthListeners,
  WindowHeightEvent,
  WindowWidthEvent
};
