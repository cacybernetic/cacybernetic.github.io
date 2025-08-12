/**
 * @fileoverview Displays company accomplishments in software development.
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file sd_products.tsx
 * @created 2025-08-12
 * @updated 2025-08-12
 * @version 0.0.1
 */

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Chakra dependencies.
import {Flex, Box} from "@chakra-ui/react";

// Custom dependencies.
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import Section from "@/common/components/section.tsx";
import Footer from "@/common/components/footer.tsx";
import ProjectCard, {
  ProjectCardProps
} from "@/common/components/project_card.tsx";

// Displays all accomplishments made in software development.
export default function SoftwareDevelopmentProducts () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const commonProjectCardStyle: ProjectCardProps = {
    skeletonStyle: {borderTopRadius: 0},
    imageStyle: {borderTopRadius: 0},
    imageErrorTextStyle: {
      height: {base: "196px", sm: "208px", md: "216px"}
    },
    containerStyle: {
      _hover: {backgroundColor: "neutral.1"},
      width: {base: "full", sm: "416px"},
      backgroundColor: "transparent",
      borderRadius: 0,
      border: "none"
    }
  };

  // Builds tsx code.
  return <Box
    paddingTop = {{base: 12, sm: 12, md: 13}}
    transition = "all .2s"
    width = "full"
  >
    {/** Developed software to solve common problems */}
    <Section
      containerStyle = {{backgroundImage: "var(--box-worth-hover-bg-color)"}}
      description = {t("itSolutionsDescription")}
      title = {t("itSolutionsTitle")}
      descriptionStyle = {{
        width: {base: "auto", sm: "auto", md: "auto", xl: "1024px"}
      }}
      children = {<Flex
        marginTop = {{base: 0, sm: 0, md: 1, lg: 2, xl: 3, "2xl": 4}}
        gap = {{base: 4, sm: 5, md: 6}}
        transition = "all .2s"
        direction = {{
          base: "column", sm: "column", md: "column",
          lg: "column", xl: "column", "2xl": "row"
        }}
      >
        {/** Open transfer */}
        <ProjectCard
          {...commonProjectCardStyle}
          githubLink = "https://github.com/cacybernetic/opentransfer"
          link = "https://cacybernetic.github.io/opentransfer"
          description = {t("openTransferDescription")}
          title = "Open Transfer"
          type = {t("mobileApp")}
          imageUrl = {
            "https://cacybernetic.github.io/opentransfer" +
            "/assets/render/render_1.png"
          }
          linkedinLink = {
            "https://www.linkedin.com/feed/update/" +
            "urn:li:share:7238227333369729024"
          }
        />
      </Flex>}
    />
    {/** Footer */}
    <Footer/>
  </Box>;
}
