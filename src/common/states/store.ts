/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview The global state management module.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @version 0.0.1
 * @file store.ts
 */

// Plugin dependencies.
import {configureStore, Store} from "@reduxjs/toolkit";
import alert from "./alert.ts";
import app from "./app.ts";

// Global store configuration.
export const store: Store = configureStore({
	reducer: {alert, app},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false
	})
});

// Store getters.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
