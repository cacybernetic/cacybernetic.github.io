/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Defines most common methods used.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 * @file std.ts
 */

// Plugin dependencies.
import i18next from "i18next";

// Custom dependencies.
import {SOCKET_HOST, HOST} from "@/common/constants/api_links.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {showToast, ToastType} from "./toast.ts";

// Types.
type JSObject = {[key: string]: unknown};
type CorrectNumericProps = {
  defaultValue?: (number | string | null),
  input: unknown
};
type MatchedStringsFromRegexProps = {
  regs: Array<RegExp>,
  text: string
};
type HighlightTextFromStringProps = {
  query: string,
  base: string
};
type ObserveTagDimensionsProps = {
  callback: ResizeObserverCallback,
  tag: (HTMLElement | string)
};
type CorrectStringProps = {
  defaultValue?: (string | null),
  input: unknown
};
type ComputePageCountProps = {
  recordCount: number,
  limit: number
};
type EllipsisProps = {
  limit?: number,
  text: string
};
type CreateBlankImageProps = {
  solidColor?: string,
  height?: number,
  width?: number
};
type DownloadProps = {
  fileName?: (string | null),
  inANewTab?: boolean,
  url: string
};

/**
 * @description Returns the current machine/host name.
 * @function getHostName
 * @type {string}
 * @public
 * @returns {string}
 */
function getHostName (): string {
  // Sends the current host name.
  return `${window.location.protocol}//${window.location.host}`;
}

/**
 * @description Returns the current browser window.
 * @function getWindow
 * @type {?Window}
 * @public
 * @returns {?Window}
 */
function getWindow (): ((Window & typeof globalThis) | null) {
  // Tries to send the current window object reference.
  return (typeof window !== "undefined" ? window : null);
}

/**
 * @description Returns the current host with base url.
 * @function getHostWithBaseUrl
 * @type {string}
 * @public
 * @returns {string}
 */
function getHostWithBaseUrl (): string {
  // Sends current host followed by the base url.
  return `${getHostName()}${getFrontendServerBaseUrl()}`;
}

/**
 * @description Makes the given host name to be dynamic.
 * @param {string} apiLink The API link to convert to dynamic.
 * @function normalizeAPILink
 * @type {string}
 * @public
 * @returns {string}
 */
function normalizeAPILink (apiLink: string): string {
  // Sends normalized api link.
  return apiLink.replace(HOST, pickRighHostName(false));
}

/**
 * @description Returns the front-end server base url.
 * @function getFrontendServerBaseUrl
 * @type {string}
 * @public
 * @returns {string}
 */
function getFrontendServerBaseUrl (): string {
  // Gets the base URL.
  // eslint-disable-next-line
  // @ts-expect-error
  return (import.meta?.env?.BASE_URL ?? '');
}

/**
 * @description Corrects the content of a string by remove blank spaces.
 * @param {CorrectStringProps} data Supports the following keys:
 *  - String defaultValue: The value to use as default.
 *  - Unknown input: The value to treat as a string.
 * @function correctString
 * @type {T}
 * @public
 * @returns {T}
 */
function correctString<T> (
  {defaultValue = '', input}: CorrectStringProps
): T {
  // Sends the corrected shape of the passed input.
  return (
    typeof input === "string" ? (input.trim() as T) : (defaultValue as T)
  );
}

/**
 * @description Loads the content of a file.
 * @param {string} filePath The file location access.
 * @function loadFileContent
 * @type {Promise<string>}
 * @public
 * @async
 * @returns {Promise<string>}
 */
async function loadFileContent (filePath: string): Promise<string> {
  // Fetches the file using fetch API.
  const response: (Response | null) = await window.fetch(filePath);
  // Gets the file content as a raw string.
  const rawString: string = await response.text();
  // Sends the final result.
  return rawString;
}

/**
 * @description Applies ellipsis effect on a string.
 * @param {EllipsisProps} data Supports the following keys:
 *  - Number limit: The number of characters to show.
 *  - String text: The characters list.
 * @function ellipsis
 * @type {string}
 * @public
 * @returns {string}
 */
function ellipsis ({limit = 128, text}: EllipsisProps): string {
  // Removes left and right spaces.
  text = text.trim();
  // Whether the number of characters to display is bigger than
  // the total number of characters inside the provided text.
  if (text.length <= limit) return text;
  // Otherwise.
  else return `${text.substring(0, (limit - 2))} ...`;
}

