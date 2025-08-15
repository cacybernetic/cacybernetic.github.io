/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays thin progress bar for scroll level.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file progress_bar.tsx
 * @created 2025-08-15
 * @updated 2025-08-15
 * @version 0.0.1
 */

// React dependencies.
import {useCallback, useEffect, useState} from "react";

// Chakra dependencies.
import {Box} from "@chakra-ui/react";

// Custom dependencies.
import {getScrollPercent} from "@/common/libraries/scroll.ts";

// View properties.
export interface ProgressBarProps {
  containerId: string,
  thumbColor: string
}

// Builds a tiny progress bar at the top for scroll level.
export default function ProgressBar (
  {containerId, thumbColor}: ProgressBarProps
) {
  // Attributes.
  const [progress, setProgress] = useState<number>(0);

  // Fetches the scroll origin markup.
	const getScrollOriginTag = useCallback(
    (): (HTMLElement | null) => document.querySelector(containerId),
    [containerId]
  );

  // Overrides the current scroll percent.
  const setScrollPercent = useCallback((): void => {
    // The scroll origin tag.
		const scrollOrigin: (HTMLElement | null) = getScrollOriginTag();
		// Whether that element exists.
		if (scrollOrigin != null) setProgress(getScrollPercent(scrollOrigin));
  // Dependencies.
  }, [getScrollOriginTag]);

	// Initializes scroll helper behaviour and data.
	const initialize = useCallback((): void => {
    // The scroll origin tag.
    const scrollOrigin: (HTMLElement | null) = getScrollOriginTag();
    // Whether that element exists.
    if (scrollOrigin != null) {
      // Removes `scroll` event from the old callback.
      scrollOrigin.removeEventListener("scroll", setScrollPercent);
      // Listens `scroll` event.
      scrollOrigin.addEventListener("scroll", setScrollPercent);
    }
  // Dependencies.
	}, [getScrollOriginTag, setScrollPercent]);

  // Called when this component get ready.
  useEffect((): (() => void) => {
    // Initializes progress bar scroll level.
    initialize();
    // Called before this component get destroyed.
		return (): void => {
			// Removes attached scroll slot.
			getScrollOriginTag()?.removeEventListener("scroll", setScrollPercent);
		};
  // Dependencies.
  }, [getScrollOriginTag, setScrollPercent, initialize]);

  // Builds tsx code.
  return <Box
    height = {{base: "2px", sm: "2px", md: "1.8px", lg: "2px", xl: "2.2px"}}
    transition = "all .2s linear"
    position = "fixed"
    bottom = {0}
    right = {0}
    left = {0}
  >
    {/** Thumb */}
    <Box
      backgroundColor = {thumbColor}
      width = {`${progress}%`}
      height = "100%"
    />
  </Box>;
}
