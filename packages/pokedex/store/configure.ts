import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { pokemonSlice } from "./pokeList";
import { pokemonDetailSlice } from "./pokeDetail";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () =>
  configureStore({
    reducer: {
      [pokemonSlice.name]: pokemonSlice.reducer,
      [pokemonDetailSlice.name]: pokemonDetailSlice.reducer,
    },
    devTools: true,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware()
  });
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];  
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ActionTypes extends Action,ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  ActionTypes
>;

export const wrapper = createWrapper<AppStore>(makeStore);
