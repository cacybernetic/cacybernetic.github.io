/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview The message box component.
 * @supported DESKTOP, MOBILE
 * @file message_box.tsx
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 */

// React dependencies.
import {CiCircleCheck, CiCircleInfo, CiWarning} from "react-icons/ci";
import {MdErrorOutline} from "react-icons/md";
import {
	useImperativeHandle,
	MutableRefObject,
	useLayoutEffect,
	ForwardedRef,
	ReactElement,
	useCallback,
	forwardRef,
	useRef
} from "react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";
import {Dispatch} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

// Chakra dependencies.
import {
	useDisclosure,
	CloseButton,
	Button,
	Dialog,
	Portal,
	Text,
	Icon,
	Box
} from "@chakra-ui/react";

// Custom dependencies.
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {correctString} from "@/common/libraries/std.ts";
import {
	SF_SEMI_BOLD,
	SF_REGULAR,
	SF_BOLD
} from "@/common/constants/variables.ts";
import {
	dismissable,
	MessageType,
	setDetails,
	setMessage,
	setOptions,
	setTitle,
	setType,
	close
} from "@/common/states/alert.ts";

// Component properties.
export interface MessageBoxProps {
	options?: Array<ButtonOption>,
	onDialogClosed?: () => void,
	type: (MessageType | string)
	details?: (string | null),
	message: (string | null),
	title?: (string | null),
	isDisplayed?: boolean,
	closable?: boolean
}

// Component types.
export type MessageBoxFeatures = {
	isVisible: () => boolean,
	close: () => void,
	show: () => void
};
export type ButtonOption = {
	onClick?: (index?: number) => void,
	rightIcon?: ReactElement,
	leftIcon?: ReactElement,
	text: (string | null),
	disabled?: boolean,
	primary?: boolean
};

