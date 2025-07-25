/**
 * @fileoverview Global css styles for general effects over the whole app.
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-24
 * @file global_css.ts
 * @version 0.0.3
 */

// Exports general CSS style.
export default `
  /** Custom css root variables */
  :root {
    --box-worth-hover-bg-color: linear-gradient(
      to bottom right, #FECACA46, #E9D5FF41, #FEF08A44
    );
    --banner-background-color: linear-gradient(
      to bottom, #FAF5FF, #FFF7ED, rgb(255 247 237 / 0)
    );
  }
  /** Change flag dropdown icon container style */
  button.ReactFlagsSelect-module_selectBtn__19wW7 > span {
    padding: 0;
  }
  div.ReactFlagsSelect-module_flagsSelect__2pfa2 {
    padding-bottom: 0;
  }
  /** Marker */
  span.marker {
    background-color: #FFD400 !important;
    display: inline-flex !important;
    padding-right: 2px !important;
    padding-left: 2px !important;
    color: #262626 !important;
  }
`;
