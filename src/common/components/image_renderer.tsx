/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Defines image renderer component.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file image_renderer.tsx
 * @created 2025-07-22
 * @updated 2025-08-14
 * @version 0.0.4
 */

// React dependencies.
import {ReactElement, useEffect, useState, Fragment} from "react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Chakra dependencies.
import {
  SkeletonProps,
  ImageProps,
  TextProps,
  BoxProps,
  Skeleton,
  Image,
  Text,
  Box
} from "@chakra-ui/react"

// Custom dependencies.
import {createBlankImage, correctString} from "@/common/libraries/std.ts";
import {SF_REGULAR} from "@/common/constants/variables.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";

// Component properties.
export interface ImageRendererProps {
  skeletonStyle?: (SkeletonProps | null),
  onLoad?: (hasError: boolean) => void,
  errorTextStyle?: (TextProps | null),
  containerStyle?: (BoxProps | null),
  imageStyle?: (ImageProps | null),
  topChild?: (ReactElement | null),
  url?: (string | null)
}

// Displays an image after load it with a skeleton loader.
export default function ImageRenderer ({
  containerStyle,
  errorTextStyle,
  skeletonStyle,
  imageStyle,
  topChild,
  onLoad,
  url
}: ImageRendererProps) {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const [isLoading, loading] = useState<boolean>(true);
  const [hasError, error] = useState<boolean>(false);
  url = correctString<string>({input: url});

  // Called when this component gets ready.
  useEffect((): void => {
    // Whether image `load` event is listening.
    if (typeof onLoad === "function" && !isLoading) onLoad(hasError);
  // Dependencies.
  }, [isLoading, hasError, onLoad]);

  // Builds tsx code.
  return <Skeleton loading = {isLoading} {...skeletonStyle}>
    {/** Top child representation */}
    {topChild}
    {/** Sub container */}
    <Box
      padding = {hasError ? {base: 2, sm: 2, md: 3} : undefined}
      backgroundColor = {hasError ? "error.50" : undefined}
      borderColor = {hasError ? "error.500" : undefined}
      transition = {hasError ? "all .2s" : undefined}
      borderRadius = {hasError ? 6 : undefined}
      borderWidth = {hasError ? 1 : undefined}
      height = {hasError ? "auto" : "100%"}
      width = {hasError ? "auto" : "100%"}
      textAlign = "center"
      userSelect = "none"
      color = "error.500"
      {...containerStyle}
    >
      {/** Content */}
      {
        hasError ?
        <Text
          fontSize = {{base: 12, sm: 13, md: 14}}
          fontFamily = {SF_REGULAR}
          transition = "all .2s"
          {...errorTextStyle}
        >{t("imageLoadError")}</Text> :
        <Fragment>
          {/** Fake image */}
          <Image
            display = {isLoading ? "block" : "none"}
            src = {createBlankImage({}).src}
            height = "100%"
            width = "100%"
            {...imageStyle}
          />
          {/** Original image */}
          <Image
            display = {isLoading ? "none" : "block"}
            onLoad = {(): void => loading(false)}
            onError = {(): void => error(true)}
            pointerEvents = "none"
            objectFit = "contain"
            height = "100%"
            width = "100%"
            src = {url}
            {...imageStyle}
          />
        </Fragment>
      }
    </Box>
  </Skeleton>;
}
