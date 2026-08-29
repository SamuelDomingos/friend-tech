import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AtendimentoTab } from "./_components/atendimento-tab"
import { ProfissionaisTab } from "./_components/profissionais-tab"

export default function RepasseConfigPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Repasse</h1>

        <p className="max-w-2xl text-muted-foreground">
          Configuração de repasses dos profissionais da sua clínica e suas
          regras.
        </p>
      </div>

      <Tabs defaultValue="atendimento">
        <TabsList variant="line">
          <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
          <TabsTrigger value="regras-por-profissional">
            Regras Por Profissional
          </TabsTrigger>
        </TabsList>

        <TabsContent value="atendimento" className="mt-4">
          <AtendimentoTab />
        </TabsContent>

        <TabsContent value="regras-por-profissional" className="mt-4">
          <ProfissionaisTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
