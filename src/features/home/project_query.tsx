/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Invites user who have a project to make its request.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file project_query.tsx
 * @created 2025-07-30
 * @updated 2025-08-12
 * @version 0.0.3
 */

// React dependencies.
import {Fragment} from "react";

// Chakra dependencies.
import {ButtonProps} from "@chakra-ui/react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import CustomButton from "@/common/components/button.tsx";
import {SF_MEDIUM} from "@/common/constants/variables.ts";
import Section from "@/common/components/section.tsx";

// Displays a view to invite client who have a project for request.
export default function ProjectQuery () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Sends tsx code.
  return <Section
    containerStyle = {{backgroundColor: "primary.50"}}
    description = {t("contactInvitationDescription")}
    title = {t("youHaveAProject")}
    descriptionStyle = {{
      width: {base: "auto", sm: "auto", md: "auto", lg: "620px"},
      textAlign: "center",
      color: "neutral.8"
    }}
    children = {<Fragment>
      {/** Contact us button */}
      <CustomButton
        onMouseDown = {(): ButtonProps => ({boxShadow: "none"})}
        text = {t("getInTouch")}
        buttonStyle = {(): ButtonProps => ({
          boxShadow: "1px 4px 6px var(--chakra-colors-neutral-7)",
          fontSize: {base: 13, sm: 14, md: 15, lg: 16, xl: 18},
          fontFamily: SF_MEDIUM,
          borderRadius: 8,
          backgroundImage: `linear-gradient(
            var(--chakra-colors-primary-400),
            var(--chakra-colors-primary-500)
          )`,
          _hover: {
            textShadow: "0 0 4px var(--chakra-colors-neutral-1)",
            backgroundColor: "primary.500",
            transform: "scale(1.08)",
            backgroundImage: "none"
          }
        })}
      />
    </Fragment>}
  />;
}
