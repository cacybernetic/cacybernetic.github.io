/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays projects building steps.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file build_steps.tsx
 * @created 2025-07-25
 * @updated 2025-08-12
 * @version 0.0.4
 */

// Chakra dependencies.
import {FlexProps, Flex} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import solidExpertiseImage from "/assets/images/solid_expertise.webp";
import trustRelationImage from "/assets/images/trust_relation.webp";
import shortResultsImage from "/assets/images/short_results.webp";
import ProjectCard from "@/common/components/project_card.tsx";
import listenNeedImage from "/assets/images/listen_need.webp";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import Section from "@/common/components/section.tsx";

// Displays company projects building steps.
export default function ProjectsBuildingSteps () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const commonDualBoxesStyle: FlexProps = {
    direction: {base: "column", sm: "column", md: "column", lg: "row"},
    gap: {base: 4, sm: 5, md: 6},
    transition: "all .2s",
    width: "100%"
  };

  // Builds tsx code.
  return <Section
    description = {t("projectsBuildingStepsDescription")}
    containerStyle = {{backgroundColor: "primary.50"}}
    title = {t("projectsBuildingStepsTitle")}
    titleStyle = {{
      width: {base: "auto", sm: "auto", md: "auto", lg: "620px"}
    }}
    descriptionStyle = {{
      width: {base: "auto", sm: "auto", md: "auto", lg: "620px"},
      textAlign: "center",
      color: "neutral.8"
    }}
    children = {<Flex
      gap = {{base: 4, sm: 5, md: 6}}
      transition = "all .2s"
      marginTop = {4}
      direction = {{
        base: "column", sm: "column", md: "column",
        lg: "column", xl: "column", "2xl": "row"
      }}
    >
      {/** Dual boxes */}
      <Flex {...commonDualBoxesStyle}>
        {/** Solid expertise */}
        <ProjectCard
          description = {t("solidExpertiseDescription")}
          title = {t("solidExpertiseTitle")}
          imageUrl = {solidExpertiseImage}
        />
        {/** Listen your needs */}
        <ProjectCard
          description = {t("listenNeedDescription")}
          title = {t("listenNeedTitle")}
          imageUrl = {listenNeedImage}
        />
      </Flex>
      {/** Dual boxes */}
      <Flex {...commonDualBoxesStyle}>
        {/** Trust relation */}
        <ProjectCard
          description = {t("trustRelationDescription")}
          title = {t("trustRelationTitle")}
          imageUrl = {trustRelationImage}
        />
        {/** Short exploitable results */}
        <ProjectCard
          description = {t("shortResultsDescription")}
          title = {t("shortResultsTitle")}
          imageUrl = {shortResultsImage}
        />
      </Flex>
    </Flex>}
  />;
}
