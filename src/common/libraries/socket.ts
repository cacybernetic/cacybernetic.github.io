/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Provides common methods to listen network state.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @file socket.ts
 * @version 0.0.1
 */

// Enumerations.
enum SocketStatus {
	CONNECTING = 0,
	CLOSING = 2,
	CLOSED = 3,
	OPEN = 1
};

// Types.
type SocketEvent<T> = (
	(
		(
			data?: (null | T),
			other?: (unknown | null),
			ref?: SocketManager<T>
		) => void
	) | null
);
type SocketProps<T> = {
	onMessage?: SocketEvent<T>,
	onClose?: SocketEvent<T>,
	onError?: SocketEvent<T>,
	onOpen?: SocketEvent<T>,
	autoConnect?: boolean,
	verbose?: boolean,
	url?: string
};

/**
 * @classdesc Manages socket requests.
 * @param {SocketProps} data It supports the following keys:
 * 	- Function onError: Called when something wrong on running.
 * 	- String url: The link to connect to.
 * 	- Function onOpen: Called when socket connection successfully
 * 	 	established.
 * 	- Function onMessage: Called when we receive a message from
 *   	server.
 * 	- Function onClose: Called when socket connection has been
 *   	lost.
 * 	- Boolean autoConnect: Whether we want to automatically
 *	 	establish connection when it looses.
 * @type {SocketManager}
 * @public
 * @class
 * @returns {SocketManager}
 */
class SocketManager<T> {
	// Attributes.
	private socket_: (WebSocket | null) = null;
	private autoConnect_: boolean = true;
	private caches_: Array<string> = [];
	private onMessage_: SocketEvent<T>;
	private verbose_: boolean = false;
	private onClose_: SocketEvent<T>;
	private onError_: SocketEvent<T>;
	private onOpen_: SocketEvent<T>;
	private url_: string;

	/**
	 * @description Initializes event data and build it.
	 * @constructor
	 */
	constructor ({
		autoConnect,
		onMessage,
		verbose,
		onClose,
		onError,
		onOpen,
		url
	}: SocketProps<T>) {
		// Gets `message` event callback.
		this.onMessage_ = (typeof onMessage === "function" ? onMessage : null);
		// Gets `close` event callback.
		this.onClose_ = (typeof onClose === "function" ? onClose : null);
		// Gets `error` event callback.
		this.onError_ = (typeof onError === "function" ? onError : null);
		// Gets verbose state.
		this.verbose_ = (typeof verbose === "boolean" ? verbose : true);
		// Gets `open` event callback.
		this.onOpen_ = (typeof onOpen === "function" ? onOpen : null);
		// Gets web socket url connection.
		this.url_ = (typeof url === "string" ? url.trim() : '');
		// Gets auto connection state.
		this.autoConnect_ = (
			typeof autoConnect === "boolean" ? autoConnect : true
		);
		// Initializes socket manager.
		this.build_();
	}

	/**
	 * @description Returns active web socket connection instance.
	 * @function getSocketInstance
	 * @type {?WebSocket}
	 * @public
	 * @returns {?WebSocket}
	 */
	public getSocketInstance (): (WebSocket | null) {
		// Sends that value.
		return this.socket_;
	}

	/**
	 * @description Overrides auto connection state.
	 * @param {boolean} value The new value.
	 * @function autoConnection
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public autoConnection (value: boolean): void {
		// Updates that value.
		this.autoConnect_ = value;
	}

	/**
	 * @description Returns message event callback.
	 * @function getMessageCallback
	 * @type {SocketEvent}
	 * @public
	 * @returns {SocketEvent}
	 */
	public getMessageCallback (): SocketEvent<T> {
		// Sends that value.
		return this.onMessage_;
	}

	/**
	 * @description Returns close event callback.
	 * @function getCloseCallback
	 * @type {SocketEvent}
	 * @public
	 * @returns {SocketEvent}
	 */
	public getCloseCallback (): SocketEvent<T> {
		// Sends that value.
		return this.onClose_;
	}

