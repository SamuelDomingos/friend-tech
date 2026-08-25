import type { ReactNode } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AgendaClinicaTab } from "./_components/agenda-clinica-tab"
import { ConveniosTab } from "./_components/convenios-tab"
import { ExecutantesTab } from "./_components/executantes-tab"
import { FeriadosTab } from "./_components/feriados-tab"
import { GradesHorarioTab } from "./_components/grades-horario-tab"
import { TiposAtendimentoTab } from "./_components/tipo-atendimento/tab"

const tabs = [
  { value: "agenda-da-clinica", label: "Agenda da clínica" },
  { value: "tipos-de-atendimento", label: "Tipos de atendimento" },
  { value: "feriados", label: "Feriados" },
  { value: "executantes", label: "Executantes" },
  { value: "convenios", label: "Convênios" },
  { value: "grades-de-horario", label: "Grades de horário" },
]

const tabContent: Record<string, () => ReactNode> = {
  "agenda-da-clinica": () => <AgendaClinicaTab />,
  "tipos-de-atendimento": () => <TiposAtendimentoTab />,
  feriados: () => <FeriadosTab />,
  executantes: () => <ExecutantesTab />,
  convenios: () => <ConveniosTab />,
  "grades-de-horario": () => <GradesHorarioTab />,
}

export default function AgendaConfigPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Configurações de agenda</h1>

        <p className="max-w-2xl text-muted-foreground">
          Gerencie as configurações de agenda da clínica e dos profissionais
        </p>
      </div>

      <Tabs defaultValue="agenda-da-clinica">
        <TabsList variant="line">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {tabContent[tab.value]?.() ?? (
              <p className="text-sm text-muted-foreground">Em breve.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
