import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJombotron } from "@/components/custom/CustomJombotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { getHeroesByPageAction } from "@/heroes/actions/getHeroesByPage.action"

export const HomePage = () => {

  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');


  const { data } = useQuery({
    queryKey: ["heroes"],
    queryFn: () => getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <>
      <>
        <CustomJombotron
          title="Universo de SuperHeroes"
          description="Descubre, explora y administra super héroes y villanos"
        />

        <CustomBreadCrumbs currentPage="SuperHeroes"/>

        <HeroStats />

        {/* Tabs */}
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')} >All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setActiveTab('favorites')}  className="flex items-center gap-2">Favorites (3)</TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setActiveTab('heroes')} >Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setActiveTab('villains')} >Villains (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <HeroGrid />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Todos los favoritos</h1>
            <HeroGrid />
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Todos los heroes</h1>
            <HeroGrid />
          </TabsContent>
          <TabsContent value="villains">
            <h1>Todos los villanos</h1>
            <HeroGrid />
          </TabsContent>
        </Tabs>

        <CustomPagination totalPages={6}/>
      </>
    </>
  )
}