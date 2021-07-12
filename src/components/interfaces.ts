export interface IPokemonListResult {
  name: string;
  url: string;
}

export interface IListItem {
  name: string;
  url: string;
  isFavorite: boolean;
  toggleFavorite(arg0: string): void;
}

export enum LoaderTypes {
  Spin = "spin",
}

export interface ILoaderProps {
  type?: LoaderTypes;
  color?: string;
  height?: string | number;
  width?: string | number;
}
