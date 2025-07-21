/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Defines a class to detect and manage scrolling.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @file scroll.ts
 * @version 0.0.1
 */

// Types.
export type ScrollManagerProps = {
	onOver?: (((percent?: number) => void) | null),
	targetTag?: (Element | string | null),
	rootTag?: (Element | string | null),
	onEnter?: ((() => void) | null),
	onLeave?: ((() => void) | null),
	offsetBottom?: number,
  offsetTop?: number
};
export type BaseScrollProps = {
	onOver?: (((percent?: number) => void) | null), 
	target: (Element | string),
	offsetBottom?: number,
	onEnter: () => void,
	onExit: () => void,
	offsetTop?: number,
	ref: ScrollManager,
	parentId: string
};

/**
 * @description Calculates the scrollbar progress in percentage.
 * @param {HTMLElement|Element} element The markup to track.
 * @function getScrollPercent
 * @type {number}
 * @public
 * @returns {number}
 */
function getScrollPercent (element: (HTMLElement | Element)): number {
	// Gets the total scrollable height of the content.
	const scrollHeight: number = element.scrollHeight;
  // Gets the current vertical scroll position.
	const scrollTop: number = element.scrollTop;
	// Gets the visible height of the element.
	const clientHeight = element.clientHeight;
  // Sends scroll progress in percentage.
  return ((scrollTop / (scrollHeight - clientHeight)) * 100);
}

/**
 * @description Scrolls the scrollbar thumb to the specified element.
 * @param {Element|string} element The target element.
 * @function scrollTo
 * @type {void}
 * @public
 * @returns {void}
 */
function scrollTo (element: (Element | string)): void {
  // Gets the passed tag.
  const tag: (Element | null) = (
    typeof element !== "string" ? element :
    document.querySelector(element.toString())
  );
	// Scrolls directly to the target tag reference.
  if (tag instanceof Element) tag.scrollIntoView({
		behavior: "smooth", inline: "nearest", block: "start"
	});
}

/**
 * @description Applies a basic behaviour on the scroll manager.
 * @param {BaseScrollProps} The basic scroll behaviour configs.
 * @function applyBasicBehaviour
 * @type {void}
 * @public
 * @returns {void}
 */
function applyBasicScrollBehaviour ({
	offsetBottom,
	offsetTop,
	parentId,
	onEnter,
	onExit,
	onOver,
	target,
	ref
}: BaseScrollProps): void {
	// Listens `enter` event.
	ref.setEnterEventCallback(onEnter);
	// Listens `leave` event.
	ref.setLeaveEventCallback(onExit);
	// Configures the bottom offset.
	ref.setOffsetBottom(offsetBottom);
	// Configures `over` event.
	ref.setOverEventCallback(onOver);
	// Configures the top offset.
	ref.setOffsetTop(offsetTop);
	// Configures the target tag.
	ref.setTargetTag(target);
	// Configures the root tag.
	ref.setRootTag(parentId);
	// Initializes the scroll listener.
	ref.initialize();
}

/**
 * @classdesc Listens scroll position to trigger some events about that.
 * @param {ScrollManagerProps} data It supports the following keys:
 *  - Function onEnter: Called when the specified tag
 *    enters inside the client screen regardless offsets.
 *
 *  - Function onLeave: Called when the specified tag
 *    get out of the client screen regardless offsets.
 *
 *  - Function onOver: Called every time when the tag
 *    is visible within the client screen regardless
 *    offsets.
 *
 *  - Number offsetBottom: The offset value to seek
 *    before element becomes visible on the client
 *    screen.
 *
 *  - Number offsetTop: The offset value to seek
 *    before get out of the client screen.
 *
 *  - Element targetTag: The tag where scroll effect
 * 		must be applied to.
 *
 *  - Element rootTag: The markup where the scroll effect
 *    should start computing margins and paddings.
 * @type {ScrollManager}
 * @public
 * @class
 * @returns {ScrollManager}
 */
export default class ScrollManager {
	// Attributes.
  onOver_: (((percent?: number) => void) | null) = null;
  onEnter_: ((() => void) | null) = null;
  onLeave_: ((() => void) | null) = null;
  target_: (Element | null) = null;
  root_: (Element | null) = null;
	scrollState_: boolean = false;
	offsetBottom_: number = 0;
  offsetTop_: number = 0;
	progress_: number = 0;
	onScroll_: EventListenerOrEventListenerObject = (
		(): void => this.checkScroll_()
	);

