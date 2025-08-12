/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview The website top visible fixed header.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-22
 * @updated 2025-08-12
 * @file header.tsx
 * @version 0.0.2
 */

// React dependencies.
import {ReactElement, useCallback, Fragment, useState, useMemo} from "react";
import {MdKeyboardArrowDown, MdOutlineApps, MdHistory} from "react-icons/md";
import {PiGameController, PiBrain} from "react-icons/pi";
import {IoCloseOutline} from "react-icons/io5";
import {RiMenu5Fill} from "react-icons/ri";
import {IconType} from "react-icons/lib";
import {RxValue} from "react-icons/rx";

// Chakra dependencies.
import {Text, Flex, Icon, Box} from "@chakra-ui/react";

// Plugin dependencies.
import {MenuButton, MenuItem, Menu} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import ReactFlagsSelect from "react-flags-select";
import {useTranslation} from "react-i18next";
import "@szhsin/react-menu/dist/index.css";
import {useSelector} from "react-redux";

// Custom dependencies.
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {RootState} from "@/common/states/store.ts";
import ImageRenderer from "./image_renderer.tsx";
import appLogo from "/assets/logos/app.webp";
import {
  ACTIVE_LANGUAGE_SAVE_KEY
} from "@/common/constants/storage_keys.ts";
import {
  POPPINS_SEMI_BOLD,
  BREAKPOINT_316,
  SF_SEMI_BOLD,
  SF_MEDIUM
} from "@/common/constants/variables.ts";

// Component types.
type BuildOptionProps = {
  subOptions?: (Array<ReactElement> | null),
  onClick?: () => void,
  text: string
};
type BuildSubOptionProps = {
  onClick?: () => void,
  icon: IconType,
  text: string
};

