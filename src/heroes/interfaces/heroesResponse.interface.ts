import type { Hero } from "./hero.interface";

export interface HeroesReponse {
  total: number;
  pages: number;
  heroes: Hero[];
}