// The message box component.
export default forwardRef(function MessageBox (
	{
		onDialogClosed,
		isDisplayed,
		closable,
		message,
		options,
		details,
		title,
		type
	}: MessageBoxProps,
	ref: ForwardedRef<MessageBoxFeatures>
) {
	// Attrbutes.
	const {onClose, onOpen, open} = useDisclosure({open: isDisplayed});
	const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
	message = correctString<string>({input: message});
	details = correctString<string>({input: details});
	title = correctString<string>({input: title});
	const dispatch: Dispatch = useDispatch();
	const features: MutableRefObject<MessageBoxFeatures | null> = (
		useRef<MessageBoxFeatures | null>(null)
	);

	// Called when message box comes to be closed.
	const onClosed = useCallback((): void => {
		// Throws `dialogClosed` event.
		if (typeof onDialogClosed === "function") onDialogClosed();
		// Resets type.
		dispatch(setType(MessageType.NONE));
		// Resets closable.
		dispatch(dismissable(true));
		// Resets message.
		dispatch(setMessage(''));
		// Resets details.
		dispatch(setDetails(''));
		// Resets options.
		dispatch(setOptions([]));
		// Resets title.
		dispatch(setTitle(''));
		// Sets display state.
		dispatch(close());
		// Closes message box.
		onClose();
	// Dependencies.
	}, [onDialogClosed, dispatch, onClose]);

	// Called when an option has been clicked.
	const onOptionClicked = useCallback((
		callback?: (index?: number) => void,
		disabled?: boolean, index?: number
	): void => {
		// Whether that button is enabled.
		if (!disabled) {
			// Closes the displayed message box.
			onClosed();
			// Calls the passed function.
			if (typeof callback === "function") callback(index);
		}
	// Dependencies.
	}, [onClosed]);

	// Builds the right icon to used according to the type.
	const buildIcon = useCallback((
		type: (MessageType | string)
	): ReactElement => {
		// Listens message type.
		switch(type) {
			// Information message is used.
			case MessageType.INFORMATION: return <Icon
				height = {{base: 6, sm: 6, md: 8, lg: 8}}
				width = {{base: 6, sm: 6, md: 8, lg: 8}}
				transition = "all .2s linear"
				color = "primary.3"
				as = {CiCircleInfo}
			/>
			// Warning message is used.
			case MessageType.WARNING: return <Icon
				height = {{base: 6, sm: 6, md: 8, lg: 8}}
				width = {{base: 6, sm: 6, md: 8, lg: 8}}
				transition = "all .2s linear"
				color = "warning.600"
				as = {CiWarning}
			/>
			// Success message is used.
			case MessageType.SUCCESS: return <Icon
				height = {{base: 6, sm: 6, md: 8, lg: 8}}
				width = {{base: 6, sm: 6, md: 8, lg: 8}}
				transition = "all .2s linear"
				color = "success.600"
				as = {CiCircleCheck}
			/>
			// Error message is used.
			case MessageType.ERROR: return <Icon
				height = {{base: 6, sm: 6, md: 8, lg: 8}}
				width = {{base: 6, sm: 6, md: 8, lg: 8}}
				transition = "all .2s linear"
				as = {MdErrorOutline}
				color = "error.600"
			/>
			// Otherwise.
			default: return <></>;
		}
	}, []);

	// Customizes instance value that is exposed to parent component.
	useImperativeHandle(ref, (): MessageBoxFeatures => {
		// Returns the final result.
		return (features.current as MessageBoxFeatures);
	}, []);

	// Called before component get ready.
	useLayoutEffect((): void => {
		// Builds message popup object reference.
		features.current = {
			isVisible: (): boolean => open, close: onClosed, show: onOpen
		};
	// Dependencies.
	}, [onClosed, onOpen, open]);

	// Builds tsx code.
	return message.length > 0 && <Dialog.Root
		motionPreset = "slide-in-top"
		onOpenChange = {onClosed}
		closeOnInteractOutside
		placement = "center"
		open = {open}
		closeOnEscape
	>
		{/** Main container */}
		<Portal>
			{/** Draws black overlay container */}
			<Dialog.Backdrop/>
			{/** Dialog position */}
			<Dialog.Positioner>
				{/** Content */}
				<Dialog.Content
					width = {{base: 256, sm: 350, md: 450, lg: 550}}
					fontSize = {{base: 12, sm: 13, md: 14}}
					transition = "all .2s linear"
					fontFamily = {SF_REGULAR}
					userSelect = "none"
					color = "neutral.9"
				>
					{/** Header */}
					{title.length > 0 && <Dialog.Header
						fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
						transition = "all .2s linear"
						display = "inline-flex"
						alignItems = "center"
						columnGap = {2}
					>
						{/** Gets right icon regardless message type */}
						{buildIcon(type)}
						{/** Title */}
						<Dialog.Title fontFamily = {SF_BOLD}>{title}</Dialog.Title>
					</Dialog.Header>}
					{/** Closer button */}
					{closable && <Dialog.CloseTrigger asChild>
						<CloseButton onClick = {onClosed} size = "sm"/>
					</Dialog.CloseTrigger>}
					{/** Body */}
					<Dialog.Body>
						{/** Message */}
						<Text dangerouslySetInnerHTML = {{__html: message}}/>
						{/** Details section */}
						{details.length > 0 && <Box marginTop = {3}>
							{/** Details content */}
							<details>
								{/** Title */}
								<summary>
									<Text as = "span">{t("moreDetails")}</Text>
								</summary>
								{/** Details */}
								<Text dangerouslySetInnerHTML = {{__html: details}}/>
							</details>
						</Box>}
					</Dialog.Body>
					{/** Footer */}
					{Array.isArray(options) && <Dialog.Footer
						flexDirection = {{base: "column", sm: "row"}}
						display = "flex"
						gap = {4}
					>
						{/** Drawing options */}
						{options.map((
							{
								rightIcon, leftIcon, disabled, primary, onClick, text
							}: ButtonOption,
							index: number
						): ReactElement => <Dialog.ActionTrigger asChild>
							{/** Trigger button */}
							<Button
								cursor = {disabled ? "not-allowed" : "pointer"}
								width = {{base: "100%", sm: "auto"}}
								transition = "all .2s linear"
								fontFamily = {SF_SEMI_BOLD}
								disabled = {disabled}
								borderRadius = {3}
								borderWidth = {1}
								key = {index}
								onClick = {(): void => onOptionClicked(
									onClick, disabled, index
								)}
								padding = {{
									base: "14px 10px 14px 10px", sm: "16px 12px 16px 12px",
									md: "18px 14px 18px 14px", lg: "18px 14px 18px 14px"
								}}
								backgroundColor = {
									disabled ? "neutral.4" :
									(primary ? "primary.900" : "neutral.1")
								}
								borderColor = { 
									primary ? "transparent" :
									(disabled ? "neutral.6" : "neutral.9")
								}
								color = {
									disabled ? "neutral.6" :
									(primary ? "neutral.1" : "neutral.9")
								}
								_hover = {{
									borderColor: (
										primary ? "transparent" :
										(disabled ? "neutral.6" : "primary.600")
									),
									color: (
										disabled ? "neutral.6" :
										(primary ? "neutral.1" : "primary.600")
									),
									backgroundColor: (
										disabled ? "neutral.4" :
										(primary ? "primary.600" : "neutral.2")
									)
								}}
							>{leftIcon}{text}{rightIcon}</Button>
						</Dialog.ActionTrigger>)}
					</Dialog.Footer>}
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog.Root>;
});
