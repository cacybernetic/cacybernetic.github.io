/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Global fonts pallete.
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-08-19
 * @file fonts.tsx
 * @version 0.0.2
 */

// React dependencies.
import {ReactElement} from "react";

// Library dependencies.
import {Global} from "@emotion/react";

// Custom dependencies.
import PoppinsSemiBold from "/assets/fonts/poppins_semibold.ttf";
import PoppinsRegular from "/assets/fonts/poppins_regular.ttf";
import PoppinsMedium from "/assets/fonts/poppins_medium.ttf";
import PoppinsLight from "/assets/fonts/poppins_light.ttf";
import PoppinsBold from "/assets/fonts/poppins_bold.ttf";
import SFSemiBold from "/assets/fonts/sf_semibold.otf";
import SFRegular from "/assets/fonts/sf_regular.otf";
import global_css from "@/common/themes/global_css";
import SFMedium from "/assets/fonts/sf_medium.otf";
import SFLight from "/assets/fonts/sf_light.otf";
import SFBold from "/assets/fonts/sf_bold.otf";

// Fonts family.
export default function Fonts (): ReactElement {
	// Sends defined font families.
	return <Global styles = {`
		/** Poppins Semi Bold */
		@font-face {
			font-family: "PoppinsSemiBold";
			src: url(${PoppinsSemiBold});
			font-style: normal;
			font-weight: 600;
		}
		/** Poppins regular */
		@font-face {
			font-family: "PoppinsRegular";
			src: url(${PoppinsRegular});
			font-style: normal;
			font-weight: 400;
		}
		/** Poppins Medium */
		@font-face {
			font-family: "PoppinsMedium";
			src: url(${PoppinsMedium});
			font-style: normal;
			font-weight: 500;
		}
		/** Poppins Light */
		@font-face {
			font-family: "PoppinsLight";
			src: url(${PoppinsLight});
			font-weight: lighter;
			font-style: normal;
		}
		/** Poppins Bold */
		@font-face {
			font-family: "PoppinsBold";
			src: url(${PoppinsBold});
			font-style: normal;
			font-weight: 700;
		}
		/** San Francisco Semi Bold */
		@font-face {
			font-family: "SFSemiBold";
			src: url(${SFSemiBold});
			font-style: normal;
			font-weight: 600;
		}
		/** San Francisco Regular */
		@font-face {
			font-family: "SFRegular";
			src: url(${SFRegular});
			font-style: normal;
			font-weight: 400;
		}
		/** San Francisco Medium */
		@font-face {
			font-family: "SFMedium";
			src: url(${SFMedium});
			font-style: normal;
			font-weight: 500;
		}
		/** San Francisco Light */
		@font-face {
			font-family: "SFLight";
			src: url(${SFLight});
			font-weight: lighter;
			font-style: normal;
		}
		/** San Francisco Bold */
		@font-face {
			font-family: "SFBold";
			src: url(${SFBold});
			font-style: normal;
			font-weight: 700;
		}
		${global_css}
	`}/>;
}
