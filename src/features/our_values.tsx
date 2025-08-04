/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Displays company main values.
 * @supported DESKTOP, MOBILE
 * @file our_values.tsx
 * @created 2025-08-04
 * @updated 2025-08-04
 * @version 0.0.1
 */

// React dependencies.
import {useCallback} from "react";

// Chakra dependencies.
import {Box} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import technicalImage from "/assets/images/technological_excellence.webp";
import ourHistoryImage from "/assets/images/our_history.webp";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {SF_BOLD} from "@/common/constants/variables.ts";
import Section from "@/common/components/section.tsx";
import Footer from "@/common/components/footer.tsx";
import InfoPresentation, {
  PresentationProps
} from "@/common/components/info_presentation.tsx";

// Displays company main values.
export default function OurValues () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const commonInfoPresentationStyle: PresentationProps = {
    imageContainerStyle: {
      width: {base: "100%", xl: "480px", "2xl": "100%"}
    },
    leftContainerStyle: {
      width: {base: "100%", xl: "480px", "2xl": "100%"}
    },
    titleStyle: {
      fontSize: {base: 20, sm: 22, md: 24, lg: 26, xl: 28, "2xl": 48},
      fontFamily: SF_BOLD,
      as: "h2",
      lineHeight: {
        lg: "36px", xl: "38px", "2xl": "56px",
        base: "28px", sm: "32px", md: "34px"
      }
    },
    containerStyle: {
      gap: {base: 4, sm: 4, md: 5, lg: 6, xl: 8, "2xl": 24},
      borderColor: "transparent",
      justifyContent: "center",
      _hover: undefined,
      borderRadius: 0,
      borderWidth: 0,
      padding: 0
    }
  };

  // Builds stylesheet for associated orientation.
  const buildLayoutStyle = useCallback((
    invert: boolean
  ): PresentationProps => ({
    drawLines: true,
    invert,
    descriptionStyle: {
      ...commonInfoPresentationStyle.descriptionStyle,
      textAlign: (invert ? "left" : "right")
    },
    titleStyle: {
      ...commonInfoPresentationStyle.titleStyle,
      textAlign: (invert ? "left" : "right")
    },
    leftContainerStyle: {
      ...commonInfoPresentationStyle.leftContainerStyle,
      paddingBlock: {base: 8, sm: 12, md: 16, lg: 20, xl: 24},
      paddingRight: (
        invert ? {base: 4, sm: 8, md: 32, lg: 48, xl: 60} : undefined
      ),
      paddingLeft: (
        invert ? undefined : {base: 4, sm: 8, md: 32, lg: 48, xl: 60}
      )
    },
    imageSkeletonStyle: {
      marginBlock: {base: 8, sm: 12, md: 16, lg: 20, xl: 24},
      marginRight: (
        invert ? undefined : {base: 4, sm: 8, md: 32, lg: 48, xl: 60}
      ),
      marginLeft: (
        invert ? {base: 4, sm: 8, md: 32, lg: 48, xl: 60} : undefined
      )
    }
  // Dependencies.
  }), [
    commonInfoPresentationStyle.leftContainerStyle,
    commonInfoPresentationStyle.descriptionStyle,
    commonInfoPresentationStyle.titleStyle
  ]);

  // Builds tsx code.
  return <Box
    paddingTop = {{base: 12, sm: 12, md: 14}}
    transition = "all .2s"
    width = "full"
  >
    {/** Put a technologie as a lever of societal impact */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        buttonStyle = {{marginTop: {base: 1, sm: 1, md: 2, lg: 3}}}
        description = {t("useTechnologieInCompanyDescription")}
        title = {t("useTechnologieInCompanyTitle")}
        buttonText = {t("talkAboutYourProject")}
        imageUrl = {technicalImage}
    />}/>
    {/** Company excellence */}
    <Section
      containerStyle = {{paddingInline: 0, paddingBlock: 0}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("companyExcellenceDescription")}
        title = {t("companyExcellenceTitle")}
        imageUrl = {technicalImage}
        {...buildLayoutStyle(true)}
      />}
    />
    {/** Company performance */}
    <Section
      containerStyle = {{
        backgroundColor: "primary.50",
        paddingInline: 0,
        paddingBlock: 0
      }}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("companyEfficienceDescription")}
        title = {t("comapanyEfficienceTitle")}
        imageUrl = {ourHistoryImage}
        {...buildLayoutStyle(false)}
      />}
    />
    {/** Footer */}
    <Box backgroundColor = "primary.50" width = "full"><Footer/></Box>
  </Box>;
}
