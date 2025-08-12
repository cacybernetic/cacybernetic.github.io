/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview The entry point of the application.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-08-12
 * @version 0.0.9
 * @file app.tsx
 */

// React dependencies.
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {RefObject, useEffect, useRef} from "react";

// Chakra dependencies.
import {Flex} from "@chakra-ui/react";

// Plugin dependencies.
import {useSelector} from "react-redux";

// Custom dependencies.
import ArtificialIntelligenceProducts from "@/features/ai_products.tsx";
import ArtificialIntelligenceService from "@/features/ai_services.tsx";
import SoftwareDevelopmentProducts from "@/features/sd_products.tsx";
import SoftwareDevelopmentService from "@/features/sd_services.tsx";
import InteractiveMediaProducts from "@/features/im_products.tsx";
import {listenNetworkState} from "@/common/libraries/network.ts";
import {SF_REGULAR} from "@/common/constants/variables.ts";
import LegalNotices from "@/features/legal_notices.tsx";
import Toaster from "@/common/components/toaster.tsx";
import {MessageType} from "@/common/states/alert.ts";
import Header from "@/common/components/header.tsx";
import {RootState} from "@/common/states/store.ts";
import OurHistory from "@/features/our_story.tsx";
import OurValues from "@/features/our_values.tsx";
import ContactUs from "@/features/contact.tsx";
import Home from "@/features/home/home.tsx";
import {
	listenWindowResizeToExtractHisSize
} from "@/common/libraries/browser.ts";
import MessageBox, {
	MessageBoxFeatures,
	ButtonOption
} from "@/common/components/message_box.tsx";
import {
	PRODUCTS_INTERACTIVE_MEDIA_LINK,
	PRODUCTS_SOFTWARE_DEV_LINK,
	SERVICE_SOFTWARE_DEV_LINK,
	LEGAL_NOTICES_LINK,
	PRODUCTS_AI_LINK,
	OUR_VALUES_LINK,
	SERVICE_AI_LINK,
	OUR_STORY_LINK,
	CONTACT_LINK,
	HOME_LINK
} from "@/common/constants/end_points.ts";

// The entry point of application.
export default function App () {
	// Attributes.
	const onDialogClosed: (() => void) = useSelector(
		(state: RootState): (() => void) => state.alert.onDialogClosed
	);
	const options: Array<ButtonOption> = useSelector(
		(state: RootState): Array<ButtonOption> => state.alert.options
	);
	const isDisplayed: boolean = useSelector(
		(state: RootState): boolean => state.alert.isDisplayed
	);
	const type: MessageType = useSelector(
		(state: RootState): MessageType => state.alert.type
	);
	const closable: boolean = useSelector(
		(state: RootState): boolean => state.alert.closable
	);
	const messageBox: RefObject<MessageBoxFeatures> = (
		useRef<MessageBoxFeatures>(null)
	);
	const message: string = useSelector(
		(state: RootState): string => state.alert.message
	);
	const details: string = useSelector(
		(state: RootState): string => state.alert.details
	);
	const title: string = useSelector(
		(state: RootState): string => state.alert.title
	);

	// Whether application is ready.
	useEffect((): void => {
		// Listens window size mutation.
		listenWindowResizeToExtractHisSize();
		// Listens network state mutation.
		listenNetworkState();
		// Whether we must display the global message box.
		if (isDisplayed) messageBox.current?.show();
		// Otherwise, destroys it.
		else messageBox.current?.close();
	// Dependencies.
	}, [isDisplayed]);

  // Builds tsx code.
	return <Flex
		fontSize = {{base: 12, sm: 13, md: 14}}
		fontFamily = {SF_REGULAR}
		transition = "all .2s"
		direction = "column"
		overflowX = "hidden"
		color = "neutral.10"
		userSelect = "none"
		overflowY = "auto"
		as = "section"
	>
		{/** Header */}
		<Header/>
		{/** Mutable section */}
		<Router future = {{v7_startTransition: true}}>
			{/** Availables routes */}
			<Routes>
				{/** Legal notices */}
				<Route element = {<LegalNotices/>} path = {LEGAL_NOTICES_LINK}/>
				{/** About our history */}
				<Route element = {<OurHistory/>} path = {OUR_STORY_LINK}/>
				{/** About our values */}
				<Route element = {<OurValues/>} path = {OUR_VALUES_LINK}/>
				{/** Contact form */}
				<Route element = {<ContactUs/>} path = {CONTACT_LINK}/>
				{/** Home screen */}
				<Route element = {<Home/>} path = {HOME_LINK}/>
				{/** Artifical intelligence products */}
				<Route
					element = {<ArtificialIntelligenceProducts/>}
					path = {PRODUCTS_AI_LINK}
				/>
				{/** Artifical intelligence service */}
				<Route
					element = {<ArtificialIntelligenceService/>}
					path = {SERVICE_AI_LINK}
				/>
				{/** Software development products */}
				<Route
					element = {<SoftwareDevelopmentProducts/>}
					path = {PRODUCTS_SOFTWARE_DEV_LINK}
				/>
				{/** Software development service */}
				<Route
					element = {<SoftwareDevelopmentService/>}
					path = {SERVICE_SOFTWARE_DEV_LINK}
				/>
				{/** Interactive media products */}
				<Route
					path = {PRODUCTS_INTERACTIVE_MEDIA_LINK}
					element = {<InteractiveMediaProducts/>}
				/>
			</Routes>
		</Router>
		{/** Global toaster */}
		<Toaster/>
		{/** Global message box */}
		<MessageBox
			onDialogClosed = {onDialogClosed}
			isDisplayed = {isDisplayed}
			closable = {closable}
			message = {message}
			details = {details}
			options = {options}
			ref = {messageBox}
			title = {title}
			type = {type}
		/>
	</Flex>;
}
