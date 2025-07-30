/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays projects building steps.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file build_steps.tsx
 * @created 2025-07-25
 * @updated 2025-07-30
 * @version 0.0.2
 */

// React dependencies.
import {ReactElement, useCallback, Fragment} from "react";

// Chakra dependencies.
import {Text, Flex, Box} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import solidExpertiseImage from "/assets/images/solid_expertise.webp";
import trustRelationImage from "/assets/images/trust_relation.webp";
import shortResultsImage from "/assets/images/short_results.webp";
import listenNeedImage from "/assets/images/listen_need.webp";
import {SF_SEMI_BOLD} from "@/common/constants/variables.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import ImageRenderer from "./image_renderer.tsx";
import Section from "./section.tsx";

// Component properties.
type BuildStepCardProps = {
  description: string,
  imageUrl: string,
  title: string
};

// Displays company projects building steps.
export default function ProjectsBuildingSteps () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Builds a step card UI component.
  const buildStepCard = useCallback((
    {description, imageUrl, title}: BuildStepCardProps
  ): ReactElement => <Flex
    borderRadius = {{base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"}}
    backgroundColor = "neutral.1"
    borderColor = "neutral.5"
    transition = "all .3s"
    direction = "column"
    className = "group"
    overflow = "hidden"
    borderWidth = {1}
    width = "100%"
    _hover = {{
      boxShadow: "0 0 16px var(--chakra-colors-neutral-6)",
      backgroundImage: "var(--box-worth-hover-bg-color)",
      transform: "translateY(-4px)"
    }}
  >
    {/** Cover */}
    <Box overflow = "hidden">
      {/** Skeleton */}
      <ImageRenderer
        url = {imageUrl}
        imageStyle = {{
          borderTopRadius: {
            base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"
          }
        }}
        skeletonStyle = {{
          _groupHover: {transform: "scale(1.08)"},
          transition: "all .2s",
          height: "auto",
          width: "100%",
          borderTopRadius: {
            base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"
          }
        }}
      />
    </Box>
    {/** Information */}
    <Flex
      transition = "all .2s"
      direction = "column"
      padding = {{
        base: ".6rem", sm: ".7rem", md: ".8rem", lg: ".9rem", xl: "1rem"
      }}
      rowGap = {{
        base: ".6rem", sm: ".7rem", md: ".8rem", lg: ".9rem", xl: "1rem"
      }}
    >
      {/** Title */}
      <Text
        fontSize = {{base: 16, sm: 18, md: 20, lg: 22}}
        fontFamily = {SF_SEMI_BOLD}
        transition = "all .2s"
        as = "h6"
      >{title}</Text>
      {/** Description */}
      <Text
        fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
        transition = "all .2s"
        color = "neutral.8"
      >{description}</Text>
    </Flex>
  </Flex>, []);

  // Builds tsx code.
  return <Section
    description = {t("projectsBuildingStepsDescription")}
    containerStyle = {{backgroundColor: "primary.50"}}
    title = {t("projectsBuildingStepsTitle")}
    titleStyle = {{
      width: {base: "auto", sm: "auto", md: "auto", lg: "620px"},
      textAlign: "center"
    }}
    descriptionStyle = {{
      width: {base: "auto", sm: "auto", md: "auto", lg: "620px"},
      textAlign: "center",
      color: "neutral.8"
    }}
    children = {<Fragment>
      {/** Projects building steps */}
      <Flex
        gap = {{base: 4, sm: 5, md: 6}}
        transition = "all .2s"
        marginTop = {4}
        direction = {{
          base: "column", sm: "column", md: "column",
          lg: "column", xl: "column", "2xl": "row"
        }}
      >
        {/** Dual boxes */}
        <Flex
          gap = {{base: 4, sm: 5, md: 6}}
          transition = "all .2s"
          width = "100%"
          direction = {{
            base: "column", sm: "column", md: "column", lg: "row"
          }}
        >
          {/** Solid expertise */}
          {buildStepCard({
            description: t("solidExpertiseDescription"),
            title: t("solidExpertiseTitle"),
            imageUrl: solidExpertiseImage
          })}
          {/** Listen your needs */}
          {buildStepCard({
            description: t("listenNeedDescription"),
            title: t("listenNeedTitle"),
            imageUrl: listenNeedImage
          })}
        </Flex>
        {/** Dual boxes */}
        <Flex
          gap = {{base: 4, sm: 5, md: 6}}
          transition = "all .2s"
          width = "100%"
          direction = {{
            base: "column", sm: "column", md: "column", lg: "row"
          }}
        >
          {/** Trust relation */}
          {buildStepCard({
            description: t("trustRelationDescription"),
            title: t("trustRelationTitle"),
            imageUrl: trustRelationImage
          })}
          {/** Short exploitable results */}
          {buildStepCard({
            description: t("shortResultsDescription"),
            title: t("shortResultsTitle"),
            imageUrl: shortResultsImage
          })}
        </Flex>
      </Flex>
    </Fragment>}
  />;
}
