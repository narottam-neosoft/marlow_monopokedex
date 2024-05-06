import { Card } from "@pokedex/components";
import React from "react";
import { useSelector } from "react-redux";
import { AppStore, wrapper } from "../store/configure";
import { fetchPockenDetail, selectPokemonDetail } from "../store/pokeDetail";
import { useRouter } from "next/router";
import { IPokemonData } from "../types/index.types";
import { GetServerSideProps } from "next";

const PokemonDetails = () => {
  const details: IPokemonData | null = useSelector(selectPokemonDetail);
  console.log(details, "pokemon details")
  const router = useRouter();
  const getImageUrl = (id?: number) => `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;
  const sprites = {
    front_default: details?.sprites?.front_default || "",
    back_default: details?.sprites?.back_default || ""
  }
  return (
    <>
      <div className="back-container">
        <button className="back" onClick={() => router.back()}>
          BACK
        </button>
      </div>
      <div className="card-container">
        <Card
          name={details?.name ?? ""}
          height={details?.height}
          weight={details?.weight}
          location={details?.location_area_encounters}
          abilities={details?.abilities ?? []}
          image={getImageUrl(details?.id)}
          stats={details?.stats}
          sprites={sprites}
        />
      </div>
    </>
  );
};
export default PokemonDetails;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store: AppStore) => async (context) => {
    const { params } = context;
    const name: string | undefined = Array.isArray(params?.name)
      ? params?.name[0]
      : params?.name;
    if (name) {
      await store.dispatch(fetchPockenDetail(name));
    }

    return {
      props: {},
    };
  });