	/**
	 * @description Returns error event callback.
	 * @function getErrorCallback
	 * @type {SocketEvent}
	 * @public
	 * @returns {SocketEvent}
	 */
	public getErrorCallback (): SocketEvent<T> {
		// Sends that value.
		return this.onError_;
	}

	/**
	 * @description Returns connection status.
	 * @function getStatus
	 * @type {undefined|number}
	 * @public
	 * @returns {undefined|number}
	 */
	public getStatus (): (undefined | number) {
		// Sends that value.
		return this.socket_?.readyState;
	}

	/**
	 * @description Returns open event callback.
	 * @function getOpenCallback
	 * @type {SocketEvent}
	 * @public
	 * @returns {SocketEvent}
	 */
	public getOpenCallback (): SocketEvent<T> {
		// Sends that value.
		return this.onOpen_;
	}

	/**
	 * @description Overrides verbose state.
	 * @param {boolean} value The new value.
	 * @function setVerbose
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setVerbose (value: boolean): void {
		// Updates that value.
		this.verbose_ = value;
	}

	/**
	 * @description Returns auto connection state.
	 * @function isAutoConnection
	 * @type {boolean}
	 * @public
	 * @returns {boolean}
	 */
	public isAutoConnection (): boolean {
		// Sends that value.
		return this.autoConnect_;
	}

	/**
	 * @description Returns verbose state.
	 * @function isVerbose
	 * @type {boolean}
	 * @public
	 * @returns {boolean}
	 */
	public isVerbose (): boolean {
		// Sends that value.
		return this.verbose_;
	}

	/**
	 * @description Returns connection link.
	 * @function getUrl
	 * @type {string}
	 * @public
	 * @returns {string}
	 */
	public getUrl (): string {
		// Sends that value.
		return this.url_;
	}

	/**
	 * @decription Builds and creates a socket manager.
	 * @private {function}
	 * @function build_
	 * @returns {void}
	 */
	private build_ (): void {
		// Initializes web socket connection.
		if (this.url_.startsWith("wss://") || this.url_.startsWith("ws://")) {
			// Creates a web socket connection.
			this.init_();
		// No url found or invalid url for web socket.
		} else console.error("The url is undefined or invalid for web socket.");
	}

	/**
	 * @description Checks and parses a string.
	 * @param {string} text The string to parse.
	 * @function checkString_
	 * @private {function}
	 * @type {?string}
	 * @returns {?string}
	 */
	private checkString_ (text: string): (string | null) {
		// Trims blank spaces.
		text = text.trim();
		// Whether we detect a value.
		if (text.length > 0) return text;
		// Nothing to send.
		return null;
	}

	/**
	 * @description Re-establish socket connection when it lost.
	 * @function reconnect_
	 * @private {function}
	 * @type {void}
	 * @returns {void}
	 */
	private reconnect_ (): void {
		// Whether auto reconnection is allowed.
		if (this.autoConnect_) {
			// Makes an info about auto reconnection.
			if (this.verbose_) console.log(
				`Reconnecting to web socket to this url: ${this.url_}`
			);
			// Re-initializes web socket connection.
			this.init_();
		}
	}