/**
 * @description Corrects the content of a numerical value.
 * @param {CorrectNumericProps} data Supports the following keys:
 *  - Number|String defaultValue: The value to use as default.
 *  - Unknown input: The value to treat as a string.
 * @function correctNumeric
 * @type {T}
 * @public
 * @returns {T}
 */
function correctNumeric<T> (
  {defaultValue = '', input}: CorrectNumericProps
): T {
  // Sends the corrected shape of the passed input.
  return (
		(typeof input === "number" || typeof input === "string") ?
		(input as T) : (defaultValue as T)
	);
}

/**
 * @description Formats a string for search.
 * @param {string} string The text to format.
 * @function formatStringForSearch
 * @type {string}
 * @public
 * @returns {string}
 */
function formatStringForSearch (string: string): string {
  // Sends his formatted shape for research.
  return (
    string.trim().toLowerCase()
      .replace(/%20/g, '').replace(/\s/g, '')
      .replace(/\t/g, '').replace(/\n/g, '')
      .replace(/\f/g, '').replace(/\v/g, '')
  );
}

/**
 * @description Checks whether an input is a valid js object.
 * @param {unknown} input The value to be checked.
 * @function isValidJSObject
 * @type {boolean}
 * @public
 * @return {boolean}
 */
function isValidJSObject (input: unknown): boolean {
	// Sends the final match result.
	return (
    input !== undefined &&
    input !== null &&
		(
			typeof input === "number" ||
      typeof input === "object" ||
			typeof input === "string"
		)
	);
}

/**
 * @description Loads a form data from browser local storage.
 * @param {string} key The form access key.
 * @function loadFormData
 * @type {?T}
 * @public
 * @returns {?T}
 */
function loadFormData<T> (key: string): (null | T) {
	// Gets saved data of the form.
	let data: (string | null) = window.localStorage.getItem(key);
	// Whether we have something.
	if (typeof data === "string") {
		// Let's trim any blank spaces.
		data = data.trim();
		// Whether it's an empty string.
		if (data.length > 0) return JSON.parse(data);
	}
	// Nothing to send.
	return null;
}

/**
 * @description Filters and removes all undefined properties.
 * @param {JSObject} jsObject The javascript object to be parsed.
 * @function removeUnfilledFields
 * @type {JSObject}
 * @public
 * @returns {JSObject}
 */
function removeUnfilledFields (jsObject: JSObject): JSObject {
	// The filtered javascript object.
	const filteredJSObject: JSObject = {};
	// Removing unused properties.
	for (const key of Object.keys(jsObject)) {
		// Whether this property is used.
		if (
			isValidJSObject(jsObject[key]) && jsObject[key]
		) filteredJSObject[key] = jsObject[key];
	}
	// Sends final result.
	return filteredJSObject;
}

/**
 * @description Returns the total number of available pages.
 * @param {ComputePageCountProps} data Supports the following keys:
 *  - Number limit: The number of element to display for each page.
 *  - Number recordCount: The total number of records.
 * @function computePageCount
 * @type {number}
 * @public
 * @returns {number}
 */
function computePageCount (
  {recordCount, limit}: ComputePageCountProps
): number {
  // Calculates page number.
  const pageNumber: number = (recordCount / limit);
  // Converts it into an integer.
  const stringify: string = pageNumber.toString();
  // Determinates real page count.
  const pageCount: number = parseInt(
    stringify.includes('.') ? stringify.split('.')[0] : stringify
  );
  // Sends final result.
  return (pageNumber > pageCount ? (pageCount + 1) : pageCount);
}

/**
 * @description Uses regex to retrieve all matched string(s).
 * @param {MatchedStringsFromRegexProps} data Supports the following keys:
 *  - String text: The string to be use for treatment.
 *  - Array regs: The list of all regex to execute.
 * @function getAllMatchedStringsFromRegex
 * @type {Array<string>}
 * @public
 * @returns {Array<string>}
 */
