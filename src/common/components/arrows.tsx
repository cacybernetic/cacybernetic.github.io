/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Defines top and bottom arrows for fast scrolling.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-08-15
 * @updated 2025-08-15
 * @file arrows.tsx
 * @version 0.0.1
 */

// React dependencies.
import {CSSProperties, useCallback, useEffect, useState} from "react";
import {RiArrowDownSLine, RiArrowUpSLine} from "react-icons/ri";

// Chakra dependencies.
import {Flex, Icon, Box} from "@chakra-ui/react";

// Custom dependencies.
import {getScrollPercent, scrollTo} from "@/common/libraries/scroll.ts";
import {
	SCROLL_BOTTOM_ID,
	SCROLL_ORIGIN_ID,
	SCROLL_TOP_ID
} from "@/common/constants/variables.ts";

// Global ttributes.
let initialScrollPercent: number = 0;
let timer: (number | null) = null;

// The top and bottom arrows.
export default function ScrollHelperArrows () {
	// Attributes.
	const [isUpArrow, upArrow] = useState<boolean>(false);
	const [style, setStyle] = useState<CSSProperties>({
		transform: "translateY(100%)", opacity: 0
	});

	// Fetches the scroll origin markup.
	const getScrollOriginTag = useCallback(
		(): (HTMLElement | null) => document.querySelector<HTMLElement>(
			SCROLL_ORIGIN_ID
		), []
	);

	// Manages `scroll` event motion to display right arrow.
	const manageScroll = useCallback((): void => {
		// The scroll origin tag.
		const scrollOrigin: (HTMLElement | null) = getScrollOriginTag();
		// Whether that element exists.
		if (scrollOrigin != null) {
			// The current scroll percent.
			const scrollPercent: number = getScrollPercent(scrollOrigin);
			// Whether timer exists.
			if (timer != null) {
				// Destroys old timer process.
				window.clearTimeout(timer);
				// Resets timer value.
				timer = null;
			}
			// Whether we detect a scroll to top.
			if (scrollPercent < initialScrollPercent) {
				// Displays arrows container.
				setStyle({transform: "translateY(0)", opacity: 1});
				// Toggles arrow.
				upArrow(true);
			// Whether we detect a scroll to bottom.
			} else if (scrollPercent > initialScrollPercent) {
				// Displays arrows container.
				setStyle({transform: "translateY(0)", opacity: 1});
				// Toggles arrow.
				upArrow(false);
			}
			// Erases old percent.
			initialScrollPercent = scrollPercent;
			// Starts a timer.
			timer = (
				window.setTimeout((): void => {
					// Hides arrows container.
					setStyle({transform: "translateY(100%)", opacity: 0});
				}, 2000) ?? -1
			);
		}
	// Dependencies.
	}, [getScrollOriginTag]);

	// Initializes scroll helper behaviour and data.
	const initialize = useCallback((): void => {
		// The scroll origin tag.
		const scrollOrigin: (HTMLElement | null) = getScrollOriginTag();
		// Whether that element exists.
		if (scrollOrigin != null) {
			// Removes `scroll` event from the old callback.
			scrollOrigin.removeEventListener("scroll", manageScroll);
			// Listens `scroll` event.
			scrollOrigin.addEventListener("scroll", manageScroll);
		}
	// Dependencies.
	}, [getScrollOriginTag, manageScroll]);

	// Called after component get mounted.
	useEffect((): (() => void) => {
		// Initializes scroll help behaviour and data.
		initialize();
		// Called before this component get destroyed.
		return (): void => {
			// Removes attached scroll slot.
			getScrollOriginTag()?.removeEventListener("scroll", manageScroll);
		};
	// Dependencies.
	}, [getScrollOriginTag, manageScroll, initialize]);

	// Builds tsx code.
	return <Flex
		boxShadow = "0 0 12px var(--chakra-colors-primary-500)"
		_hover = {{backgroundColor: "primary.500"}}
		backgroundColor = "primary.800"
		transition = "all .2s linear"
		justifyContent = "center"
		alignItems = "center"
		borderRadius = {12}
		color = "neutral.1"
		position = "fixed"
		cursor = "pointer"
		direction = "row"
		bottom = "3rem"
		style = {style}
		right = "3rem"
		zIndex = {3}
	>
		{/** Down arrow */}
		{!isUpArrow && <Box
			onClick = {(): void => scrollTo(SCROLL_BOTTOM_ID)}
			padding = {{base: 3, sm: 3, md: 4, lg: 4}}
			transition = "all .2s linear"
			display = "inline-flex"
			height = "100%"
			width = "100%"
		>
			{/** Vector image. */}
			<Icon
				height = {{base: 5, sm: 5, md: 6, lg: 6}}
				width = {{base: 5, sm: 5, md: 6, lg: 6}}
				transition = "all .2s linear"
				as = {RiArrowDownSLine}
			/>
		</Box>}
		{/** Up arrow */}
		{isUpArrow && <Box
			onClick = {(): void => scrollTo(SCROLL_TOP_ID)}
			padding = {{base: 3, sm: 3, md: 4, lg: 4}}
			transition = "all .2s linear"
			display = "inline-flex"
			height = "100%"
			width = "100%"
		>
			{/** Vector image */}
			<Icon
				height = {{base: 5, sm: 5, md: 6, lg: 6}}
				width = {{base: 5, sm: 5, md: 6, lg: 6}}
				transition = "all .2s linear"
				as = {RiArrowUpSLine}
			/>
		</Box>}
	</Flex>;
}
