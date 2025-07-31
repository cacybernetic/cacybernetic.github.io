/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Generates a container to display page section.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-30
 * @updated 2025-07-31
 * @file section.tsx
 * @version 0.0.2
 */

// React dependencies.
import {ReactElement, useCallback, Fragment} from "react";

// Chakra dependencies.
import {
  StackProps,
  TextProps,
  Stack,
  Text,
  Flex,
  Box
} from "@chakra-ui/react";

// Custom dependencies.
import {SF_REGULAR, SF_BOLD} from "@/common/constants/variables.ts";
import {correctString} from "@/common/libraries/std.ts";

// Component properties.
export interface SectionProps {
  descriptionStyle?: (TextProps | null),
  containerStyle?: (StackProps | null),
  titleStyle?: (TextProps | null),
  description?: (string | null),
  title?: (string | null),
  children: ReactElement,
  drawLines?: boolean
}

// Generates a container to contain others elements.
export default function Section ({
  descriptionStyle,
  containerStyle,
  description,
  titleStyle,
  drawLines,
  children,
  title
}: SectionProps) {
  // Attributes.
  description = correctString<string>({input: description});
  title = correctString<string>({input: title});

  // Draws a vertical line.
  const drawVerticalLine = useCallback((): ReactElement => <Fragment>
    {/** Vertical line */}
    {drawLines && <Flex justifyContent = "center" width = "full">
      <Box
        height = {{base: 8, sm: 12, md: 16, lg: 20, xl: 24}}
        backgroundColor = "primary.50"
        transition = "all .2s"
        width = "2px"
      />
    </Flex>}
  {/** Dependencies */}
  </Fragment>, [drawLines]);

  // Builds tsx code.
  return <Stack
    paddingInline = {{base: 4, sm: 8, md: 32, lg: 48, xl: 60}}
    gap = {drawLines ? 0 : {base: 4, sm: 5, md: 6}}
    fontFamily = {SF_REGULAR}
    transition = "all .2s"
    alignItems = "center"
    color = "neutral.10"
    userSelect = "none"
    width = "full"
    paddingBlock = {
      drawLines ? undefined : {base: 8, sm: 12, md: 16, lg: 20, xl: 24}
    }
    {...containerStyle}
  >
    {/** Big title */}
    {title.length > 0 && <Text
      lineHeight = {{base: "26px", sm: "32px", md: "38px", lg: "48px"}}
      fontSize = {{base: 18, sm: 22, md: 26, lg: 30, xl: 34}}
      fontFamily = {SF_BOLD}
      transition = "all .2s"
      {...titleStyle}
      as = "h2"
    >{title}</Text>}
    {/** Description */}
    {description.length > 0 && <Text
      fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
      transition = "all .2s"
      {...descriptionStyle}
    >{description}</Text>}
    {/** Main container */}
    {children != null && <Fragment>
      {/** Top line */}
      {drawVerticalLine()}
      {/** Full content */}
      <Fragment>{children}</Fragment>
      {/** Bottom line */}
      {drawVerticalLine()}
    </Fragment>}
  </Stack>;
}
