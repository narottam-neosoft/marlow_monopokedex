export const mockStoreData = {
    pokemon: {
      allData: [],
      data: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      ],
      count: 0,
      pagination: {
        page: 0,
        pageSize: 10,
      },
    },
    pokemonDetail: {
      name: "Pikachu",
      height: "100",
      weight: "250",
      location_area_encounters: "https://pokeapi.co/api/v2/pokemon/3/encounters",
    },
  };