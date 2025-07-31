/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Displays services quality.
 * @supported DESKTOP, MOBILE
 * @file services_quality.tsx
 * @created 2025-07-24
 * @updated 2025-07-31
 * @version 0.0.3
 */

// React dependencies.
import {FaGraduationCap, FaRegComments} from "react-icons/fa6";
import {FaRegThumbsUp, FaRegGem} from "react-icons/fa";
import {Fragment} from "react";

// Chakra dependencies.
import {ButtonProps, Stack, Text, Flex} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import {SF_SEMI_BOLD, SF_BOLD} from "@/common/constants/variables.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import CustomButton from "./button.tsx";
import InfoCard from "./info_card.tsx";
import Section from "./section.tsx";

// Displays company services quality.
export default function ServicesQuality () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Builds tsx code.
  return <Section
    containerStyle = {{
      gap: {base: 6, sm: 7, md: 8, lg: 9, xl: 10, "2xl": 12},
      alignItems: "flex-start",
      direction: {
        base: "column", sm: "column", md: "column",
        lg: "column", xl: "column", "2xl": "row"
      }
    }}
    children = {<Fragment>
      {/** Left part */}
      <Stack
        gap = {{base: 4, sm: 5, md: 6}}
        transition = "all .2s"
        minWidth = "32%"
      >
        {/** Big title */}
        <Text
          lineHeight = {{base: "26px", sm: "32px", md: "38px", lg: "48px"}}
          fontSize = {{base: 18, sm: 22, md: 26, lg: 30, xl: 34}}
          fontFamily = {SF_BOLD}
          transition = "all .2s"
          as = "h2"
        >{t("servicesQualityTitle")}</Text>
        {/** Description */}
        <Text
          fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
          transition = "all .2s"
          color = "neutral.8"
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
            width: "264px",
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
      <Stack gap = {{base: 4, sm: 5, md: 6}} transition = "all .2s">
        {/** Dual boxes */}
        <Flex
          gap = {{base: 4, sm: 5, md: 6}}
          transition = "all .2s"
          direction = {{
            base: "column", sm: "column", md: "column",
            lg: "column", xl: "row"
          }}
        >
          {/** Expertise */}
          <InfoCard
            description = {t("expertiseDescription")}
            title = {t("expertise")}
            icon = {FaGraduationCap}
          />
          {/** Listen */}
          <InfoCard
            description = {t("listenDescription")}
            icon = {FaRegComments}
            title = {t("listen")}
          />
        </Flex>
        {/** Dual boxes */}
        <Flex
          gap = {{base: 4, sm: 5, md: 6}}
          transition = "all .2s"
          direction = {{
            base: "column", sm: "column", md: "column",
            lg: "column", xl: "row"
          }}
        >
          {/** Trust */}
          <InfoCard
            description = {t("trustDescription")}
            icon = {FaRegThumbsUp}
            title = {t("trust")}
          />
          {/** Quality */}
          <InfoCard
            description = {t("qualityDescription")}
            title = {t("quality")}
            icon = {FaRegGem}
          />
        </Flex>
      </Stack>
    </Fragment>}
  />;
}
