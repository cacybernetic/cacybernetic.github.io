/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays company experience quality.
 * @author Obrymec - https://obrymec.vercel.app
 * @file experience_quality.tsx
 * @supported DESKTOP, MOBILE
 * @created 2025-07-28
 * @updated 2025-07-29
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement, useCallback} from "react";

// Chakra dependencies.
import {Stack, Text, Flex} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import technicalImage from "/assets/images/technological_excellence.webp";
import {SF_SEMI_BOLD, SF_REGULAR} from "@/common/constants/variables.ts";
import operationalFlowImage from "/assets/images/operational_flow.webp";
import trustPartnerImage from "/assets/images/trusted_partner.webp";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import ImageRenderer from "./image_renderer.tsx";

// Component types.
type BuildExperienceQualityProps = {
  description: string,
  imageUrl: string,
  invert?: boolean,
  title: string
};

// Displays and sell company experience quality.
export default function ExperienceQuality () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Build an experience quality section.
  const buildExperienceQuality = useCallback((
    {description, imageUrl, invert, title}: BuildExperienceQualityProps
  ): ReactElement => <Flex
    borderRadius = {{base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"}}
    gap = {{base: 4, sm: 5, md: 6}}
    borderColor = "neutral.5"
    transition = "all .2s"
    borderWidth = {1}
    direction = {{
      lg: "column", xl: (invert ? "row-reverse" : "row"),
      base: "column", sm: "column", md: "column"
    }}
    padding = {{
      lg: "1.6rem", xl: "1.8rem", "2xl": "2rem",
      base: ".6rem", sm: ".8rem", md: "1rem"
    }}
    _hover = {{
      boxShadow: "0 0 16px var(--chakra-colors-neutral-6)",
      backgroundImage: "var(--box-worth-hover-bg-color)",
      transform: "scale(1.02)"
    }}
  >
    {/** Information */}
    <Flex
      transition = "all .2s"
      direction = "column"
      rowGap = {{
        base: ".6rem", sm: ".7rem", md: ".8rem", lg: ".9rem", xl: "1rem"
      }}
    >
      {/** Title */}
      <Text
        fontSize = {{base: 20, sm: 22, md: 24, lg: 26, xl: 28, "2xl": 30}}
        fontFamily = {SF_SEMI_BOLD}
        transition = "all .2s"
        as = "h3"
      >{title}</Text>
      {/** Description */}
      <Text
        fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
        transition = "all .2s"
        color = "neutral.8"
      >{description}</Text>
    </Flex>
    {/** Image */}
    <ImageRenderer
      url = {imageUrl}
      imageStyle = {{
        borderRadius: {base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"},
        transition: "all .2s",
        objectFit: "cover"
      }}
      containerStyle = {{
        minWidth: {
          lg: "256px", xl: "364px", "2xl": "480px",
          base: "100%", sm: "100%", md: "100%"
        }
      }}
    />
  </Flex>, []);

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
  >
    {/** Operation flow */}
    {buildExperienceQuality({
      description: t("operationalFlowDescription"),
      title: t("operationalFlowTitle"),
      imageUrl: operationalFlowImage
    })}
    {/** Technological excellence  */}
    {buildExperienceQuality({
      description: t("technologicalExcellenceDescription"),
      title: t("technologicalExcellenceTitle"),
      imageUrl: technicalImage,
      invert: true
    })}
    {/** Trust partner  */}
    {buildExperienceQuality({
      description: t("trustedPartnerDescription"),
      title: t("trustedPartnerTitle"),
      imageUrl: trustPartnerImage
    })}
  </Stack>;
}