	/**
	 * @description Initializes event data and builds it.
	 * @constructor
	 */
	constructor ({
		offsetBottom,
		offsetTop,
		targetTag,
		onEnter,
		onLeave,
		rootTag,
		onOver
	}: ScrollManagerProps) {
		// Gets `enter` event callback.
		this.setEnterEventCallback(onEnter);
		// Gets `leave` event callback.
		this.setLeaveEventCallback(onLeave);
		// Gets the bottom offset.
		this.setOffsetBottom(offsetBottom);
		// Gets `over` event callback.
		this.setOverEventCallback(onOver);
		// Gets the target node from DOM.
		this.setTargetTag(targetTag);
		// Gets the top offset.
		this.setOffsetTop(offsetTop);
		// Gets the scroll root element.
		this.setRootTag(rootTag);
		// Initializes the manager.
		this.initialize();
	}

	/**
	 * @description Sets the bottom offset.
	 * @param {?(undefined|number)} offset The new offset.
	 * @function setOffsetBottom
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setOffsetBottom (offset?: number): void {
		// Overrides the old bottom offset value.
		this.offsetBottom_ = (typeof offset === "number" ? Math.abs(offset) : 0);
	}

	/**
	 * @description Sets the top offset.
	 * @param {?(undefined|number)} offset The new offset.
	 * @function setOffsetTop
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setOffsetTop (offset?: number): void {
		// Overrides the old top offset value.
		this.offsetTop_ = (typeof offset === "number" ? Math.abs(offset) : 0);
	}

	/**
	 * @description Returns `over` event callback.
	 * @function getOverEventCallback
	 * @type {?Function}
	 * @public
	 * @returns {?Function}
	 */
	public getOverEventCallback (): (((percent: number) => void) | null) {
		// Sends that event callback reference.
		return this.onOver_;
	}

	/**
	 * @description Sets `enter` event callback.
	 * @param {?(undefined|Function)} slot The method slot.
	 * @function setEnterEventCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setEnterEventCallback (slot?: ((() => void) | null)): void {
		// Updates that event callback.
		this.onEnter_ = (typeof slot === "function" ? slot : null);
	}

	/**
	 * @description Sets `leave` event callback.
	 * @param {?(undefined|Function)} slot The method slot.
	 * @function setLeaveEventCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setLeaveEventCallback (slot?: ((() => void) | null)): void {
		// Updates that event callback.
		this.onLeave_ = (typeof slot === "function" ? slot : null);
	}

	/**
	 * @description Returns `enter` event callback.
	 * @function getEnterEventCallback
	 * @type {?Function}
	 * @public
	 * @returns {?Function}
	 */
	public getEnterEventCallback (): ((() => void) | null) {
		// Sends that event callback reference.
		return this.onEnter_;
	}

	/**
	 * @description Returns `leave` event callback.
	 * @function getLeaveEventCallback
	 * @type {?Function}
	 * @public
	 * @returns {?Function}
	 */
	public getLeaveEventCallback (): ((() => void) | null) {
		// Sends that event callback reference.
		return this.onLeave_;
	}

	/**
	 * @description Returns the target tag reference.
	 * @function getTargetTag
	 * @type {?Element}
	 * @public
	 * @returns {?Element}
	 */
	public getTargetTag (): (Element | null) {
		// Sends the content of that markup.
		return this.target_;
	}

	/**
	 * @description Returns the root tag reference.
	 * @function getRootTag
	 * @type {?Element}
	 * @public
	 * @returns {?Element}
	 */
	public getRootTag (): (Element | null) {
		// Sends the content of that markup.
		return this.root_;
	}

	/**
	 * @description Returns the bottom offset.
	 * @function getOffsetBottom
	 * @type {number}
	 * @public
	 * @returns {number}
	 */
	public getOffsetBottom (): number {
		// Sends the top offset.
		return this.offsetBottom_;
	}

	/**
	 * @description Returns the top offset.
	 * @function getOffsetTop
	 * @type {number}
	 * @public
	 * @returns {number}
	 */
	public getOffsetTop (): number {
		// Sends the top offset.
		return this.offsetTop_;
	}

