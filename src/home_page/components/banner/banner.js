/**
* @project Console Art Cybernetic - https://cacybernetic.github.io/cacybernetic/
* @author Obrymec - obrymecsprinces@gmail.com
* @fileoverview Banner UI component.
* @supported DESKTOP, MOBILE
* @created 2023-06-17
* @updated 2023-09-27
* @file banner.js
* @type {Banner}
* @version 0.0.2
*/

// Custom dependencies.
import {ScrollManager} from "../../../common/utilities/scroll/scroll.js";
import {buildButton} from "../../../common/components/button/button.js";
import ScreenManager from "../../../common/utilities/screen/screen.js";
import lang from "../../../common/utilities/language/language.js";
import {
	animateTextContent,
	getUpdates
} from "../../../common/utilities/string/string.js";
import {
	listenLoadEvent,
	clearJSStyle
} from "../../../common/utilities/browser/browser.js";
import {
	buildImage,
	buildIcon,
	Images,
	Icons
} from "../../../common/components/icon_logo_image/icon_logo_image.js";

/**
 * @classdesc Builds banner section.
 * @public
 * @class
 * @returns {Banner} Banner
 */
function Banner () {
	// Attributes.
	/**
	 * @description The banner right
	 * 	container tag.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let bannerRight_ = null;
	/**
	 * @description The banner left
	 * 	container tag.
	 * @private {?Element}
	 * @type {?Element}
	 * @field
	 */
	let bannerLeft_ = null;

	/**
	 * @description Animates the banner
	 * 	for large screens.
	 * @function largeAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const largeAnimation_ = () => {
		// Animates banner background.
		const timeline = bgAnimation_ ();
		// Animates the left container.
		timeline.add ({
			translateX: ["-50%", "0%"],
			targets: bannerLeft_,
			opacity: [0.0, 1.0]
		}, 300);
		// Animates the right container.
		timeline.add ({
			translateX: ["50%", "0%"],
			targets: bannerRight_,
			opacity: [0.0, 1.0]
		}, 300);
		// Returns the timeline.
		return timeline;
	};

	/**
	 * @description Animates the banner
	 * 	for small screens.
	 * @function smallAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const smallAnimation_ = () => {
		// Animates banner background.
		const timeline = bgAnimation_ ();
		// Animates the first element.
		timeline.add ({
			targets: bannerLeft_.children[0],
			translateY: ["-20%", "0%"],
			opacity: [0.0, 1.0]
		});
		// Animates the second element.
		timeline.add ({
			targets: bannerLeft_.children[1],
			translateY: ["20%", "0%"],
			opacity: [0.0, 1.0]
		});
		// Animates the third element.
		timeline.add ({
			targets: bannerLeft_.children[2],
			translateY: ["-20%", "0%"],
			opacity: [0.0, 1.0]
		});
		// Animates the fourth element.
		timeline.add ({
			targets: bannerLeft_.children[3],
			translateY: ["20%", "0%"],
			opacity: [0.0, 1.0]
		});
		// Returns the timeline.
		return timeline;
	};

	/**
	 * @description Animates top label.
	 * @function topLabelAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {void} void
	 */
	const topLabelAnimation_ = () => {
		// The texts to be written
		// by the typewriter.
		const texts = [
			`${lang.getText ("tr144")} →`,
			`${lang.getText ("tr154")} →`,
			lang.getText ("tr10")
		];
		// The typewriter animation
		// data configurations.
		const typewriter = (
			new Typewriter (
				bannerLeft_
					.children[0]
					.children[0],
				{
					loop: true,
					delay: 50
				}
			)
		);
		// Animates the top left
		// label.
		typewriter.pauseFor (2000)
			.typeString (texts[2])
			.pauseFor (2000)
			.deleteChars (
				texts[2].split (':')[1]
					.length - 1
			)
			.typeString (texts[0])
			.pauseFor (2000)
			.deleteChars (
				texts[0].length
			)
			.typeString (texts[1])
			.pauseFor (2000)
			.start ();
	};

	/**
	 * @description Animates the banner
	 * 	regardless the detected screen
	 * 	format (Desktop & Mobile).
	 * @function bannerAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const bannerAnimation_ = () => {
		// The animation timeline.
		let timeline = null;
		// Listens screen format.
		new ScreenManager ({
			disableDetection: true,
			mediumScreen: {
				max: 770,
				min: 421
			},
			smallScreen: {
				max: 420,
				min: 0
			},
			largeScreen: {
				max: 10000,
				min: 771
			},
			onMedium: () => {
				// Animates the banner
				// for medium screens.
				timeline = (
					smallAnimation_ ()
				);
			},
			onSmall: () => {
				// Animates the banner
				// for small screens.
				timeline = (
					smallAnimation_ ()
				);
			},
			onLarge: () => {
				// Animates the banner
				// for large screens.
				timeline = (
					largeAnimation_ ()
				);
			}
		});
		// Returns the timeline.
		return timeline;
	};

	/**
	 * @description Animates the big
	 * 	container with a gradient.
	 * @function bgAnimation_
	 * @constant {Function}
	 * @private {Function}
	 * @returns {Object} Object
	 */
	const bgAnimation_ = () => {
		// Creates a timeline with
		// default parameters.
		const timeline = (
			anime.timeline ({
				easing: "linear",
				autoplay: false,
				duration: 120,
				delay: 140,
				complete: function () {
					// Waits for 250 miliseconds
					// before add paddings.
					window.setTimeout (() => (
						clearData_ (
							this.direction
						)
					), 250);
				}
			})
		);
		// Animates background's
		// width size.
		return timeline.add ({
			translateX: ["-100%", "0%"],
			targets: "section.banner"
		});
	};

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
					ref: bannerLeft_.children[0],
					start: "bl-first-as",
					end: "bl-first-af"
				},
				{
					ref: bannerLeft_.children[1],
					start: "bl-second-as",
					end: "bl-second-af"
				},
				{
					ref: bannerLeft_.children[2],
					start: "bl-third-as",
					end: "bl-third-af"
				},
				{
					ref: bannerLeft_.children[3],
					start: "bl-four-as",
					end: "bl-four-af"
				},
				{
					start: "banner-right-as",
					end: "banner-right-af",
					ref: bannerRight_
				},
				{
					start: "banner-left-as",
					end: "banner-left-af",
					ref: bannerLeft_
				},
				{
					start: "banner-as",
					end: "banner-af",
					ref: (
						document.querySelector (
							"section.banner"
						)
					)
				}
			]
		})
	);

	/**
	 * @description Applies caroussel
	 * 	effect.
	 * @constant {Function}
	 * @function caroussel
	 * @private {Function}
	 * @returns {void} void
	 */
	const caroussel_ = () => {
		// The first progress thumb.
		const progressThumb1 = (
			document.querySelector (
				"div#banner-progress-1"
			)
		);
		// The second progress thumb.
		const progressThumb2 = (
			document.querySelector (
				"div#banner-progress-2"
			)
		);
		// The third progress thumb.
		const progressThumb3 = (
			document.querySelector (
				"div#banner-progress-3"
			)
		);
		// The first screenshot.
		const screenshot1 = (
			document.querySelector (
				"img#banner-shot-1"
			)
		);
		// The second screenshot.
		const screenshot2 = (
			document.querySelector (
				"img#banner-shot-2"
			)
		);
		// The third screenshot.
		const screenshot3 = (
			document.querySelector (
				"img#banner-shot-3"
			)
		);
		// Adds the progress
		// animation to the
		// first progress.
		progressThumb1
			.classList.add (
				"banner-progress-thumb"
			);
		// Fade-in the first
		// screeshot.
		screenshot1
			.classList.add (
				"banner-fade-in"
			);
		// Waits for 4.1s.
		window.setTimeout (() => {
			// Removes the progress
			// animation from the
			// previous thumb.
			progressThumb1
				.classList.remove (
					"banner-progress-thumb"
				);
			// Adds the progress
			// animation to the
			// second progress.
			progressThumb2
				.classList.add (
					"banner-progress-thumb"
				);
			// Fade-out the previous
			// screeshot.
			screenshot1
				.classList.remove (
					"banner-fade-in"
				);
			// Fade-in the second
			// screeshot.
			screenshot2
				.classList.add (
					"banner-fade-in"
				);
			// Waits for 4.1s.
			window.setTimeout (() => {
				// Removes the progress
				// animation from the
				// previous thumb.
				progressThumb2
					.classList.remove (
						"banner-progress-thumb"
					);
				// Adds the progress
				// animation to the
				// third progress.
				progressThumb3
					.classList.add (
						"banner-progress-thumb"
					);
				// Fade-out the previous
				// screeshot.
				screenshot2
					.classList.remove (
						"banner-fade-in"
					);
				// Fade-in the third
				// screeshot.
				screenshot3
					.classList.add (
						"banner-fade-in"
					);
				// Waits for 4.1s.
				window.setTimeout (() => {
					// Removes the progress
					// animation from the
					// previous thumb.
					progressThumb3
						.classList.remove (
							"banner-progress-thumb"
						);
					// Fade-out the previous
					// screeshot.
					screenshot3
						.classList.remove (
							"banner-fade-in"
						);
					// Calls inside itself.
					caroussel_ ();
				}, 4100);
			}, 4100);
		}, 4100);
	};

	/**
	 * @description Builds banner html
	 * 	structure as string format.
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
		const section = (
			document.createElement (
				"section"
			)
		);
		// Creates a skeleton tag.
		const skeleton = (
			document.createElement (
				"div"
			)
		);
		// Creates banner template
		// section for skeleton.
		const tempSection = (
			document.createElement (
				"section"
			)
		);
		// Adds a class's name to
		// our template section.
		tempSection.classList.add (
			"banner-template"
		);
		// Adds a class's name to
		// our skeleton loader.
		skeleton.classList.add (
			"skeleton-loading"
		);
		// Adds a class's name to
		// the created section.
		section.classList.add (
			"banner"
		);
		// Adds another class's
		// name to our section.
		section.classList.add (
			"banner-as"
		);
		// Adds `auto-scrollable`
		// attribute for auto
		// background process.
		section.setAttribute (
			"auto-scrollable",
			true
		);
		// Adds a html structure
		// to the created section.
		section.innerHTML = `
			<div
				class = "${
					"banner-left banner-left-as"
				}"
			>
				<span
					class = "bl-first-as"
				>
					<label></label>
				</span>
				<h1
					banner-index = "tr11::0"
					class = "bl-second-as"
					id = "banner-data"
				>
					${lang.getText ("tr11")}
				</h1>
				<span
					class = "bl-third-as"
				>
					<span
						banner-index = "tr12::1"
						id = "banner-data"
					>
						${lang.getText ("tr12")}
					</span>
					<br/>
					<span
						banner-index = "tr13::2"
						id = "banner-data"
					>
						${lang.getText ("tr13")}
					</span>
				</span>
				<div
					class = "bl-four-as"
				>
					${buildButton ({
						text: lang.getText ("tr9"),
						textId: "banner-data",
						customAttr: (
							"banner-index = tr9::3"
						)
					})}
					<button>
						<span
							banner-index = "tr14::4"
							id = "banner-data"
						>
							${lang.getText ("tr14")}
						</span>
						${buildIcon ({
							data: {
								idName: "banner-img"
							},
							fileName: (
								Icons.ROUNDED_PLAY
							)
						})}
					</button>
				</div>
				<div>
					<span>
						<div
							id = "banner-progress-1"
						></div>
					</span>
					<span>
						<div
							id = "banner-progress-2"
						></div>
					</span>
					<span>
						<div
							id = "banner-progress-3"
						></div>
					</span>
				</div>
			</div>
			<div
				class = "${
					"banner-right banner-right-as"
				}"
			>
				${buildImage ({
					data: {
						idName: "banner-shot-1"
					},
					fileName: (
						Images.SCREENSHOT_1
					)
				})}
				${buildImage ({
					data: {
						idName: "banner-shot-2"
					},
					fileName: (
						Images.SCREENSHOT_2
					)
				})}
				${buildImage ({
					data: {
						idName: "banner-shot-3"
					},
					fileName: (
						Images.SCREENSHOT_3
					)
				})}
			</div>
		`;
		// Adds the above section to
		// the template section tag
		// as a child.
		tempSection.appendChild (
			section
		);
		// Adds the below skeleton
		// loader to the template
		// section tag as a child.
		tempSection.appendChild (
			skeleton
		);
		// Adds the below template
		// section to the main tag
		// as a child.
		main.appendChild (
			tempSection
		);
		// The banner right tag
		// reference.
		bannerRight_ = (
			document.querySelector (
				"div.banner-right"
			)
		);
		// The banner left tag
		// reference.
		bannerLeft_ = (
			document.querySelector (
				"div.banner-left"
			)
		);
		// Waits until images and
		// icons are loaded.
		listenLoadEvent ({
			tags: [
				...Array.from (
					bannerRight_.children
				),
				...Array.from (
					document.querySelectorAll (
						"img#banner-img"
					)
				)
			],
			onReady: () => {
				// Animates top label.
				topLabelAnimation_ ();
				// Launches carousel.
				caroussel_ ();
				// Adds `hide-skeleton`
				// class to skeleton
				// loader.
				skeleton.classList.add (
					"hide-skeleton"
				);
				// Waits for 200ms before
				// delete skeleton loader.
				window.setTimeout (() => (
					skeleton.remove ()
				), 200);
				// Called when any changement
				// is detected by redux.
				window.store.subscribe (
					() => {
						// Updates the top label
						// text animation.
						topLabelAnimation_ ();
						// Changes all tags
						// text's content
						// with a textual
						// animation.
						animateTextContent (
							getUpdates ({
								attrPrefix: (
									"banner-index"
								),
								textualsId: (
									"banner-data"
								)
							})
						);
					}
				);
				// Focus on the current
				// section for scrolling.
				new ScrollManager ({
					target: tempSection,
					offsetBottom: 240,
					scope: window,
					root: main,
					onEnter: () => {
						// Animates the banner
						// in normal mode.
						bannerAnimation_ ()
							.play ();
						// Puts a focus to
						// corresponding
						// option inside
						// the navbar.
						window.store
							.getState ()
							.navbar
							.select (0);
					},
					onLeave: () => {
						// Animates the banner
						// in reverse mode.
						bannerAnimation_ ()
							.reverse ();
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
export {Banner};
