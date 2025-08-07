/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Defines input component.
 * @supported DESKTOP, MOBILE
 * @created 2025-07-14
 * @updated 2025-08-07
 * @file input.tsx
 * @version 0.0.1
 */

// React dependencies.
import {
	KeyboardEventHandler,
	ChangeEventHandler,
	useCallback,
	ElementType,
	useEffect,
	useState,
	useRef
} from "react";

// Chakra dependencies.
import {Text, Flex, Box} from "@chakra-ui/react";

// Custom dependencies.
import {SF_REGULAR} from "@/common/constants/variables.ts";
import {correctString} from "@/common/libraries/std.ts";

// Component property.
export interface TextFieldProps {
	onKeyDown?: (event?: KeyboardEvent) => void,
	onChange: (value: string) => void,
	height?: (number | string),
	label: (string | null),
	placeholder?: string,
	mandatory?: boolean,
	charCount?: number,
	disabled?: boolean,
	mode?: ElementType,
	value?: string,
	error?: string,
	name?: string,
	type: string
}

// Builds input component.
export default function TextField ({
	placeholder,
	charCount,
	mandatory,
	onKeyDown,
	onChange,
	disabled,
	height,
	value,
	error,
	label,
	name,
	type,
	mode
}: TextFieldProps) {
	// Attributes.
	const [isFocused, focus] = useState<boolean>(false);
	error = correctString<string>({input: error});
	const input = useRef<HTMLInputElement>(null);

	// Called all time when input value get changed.
	const handleChange: ChangeEventHandler<HTMLInputElement> = (
		(event): void => onChange(event.target.value)
	);

	// Called when a key is pressed while input has the focus.
	const onKeyPressed: KeyboardEventHandler<HTMLElement> = useCallback(
		(event): void => {
			// Whether `keydown` event is listening on the input.
			if (typeof onKeyDown === "function") onKeyDown(
				event as unknown as KeyboardEvent
			);
		// Dependencies.
		}, [onKeyDown]
	);

	// When the component is rendered.
	useEffect((): void => {
		// Overrides input value.
		if (input.current != null) input.current.value = (value ?? '');
	// Dependencies.
	}, [value]);

	// Builds tsx code.
	return <Box
		fontSize = {{base: 13, sm: 14, md: 15, lg: 16}}
		fontFamily = {SF_REGULAR}
		transition = "all .2s"
		userSelect = "none"
		width = "100%"
	>
		{/** Field */}
		<Flex
			transform = "translate3d(0, 0, 0)"
			backgroundColor = "neutral.1"
			width = "100%"
		>
			{/** Bottom border */}
			<Box
				backgroundColor = {error.length ? "error.500" : "primary.400"}
				right = {!isFocused ? "100%" : 0}
				left = {!isFocused ? "100%" : 0}
				transition = "all .3s"
				borderRadius = {4}
				position = "fixed"
				height = "2px"
				bottom = {0}
			/>
			{/** Input */}
			<Box
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error.
				maxLength = {Number.isInteger(charCount) ? charCount : undefined}
				id = {Math.floor(Math.random() * 1000000).toString()}
				as = {mode != null ? mode : "input"}
				onFocus = {(): void => focus(true)}
				onBlur = {(): void => focus(false)}
				placeholder = {placeholder}
				onKeyDown = {onKeyPressed}
				onChange = {handleChange}
				borderBottomWidth = {2}
				paddingBottom = "1rem"
				paddingInline = "1rem"
				transition = "all .2s"
				paddingTop = "0.9rem"
				disabled = {disabled}
				borderRight = "none"
				borderLeft = "none"
				borderRadius = {0}
				borderTop = "none"
				height = {height}
				outline = "none"
				resize = "none"
				width = "100%"
				type = {type}
				name = {name}
				ref = {input}
				borderBottomColor = {
					isFocused ? "transparent" :
					(error.length ? "error.500" : "neutral.5")
				}
				_hover = {{
					borderBottomColor: (
						isFocused ? "transparent" :
						(
							disabled ? "neutral.6" :
							(error.length ? "error.500" : "primary.200")
						)
					)
				}}
			/>
			{/** Label */}
			<Box
				transform = {mode == null ? "translateY(-50%)" : undefined}
				fontWeight = {isFocused ? "bold" : "normal"}
				pointerEvents = "none"
				transition = "all .2s"
				position = "absolute"
				paddingInline = {2}
				borderRadius = {4}
				paddingBlock = {1}
				left = "1rem"
				zIndex = {1}
				backgroundColor = {
					((value ?? '').length || isFocused) ? "neutral.2" : "neutral.1"
				}
				color = {
					error.length ? "error.500" :
					(isFocused ? "primary.400" : "neutral.10")
				}
				top = {
					mode == null ?
					(
						isFocused ? "-10%" :
						((value ?? '').length ? "-10%" : "50%")
					) :
					(
						isFocused ? "-1.3rem" : 
						((value ?? '').length ? "-1.3rem" : "1rem")
					)
				}
			>
				{/** Content */}
				{label}
				{mandatory && <Text color = "error.500" as = "span"> *</Text>}
			</Box>
		</Flex>
		{/** Error message */}
		{error.length > 0 && <Text
			dangerouslySetInnerHTML = {{__html: error}}
			fontSize = {{base: 12, sm: 13, md: 14}}
			transition = "all .2s"
			color = "error.500"
			marginLeft = {4}
			marginTop = {3}
		/>}
	</Box>;
}
