/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays projects building steps.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file build_steps.tsx
 * @created 2025-07-25
 * @updated 2025-08-22
 * @version 0.0.5
 */

// Chakra dependencies.
import {FlexProps, Flex} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import solidExpertiseImage from "/assets/images/solid_expertise.webp";
import trustRelationImage from "/assets/images/trust_relation.webp";
import shortResultsImage from "/assets/images/short_results.webp";
import listenNeedImage from "/assets/images/listen_need.webp";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import Section from "@/common/components/section.tsx";
import ProjectCard, {
  ProjectCardProps
} from "@/common/components/project_card.tsx";

// Displays company projects building steps.
export default function ProjectsBuildingSteps () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const commonProjectCardStyle: ProjectCardProps = {
    descriptionStyle: {textAlign: {base: "justify", lg: "left"}}
  };
  const commonDualBoxesStyle: FlexProps = {
    direction: {base: "column", lg: "row"},
    gap: {base: 4, sm: 5, md: 6},
    transition: "all .2s",
    width: "100%"
  };

  // Builds tsx code.
  return <Section
    description = {t("projectsBuildingStepsDescription")}
    titleStyle = {{width: {base: "auto", lg: "620px"}}}
    containerStyle = {{backgroundColor: "primary.50"}}
    title = {t("projectsBuildingStepsTitle")}
    descriptionStyle = {{
      width: {base: "auto", lg: "620px"},
      textAlign: "center",
      color: "neutral.8"
    }}
    children = {<Flex
      direction = {{base: "column", "2xl": "row"}}
      gap = {{base: 4, sm: 5, md: 6}}
      transition = "all .2s"
      marginTop = {4}
    >
      {/** Dual boxes */}
      <Flex {...commonDualBoxesStyle}>
        {/** Solid expertise */}
        <ProjectCard
          {...commonProjectCardStyle}
          description = {t("solidExpertiseDescription")}
          title = {t("solidExpertiseTitle")}
          imageUrl = {solidExpertiseImage}
        />
        {/** Listen your needs */}
        <ProjectCard
          {...commonProjectCardStyle}
          description = {t("listenNeedDescription")}
          title = {t("listenNeedTitle")}
          imageUrl = {listenNeedImage}
        />
      </Flex>
      {/** Dual boxes */}
      <Flex {...commonDualBoxesStyle}>
        {/** Trust relation */}
        <ProjectCard
          {...commonProjectCardStyle}
          description = {t("trustRelationDescription")}
          title = {t("trustRelationTitle")}
          imageUrl = {trustRelationImage}
        />
        {/** Short exploitable results */}
        <ProjectCard
          {...commonProjectCardStyle}
          description = {t("shortResultsDescription")}
          title = {t("shortResultsTitle")}
          imageUrl = {shortResultsImage}
        />
      </Flex>
    </Flex>}
  />;
}
