import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "@/heroes/interfaces/hero.interface";

interface FavoriteHeroContextProps {
  favorites: Hero[];
  favoriteCount: number;

  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContextProps);

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((heroFavorite) => heroFavorite.id === hero.id);

    if (heroExist) {
      const newFavorites = favorites.filter((heroFavorite) => heroFavorite.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }

    setFavorites([...favorites, hero]);
  };

  // const isFavorite = (hero: Hero) => {
  // return !!favorites.find((heroFavorite) => heroFavorite.id === hero.id);
  // };
  const isFavorite = (hero: Hero) => {
    return favorites.some((heroFavorite) => heroFavorite.id === hero.id);
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favoriteCount: favorites.length,
        favorites: favorites,

        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
