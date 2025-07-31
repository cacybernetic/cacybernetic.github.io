/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview The entry point of the application.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-31
 * @version 0.0.2
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
import {listenNetworkState} from "@/common/libraries/network.ts";
import {SF_REGULAR} from "@/common/constants/variables.ts";
import {HOME_LINK} from "@/common/constants/end_points.ts";
import Toaster from "@/common/components/toaster.tsx";
import {MessageType} from "@/common/states/alert.ts";
import Header from "@/common/components/header.tsx";
import {RootState} from "@/common/states/store.ts";
import Home from "@/features/home/home.tsx";
import {
	listenWindowResizeToExtractHisSize
} from "@/common/libraries/browser.ts";
import MessageBox, {
	MessageBoxFeatures,
	ButtonOption
} from "@/common/components/message_box.tsx";

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
				{/** Home screen */}
				<Route element = {<Home/>} path = {HOME_LINK}/>
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
