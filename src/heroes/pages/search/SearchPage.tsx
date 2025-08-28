import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { CustomJombotron } from "@/components/custom/CustomJombotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { searchHeroesAction } from "@/heroes/actions/searchHeroes.action";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { SearchControls } from "./ui/SearchControls";

export const SearchPage = () => {

  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ['search', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <>
      <CustomJombotron
        title="Búsqueda de SuperHeroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadCrumbs currentPage="Buscador de Heroes"
      />

      <HeroStats />


      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  )
};

export default SearchPage;