/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Interactive media service.
 * @supported DESKTOP, MOBILE
 * @file im_services.tsx
 * @created 2025-08-13
 * @updated 2025-08-19
 * @version 0.0.4
 */

// React dependencies.
import {NavigateFunction, useNavigate} from "react-router-dom";

// Chakra dependencies.
import {Box} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import gameTechnologyImage from "/assets/images/game_technology.webp";
import gamePassionImage from "/assets/images/game_technology.webp";
import playerFirstImage from "/assets/images/player_first.webp";
import visualStyleImage from "/assets/images/visual_style.webp";
import gameWorldsImage from "/assets/images/game_worlds.webp";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {SF_BOLD} from "@/common/constants/variables.ts";
import Section from "@/common/components/section.tsx";
import Footer from "@/common/components/footer.tsx";
import InfoPresentation, {
  PresentationProps
} from "@/common/components/info_presentation.tsx";
import {
  PRODUCTS_INTERACTIVE_MEDIA_LINK
} from "@/common/constants/end_points.ts";

// Displays company interactive media service.
export default function InteractiveMediaService () {
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
    {/** Worlds that leave a lasting impression */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        buttonClick = {(): void => navigate(PRODUCTS_INTERACTIVE_MEDIA_LINK)}
        description = {t("gameWorldsDescription")}
        buttonText = {t("discoverProjects")}
        title = {t("gameWorldsTitle")}
        imageUrl = {gameWorldsImage}
        buttonStyle = {{
          marginBottom: {base: 1, sm: 1, md: 2, lg: 3},
          marginTop: {base: 1, sm: 1, md: 2, lg: 3}
        }}
    />}/>
    {/** Cutting-edge technology, pure sensations */}
    <Section children = {<InfoPresentation
      {...commonInfoPresentationStyle}
      description = {t("gameTechDescription")}
      imageUrl = {gameTechnologyImage}
      title = {t("gameTechTitle")}
      invert
    />}/>
    {/** A visual style that stands out */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("gameVisualStyleDescription")}
        title = {t("gameVisualStyleTitle")}
        imageUrl = {visualStyleImage}
      />}
    />
    {/** Player first before all */}
    <Section children = {<InfoPresentation
      {...commonInfoPresentationStyle}
      description = {t("gamePlayerFirstDescription")}
      title = {t("gamePlayerFirstTitle")}
      imageUrl = {playerFirstImage}
      invert
    />}/>
    {/** Passion as a driving force */}
    <Section
      containerStyle = {{backgroundColor: "primary.50"}}
      children = {<InfoPresentation
        {...commonInfoPresentationStyle}
        description = {t("gamePassionDescription")}
        title = {t("gamePassionTitle")}
        imageUrl = {gamePassionImage}
      />}
    />
    {/** Footer */}
    <Footer/>
  </Box>;
}
