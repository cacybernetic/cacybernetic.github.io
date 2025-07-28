/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays company experience quality.
 * @author Obrymec - https://obrymec.vercel.app
 * @file experience_quality.tsx
 * @supported DESKTOP, MOBILE
 * @created 2025-07-28
 * @updated 2025-07-28
 * @version 0.0.1
 */

// Chakra dependencies.
import {Stack} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import {SF_REGULAR} from "@/common/constants/variables.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";

// Displays and sell company experience quality.
export default function ExperienceQuality () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Builds tsx code.
  return <Stack
    paddingInline = {{base: 4, sm: 8, md: 32, lg: 48, xl: 60}}
    paddingBlock = {{base: 8, sm: 12, md: 16, lg: 20, xl: 24}}
    gap = {{base: 4, sm: 5, md: 6}}
    fontFamily = {SF_REGULAR}
    transition = "all .2s"
    alignItems = "center"
    color = "neutral.10"
    userSelect = "none"
    width = "full"
  ></Stack>;
}
