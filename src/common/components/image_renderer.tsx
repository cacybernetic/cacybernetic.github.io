/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Defines image renderer component.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file image_renderer.tsx
 * @created 2025-07-22
 * @updated 2025-07-25
 * @version 0.0.2
 */

// React dependencies.
import {ReactElement, useState} from "react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Chakra dependencies.
import {
  SkeletonProps,
  ImageProps,
  BoxProps,
  Skeleton,
  Image,
  Text,
  Box
} from "@chakra-ui/react"

// Custom dependencies.
import {SF_REGULAR} from "@/common/constants/variables.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {correctString} from "@/common/libraries/std.ts";

// Component properties.
export interface ImageRendererProps {
  skeletonStyle?: (SkeletonProps | null),
  containerStyle?: (BoxProps | null),
  imageStyle?: (ImageProps | null),
  topChild?: (ReactElement | null),
  url?: (string | null)
}

// Displays an image after load it with a skeleton loader.
export default function ImageRenderer ({
  skeletonStyle, containerStyle, imageStyle, topChild, url
}: ImageRendererProps) {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const [isLoading, loading] = useState<boolean>(true);
  const [hasError, error] = useState<boolean>(false);
  url = correctString<string>({input: url});

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
      {...containerStyle}
    >
      {/** Content */}
      {
        hasError ?
        <Text
          fontSize = {{base: 12, sm: 13, md: 14}}
          fontFamily = {SF_REGULAR}
          transition = "all .2s"
          userSelect = "none"
        >{t("imageLoadError")}</Text> :
        <Image
          onLoad = {(): void => loading(false)}
          onError = {(): void => error(true)}
          pointerEvents = "none"
          objectFit = "contain"
          height = "100%"
          width = "100%"
          src = {url}
          {...imageStyle}
        />
      }
    </Box>
  </Skeleton>;
}
