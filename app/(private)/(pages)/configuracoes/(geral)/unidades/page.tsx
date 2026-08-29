import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { GruposTab } from "./_components/grupos-tab"
import { UnidadesTab } from "./_components/unidades-tab"

export default function UnidadesConfigPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Unidades</h1>

        <p className="max-w-2xl text-muted-foreground">
          Gerenciamento e configuração de unidades e grupos.
        </p>
      </div>

      <Tabs defaultValue="unidades">
        <TabsList variant="line">
          <TabsTrigger value="unidades">Unidades</TabsTrigger>
          <TabsTrigger value="grupos">Grupos</TabsTrigger>
        </TabsList>

        <TabsContent value="unidades" className="mt-4">
          <UnidadesTab />
        </TabsContent>

        <TabsContent value="grupos" className="mt-4">
          <GruposTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
