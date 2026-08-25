import type { ReactNode } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ConsultoriosSalasTab } from "./_components/consultorios-salas-tab"
import { FilaEsperaTab } from "./_components/fila-espera-tab"
import { RecepcaoTab } from "./_components/recepcao-tab"

const tabs = [
  { value: "consultorios-e-salas", label: "Consultórios e salas" },
  { value: "recepcao", label: "Recepção" },
  { value: "fila-de-espera", label: "Fila de espera" },
]

const tabContent: Record<string, () => ReactNode> = {
  "consultorios-e-salas": () => <ConsultoriosSalasTab />,
  recepcao: () => <RecepcaoTab />,
  "fila-de-espera": () => <FilaEsperaTab />,
}

export default function ConsultoriosConfigPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Consultórios, salas e painel chamador
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Gerencie os consultórios, salas e painel chamador de sua clínica.
        </p>
      </div>

      <Tabs defaultValue="consultorios-e-salas">
        <TabsList variant="line">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {tabContent[tab.value]?.()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
