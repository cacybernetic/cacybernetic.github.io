/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays company accomplishments in interactive media.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file im_products.tsx
 * @created 2025-08-12
 * @updated 2025-08-12
 * @version 0.0.1
 */

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Chakra dependencies.
import {Flex, Box} from "@chakra-ui/react";

// Custom dependencies.
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import Section from "@/common/components/section.tsx";
import Footer from "@/common/components/footer.tsx";

// Displays all accomplishments made in interactive media.
export default function InteractiveMediaProducts () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Builds tsx code.
  return <Box
    paddingTop = {{base: 12, sm: 12, md: 13}}
    transition = "all .2s"
    width = "full"
  >
    {/** Developed immersive applications */}
    <Section
      containerStyle = {{backgroundImage: "var(--box-worth-hover-bg-color)"}}
      description = {t("gameDevDescription")}
      title = {t("gameDevTitle")}
      descriptionStyle = {{
        width: {base: "auto", sm: "auto", md: "auto", xl: "1024px"}
      }}
      children = {<Flex
        marginTop = {{base: 0, sm: 0, md: 1, lg: 2, xl: 3, "2xl": 4}}
        gap = {{base: 4, sm: 5, md: 6}}
        transition = "all .2s"
        direction = {{
          base: "column", sm: "column", md: "column",
          lg: "column", xl: "column", "2xl": "row"
        }}
      ></Flex>}
    />
    {/** Footer */}
    <Footer/>
  </Box>;
}
