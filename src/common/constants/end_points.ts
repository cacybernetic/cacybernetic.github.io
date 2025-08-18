/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Contains links to access to each view of app.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-08-18
 * @file end_points.ts
 * @version 0.0.3
 */

// Base links.
const INTERACTIVE_MEDIA_BASE: string = "interactive-media/";
const SOFTWARE_DEV_BASE: string = "software-development/";
const LEGAL_NOTICES_BASE: string = "legal-notices/";
const OUR_VALUES_BASE: string = "our-values/";
const OUR_STORY_BASE: string = "our-story/";
const PRODUCTS_BASE: string = "products/";
const SERVICES_BASE: string = "services/";
const CONTACT_BASE: string = "contact/";
const ABOUT_BASE: string = "about/"
const AI_BASE: string = "ai/";

// Full links.
const HOME_LINK: string = '/';
const OUR_STORY_LINK: string = `${HOME_LINK}${ABOUT_BASE}${OUR_STORY_BASE}`;
const LEGAL_NOTICES_LINK: string = `${HOME_LINK}${LEGAL_NOTICES_BASE}`;
const CONTACT_LINK: string = `${HOME_LINK}${CONTACT_BASE}`;
const PRODUCTS_INTERACTIVE_MEDIA_LINK: string = (
  `${HOME_LINK}${PRODUCTS_BASE}${INTERACTIVE_MEDIA_BASE}`
);
const SERVICE_INTERACTIVE_MEDIA_LINK: string = (
  `${HOME_LINK}${SERVICES_BASE}${INTERACTIVE_MEDIA_BASE}`
);
const PRODUCTS_SOFTWARE_DEV_LINK: string = (
  `${HOME_LINK}${PRODUCTS_BASE}${SOFTWARE_DEV_BASE}`
);
const SERVICE_SOFTWARE_DEV_LINK: string = (
  `${HOME_LINK}${SERVICES_BASE}${SOFTWARE_DEV_BASE}`
);
const OUR_VALUES_LINK: string = (
  `${HOME_LINK}${ABOUT_BASE}${OUR_VALUES_BASE}`
);
const PRODUCTS_AI_LINK: string = (
  `${HOME_LINK}${PRODUCTS_BASE}${AI_BASE}`
);
const SERVICE_AI_LINK: string = (
  `${HOME_LINK}${SERVICES_BASE}${AI_BASE}`
);

/**
 * @description Exports only public features.
 * @exports *
 */
export {
  PRODUCTS_INTERACTIVE_MEDIA_LINK,
  SERVICE_INTERACTIVE_MEDIA_LINK,
  PRODUCTS_SOFTWARE_DEV_LINK,
  SERVICE_SOFTWARE_DEV_LINK,
  LEGAL_NOTICES_LINK,
  PRODUCTS_AI_LINK,
  SERVICE_AI_LINK,
  OUR_VALUES_LINK,
  OUR_STORY_LINK,
  CONTACT_LINK,
  HOME_LINK
};
