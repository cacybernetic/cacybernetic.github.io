/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Displays company main values.
 * @supported DESKTOP, MOBILE
 * @file our_values.tsx
 * @created 2025-08-04
 * @updated 2025-08-14
 * @version 0.0.3
 */

// React dependencies.
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useCallback} from "react";

// Chakra dependencies.
import {Box} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import creativityImage from "/assets/images/company_creativity.webp";
import technologyImage from "/assets/images/company_technology.webp";
import excellenceImage from "/assets/images/company_excellence.webp";
import efficienceImage from "/assets/images/company_efficience.webp";
import diversityImage from "/assets/images/company_diversity.webp";
import {CONTACT_LINK} from "@/common/constants/end_points.ts";
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
    {/** Put a technologie as a lever of societal impact */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("useTechnologieInCompanyDescription")}
        buttonClick = {(): void => navigate(CONTACT_LINK)}
        title = {t("useTechnologieInCompanyTitle")}
        buttonText = {t("talkAboutYourProject")}
        imageUrl = {technologyImage}
        buttonStyle = {{
          marginBottom: {base: 1, sm: 1, md: 2, lg: 3},
          marginTop: {base: 1, sm: 1, md: 2, lg: 3}
        }}
    />}/>
    {/** Company excellence */}
    <Section
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("companyExcellenceDescription")}
        title = {t("companyExcellenceTitle")}
        imageUrl = {excellenceImage}
        {...buildLayoutStyle(true)}
      />}
    />
    {/** Company performance */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("companyEfficienceDescription")}
        title = {t("companyEfficienceTitle")}
        imageUrl = {efficienceImage}
        {...buildLayoutStyle(false)}
      />}
    />
    {/** Company creativity */}
    <Section
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("companyCreativityDescription")}
        title = {t("companyCreativityTitle")}
        imageUrl = {creativityImage}
        {...buildLayoutStyle(true)}
      />}
    />
    {/** Company diversity */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("companyDiversityDescription")}
        title = {t("companyDiversityTitle")}
        imageUrl = {diversityImage}
        {...buildLayoutStyle(false)}
      />}
    />
    {/** Footer */}
    <Footer/>
  </Box>;
}
