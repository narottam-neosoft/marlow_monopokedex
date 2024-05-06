export type IAbilityProp = {
  ability: {
    name: string;
    url: string;
  };
};
export interface cardProps {
  name: string;
  height?: number;
  weight?: number;
  location?: string;
  abilities?: IAbilityProp[];
  image?:string;
  stats?: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[];
  sprites: {
    front_default: string;
    back_default: string;
  }
}
