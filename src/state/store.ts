import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./slices/favorites";

export const store = configureStore({ reducer: favoriteReducer });
export type RootState = ReturnType<typeof store.getState>;
