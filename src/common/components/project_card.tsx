/**
 * @fileoverview Defines a project card to display company accomplishments.
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file project_card.tsx
 * @created 2025-08-12
 * @updated 2025-08-15
 * @version 0.0.2
 */

// React dependencies.
import {SiArtstation, SiSketchfab, SiGumroad} from "react-icons/si";
import {ReactElement, useCallback} from "react";
import {BiLogoPlayStore} from "react-icons/bi";
import {FaDashcube} from "react-icons/fa";
import {IconType} from "react-icons/lib";
import {
	RiArrowRightUpLine,
	RiAppStoreLine,
	RiLinkedinLine,
	RiYoutubeLine,
	RiGithubLine,
	RiGitlabLine
} from "react-icons/ri";

// Chakra dependencies.
import {
  SkeletonProps,
  ImageProps,
  FlexProps,
  LinkProps,
  TextProps,
  BoxProps,
  Text,
  Flex,
  Link,
  Icon,
  Box
} from "@chakra-ui/react";

// Custom dependencies.
import {SF_SEMI_BOLD, SF_LIGHT} from "@/common/constants/variables.ts";
import ImageRenderer from "@/common/components/image_renderer.tsx";
import {correctString} from "@/common/libraries/std.ts";

// Component properties.
export interface ProjectCardProps {
  sourcesContainerStyle?: (FlexProps | null),
  imageErrorTextStyle?: (TextProps | null),
  infoContainerStyle?: (FlexProps | null),
  skeletonStyle?: (SkeletonProps | null),
  descriptionStyle?: (TextProps | null),
  sourceLinksStyle?: (LinkProps | null),
  containerStyle?: (FlexProps | null),
  mainLinkStyle?: (LinkProps | null),
  artStationLink?: (string | null),
  imageStyle?: (ImageProps | null),
  playstoreLink?: (string | null),
  cubeBrushLink?: (string | null),
  sketchfabLink?: (string | null),
  titleStyle?: (TextProps | null),
	appstoreLink?: (string | null),
	linkedinLink?: (string | null),
  coverStyle?: (BoxProps | null),
  typeStyle?: (TextProps | null),
  description?: (string | null),
	youtubeLink?: (string | null),
  gumroadLink?: (string | null),
  githubLink?: (string | null),
	gitlabLink?: (string | null),
  imageUrl?: (string | null),
  title?: (string | null),
	link?: (string | null),
  type?: (string | null)
}

