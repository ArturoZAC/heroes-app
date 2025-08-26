import { useEffect, useMemo} from "react"
import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJombotron } from "@/components/custom/CustomJombotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { getHeroesByPageAction } from "@/heroes/actions/getHeroesByPage.action"

const validTabs = ['all' , 'favorites' , 'heroes' , 'villains'];
export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';

  const selectedTab = useMemo(() => {
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);


  const { data: heroesResponse } = useQuery({
    queryKey: ["heroes"],
    queryFn: () => getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if(!validTabs.includes(activeTab)){
      searchParams.set('tab','all');
      setSearchParams(searchParams);
    }
  }, [ activeTab, searchParams, setSearchParams]);

  return (
    <>
      <>
        <CustomJombotron
          title="Universo de SuperHeroes"
          description="Descubre, explora y administra super héroes y villanos"
        />

        <CustomBreadCrumbs currentPage="SuperHeroes" />

        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'all');
              return prev
            })} >All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'favorites');
              return prev
            })} className="flex items-center gap-2">Favorites (3)</TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'heroes');
              return prev
            })} >Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'villains');
              return prev
            })} >Villains (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Todos los favoritos</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Todos los heroes</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="villains">
            <h1>Todos los villanos</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>
        </Tabs>

        <CustomPagination totalPages={6} />
      </>
    </>
  )
}