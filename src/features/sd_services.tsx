/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Software development service.
 * @supported DESKTOP, MOBILE
 * @file sd_services.tsx
 * @created 2025-08-05
 * @updated 2025-08-06
 * @version 0.0.2
 */

// React dependencies.
import {useCallback} from "react";

// Chakra dependencies.
import {Box} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import technicalImage from "/assets/images/technological_excellence.webp";
import technologyImage from "/assets/images/company_technology.webp";
import excellenceImage from "/assets/images/company_excellence.webp";
import efficienceImage from "/assets/images/company_efficience.webp";
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
  const commonInfoPresentationStyle: PresentationProps = {
    leftContainerStyle: {width: "100%"},
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

  // Builds stylesheet for associated orientation.
  const buildLayoutStyle = useCallback((
    invert: boolean
  ): PresentationProps => ({
    invert,
    descriptionStyle: {
      ...commonInfoPresentationStyle.descriptionStyle,
      textAlign: (invert ? "left" : {base: "left", xl: "right"})
    },
    titleStyle: {
      ...commonInfoPresentationStyle.titleStyle,
      textAlign: (invert ? "left" : {base: "left", xl: "right"})
    }
  // Dependencies.
  }), [
    commonInfoPresentationStyle.descriptionStyle,
    commonInfoPresentationStyle.titleStyle
  ]);

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
        description = {t("softDevSupportDescription")}
        title = {t("softDevSupportTitle")}
        buttonText = {t("contactUs")}
        imageUrl = {technologyImage}
        buttonStyle = {{
          marginBottom: {base: 1, sm: 1, md: 2, lg: 3},
          marginTop: {base: 1, sm: 1, md: 2, lg: 3}
        }}
    />}/>
    {/** Desgin and architecture of project */}
    <Section children = {<InfoPresentation
      {...commonInfoPresentationStyle}
      description = {t("softDevDesignDescription")}
      title = {t("softDevDesignTitle")}
      imageUrl = {excellenceImage}
      {...buildLayoutStyle(true)}
    />}/>
    {/** Software development */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("softDevDescription")}
        imageUrl = {efficienceImage}
        title = {t("softDevTitle")}
        {...buildLayoutStyle(false)}
      />}
    />
    {/** Team training */}
    <Section children = {<InfoPresentation
      {...commonInfoPresentationStyle}
      description = {t("softDevTrainingDescription")}
      title = {t("softDevTrainingTitle")}
      imageUrl = {technicalImage}
      {...buildLayoutStyle(true)}
    />}/>
    {/** Audit and review */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("softDevReviewDescription")}
        title = {t("softDevReviewTitle")}
        imageUrl = {technicalImage}
        {...buildLayoutStyle(false)}
      />}
    />
    {/** Footer */}
    <Footer/>
  </Box>;
}
