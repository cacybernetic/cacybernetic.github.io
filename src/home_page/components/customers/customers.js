/**
* @project Console Art Cybernetic - https://cacybernetic.github.io/cacybernetic/
* @author Obrymec - obrymecsprinces@gmail.com
* @fileoverview Customers UI component.
* @supported DESKTOP, MOBILE
* @created 2023-06-21
* @updated 2023-09-27
* @file customers.js
* @type {Customers}
* @version 0.0.2
*/

// Custom dependencies.
import {ScrollManager} from "../../../common/utilities/scroll/scroll.js";
import lang from "../../../common/utilities/language/language.js";
import {
	listenLoadEvent,
	clearJSStyle
} from "../../../common/utilities/browser/browser.js";
import {
	buildLogo,
	Logos
} from "../../../common/components/icon_logo_image/icon_logo_image.js";
import {
	animateTextContent,
	animateText,
	getUpdates
} from "../../../common/utilities/string/string.js";

/**
 * @classdesc Builds customer section.
 * @public
 * @class
 * @returns {Customers} Customers
 */
function Customers () {
	// Attributes.
	/**
	 * @description The customers
	 * 	right container tag.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let rightGuest_ = null;
	/**
	 * @description The customers
	 * 	left container tag.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let leftGuest_ = null;
	/**
	 * @description The textual
	 * 	animation process id.
	 * @private {?int}
	 * @type {?int}
	 * @field
	 */
	let processId_ = null;
	/**
	 * @description The customers.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let section_ = null;

	/**
	 * @description Clears animation
	 * 	data.
	 * @param {String} direction The
	 * 	animation's direction.
	 * @function clearData_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const clearData_ = (
		direction
	) => (
		clearJSStyle ({
			direction,
			targets: [
				{
					start: "guest-logo-as",
					end: "guest-logo-af",
					ref: rightGuest_,
					children: true
				},
				{
					start: "guest-logo-as",
					end: "guest-logo-af",
					ref: leftGuest_,
					children: true
				}
			]
		})
	);

	/**
	 * @description Puts a timeline
	 * 	to all children of a tag.
	 * @param {Object} timeline The
	 * 	animation timeline.
	 * @param {Element} parent The
	 * 	target children parent.
	 * @function putTimeline_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const putTimeline_ = (
		timeline, parent
	) => {
		// Building timeline.
		for (
			const child of
			Array.from (
				parent.children
			).reverse ()
		) {
			// Creates a timeline
			// to the current
			// child.
			timeline.add ({
				scale: [0.0, 1.0],
				targets: child
			});
		}
		// Returns the passed
		// timeline.
		return timeline;
	};

	/**
	 * @description Animates customers.
	 * @function animateCustomers_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const animateCustomers_ = () => {
		// Creates a timeline with
		// default parameters.
		const timeline = (
			anime.timeline ({
				easing: "linear",
				autoplay: false,
				duration: 120,
				delay: 40,
				complete: function () {
					// Clears javascript
					// animation data.
					clearData_ (
						this.direction
					);
				}
			})
		);
		// Animates right customers
		putTimeline_ (
			timeline, rightGuest_
		);
		// Animates left customers
		putTimeline_ (
			timeline, leftGuest_
		);
		// Returns the created
		// timeline for future
		// usage.
		return timeline;
	};

	/**
	 * @description Animates customers
	 * 	with the possibility to control
	 * 	animation's direction.
	 * @param {String} direction The
	 * 	animation's direction.
	 * @constant {Function}
	 * @private {Function}
	 * @function animate_
	 * @returns {void} void
	 */
	const animate_ = direction => {
		// Stops the previous process.
		window.clearInterval (
			processId_
		);
		// Whether the direction is
		// normal mode.
		if (direction === "normal") {
			// Animates customers
			// with normal mode.
			animateCustomers_ ().play ();
			// Clears the title text.
			section_.children[0]
				.textContent = '';
			// Animates the text
			// in reverse mode.
			processId_ = animateText ({
				text: lang.getText ("tr15"),
				interval: 100,
				target: (
					document.querySelector (
						"section.customers"
					).children[0]
				)
			});
		// Otherwise.
		} else {
			// Animates customers
			// with reverse mode.
			animateCustomers_ ().reverse ();
			// Animates the text
			// in reverse mode.
			processId_ = animateText ({
				text: lang.getText ("tr15"),
				isReversed: true,
				isInverted: true,
				interval: 100,
				target: (
					document.querySelector (
						"section.customers"
					).children[0]
				)
			});
		}
	};

	/**
	 * @description Builds customers
	 * 	html structure as string
	 * 	format.
	 * @function render
	 * @public
	 * @returns {void} void
	 */
	this.render = () => {
		// The main tag element.
		const main = (
			window.store.getState ()
				.main
		);
		// Creates a section tag.
		section_ = (
			document.createElement (
				"section"
			)
		);
		// Adds a class's name to
		// the created section.
		section_.classList.add (
			"customers"
		);
		// Adds `auto-scrollable`
		// attribute for auto
		// background process.
		section_.setAttribute (
			"auto-scrollable",
			true
		);
		// Adds a html structure
		// to the created section.
		section_.innerHTML = `
			<span
				customers-index = "tr15::0"
				id = "customers-data"
			></span>
			<div>
				<div class = "left-customers">
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.T_MOBILE,
							data: {
								idName: "customers-img"
							}
						})}
					</span>
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.GOLDMAN,
							data: {
								idName: "customers-img"
							}
						})}
					</span>
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.AIRBUS,
							data: {
								idName: "customers-img"
							}
						})}
					</span>
				</div>
				<div class = "right-customers">
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.MARTIN,
							data: {
								idName: "customers-img"
							}
						})}
					</span>
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.NVIDIA,
							data: {
								idName: "customers-img"
							}
						})}
					</span>
					<span
						class = "${
							"guest-logo-as"
						}"
					>
						${buildLogo ({
							fileName: Logos.UBS,
							data: {
								idName: "customers-img"
							}
						})}
					</span>
				</div>
			</div>
			<div
				class = "skeleton-loading"
			></div>
		`;
		// Adds the above nav section
		// to the main tag as a child.
		main.appendChild (section_);
		// The right customers tag.
		rightGuest_ = (
			document.querySelector (
				"div.right-customers"
			)
		);
		// The left customers tag.
		leftGuest_ = (
			document.querySelector (
				"div.left-customers"
			)
		);
		// Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: (
				document.querySelectorAll (
					"img#customers-img"
				)
			),
			onReady: () => {
				// Adds `hide-skeleton`
				// class to skeleton
				// loader.
				section_.lastElementChild
					.classList.add (
						"hide-skeleton"
					);
				// Waits for 200ms before
				// delete skeleton loader.
				window.setTimeout (() => (
					section_.lastElementChild
						.remove ()
				), 200);
				// Called when any changement
				// is detected by redux.
				window.store.subscribe (
					() => {
						// Changes all tags
						// text's content
						// with a textual
						// animation.
						animateTextContent (
							getUpdates ({
								attrPrefix: (
									"customers-index"
								),
								textualsId: (
									"customers-data"
								)
							})
						);
					}
				);
				// Focus on the current
				// section for scrolling.
				new ScrollManager ({
					target: section_,
					scope: window,
					root: main,
					onEnter: () => {
						// Animates customers
						// in normal mode.
						animate_ ("normal");
					},
					onLeave: () => {
						// Animates customers
						// in reverse mode.
						animate_ ("reverse");
						// Waits for 200ms
						// before destroy
						// animation data.
						window.setTimeout (
							() => (
								clearData_ (
									"reverse"
								)
							), 200
						);
					}
				});
			}
		});
	}
}

/**
 * @description Exports
 * 	all public features.
 * @exports *
 */
export {Customers};
