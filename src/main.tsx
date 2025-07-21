/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview The main part of the application.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 * @file main.tsx
 */

// React dependencies.
import {createRoot} from "react-dom/client";
import {StrictMode} from "react";

// Chakra dependencies.
import {ChakraProvider} from "@chakra-ui/react";

// Plugin dependencies.
import {Provider} from "react-redux";

// Custom dependencies.
import {store} from "@/common/states/store.ts";
import Fonts from "@/common/themes/fonts.tsx";
import theme from "@/common/themes/light.ts";
import "@/common/i18n/localization.ts";
import App from "@/features/app.tsx";

// Renders application.
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/** Global custom fonts */}
		<Fonts/>
		{/** Global store provider */}
		<Provider store = {store}>
			{/** Global chakra UI theme */}
			<ChakraProvider value = {theme}><App/></ChakraProvider>
		</Provider>
	</StrictMode>
);
