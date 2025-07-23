/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview The banner component to display top goals.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-23
 * @updated 2025-07-23
 * @file banner.tsx
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement, useCallback} from "react";

// Chakra dependencies.
import {SkeletonProps, ButtonProps, Text, Flex} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import rightDownArrow from "/assets/icons/right_down_arrow.svg";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {correctString} from "@/common/libraries/std.ts";
import ubisoftLogo from "/assets/images/ubisoft.webp";
import openAILogo from "/assets/images/open_ai.webp";
import huaweiLogo from "/assets/images/huawei.webp";
import amazonLogo from "/assets/images/amazon.webp";
import ImageRenderer from "./image_renderer.tsx";
import CustomButton from "./button.tsx";
import {
  SF_REGULAR,
  SF_MEDIUM,
  SF_BOLD
} from "@/common/constants/variables.ts";

// Component types.
type BuildPartnerLogoProps = {
  icon?: (ReactElement | null)
  label?: (string | null)
};

// Displays top company industry.
export default function Banner () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const commonCompanyLogoStyle: SkeletonProps = {
    boxShadow: "1px 3px 4px var(--chakra-colors-neutral-6)",
    borderColor: "neutral.4",
    borderRadius: 12,
    borderWidth: 1,
    height: "64px",
    width: "64px",
    padding: 2
  };

  // Builds company partner logo UI element.
  const buildPartnerLogo = useCallback((
    {label, icon}: BuildPartnerLogoProps
  ): ReactElement => {
    // Corrects given label.
    label = correctString<string>({input: label});
    // Sends category structure.
    return <Flex
      backgroundColor = "neutral.1"
      justifyContent = "center"
      borderColor = "neutral.5"
      transition = "all .3s"
      alignItems = "center"
      direction = "column"
      borderRadius = {12}
      minWidth = "128px"
      borderWidth = {1}
      paddingTop = {1}
      height = "128px"
      rowGap = {4}
      _hover = {{
        boxShadow: "0 0 24px 0 var(--chakra-colors-neutral-5)",
        transform: "scale(1.08)",
        color: "primary.500"
      }}
    >
      {/** Icon */}
      {icon != null && icon}
      {/** Title */}
      {label.length > 0 && <Text
        fontSize = {{base: 14, sm: 15, lg: 16}}
        transition = "all .2s"
        fontWeight = "bold"
      >{label}</Text>}
    </Flex>;
  }, []);

  // Builds tsx code.
  return <Flex
    paddingBottom = {{base: 24, sm: 28, md: 32, lg: 36, xl: 48}}
    paddingInline = {{base: 4, sm: 8, md: 32, lg: 48, xl: 60}}
    backgroundImage = "var(--banner-background-color)"
    paddingTop = {{base: 20, sm: 24, md: 28, lg: 32}}
    fontFamily = {SF_REGULAR}
    transition = "all .2s"
    alignItems = "center"
    direction = "column"
    color = "neutral.10"
    userSelect = "none"
    width = "full"
  >
    {/** Big title */}
    <Text
      lineHeight = {{base: "32px", sm: "42px", md: "56px", lg: "72px"}}
      fontSize = {{base: 24, sm: 32, md: 48, lg: 64}}
      fontFamily = {SF_BOLD}
      transition = "all .2s"
      textAlign = "center"
    >{t("aiSolutionExpert")}</Text>
    {/** Description */}
    <Text
      fontSize = {{base: 14, sm: 16, md: 18, lg: 20, xl: 22}}
      marginTop = {{base: 2, sm: 2, md: 2, lg: 3, xl: 4}}
      transition = "all .2s"
      textAlign = "center"
    >{t("bannerDescription")}</Text>
    {/** Contact us button */}
    <CustomButton
      onMouseDown = {(): ButtonProps => ({boxShadow: "none"})}
      text = {t("getInTouch")}
      buttonStyle = {(): ButtonProps => ({
        boxShadow: "1px 4px 6px var(--chakra-colors-neutral-7)",
        fontSize: {base: 13, sm: 14, md: 15, lg: 16, xl: 18},
        marginTop: {base: 4, sm: 4, md: 5, lg: 6, xl: 7},
        fontFamily: SF_MEDIUM,
        borderRadius: 8,
        backgroundImage: `linear-gradient(
          var(--chakra-colors-primary-400),
          var(--chakra-colors-primary-500)
        )`,
        _hover: {
          textShadow: "0 0 4px var(--chakra-colors-neutral-1)",
          backgroundColor: "primary.500",
          transform: "scale(1.08)",
          backgroundImage: "none"
        }
      })}
    />
    {/** Trusted partners */}
    <Flex
      marginTop = {{base: 6, sm: 8, md: 10, lg: 12, xl: 14}}
      transition = "all .2s"
    >
      {/** Left down arrow */}
      <ImageRenderer
        containerStyle = {{transform: "translateY(8px)"}}
        url = {rightDownArrow}
      />
      {/** Ours parners */}
      <Text
        fontSize = {{base: 14, sm: 15, md: 16}}
        marginRight = {{base: 1, sm: 2}}
        marginLeft = {{base: 1, sm: 2}}
        textTransform = "uppercase"
        transition = "all .2s"
        whiteSpace = "nowrap"
        textAlign = "center"
        fontWeight = "bold"
      >{t("oursTrustedPartners")}</Text>
      {/** Right down arrow */}
      <ImageRenderer
        containerStyle = {{transform: "translateY(8px) scale(-1, 1)"}}
        url = {rightDownArrow}
      />
    </Flex>
    {/** Partners */}
    <Flex
      marginTop = {{base: 6, sm: 8, md: 10, lg: 12}}
      justifyContent = "center"
      transition = "all .2s"
      alignItems = "center"
      wrap = "wrap"
      gap = {6}
    >
      {/** Amazon */}
      {buildPartnerLogo({
        label: "Amazon",
        icon: <ImageRenderer
          containerStyle = {commonCompanyLogoStyle}
          url = {amazonLogo}
        />
      })}
      {/** Ubisoft */}
      {buildPartnerLogo({
        label: "Ubisoft",
        icon: <ImageRenderer
          url = {ubisoftLogo}
          containerStyle = {{
            ...commonCompanyLogoStyle,
            backgroundColor: "neutral.12",
            borderWidth: 0
          }}
        />
      })}
      {/** Huawei */}
      {buildPartnerLogo({
        label: "Huawei",
        icon: <ImageRenderer
          containerStyle = {commonCompanyLogoStyle}
          url = {huaweiLogo}
        />
      })}
      {/** OpenAI */}
      {buildPartnerLogo({
        label: "OpenAI",
        icon: <ImageRenderer
          url = {openAILogo}
          containerStyle = {{
            ...commonCompanyLogoStyle,
            backgroundColor: "#0FA47F",
            borderWidth: 0
          }}
        />
      })}
    </Flex>
  </Flex>;
}
