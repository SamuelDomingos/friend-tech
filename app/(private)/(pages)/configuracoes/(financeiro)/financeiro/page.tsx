import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CentroCustosTab } from "./_components/centro-custos-tab"
import { ContasBancariasTab } from "./_components/contas-bancarias-tab"
import { MarcadoresTab } from "./_components/marcadores-tab"
import { PlanoContasTab } from "./_components/plano-contas-tab"

const tabs = [
  {
    value: "contas-bancarias",
    label: "Contas Bancárias",
    content: <ContasBancariasTab />,
  },
  {
    value: "plano-contas",
    label: "Plano de Contas",
    content: <PlanoContasTab />,
  },
  {
    value: "centro-custos",
    label: "Centro de Custos",
    content: <CentroCustosTab />,
  },
  {
    value: "marcadores",
    label: "Marcador/Tags Financeira",
    content: <MarcadoresTab />,
  },
]

export default function FinanceiroConfigPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Financeiro</h1>

        <p className="max-w-2xl text-muted-foreground">
          Contas bancárias, plano de contas, centro de custos e tags
          financeiras.
        </p>
      </div>

      <Tabs defaultValue="contas-bancarias">
        <TabsList variant="line" className="flex-wrap">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
