"use client"

import { useState } from "react"
import { ChevronDown, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  CreateAttendanceDialog,
  type CreateAttendanceMode,
} from "@/app/(private)/(pages)/agenda/_components/attendance-dialog"
import type { Paciente } from "@/app/(private)/(pages)/agenda/_components/attendance-dialog/mock-data"
import { AgendaFiltersBar } from "@/app/(private)/(pages)/agenda/_components/agenda-filters"
import { UrgencyDialog } from "@/app/(private)/(pages)/agenda/_components/urgency-dialog"
import { WaitingListView } from "@/app/(private)/(pages)/agenda/_components/waiting-list"
import { TCalendarView } from "./calendar/types"
import { ClientContainer } from "./calendar/components/client-container"

type TAgendaTab = "calendar" | "waiting-list"

interface AgendaTabsProps {
  view: TCalendarView
}

export function AgendaTabs({ view }: AgendaTabsProps) {
  const [tab, setTab] = useState<TAgendaTab>("calendar")
  const [createOpen, setCreateOpen] = useState(false)
  const [createMode, setCreateMode] = useState<CreateAttendanceMode>("atendimento")
  const [initialPaciente, setInitialPaciente] = useState<Paciente | null>(null)
  const [urgencyOpen, setUrgencyOpen] = useState(false)

  const abrirAtendimento = () => {
    setInitialPaciente(null)
    setCreateMode("atendimento")
    setCreateOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button">
              <Plus />
              Adicionar agenda
              <ChevronDown className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={abrirAtendimento}>
              Atendimento
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUrgencyOpen(true)}>
              Urgência
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <CreateAttendanceDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          mode={createMode}
          initialPaciente={initialPaciente}
        />

        <UrgencyDialog
          open={urgencyOpen}
          onOpenChange={setUrgencyOpen}
          onAtender={(paciente) => {
            setInitialPaciente(paciente)
            setCreateMode("urgencia")
            setCreateOpen(true)
          }}
        />
      </div>

      <AgendaFiltersBar />

      <Tabs value={tab} onValueChange={(value) => setTab(value as TAgendaTab)}>
        <TabsList variant="line">
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="waiting-list">Fila de Espera</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4">
          <ClientContainer view={view} />
        </TabsContent>

        <TabsContent value="waiting-list" className="mt-4">
          <div className="overflow-hidden rounded-xl border">
            <WaitingListView />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
