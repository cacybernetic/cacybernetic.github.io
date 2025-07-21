// Dependencies.
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";
import js from "@eslint/js";

// Typescript lint configurations.
export default tseslint.config(
  {ignores: ["dist"]},
  {
		files: ["**/*.{ts,tsx}"],
    extends: [
			js.configs.recommended,
			...tseslint.configs.recommended
		],
		plugins: {
			"react-refresh": reactRefresh,
			"react-hooks": reactHooks
		},
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2020
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {allowConstantExport: true}
      ]
    }
  }
);