function getAllMatchedStringsFromRegex (
  {text, regs}: MatchedStringsFromRegexProps
): Array<string> {
  // The matched string(s).
  const matchedStrings: Array<string> = [];
  // Executing all passed regular expressions.
  for (const reg of regs) {
    // The current matched sub string(s).
    let match: (RegExpExecArray | null) = null;
    // Getting all matches.
    while ((match = reg.exec(text)) !== null) {
      // Whether we found a match.
      if (match.length > 0) matchedStrings.push(match[0]);
    }
  }
  // Sends the final results.
  return matchedStrings;
}

/**
 * @description Copies the content of the console to OS clipboard.
 * @param {string} text The text to put on the OS clipboard.
 * @function copyToClipboard
 * @type {Promise<void>}
 * @public
 * @async
 * @returns {Promise<void>}
 */
async function copyToClipboard (text: string): Promise<void> {
  // Tries to copy content to the OS clipboard.
  try {
    // Gets content and puts it to clipboard.
    await navigator.clipboard.writeText(text);
    // Displays a toast about successful operation.
    showToast({
      message: i18next.t("successFulCopyToClipboard"),
      type: ToastType.SUCCESS
    });
  // Failed to copy to clipboard.
  } catch {
    // Displays a toast about failed operation.
    showToast({
      message: i18next.t("copyToClipboardFailed"),
      type: ToastType.ERROR
    });
  }
}

/**
 * @description Underlines all parts of the string were we found query.
 * @param {HighlightTextFromStringProps} data Supports the following keys:
 *  - String base: The base string were replacement will be done.
 *  - String query: The target search's query.
 * @function highlightTextFromString
 * @type {string}
 * @public
 * @returns {string}
 */
function highlightTextFromString (
  {query, base}: HighlightTextFromStringProps
): string {
  // Whether the query is empty.
  if (query.length > 0) {
    // The regex to get all matched items from the given query.
    const matches: Array<string> = getAllMatchedStringsFromRegex({
      regs: [new RegExp(query, "gi")], text: base
    });
    // Removes duplicated elements.
    const filtered: Array<string> = [...new Set<string>(matches)];
    // Adding a marker to all matched strings.
    for (const string of filtered) base = base.replace(
      // You can found the marker style at :
      // src/common/themes/global_css.ts file.
      new RegExp(string, 'g'), `<span class = "marker">${string}</span>`
    );
  }
  // Sends final result.
  return base;
}

/**
 * @description Downloads a file from the given remote web link.
 * @param {DownloadProps} data Supports the following keys:
 *  - Boolean inANewTab: Trigger a download after open a new browser tab.
 *  - String fileName: The save's name of the file to download.
 *  - String url: The link to contact for download.
 * @function download
 * @type {void}
 * @public
 * @returns {void}
 */
function download ({inANewTab, fileName, url}: DownloadProps): void {
  // Creates a anchor tag for downloading.
  const downloadLink: HTMLAnchorElement = document.createElement('a');
  // Gets remote link to download.
  downloadLink.href = (url.trim().length <= 0 ? '#' : url.trim());
  // Corrects the given file name.
  fileName = correctString<string>({input: fileName});
  // Sets the target web page.
  if (inANewTab) downloadLink.target = "_blank";
  // Hides it for client.
  downloadLink.style.display = "none";
  // Configures the file's name.
  if (fileName.length > 0) downloadLink.download = (
    fileName.indexOf('.') > 0 ? fileName.split('.')[0] : fileName
  );
  // Adds the downloader to the client.
  document.body.appendChild(downloadLink);
  // Starts download automatically.
  downloadLink.click();
  // Destroys the downloader after download.
  document.body.removeChild(downloadLink);
}

/**
 * @description Casts a size observer to a markup inside the DOM.
 * @param {ObserveTagDimensionsProps} data Supports the following keys:
 *  - ResizeObserverCallback callback: Called when any shift is detected.
 *  - HTMLElement|String tag: The target tag to be listened.
 * @function observeTagDimensions
 * @type {?ResizeObserver}
 * @public
 * @returns {?ResizeObserver}
 */
function observeTagDimensions (
	{callback, tag}: ObserveTagDimensionsProps
): (ResizeObserver | null) {
	// Gets the target html tag from the DOM.
	const markup: (HTMLElement | null) = (
    tag instanceof HTMLElement ? tag :
    document.querySelector<HTMLElement>(tag)
	);
	// Whether that tag exists.
	if (markup != null) {
		// Let's create a resize observer for that tag.
		const resizeObserver: ResizeObserver = new window.ResizeObserver(
      callback
    );
		// Observes the passed tag reference.
		resizeObserver.observe(markup);
		// Sends observer instance.
		return resizeObserver;
	}
	// Undefined target markup.
	return null;
}