	/**
	 * @description Sets the target tag reference.
	 * @param {?(undefined|Element|string)} tag The new markup ref.
	 * @function setTargetTag
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setTargetTag (tag?: (Element | string | null)): void {
		// Parses the given markup.
		const markup: (Element | Window | null) = this.parseNode_(tag);
		// Overrides the old value of that markup.
		this.target_ = (!(markup instanceof Window) ? markup : null);
	}

	/**
	 * @description Sets the root tag reference.
	 * @param {?(undefined|Element|string)} tag The new markup ref.
	 * @function setRootTag
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setRootTag (tag?: (Element | string | null)): void {
		// Parses the given markup.
		const markup: (Element | Window | null) = this.parseNode_(tag);
		// Overrides the old value of that markup.
		this.root_ = (!(markup instanceof Window) ? markup : null);
	}

	/**
   * @description Listens root scroll thumb position.
   * @function listenScrollBar_
   * @private {function}
   * @type {void}
   * @returns {void}
   */
  private listenScrollBar_ (): void {
		// Removes the old callback from this event.
		this.root_?.removeEventListener("scroll", this.onScroll_);
    // Listens `scroll` event.
		this.root_?.addEventListener("scroll", this.onScroll_);
	}

	/**
	 * @description Sets `over` event callback.
	 * @param {?(undefined|Function)} slot The method slot.
	 * @function setOverEventCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setOverEventCallback (
		slot?: (((percent?: number) => void) | null)
	): void {
		// Updates that event callback.
		this.onOver_ = (typeof slot === "function" ? slot : null);
	}

	/**
   * @description Clears all created events for the process.
   * @function clearEvents
	 * @type {void}
   * @public
   * @returns {void}
   */
  public clearEvents (): void {
		// Removes the old callback from this event.
		this.root_?.removeEventListener("scroll", this.onScroll_);
    // Removes `scroll-root` attribute from the passed root markup.
    if (this.root_ instanceof Element) this.root_.removeAttribute(
			"scroll-root"
		);
  }

	/**
	 * @description Initializes scroll system controls.
	 * @function initialize
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public initialize (): void {
		// Whether all main elements are defined.
		if (this.target_ instanceof Element && this.root_ instanceof Element) {
			// Listens window scroll bar event.
			this.listenScrollBar_();
			// Checks the scrollbar position.
			this.checkScroll_();
		}
	}

	/**
   * @description Calculates the margin top of the given markup.
   * @param {Element} markup The markup element to be targeted.
   * @function computeMarginTop_
   * @private {function}
   * @type {number}
   * @returns {number}
   */
  private computeMarginTop_ (markup: Element): number {
    // The tag stylesheet.
    let marginTop: (number | string) = window.getComputedStyle(
			markup
		).marginTop ?? '0';
    // The margin top value.
    marginTop = parseFloat(marginTop);
    // Returns that margin value if and only if it's a real number.
    return (!isNaN(marginTop) ? marginTop : 0);
  }

	/**
	 * @description Parses a given DOM node.
	 * @param {?(undefined|Element|Window|string)} node The element ref.
	 * @type {?(Element|Window)}
	 * @function parseNode_
	 * @private {function}
	 * @returns {?(Element|Window)}
	 */
	private parseNode_ (
		node?: (Element | Window | string | null)
	): (Element | Window | null) {
		// Whether we have an element.
		if (node != null) {
			// Whether the passed node is an element or the window.
			if (node instanceof Element || node instanceof Window) {
				// Don't do anything.
				return node;
			// Otherwise.
			} else return document.querySelector(node as string);
		// Otherwise.
		} else return null;
	}

	/**
   * @description Calculates the full height a parent tag.
   * @param {Element} parent The parent tag.
   * @param {number} index The given markup index.
   * @function computeParentHeight_
	 * @private {function}
   * @type {number}
   * @returns {number}
   */
  private computeParentHeight_ (parent: Element, index: number): number {
		// The parent stylesheet.
		let {borderTopWidth, paddingTop, rowGap}: {
			borderTopWidth: (number | string),
			paddingTop: (number | string),
			rowGap: (number | string)
		} = window.getComputedStyle(parent) ?? {
			borderTopWidth: '0',
			paddingTop: '0',
			rowGap: '0'
		};
		// The border top width.
		borderTopWidth = parseFloat(borderTopWidth);
		// The padding top value.
		paddingTop = parseFloat(paddingTop);
		// The row gap value.
		rowGap = parseFloat(rowGap);
		// Computes the three values above.
		return (
			(!isNaN(borderTopWidth) ? borderTopWidth : 0) +
			(!isNaN(rowGap) ? (rowGap * index) : 0) +
			(!isNaN(paddingTop) ? paddingTop : 0)
		);
  }

