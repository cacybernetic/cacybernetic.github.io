/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Provides methods for general animation usage.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 * @file anim.ts
 */

// Enumerations.
enum TransitionFillMode {NORMAL, REVERSE}
enum TransitionBehaviour {ASYNC, SYNC}

// Attributes.
// eslint-disable-next-line
// @ts-expect-error.
const commonBeginFadeConfigs: CSSStyleDeclaration = {
	transition: "all 1s cubic-bezier(0.5, 0, 0, 1) .05s",
	opacity: '0'
};
// eslint-disable-next-line
// @ts-expect-error.
const commonEndFadeConfigs: CSSStyleDeclaration = {
	transition: "all 1s cubic-bezier(0.5, 0, 0, 1) .05s",
	opacity: '1'
};

// Types.
type TransitionConfigs = {
	behaviour?: TransitionBehaviour,
	clips: Array<TransitionClip>,
	mode?: TransitionFillMode,
	onEnd?: () => void
};
type SyncAnimationProps = {
	clip: TransitionClip,
	onEnd?: () => void,
	index: number,
	limit: number
};
type AsyncAnimationProps = {
	onExecute: (totalTime: number) => (number | void),
	clip: TransitionClip,
	onEnd?: () => void,
	index: number,
	limit: number
};
type TransitionClip = {
	ref: (HTMLElement | string),
	css: CSSStyleDeclaration,
	onEnd?: () => void,
	duration?: number,
	delay?: number
};

/**
 * @description Animates tag using transition effects with sync model.
 * @param {SyncAnimationProps} configs The configs data for animation.
 * @function applySyncAnimation_
 * @type {Promise<void>}
 * @private {function}
 * @async
 * @returns {Promise<void>}
 */
async function applySyncAnimation_ (
	{index, limit, onEnd, clip}: SyncAnimationProps
): Promise<void> {
	// Animates the current tag.
	await applyTransition(clip);
	// Whether we have at the end of loop.
	if (typeof onEnd === "function" && index === limit) onEnd();
};

/**
 * @description Animates tag using transition effects with async model.
 * @param {AsyncAnimationProps} configs The configs data for animation.
 * @function applyAsyncAnimation_
 * @private {function}
 * @type {void}
 * @returns {void}
 */
// Animates tag using transition effects with async model.
function applyAsyncAnimation_ (
	{onExecute, index, limit, onEnd, clip}: AsyncAnimationProps
): void {
	// Computes the total time.
	const totalTime: number = ((clip?.duration ?? 0) + (clip?.delay ?? 0));
	// Animates the current tag.
	applyTransition(clip);
	// Throws `execute` to update the global total time.
	onExecute(totalTime);
	// Whether we have at the end of loop.
	if (typeof onEnd === "function" && index === limit) window.setTimeout(
		onEnd, totalTime
	);
};

/**
 * @description Animates a tag using transition effects.
 * @param {TransitionClip} clip The transition configs.
 * @function applyTransition
 * @type {Promise<void>}
 * @public
 * @returns {Promise<void>}
 */
function applyTransition (
	{duration, onEnd, delay, css, ref}: TransitionClip
): Promise<void> {
	// Treats animation as a promise.
	return new Promise(resolve => {
		// Tries to fetch the target markup.
		const tag: (HTMLElement | null) = (
			typeof ref === "string" ? document.querySelector(ref) : ref
		);
		// Whether the target markup really exists.
		if (tag instanceof HTMLElement) {
			// Gets the delay.
			delay = (Number.isInteger(delay) ? Math.abs(delay!) : 0);
			// Waits for the given delay.
			window.setTimeout((): void => {
				// Applies the passed css.
				for (const prop of Object.keys(css)) tag.style.setProperty(
					// eslint-disable-next-line
					// @ts-expect-error.
					prop, css[prop]
				);
				// Gets the duration.
				duration = (
					Number.isInteger(duration) ? Math.abs(duration!) : 300
				);
				// Waits for the passed duration.
				window.setTimeout((): void => {
					// Whether `end` event is listening.
					if (typeof onEnd === "function") onEnd();
					// Ends the background process.
					resolve();
				}, duration);
			}, delay);
		// Don't animate this markup.
		} else resolve();
	});
}

/**
 * @description Animates severals tags using transition effects.
 * @param {TransitionConfigs} configs The transition configurations.
 * @function applyManyTransitions
 * @type {Promise<void>}
 * @public
 * @async
 * @returns {Promise<void>}
 */
async function applyManyTransitions (
	{behaviour, onEnd, clips, mode}: TransitionConfigs
): Promise<void> {
	// Gets the default behaviour.
	behaviour = (behaviour == null ? TransitionBehaviour.SYNC : behaviour);
	// Gets the default fill mode.
	mode = (mode == null ? TransitionFillMode.NORMAL : mode);
	// Gets transition clips.
	clips = (Array.isArray(clips) ? clips : []);
	// Whether we have some clips.
	if (clips.length > 0) {
		// The last element position index.
		const last: number = (clips.length - 1);
		// The total time.
		let totalTime: number = 0;
		// Whether reverse mode is used.
		if (mode === TransitionFillMode.REVERSE) {
			// Whether sync model is used.
			if (behaviour === TransitionBehaviour.SYNC) {
				// Animating all selected tags.
				for (let j: number = last; j > -1; j--) await applySyncAnimation_({
					clip: clips[j], index: j, limit: 0, onEnd
				});
			// Otherwise.
			} else {
				// Animating all selected tags.
				for (let j: number = last; j > -1; j--) applyAsyncAnimation_({
					onExecute: (time: number): number => totalTime += time,
					clip: clips[j], index: j, limit: 0, onEnd
				});
			}
		// Otherwise.
		} else {
			// Whether sync model is used.
			if (behaviour === TransitionBehaviour.SYNC) {
				// Animating all selected tags.
				for (
					let i: number = 0; i < clips.length; i++
				) await applySyncAnimation_({
					clip: clips[i], index: i, limit: last, onEnd
				});
			// Otherwise.
			} else {
				// Animating all selected tags.
				for (
					let i: number = 0; i < clips.length; i++
				) applyAsyncAnimation_({
					onExecute: (time: number): number => totalTime += time,
					clip: clips[i], index: i, limit: last, onEnd
				});
			}
		}
	}
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {
	commonBeginFadeConfigs,
	commonEndFadeConfigs,
	applyManyTransitions,
	TransitionBehaviour,
	TransitionFillMode,
	applyTransition,
	TransitionClip
};
