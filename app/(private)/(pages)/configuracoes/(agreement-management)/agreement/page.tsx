import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ConveniosTab } from "./_components/convenios-tab"
import { GruposTab } from "./_components/grupos-tab"
import { AssociacoesTab } from "./_components/associacoes-tab"

export default function AgreementManagementPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Convênios</h1>

        <p className="max-w-2xl text-muted-foreground">
          Gerenciamento de convênios, grupos de convênios e associações da sua
          clínica.
        </p>
      </div>

      <Tabs defaultValue="convenios">
        <TabsList variant="line">
          <TabsTrigger value="convenios">Convênios</TabsTrigger>
          <TabsTrigger value="grupos">Grupos de Convênios</TabsTrigger>
          <TabsTrigger value="associacoes">Associações</TabsTrigger>
        </TabsList>

        <TabsContent value="convenios" className="mt-4">
          <ConveniosTab />
        </TabsContent>

        <TabsContent value="grupos" className="mt-4">
          <GruposTab />
        </TabsContent>

        <TabsContent value="associacoes" className="mt-4">
          <AssociacoesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
