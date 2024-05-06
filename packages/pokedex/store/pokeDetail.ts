import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "./configure";
import { HYDRATE } from "next-redux-wrapper";

import { fetchPokemoByName } from "@pokedex/utils";
import { IPokemonData } from "../types/index.types";

const initialState: { data: IPokemonData | null } = { data: null };

export const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {
    setPokemonDetail(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.pokemonDetail,
      };
    });
  },
});

export const { setPokemonDetail } = pokemonDetailSlice.actions;
export default pokemonDetailSlice.reducer;

export const selectPokemonDetail = (state: AppState) =>
  state.pokemonDetail.data;

export const fetchPockenDetail =
  (name: string) =>
  async (dispatch:Dispatch) => {
    try {
      const res = await fetchPokemoByName(name);
      return dispatch(setPokemonDetail(res)); 
    } catch {
      dispatch(setPokemonDetail(null));
    }
  };
