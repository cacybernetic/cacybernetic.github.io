/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays information under a simple card.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-31
 * @updated 2025-07-31
 * @file info_card.tsx
 * @version 0.0.1
 */

// React dependencies.
import {IconType} from "react-icons/lib";

// Chakra dependencies.
import {
  FlexProps,
  IconProps,
  TextProps,
  Flex,
  Text,
  Icon
} from "@chakra-ui/react";

// Custom dependencies.
import {SF_BOLD} from "@/common/constants/variables.ts";

// Component properties.
export interface InfoCardProps {
  iconContainerStyle?: (FlexProps | null),
  descriptionStyle?: (TextProps | null),
  containerStyle?: (FlexProps | null),
  headerStyle?: (FlexProps | null),
  icon?: (IconType | null),
  titleStyle?: (TextProps),
  iconStyle?: (IconProps),
  description: string,
  title: string
}

// Displays information under a simple card.
export default function InfoCard ({
  iconContainerStyle,
  descriptionStyle,
  containerStyle,
  headerStyle,
  description,
  titleStyle,
  iconStyle,
  title,
  icon
}: InfoCardProps) {
  // Builds tsx code.
  return <Flex
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
    {...containerStyle}
  >
    {/** Header */}
    <Flex
      columnGap = {{base: 2, sm: 2, md: 3, lg: 3, xl: 4}}
      transition = "all .2s"
      alignItems = "center"
      {...headerStyle}
    >
      {/** Icon */}
      {icon != null && <Flex
        backgroundColor = "primary.100"
        justifyContent = "center"
        transition = "all .2s"
        borderRadius = "96px"
        alignItems = "center"
        color = "primary.500"
        height = {{
          base: "2rem", sm: "2rem", md: "2.5rem", lg: "2.5rem", xl: "3rem"
        }}
        width = {{
          base: "2rem", sm: "2rem", md: "2.5rem", lg: "2.5rem", xl: "3rem"
        }}
        {...iconContainerStyle}
      >
        {/** Vector */}
        <Icon
          height = {{base: 4, sm: 4, md: 5, lg: 5, xl: 6}}
          width = {{base: 4, sm: 4, md: 5, lg: 5, xl: 6}}
          transition = "all .2s"
          as = {icon}
          {...iconStyle}
        />
      </Flex>}
      {/** Title */}
      <Text
        fontSize = {{base: 16, sm: 18, md: 20, lg: 22}}
        fontFamily = {SF_BOLD}
        transition = "all .2s"
        as = "h3"
        {...titleStyle}
      >{title}</Text>
    </Flex>
    {/** Description */}
    <Text
      fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
      transition = "all .2s"
      color = "neutral.8"
      {...descriptionStyle}
    >{description}</Text>
  </Flex>;
}
