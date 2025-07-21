/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview The global state of the application.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 * @file app.ts
 */

// Plugin dependencies.
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

// State properties.
interface SharedProps {
	windowHeight: number,
	windowWidth: number,
	isOnGoing: boolean
}

// State initial values.
const initialState: SharedProps = {
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth,
	isOnGoing: false
};

// State actions and reducers.
const appSlice = createSlice({
	name: "APP_NAME",
	initialState,
	reducers: {
    setWindowHeight: (
			state: SharedProps, action: PayloadAction<number>
		): void => {
			// Updates active browser height.
			state.windowHeight = action.payload;
		},
    setWindowWidth: (
			state: SharedProps, action: PayloadAction<number>
		): void => {
			// Updates active browser width.
			state.windowWidth = action.payload;
		},
		onGoing: (
			state: SharedProps, action: PayloadAction<boolean>
		): void => {
			// Updates processing state.
			state.isOnGoing = action.payload;
		}
  }
});

// Exports all provided state actions.
export const {setWindowHeight, setWindowWidth, onGoing} = appSlice.actions;

// Exports state reducers by default.
export default appSlice.reducer;
