import { CustomJombotron } from "@/components/custom/CustomJombotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";

export const SearchPage = () => {
  return (
    <>
      <CustomJombotron
        title="Búsqueda de SuperHeroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadCrumbs currentPage="Buscador de Heroes"
        // breadcrumbs={
        //   [
        //     { label: 'Home1', to: '/'},
        //     { label: 'Home2', to: '/'},
        //     { label: 'Home3', to: '/'},
        //   ]
        // }
      />

      <HeroStats />


      <SearchControls />
    </>
  )
};

export default SearchPage;