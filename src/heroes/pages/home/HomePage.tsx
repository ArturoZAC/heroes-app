import { useEffect, useMemo } from "react"
import { useSearchParams } from "react-router"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJombotron } from "@/components/custom/CustomJombotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"

const validTabs = ['all', 'favorites', 'heroes', 'villains'];
export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const activeTab = searchParams.get('tab') ?? 'all';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  useEffect(() => {
    if (!validTabs.includes(activeTab)) {
      searchParams.set('tab', 'all');
      setSearchParams(searchParams);
    }
  }, [activeTab, searchParams, setSearchParams]);


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
              prev.set('category', 'all');
              prev.set('page', '1');
              return prev
            })} >All Characters ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'favorites');
              // prev.set('category', 'hero');
              // prev.set('page', '1');
              return prev
            })} className="flex items-center gap-2">Favorites (3)</TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'heroes');
              prev.set('category', 'hero');
              prev.set('page', '1');
              return prev
            })} >Heroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'villains');
              prev.set('category', 'villain');
              prev.set('page', '1');
              return prev
            })} >Villains ({summary?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Todos los favoritos</h1>
            {/* <HeroGrid heroes={heroesResponse?.heroes ?? []} /> */}
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Todos los heroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            <h1>Todos los villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  )
}