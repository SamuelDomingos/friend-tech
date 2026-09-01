import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { BrasindiceTab } from "./_components/brasindice-tab"
import { MatmedsTab } from "./_components/matmeds-tab"
import { ProcedimentosTab } from "./_components/procedimentos-tab"

export default function PriceTablesManagementPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Gerenciamento de Tabela de Preços
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode gerenciar as tabelas de preços da sua
          clínica.
        </p>
      </div>

      <Tabs defaultValue="brasindice">
        <TabsList variant="line">
          <TabsTrigger value="brasindice">BrasIndice</TabsTrigger>
          <TabsTrigger value="procedimentos">Procedimentos</TabsTrigger>
          <TabsTrigger value="matmeds">Matmeds</TabsTrigger>
        </TabsList>

        <TabsContent value="brasindice" className="mt-4">
          <BrasindiceTab />
        </TabsContent>

        <TabsContent value="procedimentos" className="mt-4">
          <ProcedimentosTab />
        </TabsContent>

        <TabsContent value="matmeds" className="mt-4">
          <MatmedsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
