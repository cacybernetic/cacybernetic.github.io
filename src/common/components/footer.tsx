/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays global website footer UI.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-30
 * @updated 2025-07-30
 * @file footer.tsx
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement, useCallback, Fragment} from "react";
import {MdOutlineFacebook} from "react-icons/md";
import {IoLogoWhatsapp} from "react-icons/io";
import {RiYoutubeFill} from "react-icons/ri";
import {DiGithubBadge} from "react-icons/di";
import {IconType} from "react-icons/lib";

// Chakra dependencies.
import {Text, Flex, Icon} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import ImageRenderer from "./image_renderer.tsx";
import appLogo from "/assets/logos/app.webp";
import Section from "./section.tsx";
import {
  POPPINS_SEMI_BOLD,
  SF_SEMI_BOLD
} from "@/common/constants/variables.ts";

// Displays global website footer.
export default function Footer () {
  // Attributes.
  const newYear: number = new Date(Date.now()).getFullYear();
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Builds simple social network link icon.
  const buildSimpleSocialNetwork = useCallback((
    icon: IconType, click?: () => void
  ): ReactElement => <Flex
    _hover = {{backgroundColor: "primary.500", color: "neutral.1"}}
    borderColor = "primary.500"
    justifyContent = "center"
    transition = "all .2s"
    borderRadius = "96px"
    alignItems = "center"
    color = "primary.500"
    cursor = "pointer"
    borderWidth = {1}
    onClick = {click}
    height = {{
      base: "2rem", sm: "2rem", md: "2.5rem", lg: "2.5rem", xl: "3rem"
    }}
    width = {{
      base: "2rem", sm: "2rem", md: "2.5rem", lg: "2.5rem", xl: "3rem"
    }}
  >
    {/** Vector */}
    <Icon
      height = {{base: 4, sm: 5, md: 6, lg: 7}}
      width = {{base: 4, sm: 5, md: 6, lg: 7}}
      transition = "all .2s"
      as = {icon}
    />
  </Flex>, []);

  // Builds tsx code.
  return <Section
    containerStyle = {{paddingBlock: "none"}}
    children = {<Fragment>
      {/** Top section */}
      <Flex
        paddingBlock = {{base: 8, sm: 12, md: 16, lg: 20, xl: 24}}
        direction = {{base: "column", sm: "row"}}
        justifyContent = "space-between"
        gap = {{base: 4, sm: 5, md: 6}}
        transition = "all .2s"
        width = "full"
      >
        {/** Left part */}
        <Flex
          alignItems = {{sm: "flex-start", base: "center"}}
          rowGap = {{base: 3, sm: 4, md: 5}}
          transition = "all .2s"
          direction = "column"
        >
          {/** About us */}
          <Text
            fontSize = {{base: 16, sm: 18, md: 20, lg: 22}}
            fontFamily = {SF_SEMI_BOLD}
            transition = "all .2s"
            color = "neutral.10"
            as = "h3"
          >{t("about")}</Text>
          {/** Contact us */}
          <Text
            fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
            marginTop = {{base: 2, sm: 3, md: 4}}
            transition = "all .2s"
            cursor = "pointer"
            _hover = {{
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              color: "primary.500"
            }}
          >{t("contact")}</Text>
          {/** Legal notice */}
          <Text
            fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
            transition = "all .2s"
            cursor = "pointer"
            _hover = {{
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              color: "primary.500"
            }}
          >{t("legalNotices")}</Text>
        </Flex>
        {/** Right part */}
        <Flex
          alignItems = {{sm: "flex-start", base: "center"}}
          rowGap = {{base: 3, sm: 4, md: 5}}
          transition = "all .2s"
          direction = "column"
        >
          {/** Company logo */}
          <Flex
            onClick = {(): void => window.location.reload()}
            columnGap = {{base: 2, sm: 2, md: 3}}
            transition = "all .2s"
            alignItems = "center"
            cursor = "pointer"
          >
            {/** Logo */}
            <ImageRenderer
              url = {appLogo}
              skeletonStyle = {{
                width: {
                  lg: "36px", xl: "38px", "2xl": "auto",
                  base: "24px", sm: "28px", md: "32px"
                }
              }}
            />
            {/** Name */}
            <Text
              fontFamily = {POPPINS_SEMI_BOLD}
              transition = "all .2s"
              whiteSpace = "nowrap"
              color = "neutral.10"
              lineHeight = {0}
              fontSize = {{
                base: 18, sm: 20, md: 22, lg: 24, xl: 28, "2xl": 32
              }}
            >{t("companyName")}</Text>
          </Flex>
          {/** Description */}
          <Text
            fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
            transition = "all .2s"
            textAlign = "center"
          >{t("digitalExpert")}</Text>
          {/** Social network */}
          <Flex columnGap = {2}>
            {/** GitHub */}
            {buildSimpleSocialNetwork(DiGithubBadge)}
            {/** Whatsapp */}
            {buildSimpleSocialNetwork(IoLogoWhatsapp)}
            {/** YouTube */}
            {buildSimpleSocialNetwork(RiYoutubeFill)}
            {/** Facebook */}
            {buildSimpleSocialNetwork(MdOutlineFacebook)}
          </Flex>
        </Flex>
      </Flex>
      {/** Copyright */}
      <Flex
        padding = {{base: 2, sm: 3, md: 4}}
        borderTopColor = "neutral.6"
        justifyContent = "center"
        alignItems = "center"
        borderTopWidth = {1}
        width = "full"
      >
        {/** Signature */}
        <Text
          fontSize = {{base: 12, sm: 13, md: 14}}
          transition = "all .2s"
          textAlign = "center"
        >
          {
            t("copyright")?.replace(
              "{old}", (newYear - 1).toString()
            ).replace("{new}", newYear.toString())
          }
        </Text>
      </Flex>
    </Fragment>}
  />;
}
