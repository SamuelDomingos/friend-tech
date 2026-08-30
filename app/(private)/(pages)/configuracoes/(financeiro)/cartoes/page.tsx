"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { maquinetasMock, gruposMock } from "./_components/dados-mock"
import { MaquinetasTab } from "./_components/maquinetas-tab"
import { GruposTab } from "./_components/grupos-tab"

export default function CartoesPage() {
  const [search, setSearch] = useState("")

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Cartões</h1>

        <p className="text-muted-foreground">
          Configuração de maquinetas e grupos de cartão da sua clínica.
        </p>
      </div>

      <Tabs defaultValue="maquinetas">
        <TabsList variant="line">
          <TabsTrigger value="maquinetas">Maquinetas</TabsTrigger>
          <TabsTrigger value="grupos">Grupos</TabsTrigger>
        </TabsList>

        <TabsContent value="maquinetas">
          <MaquinetasTab
            maquinetas={maquinetasMock}
            search={search}
            onSearchChange={setSearch}
          />
        </TabsContent>

        <TabsContent value="grupos">
          <GruposTab
            grupos={gruposMock}
            search={search}
            onSearchChange={setSearch}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
