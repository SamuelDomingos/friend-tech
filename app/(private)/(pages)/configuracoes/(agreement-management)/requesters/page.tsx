import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { GeneralRuleTab } from "./_components/general-rule-tab"
import { RequestersTab } from "./_components/requesters-tab"

export default function RequestersManagementPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Gerenciamento de Solicitantes
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode gerenciar os solicitantes da sua clínica.
        </p>
      </div>

      <Tabs defaultValue="solicitantes">
        <TabsList variant="line">
          <TabsTrigger value="solicitantes">Solicitantes</TabsTrigger>
          <TabsTrigger value="regra-geral">Regra Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="solicitantes" className="mt-4">
          <RequestersTab />
        </TabsContent>

        <TabsContent value="regra-geral" className="mt-4">
          <GeneralRuleTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
