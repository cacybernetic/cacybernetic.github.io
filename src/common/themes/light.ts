/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Provides all colors palette for light theme.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-23
 * @version 0.0.12
 * @file theme.ts
 */

// Chakra dependencies.
import {defaultConfig, createSystem} from "@chakra-ui/react";

// Configures light theme colors and typographies.
export default createSystem(defaultConfig, {
  theme: {
    tokens: {
			breakpoints: {
				lg: {value: "68.125em"}, // ~1090px.
				"2xl": {value: "96em"}, // ~1536px.
				base: {value: "0em"}, // 0px.
				sm: {value: "30em"}, // ~480px.
				md: {value: "48em"}, // ~768px.
				xl: {value: "80em"} // ~1280px.
			},
			fonts: {
				body: {
					value: `"PoppinsRegular", "PoppinsLight", "SFRegular", "SFLight"`
				},
				heading: {
					value: `
						"PoppinsSemiBold", "PoppinsMedium", "PoppinsBold",
						"SFSemiBold", "SFMedium", "SFBold"
					`
				}
			},
      colors: {
				error: {
					50: {value: "#FFF1F2"},
					100: {value: "#FFE4E6"},
					200: {value: "#FECDD3"},
					300: {value: "#FDA4AF"},
					400: {value: "#FB7187"},
					500: {value: "#F43F5E"},
					600: {value: "#E11D48"},
					700: {value: "#BE123C"},
					800: {value: "#9F1239"},
					900: {value: "#881337"}
				},
				warning: {
					50: {value: "#FFFBEB"},
					100: {value: "#FEF3C7"},
					200: {value: "#FDE68A"},
					300: {value: "#FCD34D"},
					400: {value: "#FBBF24"},
					500: {value: "#F59E0B"},
					600: {value: "#D97706"},
					700: {value: "#B45309"},
					800: {value: "#92400E"},
					900: {value: "#78350F"}
				},
				success: {
					0: {value: "#1D8841"},
					50: {value: "#ECFDF5"},
					100: {value: "#D1FAE5"},
					200: {value: "#A7F3D0"},
					300: {value: "#6EE7B7"},
					400: {value: "#33D499"},
					500: {value: "#10B981"},
					600: {value: "#059669"},
					700: {value: "#047857"},
					800: {value: "#065F46"},
					900: {value: "#064E3B"}
				},
				neutral: {
					1: {value: "#FFFFFF"},
					2: {value: "#FCFCFC"},
					3: {value: "#F5F5F5"},
					4: {value: "#F0F0F0"},
					5: {value: "#D9D9D9"},
					6: {value: "#BFBFBF"},
					7: {value: "#8C8C8C"},
					8: {value: "#595959"},
					9: {value: "#454545"},
					10: {value: "#262626"},
					11: {value: "#1F1F1F"},
					12: {value: "#141414"},
					13: {value: "#000000"}
				},
				primary: {
					50: {value: "#EBEBFE"},
					100: {value: "#BFC1FB"},
					200: {value: "#A1A3F9"},
					300: {value: "#767AF6"},
					400: {value: "#5B60F5"},
					500: {value: "#3238F2"},
					600: {value: "#2E33DC"},
					700: {value: "#2428AC"},
					800: {value: "#1C1F85"},
					900: {value: "#151866"},
					"A100": {value: "#82B1FF"},
					"A200": {value: "#448AFF"},
					"A400": {value: "#2979FF"},
					"A700": {value: "#2962FF"}
				}
      }
    }
  }
});