	/**
   * @description Calculates the total height from target to root.
   * @param {Element} tag The target tag.
   * @param {number} initial The first value of the total height.
   * @function computeTotalHeight_
	 * @private {function}
   * @type {number}
   * @returns {number}
   */
  private computeTotalHeight_ (tag: Element, initial: number): number {
		// Whether the current tag has `scroll-root` attribute.
		if (tag.hasAttribute("scroll-root")) return initial;
		// Otherwise.
		else {
			// The parent of the passed tag.
			const parent: (Element | null) = tag.parentElement;
			// Whether that parent is defined.
			if (parent != null) {
				// The children elements.
				const kids: HTMLCollection = parent.children;
				// The index of the given tag.
				const tagIndex: number = Array.prototype.indexOf.call(kids, tag);
				// Adds the parent full height and the active markup margin top.
				initial += (
					this.computeParentHeight_(parent, tagIndex) +
					this.computeMarginTop_(tag)
				);
				// Computing the total height.
				for (let n: number = 0; n < tagIndex; n++) {
					// Adds the current child full height.
					initial += this.computeChildHeight_(kids[n]);
				}
				// Calls it itself.
				return this.computeTotalHeight_(parent, initial);
			}
		}
		// No compute to do for unexpected case.
		return 0;
  }

	/**
   * @description Calculates the full height of the given child tag.
   * @param {Element} child The markup kid element to be targeted.
   * @function computeChildHeight_
   * @private {function}
   * @type {number}
   * @returns {number}
   */
  private computeChildHeight_ (child: Element): number {
    // The kid stylesheet.
    let {marginBottom, marginTop, position, display}: {
			marginBottom: (number | string),
			marginTop: (number | string),
			position: (number | string),
			display: (number | string)
		} = window.getComputedStyle(child) ?? {
			marginBottom: '0',
			marginTop: '0',
			position: '0',
			display: '0'
		};
    // The margin top value.
    marginBottom = parseFloat(marginBottom);
    // The margin top value.
    marginTop = parseFloat(marginTop);
    // Converts the position into lower case.
    position = position.toLowerCase();
    // Converts the display into lower case.
    display = display.toLowerCase();
    // Whether the child is really visible on the document.
    if (
      position === "absolute" ||
      position === "fixed" ||
      display === "none"
    ) return 0;
    // Computes the child full height, margin top and bottom.
    else return (
			(!isNaN(marginBottom) ? marginBottom : 0) +
			child.getBoundingClientRect().height +
			(!isNaN(marginTop) ? marginTop : 0)
		);
  }

	/**
   * @description Checks scroll position to trigger events.
   * @fires checkScroll_#onEnter
   * @fires checkScroll_#onLeave
   * @fires checkScroll_#onOver
   * @function checkScroll_
   * @private {function}
   * @type {void}
   * @returns {void}
   */
  private checkScroll_ (): void {
		// Whether the target is an html element.
		if (this.target_ instanceof Element && this.root_ instanceof Element) {
			// The scroll top and client height.
			const {clientHeight, scrollTop} = this.root_;
			// The total scrolled height.
			const fullScrolled: number = (clientHeight + scrollTop);
			// Adds `scroll-root` attribute to the root tag.
			this.root_.setAttribute("scroll-root", "true");
			// The current scroll progress.
			this.progress_ = getScrollPercent(this.root_);
			// The total height from the given target to the root.
			const totalHeight: number = this.computeTotalHeight_(this.target_, 0);
			// Adds the top offset to the total height.
			const offsetTotalHeight: number = (this.offsetTop_ + totalHeight);
			// Computes the target tag full height.
			const fullHeight: number = (
				(this.target_.getBoundingClientRect().height + totalHeight) -
				this.offsetBottom_
			);
			// Whether the tag enters inside the client screen.
			if (fullScrolled >= offsetTotalHeight && scrollTop <= fullHeight) {
				/**
				 * @description Throws `over` event.
				 * @property {number} percent The scrollbar position.
				 * @event checkScroll_#onOver
				 * @readonly
				 * @emits
				 */
				if (this.onOver_ != null) this.onOver_(this.progress_);
				// Whether the tag wasn't visible on the screen.
				if (!this.scrollState_) {
					// Sets the scroll state.
					this.scrollState_ = true;
					/**
					 * @description Throws `enter` event.
					 * @event checkScroll_#onEnter
					 * @readonly
					 * @emits
					 */
					if (this.onEnter_ != null) this.onEnter_();
				}
			// Whether the tag gets out of the client screen.
			} else if (this.scrollState_) {
				// Sets the scroll state.
				this.scrollState_ = false;
				/**
				 * @description Throws `leave` event.
				 * @event checkScroll_#onLeave
				 * @readonly
				 * @emits
				 */
				if (this.onLeave_ != null) this.onLeave_();
			}
		}
  }
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {applyBasicScrollBehaviour, getScrollPercent, scrollTo};
