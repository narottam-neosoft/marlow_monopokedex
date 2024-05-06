export interface IResult{
    name:string,
    url:string
}
export interface IPokeList {
  count: number;
  next: string;
  previous: string;
  results: IResult[];
}
export type IAbilityProp = {
  ability: {
    name: string;
    url: string;
  };
};
export type IPokemonData = {
  id:number;
  name: string;
  height?: number;
  weight?: number;
  location_area_encounters?: string;
  abilities?: IAbilityProp[];
  image?:string;
  stats?: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[];
  sprites?: {
    front_default: string;
    back_default: string;
  }
};
export interface IPageModel {
  page: number;
  pageSize: number;
}
