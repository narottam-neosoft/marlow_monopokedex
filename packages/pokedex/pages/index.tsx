import type { NextPage } from "next";
import { DataTable, GridColumnDef } from "@pokedex/components";
import { AppDispatch, AppStore, wrapper } from "../store/configure";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPockeList,
  isLoadingPokemon,
  selectPagination,
  selectPokemonCount,
  selectPokemonListData,
  setPagination,
} from "../store/pokeList";
import { useRouter } from "next/router";
import { IPageModel } from "../types/index.types";

const Home: NextPage = () => {
  const columns: GridColumnDef[] = [
    {
      field: "name",
      headerName: "Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "url",
      headerName: "Url",
      flex: 1,
    },
  ];
  const router = useRouter();
  const dispatch = useDispatch() as AppDispatch;
  const pokemonList = useSelector(selectPokemonListData);
  const count = useSelector(selectPokemonCount);
  const isLoading = useSelector(isLoadingPokemon);
  const paginationModel = useSelector(selectPagination);

  const handlePaginationChange = async (value: IPageModel) => {
    dispatch(fetchPockeList(value.page + 1, value.pageSize));
    dispatch(setPagination({ page: value.page, pageSize: value.pageSize }));
  };
  return (
    <div>
      <DataTable
        rows={pokemonList}
        column={columns}
        onRowClick={({ row }) => router.push(`/${row.name}`)}
        getRowId={(e) => e.name}
        rowCount={count}
        isLoading={isLoading}
        pageSizeOptions={[]}
        paginationModel={paginationModel}
        paginationModelChange={handlePaginationChange}
      />
    </div>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store: AppStore) =>
    async () => {
      const paginationModel = store.getState().pokemon.pagination;
      await store.dispatch(
        fetchPockeList(
          paginationModel.page > 0 ? paginationModel.page : 1,
          paginationModel.pageSize
        )
      );
      return {
        props: {},
      };
    }
);