	/**
	 * @description Overrides connection url.
	 * @param {string} value The new url.
	 * @function setUrl
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setUrl (value: string): void {
		// Gets real value.
		const parsed: (string | null) = this.checkString_(value);
		// Whether we detect a value.
		if (
			parsed != null &&
			(parsed.startsWith("wss://") || parsed.startsWith("ws://"))
		) {
			// Updates socket link.
			this.url_ = parsed;
			// Creates a web socket connection.
			this.init_();
		}
	}

	/**
	 * @description Overrides `error` event callback.
	 * @param {SocketEvent} value The new callback.
	 * @function setErrorCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setErrorCallback (value: SocketEvent<T>): void {
		// Updates that value.
		this.onError_ = value;
		// Listens `error` event on the web socket.
		if (this.socket_ != null) this.socket_.onerror = (
			error: Event
		): void => {
			// Displays a connection error message.
			if (this.verbose_) console.error(`Connection error.`);
			// Throws `error` event.
			if (this.onError_ != null) this.onError_(null, error, this);
			// Closes connection.
			this.socket_?.close();
		};
	}

	/**
	 * @description Overrides `message` event callback.
	 * @param {SocketEvent} value The new callback.
	 * @function setMessageCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setMessageCallback (value: SocketEvent<T>): void {
		// Updates that value.
		this.onMessage_ = value;
		// Listens `message` event on the web socket.
		if (this.socket_ != null) this.socket_.onmessage = (
			event: MessageEvent
		): void => {
			// Makes a warn about new received message.
			if (this.verbose_) console.log("A message has been received !");
			// Throws `message` event.
			if (this.onMessage_ != null) this.onMessage_(
				(JSON.parse(event.data) as T), null, this
			);
		};
	}

	/**
	 * @decription Initializes and build a web socket.
	 * @private {function}
	 * @function init_
	 * @type {void}
	 * @returns {void}
	 */
	private init_ (): void {
		// Initializes a web socket.
		this.socket_ = new WebSocket(this.url_);
		// Sets message event callback.
		this.setMessageCallback(this.onMessage_);
		// Sets auto connection state.
		this.autoConnection(this.autoConnect_);
		// Sets close event callback.
		this.setCloseCallback(this.onClose_);
		// Sets error event callback.
		this.setErrorCallback(this.onError_);
		// Sets open event callback.
		this.setOpenCallback(this.onOpen_);
	}

	/**
	 * @description Overrides `close` event callback.
	 * @param {SocketEvent} value The new callback.
	 * @function setCloseCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setCloseCallback (value: SocketEvent<T>): void {
		// Updates that value.
		this.onClose_ = value;
		// Listens `close` event on the web socket.
		if (this.socket_ != null) this.socket_.onclose = (
			event: CloseEvent
		): void => {
			// Displays a message about connection closing.
			if (this.verbose_) console.log(
				`%cConnection closed.`, "color:yellow;"
			);
			// Throws `close` event.
			if (this.onClose_ != null) this.onClose_(null, event, this);
			// Try to re-establish connection whether possible.
			this.reconnect_();
		};
	}

	/**
	 * @description Overrides `open` event callback.
	 * @param {SocketEvent} value The new callback.
	 * @function setOpenCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setOpenCallback (value: SocketEvent<T>): void {
		// Updates that value.
		this.onOpen_ = value;
		// Listens `open` event on the web socket.
		if (this.socket_ != null) this.socket_.onopen = (
			event: Event
		): void => {
			// Makes a warn about connection.
			if (this.verbose_) console.log(
				"%cConnection established.", "color:green;"
			);
			// Throws `open` event.
			if (this.onOpen_ != null) this.onOpen_(null, event, this);
			// Sends cached request(s).
			this.caches_.forEach(request => this.socket_?.send(request));
			// Clears caches.
			this.caches_ = [];
		};
	}

	/**
	 * @description Sends a message from the client to the back-end.
	 * @param {unknown} payload The data to be sent to server.
	 * @function emit
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public emit<V> (payload: V): void {
		// Whether passed payload is a valid object.
		if (
			typeof payload === "object" &&
			!Array.isArray(payload) &&
			payload !== undefined &&
			payload !== null
		) {
			// Whether socket connection instance is available.
			if (this.socket_ instanceof WebSocket) {
				// Converts payload into json.
				const json: string = JSON.stringify(payload);
				// Whether connect isn't opened.
				if (
					this.socket_.readyState === SocketStatus.CONNECTING ||
					this.socket_.readyState === SocketStatus.CLOSING ||
					this.socket_.readyState === SocketStatus.CLOSED
				) {
					// Tries to re-establish the connection.
					this.reconnect_();
					// Keeps this request in catches.
					this.caches_.push(json);
				// Sends the given payload data to the server.
				} else this.socket_.send(json);
			// Otherwise.
			} else {
				// A web socket object instance isn't defined.
				throw new Error("The web socket instance is undefined.");
			}
		// Otherwise.
		} else {
			// Invalid parameter, must be a javascript object instead.
			throw new Error("Invalid payload data. Must be a javascript object.");
		}
	}
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {SocketManager, SocketStatus};