// Display company accomplished project under a card.
export default function ProjectCard ({
  sourcesContainerStyle,
  imageErrorTextStyle,
  infoContainerStyle,
  sourceLinksStyle,
  descriptionStyle,
  containerStyle,
  artStationLink,
  playstoreLink,
  cubeBrushLink,
  sketchfabLink,
  skeletonStyle,
  mainLinkStyle,
  appstoreLink,
  linkedinLink,
  gumroadLink,
  description,
  youtubeLink,
  imageStyle,
  coverStyle,
  githubLink,
  gitlabLink,
  titleStyle,
  typeStyle,
  imageUrl,
  title,
  link,
  type
}: ProjectCardProps) {
  // Attributes.
  artStationLink = correctString<string>({input: artStationLink});
  cubeBrushLink = correctString<string>({input: cubeBrushLink});
  sketchfabLink = correctString<string>({input: sketchfabLink});
  playstoreLink = correctString<string>({input: playstoreLink});
  appstoreLink = correctString<string>({input: appstoreLink});
  linkedinLink = correctString<string>({input: linkedinLink});
  description = correctString<string>({input: description});
  youtubeLink = correctString<string>({input: youtubeLink});
  gumroadLink = correctString<string>({input: gumroadLink});
  githubLink = correctString<string>({input: githubLink});
  gitlabLink = correctString<string>({input: gitlabLink});
  imageUrl = correctString<string>({input: imageUrl});
  title = correctString<string>({input: title});
  link = correctString<string>({input: link});
  type = correctString<string>({input: type});

  // Builds project remote link.
	const buildLink = useCallback((
    url: string, icon?: IconType
	): (ReactElement | false) => (
    url.length > 0 &&
    <Link
      style = {{display: "inline-flex"}}
      target = "_blank"
      outline = "none"
      href = {url}
      {...sourceLinksStyle}
    >
      {/** Vector icon */}
      <Icon
        _hover = {{color: "primary.500"}}
        height = {{base: 4, xl: 5}}
        width = {{base: 4, xl: 5}}
        transition = "all .2s"
        color = "neutral.10"
        as = {icon}
      />
    </Link>
  // Dependencies.
  ), [sourceLinksStyle]);

  // Builds tsx code.
  return <Flex
    borderRadius = {{base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"}}
    backgroundColor = "neutral.1"
    borderColor = "neutral.5"
    transition = "all .3s"
    direction = "column"
    className = "group"
    overflow = "hidden"
    borderWidth = {1}
    width = "100%"
    _hover = {{
      boxShadow: "0 0 16px var(--chakra-colors-neutral-6)",
      backgroundImage: "var(--box-worth-hover-bg-color)",
      transform: "translateY(-4px)"
    }}
    {...containerStyle}
  >
    {/** Cover */}
    <Box
      overflow = {link.length > 0 ? "ihnerit" : "hidden"}
      transform = "translate3d(0, 0, 0)"
      {...coverStyle}
    >
      {/** Skeleton */}
      <ImageRenderer
        errorTextStyle = {imageErrorTextStyle}
        url = {imageUrl}
        imageStyle = {{
          borderTopRadius: {
            base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"
          },
          ...imageStyle
        }}
        skeletonStyle = {{
          _groupHover: (link.length <= 0 ? {transform: "scale(1.08)"} : {}),
          transition: "all .2s",
          height: "auto",
          width: "100%",
          borderTopRadius: {
            base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"
          },
          ...skeletonStyle
        }}
      />
      {/** Link */}
			{link.length > 0 && <Link
				_hover = {{bg: "primary.500", opacity: .9}}
				right = {{base: "1rem", xl: "1.25rem"}}
				backgroundColor = "neutral.10"
				display = "inline-flex"
				transition = "all .2s"
				borderRadius = {10}
				position = "fixed"
				cursor = "pointer"
				target = "_blank"
        outline = "none"
				href = {link}
				bottom = {{
          lg: "-1.3rem", xl: "-1.4rem", "2xl": "-1.5rem",
          base: "-1rem", sm: "-1.1rem", md: "-1.2rem"
        }}
				padding = {{
          base: ".5rem", sm: ".6rem", md: ".7rem",
          lg: ".8rem", xl: ".9rem", "2xl": "1rem"
        }}
        {...mainLinkStyle}
			>
				{/** Right up arrow icon */}
				<Icon
					as = {RiArrowRightUpLine}
					color = "neutral.1"
					height = {5}
					width = {5}
				/>
			</Link>}
    </Box>
    {/** Information */}
    <Flex
      transition = "all .2s"
      direction = "column"
      padding = {{
        base: ".6rem", sm: ".7rem", md: ".8rem", lg: ".9rem", xl: "1rem"
      }}
      rowGap = {{
        base: ".6rem", sm: ".7rem", md: ".8rem", lg: ".9rem", xl: "1rem"
      }}
      {...infoContainerStyle}
    >
      {/** Type */}
			{type.length > 0 && <Text
				fontSize = {{base: ".813rem", xl: ".875rem"}}
				transform = "translate3d(0, 0, 0)"
				paddingStart = "1.75rem"
				fontFamily = {SF_LIGHT}
				display = "inline-flex"
				transition = "all .2s"
				_after = {{
					backgroundColor: "neutral.10",
					position: "absolute",
					display: "block",
					content: `""`,
					height: "1px",
					width: "20px",
					top: "50%",
					left: 0
				}}
        {...typeStyle}
			>{type}</Text>}
      {/** Title */}
      <Text
        fontSize = {{base: 16, sm: 18, md: 20, lg: 21}}
        fontFamily = {SF_SEMI_BOLD}
        transition = "all .2s"
        as = "h6"
        {...titleStyle}
      >{title}</Text>
      {/** Description */}
      <Text
        fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
        transition = "all .2s"
        color = "neutral.8"
        {...descriptionStyle}
      >{description}</Text>
      {/** Sources */}
      <Flex
        direction = "row"
        columnGap = {3}
        height = "100%"
        {...sourcesContainerStyle}
      >
        {/** Playstore link */}
        {buildLink(playstoreLink, BiLogoPlayStore)}
        {/** Artstation link */}
        {buildLink(artStationLink, SiArtstation)}
        {/** Linkedin link */}
        {buildLink(linkedinLink, RiLinkedinLine)}
        {/** Appstore link */}
        {buildLink(appstoreLink, RiAppStoreLine)}
        {/** Sketchfab link */}
        {buildLink(sketchfabLink, SiSketchfab)}
        {/** Youtube link */}
        {buildLink(youtubeLink, RiYoutubeLine)}
        {/** Cubebrush link */}
        {buildLink(cubeBrushLink, FaDashcube)}
        {/** Github link */}
        {buildLink(githubLink, RiGithubLine)}
        {/** Gitlab link */}
        {buildLink(gitlabLink, RiGitlabLine)}
        {/** Gumroad link */}
        {buildLink(gumroadLink, SiGumroad)}
      </Flex>
    </Flex>
  </Flex>;
}
