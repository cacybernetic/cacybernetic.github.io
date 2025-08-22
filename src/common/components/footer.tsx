/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays global website footer UI.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-30
 * @updated 2025-08-22
 * @file footer.tsx
 * @version 0.0.4
 */

// React dependencies.
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ReactElement, useCallback, Fragment} from "react";
import {MdOutlineFacebook} from "react-icons/md";
import {IoLogoWhatsapp} from "react-icons/io";
import {RiYoutubeFill} from "react-icons/ri";
import {DiGithubBadge} from "react-icons/di";
import {IconType} from "react-icons/lib";

// Chakra dependencies.
import {Text, Flex, Icon, Link} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import ImageRenderer from "@/common/components/image_renderer.tsx";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import Section from "@/common/components/section.tsx";
import appLogo from "/assets/logos/app.svg";
import {
  POPPINS_SEMI_BOLD,
  SF_SEMI_BOLD
} from "@/common/constants/variables.ts";
import {
  LEGAL_NOTICES_LINK,
  CONTACT_LINK,
  HOME_LINK
} from "@/common/constants/end_points.ts";

// Component types.
type BuildSimpleSocialNetwork = {
  click?: () => void,
  icon: IconType,
  link: string
};

// Displays global website footer.
export default function Footer () {
  // Attributes.
  const newYear: number = new Date(Date.now()).getFullYear();
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const navigate: NavigateFunction = useNavigate();

  // Builds simple social network link icon.
  const buildSimpleSocialNetwork = useCallback((
    {click, icon, link}: BuildSimpleSocialNetwork
  ): ReactElement => <Link
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
    target = "_blank"
    outline = "none"
    href = {link}
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
  </Link>, []);

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
            onClick = {(): void => navigate(CONTACT_LINK)}
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
            onClick = {(): void => navigate(LEGAL_NOTICES_LINK)}
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
            onClick = {(): void => navigate(HOME_LINK)}
            columnGap = {{base: 2, sm: 2, md: 3}}
            transition = "all .2s"
            alignItems = "center"
            cursor = "pointer"
          >
            {/** Logo */}
            <ImageRenderer
              url = {appLogo}
              skeletonStyle = {{
                height: {base: "24px", sm: "28px", md: "32px", lg: "36px"},
                width: {base: "24px", sm: "28px", md: "32px", lg: "36px"}
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
            {buildSimpleSocialNetwork({
              link: "https://github.com/cacybernetic",
              icon: DiGithubBadge
            })}
            {/** Whatsapp */}
            {buildSimpleSocialNetwork({
              link: "https://whatsapp.com/channel/0029VbAhTgnGehEDZ1ihez2k",
              icon: IoLogoWhatsapp
            })}
            {/** YouTube */}
            {buildSimpleSocialNetwork({
              link: "https://www.youtube.com/@consoleartcybernetic680",
              icon: RiYoutubeFill
            })}
            {/** Facebook */}
            {buildSimpleSocialNetwork({
              icon: MdOutlineFacebook,
              link: (
                "https://www.facebook.com/profile.php" +
                "?id=100093144799989"
              )
            })}
          </Flex>
        </Flex>
      </Flex>
      {/** Copyright */}
      <Flex
        paddingBlock = {{base: 2, sm: 3, md: 4}}
        borderTopColor = "neutral.6"
        justifyContent = "center"
        alignItems = "center"
        borderTopWidth = {1}
        width = "full"
      >
        {/** Signature */}
        <Text
          fontSize = {{base: 11, sm: 12, md: 13, lg: 14}}
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
