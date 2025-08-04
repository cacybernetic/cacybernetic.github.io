/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Displays company history.
 * @supported DESKTOP, MOBILE
 * @created 2025-08-01
 * @updated 2025-08-01
 * @file our_story.tsx
 * @version 0.0.1
 */

// Chakra dependencies.
import {Flex, Box} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import technicalImage from "/assets/images/technological_excellence.webp";
import ourHistoryImage from "/assets/images/our_history.webp";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import InfoCard from "@/common/components/info_card.tsx";
import {SF_BOLD} from "@/common/constants/variables.ts";
import Section from "@/common/components/section.tsx";
import Footer from "@/common/components/footer.tsx";
import InfoPresentation, {
  PresentationProps
} from "@/common/components/info_presentation.tsx";

// Displays company history.
export default function OurHistory () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const commonInfoPresentationStyle: PresentationProps = {
    description: '',
    imageUrl: '',
    title: '',
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
      alignItems: "center",
      _hover: undefined,
      borderRadius: 0,
      borderWidth: 0,
      padding: 0
    }
  };

  // Builds tsx code.
  return <Box
    paddingTop = {{base: 12, sm: 12, md: 14}}
    transition = "all .2s"
    width = "full"
  >
    {/** Who are us? */}
    <Section children = {<InfoPresentation
      {...commonInfoPresentationStyle}
      description = {t("whoAreUsDescription")}
      title = {t("whoAreUsTitle")}
      imageUrl = {technicalImage}
    />}/>
    {/** More info about us */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      description = {t("moreInfoAboutUsDescription")}
      descriptionStyle = {{
        fontSize: {base: 14, sm: 16, md: 18, lg: 20, xl: 22},
        textAlign: "center"
      }}
      children = {<Flex
        direction = {{base: "column", sm: "column", md: "column", lg: "row"}}
        marginTop = {{base: 4, sm: 5, md: 6, lg: 8, xl: 10}}
        gap = {{base: 4, sm: 5, md: 6}}
        transition = "all .2s"
        width = "100%"
      >
        {/** What is company ? */}
        <InfoCard
          titleStyle = {{fontSize: {base: 20, sm: 24, md: 28, lg: 32}}}
          description = {t("whatIsCompanyDescription")}
          title = {t("whatIsCompanyTitle")}
          containerStyle = {{rowGap: 2}}
        />
        {/** About company description */}
        <InfoCard
          titleStyle = {{fontSize: {base: 20, sm: 24, md: 28, lg: 32}}}
          description = {t("ourHeartOfOurFacultyDescription")}
          title = {t("ourHeartOfOurFacultyTitle")}
          containerStyle = {{rowGap: 2}}
        />
      </Flex>}
    />
    {/** Our story */}
    <Section children = {<InfoPresentation
      {...commonInfoPresentationStyle}
      description = {t("ourHistoryDescription")}
      title = {t("ourHistoryTitle")}
      imageUrl = {ourHistoryImage}
      invert
    />}/>
    {/** Footer */}
    <Box backgroundColor = "primary.50" width = "full"><Footer/></Box>
  </Box>;
}
