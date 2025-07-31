/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays company experience quality.
 * @author Obrymec - https://obrymec.vercel.app
 * @file experience_quality.tsx
 * @supported DESKTOP, MOBILE
 * @created 2025-07-28
 * @updated 2025-07-31
 * @version 0.0.3
 */

// React dependencies.
import {Fragment} from "react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Custom dependencies.
import technicalImage from "/assets/images/technological_excellence.webp";
import InfoPresentation from "@/common/components/info_presentation.tsx";
import operationalFlowImage from "/assets/images/operational_flow.webp";
import trustPartnerImage from "/assets/images/trusted_partner.webp";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import Section from "@/common/components/section.tsx";

// Displays and sell company experience quality.
export default function ExperienceQuality () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);

  // Builds tsx code.
  return <Section drawLines children = {<Fragment>
    {/** Operation flow */}
    <InfoPresentation
      description = {t("operationalFlowDescription")}
      title = {t("operationalFlowTitle")}
      imageUrl = {operationalFlowImage}
    />
    {/** Technological excellence  */}
    <InfoPresentation
      containerStyle = {{marginTop: {base: 4, sm: 5, md: 6}}}
      description = {t("technologicalExcellenceDescription")}
      title = {t("technologicalExcellenceTitle")}
      imageUrl = {technicalImage}
      invert
    />
    {/** Trust partner  */}
    <InfoPresentation
      containerStyle = {{marginTop: {base: 4, sm: 5, md: 6}}}
      description = {t("trustedPartnerDescription")}
      title = {t("trustedPartnerTitle")}
      imageUrl = {trustPartnerImage}
    />
  </Fragment>}/>;
}
