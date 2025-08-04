/**
 * @fileoverview Displays a title, description and image for presentation.
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @file info_presentation.tsx
 * @supported DESKTOP, MOBILE
 * @created 2025-07-31
 * @updated 2025-08-04
 * @version 0.0.2
 */

// Chakra dependencies.
import {
  SkeletonProps,
  ButtonProps,
  ImageProps,
  FlexProps,
  TextProps,
  BoxProps,
  Text,
  Flex,
  Box
} from "@chakra-ui/react";

// Custom dependencies.
import {SF_SEMI_BOLD} from "@/common/constants/variables.ts";
import {correctString} from "@/common/libraries/std.ts";
import ImageRenderer from "./image_renderer.tsx";
import CustomButton from "./button.tsx";

// Component properties.
export interface PresentationProps {
  imageSkeletonStyle?: (SkeletonProps | null),
  imageContainerStyle?: (BoxProps | null),
  leftContainerStyle?: (FlexProps | null),
  descriptionStyle?: (TextProps | null),
  containerStyle?: (FlexProps | null),
  buttonStyle?: (ButtonProps | null),
  imageStyle?: (ImageProps | null),
  titleStyle?: (TextProps | null),
  description?: (string | null),
  buttonText?: (string | null),
  imageUrl?: (string | null),
  buttonClick?: () => void,
  title?: (string | null),
  drawLines?: boolean,
  invert?: boolean
}

// Displays a title, description and image for common info presentation.
export default function InfoPresentation ({
  imageContainerStyle,
  imageSkeletonStyle,
  leftContainerStyle,
  descriptionStyle,
  containerStyle,
  buttonStyle,
  description,
  buttonClick,
  buttonText,
  imageStyle,
  titleStyle,
  drawLines,
  imageUrl,
  invert,
  title
}: PresentationProps) {
  // Attributes.
  description = correctString<string>({input: description});
  buttonText = correctString<string>({input: buttonText});
  imageUrl = correctString<string>({input: imageUrl});
  title = correctString<string>({input: title});
  const commonNodeStyle: BoxProps = {
    transform: "translate(-50%, -50%)",
    position: "fixed",
    borderRadius: 48,
    height: "48px",
    width: "48px",
    left: "50%",
    top: "50%"
  };

  // Builds tsx code.
  return <Flex
    borderRadius = {{base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"}}
    _hover = {{backgroundImage: "var(--box-worth-hover-bg-color)"}}
    gap = {{base: 4, sm: 5, md: 6}}
    borderColor = "neutral.5"
    transition = "all .2s"
    borderWidth = {1}
    direction = {{
      lg: "column", xl: (invert ? "row-reverse" : "row"),
      base: "column", sm: "column", md: "column"
    }}
    padding = {{
      lg: "1.6rem", xl: "1.8rem", "2xl": "2rem",
      base: ".6rem", sm: ".8rem", md: "1rem"
    }}
    {...containerStyle}
  >
    {/** Information */}
    <Flex
      transition = "all .2s"
      direction = "column"
      rowGap = {{
        base: ".6rem", sm: ".7rem", md: ".8rem", lg: ".9rem", xl: "1rem"
      }}
      {...leftContainerStyle}
    >
      {/** Title */}
      {title.length > 0 && <Text
        fontSize = {{base: 20, sm: 22, md: 24, lg: 26, xl: 28, "2xl": 30}}
        fontFamily = {SF_SEMI_BOLD}
        transition = "all .2s"
        as = "h3"
        {...titleStyle}
      >{title}</Text>}
      {/** Description */}
      {description.length > 0 && <Text
        fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
        transition = "all .2s"
        color = "neutral.8"
        {...descriptionStyle}
      >{description}</Text>}
      {/** Button for call to action */}
      {buttonText.length > 0 && <CustomButton
        onClick = {buttonClick}
        text = {buttonText}
        buttonStyle = {(): ButtonProps => ({
          fontSize: {base: 13, sm: 14, md: 15, lg: 16, xl: 18},
          backgroundColor: "neutral.1",
          borderColor: "primary.500",
          fontFamily: SF_SEMI_BOLD,
          transition: "all .2s",
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
          },
          ...buttonStyle
        })}
      />}
    </Flex>
    {/** Vertical line */}
    {drawLines && <Flex
      transform = "translate3d(0, 0, 0)"
      backgroundColor = "primary.100"
      minWidth = "2px"
      display = {{
        lg: "none", xl: "none", "2xl": "flex",
        base: "none", sm: "none", md: "none"
      }}
    >
      {/** Fake content */}
      <Box visibility = "hidden" as = "span">.</Box>
      {/** Wrapper */}
      <Box
        backgroundColor = "neutral.1"
        borderColor = "primary.100"
        {...commonNodeStyle}
        borderWidth = {2}
      />
      {/** Node */}
      <Box
        backgroundColor = "primary.100"
        {...commonNodeStyle}
        height = "32px"
        width = "32px"
      />
    </Flex>}
    {/** Image */}
    <ImageRenderer
      skeletonStyle = {imageSkeletonStyle}
      url = {imageUrl}
      imageStyle = {{
        borderRadius: {base: ".4rem", sm: ".6rem", md: ".8rem", lg: "1rem"},
        transition: "all .2s",
        objectFit: "cover",
        ...imageStyle
      }}
      containerStyle = {{
        minWidth: {
          lg: "256px", xl: "364px", "2xl": "480px",
          base: "100%", sm: "100%", md: "100%"
        },
        ...imageContainerStyle
      }}
    />
  </Flex>;
}
