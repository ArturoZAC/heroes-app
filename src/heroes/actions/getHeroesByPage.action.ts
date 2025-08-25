import { heroApi } from "../api/hero.api";
import type { HeroesReponse } from "../interfaces/heroesResponse.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async(): Promise<HeroesReponse> => {
  const { data } = await heroApi.get<HeroesReponse>('/');

  const heroes = data.heroes.map( hero => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }))

  return {
    ...data,
    heroes,
  };
};