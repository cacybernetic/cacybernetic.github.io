/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Software development service.
 * @supported DESKTOP, MOBILE
 * @file sd_services.tsx
 * @created 2025-08-05
 * @updated 2025-08-18
 * @version 0.0.5
 */

// React dependencies.
import {NavigateFunction, useNavigate} from "react-router-dom";

// Chakra dependencies.
import {Box} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import {PRODUCTS_SOFTWARE_DEV_LINK} from "@/common/constants/end_points.ts";
import digitalTransitionImage from "/assets/images/digital_transition.webp";
import architectureImage from "/assets/images/design_architecture.webp";
import programmingImage from "/assets/images/project_programming.webp";
import teamTrainingImage from "/assets/images/team_training.webp";
import reviewAuditImage from "/assets/images/review_audit.webp";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {SF_BOLD} from "@/common/constants/variables.ts";
import Section from "@/common/components/section.tsx";
import Footer from "@/common/components/footer.tsx";
import InfoPresentation, {
  PresentationProps
} from "@/common/components/info_presentation.tsx";

// Displays company software development service.
export default function SoftwareDevelopmentService () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const navigate: NavigateFunction = useNavigate();
  const commonInfoPresentationStyle: PresentationProps = {
    imageSkeletonStyle: {
      height: {base: "256px", sm: "320px", md: "380px", lg: "420px"},
      width: "100%"
    },
    titleStyle: {
      fontSize: {base: 22, sm: 24, md: 28, lg: 32, xl: 38, "2xl": 48},
      fontFamily: SF_BOLD,
      as: "h2",
      lineHeight: {
        lg: "42px", xl: "48px", "2xl": "56px",
        base: "28px", sm: "32px", md: "34px"
      }
    },
    containerStyle: {
      gap: {base: 4, sm: 4, md: 5, lg: 6, xl: 8, "2xl": 24},
      borderColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      _hover: undefined,
      borderRadius: 0,
      borderWidth: 0,
      width: "100%",
      padding: 0
    }
  };

  // Builds tsx code.
  return <Box
    paddingTop = {{base: 12, sm: 12, md: 14}}
    transition = "all .2s"
    width = "full"
  >
    {/** Digital transition supports */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        buttonClick = {(): void => navigate(PRODUCTS_SOFTWARE_DEV_LINK)}
        description = {t("softDevSupportDescription")}
        buttonText = {t("discoverProjects")}
        imageUrl = {digitalTransitionImage}
        title = {t("softDevSupportTitle")}
        buttonStyle = {{
          marginBottom: {base: 1, sm: 1, md: 2, lg: 3},
          marginTop: {base: 1, sm: 1, md: 2, lg: 3}
        }}
    />}/>
    {/** Design and architecture of project */}
    <Section children = {<InfoPresentation
      {...commonInfoPresentationStyle}
      description = {t("softDevDesignDescription")}
      title = {t("softDevDesignTitle")}
      imageUrl = {architectureImage}
      invert
    />}/>
    {/** Software development */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("softDevDescription")}
        imageUrl = {programmingImage}
        title = {t("softDevTitle")}
      />}
    />
    {/** Team training */}
    <Section children = {<InfoPresentation
      {...commonInfoPresentationStyle}
      description = {t("softDevTrainingDescription")}
      title = {t("softDevTrainingTitle")}
      imageUrl = {teamTrainingImage}
      invert
    />}/>
    {/** Audit and review */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("softDevReviewDescription")}
        title = {t("softDevReviewTitle")}
        imageUrl = {reviewAuditImage}
      />}
    />
    {/** Footer */}
    <Footer/>
  </Box>;
}