// The header component for common top fixed options.
export default function Header () {
  // Attributes.
  const {i18n, t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const [isMenuDisplayed, displayMenu] = useState<boolean>(false);
  const windowWidth: number = useSelector(
		(state: RootState): number => state.app.windowWidth
	);

  // Called when we want to switch to another language.
  const switchLanguage = useCallback((languageName: string): void => {
    // Corrects given language's name.
    languageName = languageName.toLowerCase();
    // Saves current selected language.
    window.localStorage.setItem(ACTIVE_LANGUAGE_SAVE_KEY, languageName);
    // Switches to chosen translation.
    i18n.changeLanguage(languageName);
  // Dependencies.
  }, [i18n]);

  // Builds a sub option under context menu.
  const buildSubOption = useCallback((
    {onClick, text, icon}: BuildSubOptionProps
  ): ReactElement => <Flex
    alignItems = "center"
    onClick = {onClick}
    paddingBlock = {3}
    paddingRight = {6}
    cursor = "pointer"
    paddingLeft = {3}
    columnGap = {3}
    width = "100%"
  >
    {/** Icon */}
    <Icon marginLeft = {1} height = {5} width = {5} as = {icon}/>
    {/** Label */}
    <Text lineHeight = {0}>{text}</Text>
  </Flex>, []);

  // Builds menu option.
  const buildOption = useCallback((
    {subOptions, onClick, text}: BuildOptionProps
  ): ReactElement => <Menu
    position = "initial"
    transition
    arrow
    menuButton = {
      // Option button.
      <MenuButton disabled = {subOptions == null} style = {{padding: 0}}>
        {/** Container */}
        <Flex
          _hover = {{color: "primary.600"}}
          transition = "all .2s"
          alignItems = "center"
          onClick = {onClick}
          cursor = "pointer"
          columnGap = {0}
        >
          {/** Text */}
          <Text>{text}</Text>
          {/** Down arrow */}
          {subOptions != null && <Icon
            height = {{base: 4, sm: 4, md: 5}}
            width = {{base: 4, sm: 4, md: 5}}
            as = {MdKeyboardArrowDown}
            transition = "all .2s"
          />}
        </Flex>
      </MenuButton>
    }
  >
    {/** Options */}
    {(subOptions ?? []).map((
      menuItem: ReactElement, index: number
    ): ReactElement => <MenuItem
      style = {{color: "var(--chakra-colors-neutral-9)", padding: 0}}
      key = {index}
    >
      {/** Custom hover effect */}
      {({hover}): ReactElement => <Flex
        backgroundColor = {hover ? "primary.50" : "transparent"}
        fontFamily = {hover ? "inherit" : SF_MEDIUM}
        color = {hover ? "primary.600" : "inherit"}
        transition = "all .2s"
        width = "100%"
      >{menuItem}</Flex>}
    </MenuItem>)}
  </Menu>, []);

  // Builds available options.
  const buildOptions = useMemo((): ReactElement => <Fragment>
    {/** Home */}
    <Box marginRight = {1}>{buildOption({text: t("home")})}</Box>
    {/** About us */}
    {buildOption({
      text: t("about"),
      subOptions: [
        // Our history.
        buildSubOption({text: t("ourStory"), icon: MdHistory}),
        // Ours values.
        buildSubOption({text: t("oursValues"), icon: RxValue})
      ]
    })}
    {/** Ours services */}
    {buildOption({
      text: t("services"),
      subOptions: [
        // It solutions development.
        buildSubOption({text: t("itSolutions"), icon: MdOutlineApps}),
        // Artifical Inteligence (AI).
        buildSubOption({text: t("ai"), icon: PiBrain}),
        // Interactive media.
        buildSubOption({text: t("gameDev"), icon: PiGameController}),
      ]
    })}
    {/** Ours products */}
    {buildOption({
      text: t("products"),
      subOptions: [
        // It solutions development.
        buildSubOption({text: t("itSolutions"), icon: MdOutlineApps}),
        // Artifical Inteligence (AI).
        //buildSubOption({text: t("ai"), icon: PiBrain}),
        // Interactive media.
        buildSubOption({text: t("gameDev"), icon: PiGameController}),
      ]
    })}
    {/** Contact us */}
    {buildOption({text: t("contact")})}
  {/** Dependencies */}
  </Fragment>, [buildSubOption, buildOption, t]);

  // Builds tsx code.
  return <Flex
    boxShadow = "0 4px 6px var(--chakra-colors-neutral-5)"
    backgroundColor = "neutral.1"
    fontFamily = {SF_SEMI_BOLD}
    direction = "column"
    color = "neutral.10"
    userSelect = "none"
    position = "fixed"
    fontSize = {16}
    as = "header"
    zIndex = {1}
    right = {0}
    left = {0}
    top = {0}
  >
    {/** Top */}
    <Flex
      justifyContent = "space-between"
      alignItems = "center"
      width = "100%"
      padding = {3}
    >
      {/** Left part */}
      <Flex
        onClick = {(): void => window.location.reload()}
        columnGap = {{base: 2, sm: 2, md: 3}}
        transition = "all .2s"
        alignItems = "center"
        cursor = "pointer"
      >
        {/** Company logo */}
        <ImageRenderer url = {appLogo}/>
        {/** Company name */}
        {windowWidth > BREAKPOINT_316 && <Text
          fontFamily = {POPPINS_SEMI_BOLD}
          whiteSpace = "nowrap"
          lineHeight = {0}
          fontSize = {18}
        >{t("companyName")}</Text>}
      </Flex>
      {/** Centered part */}
      <Flex
        display = {{base: "none", sm: "none", md: "inline-flex"}}
        columnGap = {{base: 2, sm: 2, md: 4, lg: 6, xl: 7}}
        transition = "all .2s"
        alignItems = "center"
      >{buildOptions}</Flex>
      {/** Right part */}
      <Flex
        columnGap = {{base: 3, sm: 4}}
        alignItems = "center"
      >
        {/** Language selection */}
        <ReactFlagsSelect
          onSelect = {(code: string): void => switchLanguage(code)}
          selected = {i18n.language.toUpperCase()}
          showSelectedLabel = {false}
          countries = {["GB", "FR"]}
          showOptionLabel = {false}
          customLabels = {{
            GB: i18n.languages[0].toUpperCase(),
            FR: i18n.languages[1].toUpperCase()
          }}
        />
        {/** Emburger menu */}
        <Icon
          display = {{base: "inline-block", sm: "inline-block", md: "none"}}
          onClick = {(): void => displayMenu(!isMenuDisplayed)}
          as = {isMenuDisplayed ? IoCloseOutline : RiMenu5Fill}
          _hover = {{color: "primary.600"}}
          transition = "all .2s"
          color = "neutral.9"
          cursor = "pointer"
          height = {9}
          width = {9}
        />
      </Flex>
    </Flex>
    {/** Responsive menu */}
    <Flex
      alignItems = "flex-start"
      direction = "column"
      paddingInline = {8}
      paddingBlock = {4}
      rowGap = {6}
      display = {{
        base: (isMenuDisplayed ? "flex" : "none"),
        sm: (isMenuDisplayed ? "flex" : "none"),
        md: "none"
      }}
    >{buildOptions}</Flex>
  </Flex>;
}
