/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Displays services quality.
 * @supported DESKTOP, MOBILE
 * @file services_quality.tsx
 * @created 2025-07-24
 * @updated 2025-07-24
 * @version 0.0.1
 */

// React dependencies.
import {FaGraduationCap, FaRegComments} from "react-icons/fa6";
import {FaRegThumbsUp, FaRegGem} from "react-icons/fa";
import {ReactElement, useCallback} from "react";
import {IconType} from "react-icons/lib";

// Chakra dependencies.
import {ButtonProps, Stack, Text, Flex, Icon} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import CustomButton from "./button.tsx";
import {
  SF_SEMI_BOLD,
  SF_REGULAR,
  SF_BOLD
} from "@/common/constants/variables.ts";

// Component types.
type BuildBoxWorthProps = {
  description: string,
  icon: IconType,
  title: string
};

// Displays company services quality.
export default function ServicesQuality () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Builds box to display each company worth domain.
  const buildBoxWorth = useCallback((
    {description, title, icon}: BuildBoxWorthProps
  ): ReactElement => <Flex
    borderRadius = {{base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"}}
    backgroundColor = "neutral.2"
    borderColor = "neutral.5"
    transition = "all .2s"
    direction = "column"
    borderWidth = {1}
    width = "100%"
    _hover = {{
      boxShadow: "8px 8px 16px var(--chakra-colors-neutral-5)",
      backgroundImage: "var(--box-worth-hover-bg-color)"
    }}
    padding = {{
      base: "1rem", sm: "1rem", md: "1.1rem",
      lg: "1.3rem", xl: "1.5rem"
    }}
    rowGap = {{
      base: ".5rem", sm: ".5rem", md: "1rem",
      lg: "1rem", xl: "1.5rem"
    }}
  >
    {/** Header */}
    <Flex
      columnGap = {{base: 2, sm: 2, md: 3, lg: 3, xl: 4}}
      transition = "all .2s"
      alignItems = "center"
    >
      {/** Icon */}
      <Flex
        backgroundColor = "primary.100"
        justifyContent = "center"
        transition = "all .2s"
        borderRadius = "96px"
        alignItems = "center"
        color = "primary.500"
        height = {{
          base: "2rem", sm: "2rem", md: "2.5rem",
          lg: "2.5rem", xl: "3rem"
        }}
        width = {{
          base: "2rem", sm: "2rem", md: "2.5rem",
          lg: "2.5rem", xl: "3rem"
        }}
      >
        {/** Vector */}
        <Icon
          height = {{base: 4, sm: 4, md: 5, lg: 5, xl: 6}}
          width = {{base: 4, sm: 4, md: 5, lg: 5, xl: 6}}
          transition = "all .2s"
          as = {icon}
        />
      </Flex>
      {/** Title */}
      <Text
        fontSize = {{base: 16, sm: 20, md: 24, lg: 28}}
        fontFamily = {SF_BOLD}
        transition = "all .2s"
        as = "h3"
      >{title}</Text>
    </Flex>
    {/** Description */}
    <Text
      fontSize = {{base: 14, sm: 16, md: 18, lg: 20}}
      transition = "all .2s"
    >{description}</Text>
  </Flex>, []);

  // Builds tsx code.
  return <Flex
    paddingInline = {{base: 4, sm: 8, md: 32, lg: 48, xl: 60}}
    marginBottom = {{base: 8, sm: 12, md: 16, lg: 20, xl: 24}}
    gap = {{base: 6, sm: 7, md: 8, lg: 9, xl: 10, "2xl": 12}}
    marginTop = {{base: 8, sm: 12, md: 16, lg: 20, xl: 24}}
    fontFamily = {SF_REGULAR}
    transition = "all .2s"
    color = "neutral.10"
    userSelect = "none"
    width = "full"
    direction = {{
      base: "column", sm: "column", md: "column",
      lg: "column", xl: "column", "2xl": "row"
    }}
  >
    {/** Left part */}
    <Stack
      gap = {{base: 4, sm: 5, md: 6, lg: 7, xl: 8}}
      transition = "all .2s"
      minWidth = "32%"
    >
      {/** Big title */}
      <Text
        lineHeight = {{base: "26px", sm: "32px", md: "38px", lg: "48px"}}
        fontSize = {{base: 20, sm: 24, md: 28, lg: 32, xl: 40}}
        fontFamily = {SF_BOLD}
        transition = "all .2s"
        as = "h2"
      >{t("servicesQualityTitle")}</Text>
      {/** Description */}
      <Text
        fontSize = {{base: 14, sm: 16, md: 18, lg: 20}}
        transition = "all .2s"
      >{t("servicesQualityDescription")}</Text>
      {/** Company main worth */}
      <CustomButton
        text = {t("servicesQualityWorth")}
        buttonStyle = {(): ButtonProps => ({
          fontSize: {base: 13, sm: 14, md: 15, lg: 16, xl: 18},
          backgroundColor: "neutral.1",
          borderColor: "primary.500",
          fontFamily: SF_SEMI_BOLD,
          color: "primary.500",
          borderRadius: 8,
          borderWidth: 2,
          width: "256px",
          _hover: {
            textShadow: "0 0 4px var(--chakra-colors-neutral-1)",
            backgroundColor: "primary.500",
            borderColor: "transparent",
            transform: "scale(1.08)",
            color: "neutral.1"
          }
        })}
      />
    </Stack>
    {/** Right part */}
    <Flex
      gap = {{base: 4, sm: 5, md: 6, lg: 7, xl: 8}}
      transition = "all .2s"
      direction = "column"
    >
      {/** Dual boxes */}
      <Flex
        gap = {{base: 4, sm: 5, md: 6, lg: 7, xl: 8}}
        transition = "all .2s"
        direction = {{
          base: "column", sm: "column", md: "column",
          lg: "column", xl: "row"
        }}
      >
        {/** Expertise */}
        {buildBoxWorth({
          description: t("expertiseDescription"),
          title: t("expertise"),
          icon: FaGraduationCap
        })}
        {/** Listen */}
        {buildBoxWorth({
          description: t("listenDescription"),
          icon: FaRegComments,
          title: t("listen")
        })}
      </Flex>
      {/** Dual boxes */}
      <Flex
        gap = {{base: 4, sm: 5, md: 6, lg: 7, xl: 8}}
        transition = "all .2s"
        direction = {{
          base: "column", sm: "column", md: "column",
          lg: "column", xl: "row"
        }}
      >
        {/** Trust */}
        {buildBoxWorth({
          description: t("trustDescription"),
          icon: FaRegThumbsUp,
          title: t("trust")
        })}
        {/** Quality */}
        {buildBoxWorth({
          description: t("qualityDescription"),
          title: t("quality"),
          icon: FaRegGem
        })}
      </Flex>
    </Flex>
  </Flex>;
}
