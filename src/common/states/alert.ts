/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview The global state of the message box component.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 * @file alert.ts
 */

// Plugin dependencies.
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

// Custom dependencies.
import {
	MessageBoxProps,
	ButtonOption
} from "@/common/components/message_box.tsx";

// Component enumerations.
export enum MessageType {
	INFORMATION = "information",
	WARNING = "warning",
	SUCCESS = "success",
	ERROR = "error",
	NONE = "none"
};

// State initial values.
const initialState: MessageBoxProps = {
	type: (MessageType != null ? MessageType.NONE : "none"),
	isDisplayed: false,
	closable: true,
	message: '',
	details: '',
	options: [],
	title: ''
};

// State actions and reducers.
const alertSlice = createSlice({
	name: "MessageBox",
	initialState,
	reducers: {
		close: (state: MessageBoxProps): void => {
			// Sets display state.
			state.isDisplayed = false;
		},
		show: (state: MessageBoxProps): void => {
			// Sets display state.
			state.isDisplayed = true;
		},
		dismissable: (
			state: MessageBoxProps, action: PayloadAction<boolean>
		): void => {
			// Updates active closable state.
			state.closable = action.payload;
		},
		setMessage: (
			state: MessageBoxProps, action: PayloadAction<string>
		): void => {
			// Updates active message value.
			state.message = action.payload;
		},
		setDetails: (
			state: MessageBoxProps, action: PayloadAction<string>
		): void => {
			// Updates active details value.
			state.details = action.payload;
		},
		setTitle: (
			state: MessageBoxProps, action: PayloadAction<string>
		): void => {
			// Updates active title value.
			state.title = action.payload;
		},
		setType: (
			state: MessageBoxProps, action: PayloadAction<MessageType>
		): void => {
			// Updates active type value.
			state.type = action.payload;
		},
		setOptions: (
			state: MessageBoxProps, action: PayloadAction<Array<ButtonOption>>
		): void => {
			// Updates active options value.
			state.options = action.payload;
		},
		showWith: (
			state: MessageBoxProps, action: PayloadAction<MessageBoxProps>
		): void => {
			// Updates close event.
			state.onDialogClosed = action.payload.onDialogClosed;
			// Updates active closable state.
			state.closable = action.payload.closable;
			// Updates active message value.
			state.message = action.payload.message;
			// Updates active options value.
			state.options = action.payload.options;
			// Updates active details value.
			state.details = action.payload.details;
			// Updates active title value.
			state.title = action.payload.title;
			// Updates active type value.
			state.type = action.payload.type;
			// Sets display state.
			state.isDisplayed = true;
		}
	}
});

// Exports state reducers by default.
export default alertSlice.reducer;

// Exports all provided state actions.
export const {
	dismissable,
	setDetails,
	setMessage,
	setOptions,
	showWith,
	setTitle,
	setType,
	close,
	show
} = alertSlice.actions;
