import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { AppState } from "./configure";
import { HYDRATE } from "next-redux-wrapper";
import { fetchPokemonList } from "@pokedex/utils";
import { IPokeList } from "../types/index.types";

type DataType = {
  name: string;
  url: string;
};

const initialState: {
  data: DataType[];
  count: number;
  allData: DataType[][];
  isLoading: boolean;
  pagination:{
    page:number;
    pageSize:number
  }
} = {
  data: [],
  allData: [],
  count: 0,
  isLoading: false,
  pagination: {
    page: 0,
    pageSize: 10,
  },
};


export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList: (state, action) => {
      state.data = action.payload;
    },
    setAllData: (state, action) => {
      state.allData = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPagination: (state, action)=>{
      state.pagination = {...state.pagination,page: action.payload.page, pageSize:action.payload.pageSize}
}  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action:any) => {
      if(state.pagination.page > action.payload.pokemon.pagination.page){
        return {
          ...state
        }
      }
      return {
        ...state,
        ...action?.payload?.pokemon,
      };
    });
  },
});

export const { setPokemonList, setAllData, setCount, setIsLoading, setPagination } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;

export const selectPokemonListData = (state: AppState) => state.pokemon.data;
export const selectPokemonAllData = (state: AppState) => state.pokemon.allData;
export const selectPokemonCount = (state: AppState) => state.pokemon.count;
export const selectPagination = (state: AppState) => state.pokemon.pagination;
export const isLoadingPokemon = (state: AppState) => state.pokemon.isLoading;

export const fetchPockeList =
  (page: number, limit: number = 10) =>
  async (dispatch: Dispatch, getState: () => AppState) => {
    try {
      const fetchedData = getState().pokemon.allData as DataType[][];

      if (page >= 1 && fetchedData[page - 1]) {
        dispatch(setPokemonList(fetchedData[page - 1]));
      } else {
        dispatch(setIsLoading(true));
        const pageCount = (page - 1) * limit;
        const data: IPokeList = await fetchPokemonList(pageCount, limit);
        const temp = [...fetchedData, data.results];
        if (data.count !== getState().pokemon.count) {
          dispatch(setCount(data.count));
        }
        dispatch(setAllData(temp));
        dispatch(setPokemonList(data.results));
        dispatch(setIsLoading(false));
      }
    } catch (e) {
      dispatch(setPokemonList([{ name: "Error", ulr: "404 Not Found" }]));
    }
  };
