/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Legal notices about company official website.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file legal_notices.tsx
 * @created 2025-08-08
 * @updated 2025-08-08
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement, useCallback} from "react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Chakra dependencies.
import {FlexProps, Text, Flex, Box} from "@chakra-ui/react";

// Custom dependencies.
import {SF_SEMI_BOLD} from "@/common/constants/variables.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import Section from "@/common/components/section.tsx";
import Footer from "@/common/components/footer.tsx";

// Global attributes.
const legalSectionCommonStyle: FlexProps = {
  transition: "all .2s",
  direction: "column",
  rowGap: {
    base: ".4rem", sm: ".5rem", md: ".6rem", lg: ".7rem", xl: ".8rem"
  }
};

// Legal notices about company official website.
export default function LegalNotices () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Builds legal notice section.
  const buildLegalNotice = useCallback((
    title: string, details: string, index: number
  ): ReactElement => <Flex
    {...legalSectionCommonStyle}
    marginTop = {index <= 0 ? 0 : 4}
  >
    {/** Title */}
    <Text
      fontSize = {{base: 16, sm: 18, md: 20, lg: 22, xl: 24}}
      fontFamily = {SF_SEMI_BOLD}
      transition = "all .2s"
      as = "h3"
    >{title}</Text>
    {/** Details */}
    <Text
      fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
      dangerouslySetInnerHTML = {{__html: details}}
      transition = "all .2s"
      color = "neutral.8"
    />
  </Flex>, []);

  // Builds tsx code.
  return <Box
    paddingTop = {{base: 12, sm: 12, md: 13}}
    transition = "all .2s"
    width = "full"
  >
    {/** Legal website notices */}
    <Section
      containerStyle = {{marginBottom: {base: 16, sm: 24}}}
      title = {t("legalNotices")}
      children = {<Flex {...legalSectionCommonStyle}>
        {/** Website editor */}
        {buildLegalNotice(
          t("websiteEditorTitle"), t("websiteEditorDetails"), 0
        )}
        {/** Personal data */}
        {buildLegalNotice(
          t("personalDataTitle"), t("personalDataDetails"), 1
        )}
        {/** Host information */}
        {buildLegalNotice(t("hostInfoTitle"), t("hostInfoDetails"), 2)}
      </Flex>}
    />
    {/** Footer */}
    <Box backgroundColor = "primary.50" width = "full"><Footer/></Box>
  </Box>;
}