/**
 * @description Picks the right http host name according use cases.
 * @param {boolean} asSocket Whether we want to get as a socket link.
 * @function pickRighHostName
 * @type {string}
 * @public
 * @returns {string}
 */
function pickRighHostName (asSocket: boolean = false): string {
  // Gets the current host name in the browser search bar.
  let hostName: string = getHostName();
  // The default host name to use.
  let defaultHostName: string = HOST;
  // Whether socket format must be used.
  if (asSocket) {
    // Uses the default socket connection link.
    defaultHostName = SOCKET_HOST;
    // Converts the given host name to a socket connection link.
    hostName = hostName = hostName.replace(
      /https?/, (hostName.includes("https") ? "wss" : "ws")
    );
  }
  // Sends the correct http host name.
  return (
    (
      hostName.toLowerCase().includes("localhost") ||
      hostName.toLowerCase().includes("127.0.0.1") ||
      hostName.toLowerCase().includes("0.0.0.0")
    ) ? defaultHostName : hostName
  );
}

/**
 * @description Creates a blank image with static size.
 * @param {CreateBlankImageProps} data Supports the following keys:
 *  - String solidColor: The image's solid color.
 *  - Number height: The created image's height.
 *  - Number width: The created image's width.
 * @function createBlankImage
 * @type {HTMLImageElement}
 * @public
 * @returns {HTMLImageElement}
 */
function createBlankImage ({
  solidColor = "rgba(255, 255, 255, 1)", height = 768, width = 1366
}: CreateBlankImageProps): HTMLImageElement {
  // Creates an ampty canvas.
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  // Puts a static height.
  canvas.height = height;
  // Puts a static width.
  canvas.width = width;
  // Gets context of that canvas.
  const context: (CanvasRenderingContext2D | null) = canvas.getContext("2d");
  // Instanciates a raw blank image.
  const image: HTMLImageElement = new Image(canvas.width, canvas.height);
  // Whether the context is defined.
  if (context != null) {
    // Resizes context.
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Adds a white color.
    context.fillStyle = solidColor;
  }
  // Gets generated image data.
  image.src = canvas.toDataURL();
  // Sends generated image.
  return image;
}

/**
 * @description Returns size of a file.
 * @param {?(undefined|number)} bytes The file size in bytes.
 * @function getFileSize
 * @type {?string}
 * @public
 * @returns {?string}
 */
function getFileSizeFromBytes (bytes?: (number | null)): (string | null) {
	// Whether the passed metadata exists.
	if (bytes != null) {
		// Gets file size in bytes.
		const size: string = bytes.toString();
		// Whether size char count is less than seven.
		if (size.length < 7) {
			// The computed size.
			const weight: string = Math.round(+size / 1024).toFixed(2);
			// WHether the computation result is zero.
			if (weight === "0.00") return (
        `${bytes} ${i18next.t(`${GLOBAL_LANG}:bi`)}`
      );
			// Otherwise.
			else return `${weight} ${i18next.t(`${GLOBAL_LANG}:kib`)}`.replace(
				'.', i18next.t(`${GLOBAL_LANG}:comma`)
			);
		}
		// Sends default size.
		return `${
			(Math.round(+size / 1024) / 1000).toFixed(2)
		} ${i18next.t(`${GLOBAL_LANG}:mib`)}`.replace(
			'.', i18next.t(`${GLOBAL_LANG}:comma`)
		);
	}
	// Nothing to send.
	return null;
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {
  getAllMatchedStringsFromRegex,
  getFrontendServerBaseUrl,
  highlightTextFromString,
  formatStringForSearch,
  getFileSizeFromBytes,
  removeUnfilledFields,
  observeTagDimensions,
  getHostWithBaseUrl,
  createBlankImage,
  computePageCount,
  normalizeAPILink,
  loadFileContent,
  isValidJSObject,
  copyToClipboard,
  correctNumeric,
  correctString,
  loadFormData,
  getHostName,
  getWindow,
  download,
  ellipsis,
  JSObject
};
