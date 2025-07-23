/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview The button component for most common use cases.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-23
 * @updated 2025-07-23
 * @file button.tsx
 * @version 0.0.1
 */

// React dependencies.
import {MouseEventHandler, ReactElement, useCallback, useState} from "react";

// Chakra dependencies.
import {ButtonProps, Spinner, Button} from "@chakra-ui/react";

// Plugin dependencies.
import {useSelector} from "react-redux";

// Custom dependencies.
import {correctString} from "@/common/libraries/std.ts";
import {RootState} from "@/common/states/store.ts";

// Component properties.
export interface CustomButtonProps {
	rightIcon?: ReactElement,
	leftIcon?: ReactElement,
	isProcessing?: boolean,
	text: (string | null),
	onClick?: () => void,
	disabled?: boolean,
	onMouseDown?: (
		processing?: boolean, disabled?: boolean
	) => (ButtonProps | null),
	buttonStyle?: (
		processing?: boolean, disabled?: boolean
	) => (ButtonProps | null)
}

// Creates a generic button for common use cases.
export default function CustomButton ({
	isProcessing,
	onMouseDown,
	buttonStyle,
	rightIcon,
	leftIcon,
	disabled,
	onClick,
	text
}: CustomButtonProps) {
	// Attributes.
	const [isMouseDown, mouseDown] = useState<boolean>(false);
	text = correctString<string>({input: text});
	const isOnGoing: boolean = useSelector(
		(state: RootState): boolean => state.app.isOnGoing
	);

	// Whether button is really disabled.
	const isDisabled = useCallback(
		(): boolean => ((!isProcessing && isOnGoing) || (disabled ?? false)),
		[isProcessing, isOnGoing, disabled]
	);

	// Called when button is clicked.
	const onButtonClicked: MouseEventHandler<HTMLButtonElement> = useCallback(
		(): void => {
			// Whether that button isn't disabled.
			if (
				typeof onClick === "function" && !isProcessing && !isDisabled()
			) onClick();
		// Dependencies.
		}, [isProcessing, isDisabled, onClick]
	);

	// Builds tsx code.
	return <Button
		backgroundColor = {isDisabled() ? "neutral.4" : "primary.500"}
		justifyContent = {isProcessing ? "center" : undefined}
		color = {isDisabled() ? "neutral.6" : "neutral.1"}
		paddingInline = {{base: 6, sm: 8, md: 10, lg: 12}}
		paddingBlock = {{base: 4, sm: 5, md: 6, lg: 7}}
		onMouseDown = {(): void => mouseDown(true)}
		onMouseUp = {(): void => mouseDown(false)}
		onClick = {onButtonClicked}
		disabled = {isDisabled()}
		display = "inline-flex"
		transition = "all .2s"
		alignItems = "center"
		borderRadius = {4}
		cursor = {
			isDisabled() ? "not-allowed" : (isProcessing ? "progress" : "pointer")
		}
		_focusVisible = {{
			boxShadow: "0 0 0 3px var(--chakra-colors-primary-500)"
		}}
		_hover = {{
			backgroundColor: (
				isDisabled() ? "neutral.4" :
				(isProcessing ? "primary.500" : "primary.700")
			)
		}}
		{...(
			typeof buttonStyle === "function" ?
			buttonStyle(isProcessing, isDisabled()) : null
		)}
		{...(
			(typeof onMouseDown === "function" && isMouseDown) ?
			onMouseDown(isProcessing, isDisabled()) : null
		)}
	>
		{/** Left icon */}
		{
			(leftIcon != null && isProcessing) ?
			<Spinner minHeight = {4} minWidth = {4} height = {4} width = {4}/> :
			leftIcon
		}
		{/** Content */}
		{
			!isProcessing ? text :
			(
				(rightIcon == null && leftIcon == null) ?
				<Spinner minHeight = {4} minWidth = {4} height = {4} width = {4}/> :
				''
			)
		}
		{/** Right icon */}
		{
			(rightIcon != null && isProcessing) ?
			<Spinner minHeight = {4} minWidth = {4} height = {4} width = {4}/> :
			rightIcon
		}
	</Button>;
}
