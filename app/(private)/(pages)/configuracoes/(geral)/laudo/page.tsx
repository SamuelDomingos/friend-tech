import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AchadosTab } from "./_components/achados-tab"
import { FluxosTab } from "./_components/fluxos-tab"
import { GeralTab } from "./_components/geral-tab"
import { GruposTab } from "./_components/grupos-tab"
import { ModelosTab } from "./_components/modelos-tab"
import { MotivosTab } from "./_components/motivos-tab"

const tabs = [
  { value: "geral", label: "Geral", content: <GeralTab /> },
  { value: "grupos", label: "Grupos", content: <GruposTab /> },
  { value: "modelos", label: "Modelos", content: <ModelosTab /> },
  {
    value: "motivos",
    label: "Motivos de revisão",
    content: <MotivosTab />,
  },
  { value: "fluxos", label: "Fluxos", content: <FluxosTab /> },
  {
    value: "achados",
    label: "Achados críticos",
    content: <AchadosTab />,
  },
]

export default function LaudoConfigPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Laudo</h1>

        <p className="max-w-2xl text-muted-foreground">
          Configurações de grupos, modelos, motivos de revisão, fluxos e achados
          críticos.
        </p>
      </div>

      <Tabs defaultValue="geral">
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
