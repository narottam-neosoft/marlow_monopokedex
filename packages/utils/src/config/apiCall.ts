import { makeGetApiCall } from "../helpers";
import { BASE_URL } from "./constants";

export const fetchPokemonList = async (page: number, limit: number = 10) => {
  const res = await makeGetApiCall({
    url: `${BASE_URL}?offset=${page}&limit=${limit}`,
    method: "GET",
  });
  return res.data;
};

export const fetchPokemoByName = async (name: string) => {
    const res = await makeGetApiCall({
      url: `${BASE_URL}/${name}`,
      method: "GET",
    });
    return res.data;
  };

