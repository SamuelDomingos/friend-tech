"use client"

import { useMemo, useState } from "react"
import { formatDate, isSameDay, parseISO } from "date-fns"
import { History, SearchIcon } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { useCalendar } from "@/app/(private)/(pages)/agenda/_components/calendar/contexts/calendar-context"
import type { IEvent } from "@/app/(private)/(pages)/agenda/_components/calendar/interfaces"
import type { TAttendanceStatus } from "@/app/(private)/(pages)/agenda/_components/calendar/types"
import { ActivitiesDrawer } from "@/app/(private)/(pages)/agenda/_components/attendance-dialog/activities-drawer"

import { AttendanceStatusBadge } from "./status-badge"
import { SingleDateFilter } from "./single-date-filter"

type TGroupBy = "status" | "professional"
type TOrderBy = "horario" | "chegada"

interface AttendanceGroup {
  key: string
  label: string
  events: IEvent[]
}

const STATUS_GROUP_DEFS: {
  key: string
  statuses: TAttendanceStatus[]
  buildLabel: (counts: Record<TAttendanceStatus, number>) => string
}[] = [
  {
    key: "confirmed_scheduled",
    statuses: ["scheduled", "confirmed"],
    buildLabel: (c) => `AGENDADO (${c.scheduled}) / CONFIRMADO (${c.confirmed})`,
  },
  {
    key: "in_attendance_arrived",
    statuses: ["arrived", "in_attendance"],
    buildLabel: (c) => `PRESENTE (${c.arrived}) / EM ATENDIMENTO (${c.in_attendance})`,
  },
  {
    key: "missed_done",
    statuses: ["done", "missed", "canceled"],
    buildLabel: (c) =>
      `ATENDIDOS (${c.done}) / FALTAS (${c.missed}) / CANCELADAS (${c.canceled})`,
  },
]

const EMPTY_STATUS_COUNTS: Record<TAttendanceStatus, number> = {
  scheduled: 0,
  confirmed: 0,
  arrived: 0,
  in_attendance: 0,
  done: 0,
  missed: 0,
  canceled: 0,
}

export function WaitingListView() {
  const { events, users, unidades, selectedUserId, selectedUnidadeIds, setLocalEvents } =
    useCalendar()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [groupBy, setGroupBy] = useState<TGroupBy>("status")
  const [orderBy, setOrderBy] = useState<TOrderBy>("horario")
  const [showObservations, setShowObservations] = useState(false)
  const [activitiesOpen, setActivitiesOpen] = useState(false)

  const unidadeById = useMemo(
    () => new Map(unidades.map((unidade) => [unidade.id, unidade])),
    [unidades]
  )

  const filteredEvents = useMemo(() => {
    const termo = searchTerm.trim().toLowerCase()

    return events.filter((event) => {
      if (!isSameDay(parseISO(event.startDate), selectedDay)) return false
      if (selectedUserId !== "all" && event.user.id !== selectedUserId) return false
      if (selectedUnidadeIds.length > 0 && !selectedUnidadeIds.includes(event.unidadeId)) return false
      if (termo && !event.patientName.toLowerCase().includes(termo)) return false
      return true
    })
  }, [events, selectedDay, selectedUserId, selectedUnidadeIds, searchTerm])

  const sortedEvents = useMemo(() => {
    if (orderBy === "horario") {
      return [...filteredEvents].sort(
        (a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()
      )
    }
    // "Ordem de chegada" — sem um timestamp real de chegada no modelo de dados,
    // usamos a ordem original dos atendimentos como aproximação.
    return filteredEvents
  }, [filteredEvents, orderBy])

  const groups = useMemo<AttendanceGroup[]>(() => {
    if (groupBy === "professional") {
      const porProfissional = new Map<string, IEvent[]>()
      for (const event of sortedEvents) {
        const lista = porProfissional.get(event.user.id) ?? []
        lista.push(event)
        porProfissional.set(event.user.id, lista)
      }

      return users
        .filter((user) => porProfissional.has(user.id))
        .map((user) => {
          const eventosDoProfissional = porProfissional.get(user.id) ?? []
          return {
            key: user.id,
            label: `${user.name.toUpperCase()} (${eventosDoProfissional.length})`,
            events: eventosDoProfissional,
          }
        })
    }

    const counts = sortedEvents.reduce<Record<TAttendanceStatus, number>>(
      (acc, event) => {
        acc[event.status] += 1
        return acc
      },
      { ...EMPTY_STATUS_COUNTS }
    )

    return STATUS_GROUP_DEFS.map((def) => ({
      key: def.key,
      label: def.buildLabel(counts),
      events: sortedEvents.filter((event) => def.statuses.includes(event.status)),
    })).filter((group) => group.events.length > 0)
  }, [sortedEvents, groupBy, users])

  const handleStatusChange = (eventId: string, status: TAttendanceStatus) => {
    setLocalEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, status } : event))
    )
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <InputGroup className="sm:max-w-56">
          <InputGroupInput
            placeholder="Filtrar paciente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <SingleDateFilter date={selectedDay} onChange={setSelectedDay} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline">
              {groupBy === "status" ? "Agrupar status" : "Agrupar profissional"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setGroupBy("status")}>
              Agrupar status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setGroupBy("professional")}>
              Agrupar profissional
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline">
              {orderBy === "horario" ? "Ordenar por horário" : "Ordem de chegada"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setOrderBy("horario")}>
              Ordenar por horário
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOrderBy("chegada")}>
              Ordem de chegada
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Switch
            id="exibir-observacoes"
            checked={showObservations}
            onCheckedChange={setShowObservations}
          />
          <Label htmlFor="exibir-observacoes" className="font-normal">
            Exibir observações
          </Label>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Nenhum atendimento encontrado para este dia.
        </div>
      ) : (
        <Accordion
          key={`${groupBy}-${selectedDay.toDateString()}`}
          type="multiple"
          defaultValue={groups.map((group) => group.key)}
          className="rounded-lg border"
        >
          {groups.map((group) => (
            <AccordionItem key={group.key} value={group.key} className="px-4">
              <AccordionTrigger className="text-sm font-semibold uppercase">
                {group.label}
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-3">
                <div className="overflow-hidden rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Horário</TableHead>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Tipo de atendimento</TableHead>
                        <TableHead>Pagamento</TableHead>
                        <TableHead>Prof/Unidade</TableHead>
                        <TableHead className="text-right">Atividades</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.events.map((event) => (
                        <WaitingListRow
                          key={event.id}
                          event={event}
                          unidadeNome={unidadeById.get(event.unidadeId)?.nome ?? "—"}
                          showObservations={showObservations}
                          onStatusChange={(status) => handleStatusChange(event.id, status)}
                          onOpenActivities={() => setActivitiesOpen(true)}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <ActivitiesDrawer open={activitiesOpen} onOpenChange={setActivitiesOpen} />
    </div>
  )
}

interface WaitingListRowProps {
  event: IEvent
  unidadeNome: string
  showObservations: boolean
  onStatusChange: (status: TAttendanceStatus) => void
  onOpenActivities: () => void
}

function WaitingListRow({
  event,
  unidadeNome,
  showObservations,
  onStatusChange,
  onOpenActivities,
}: WaitingListRowProps) {
  const inicio = parseISO(event.startDate)
  const iniciais = event.patientName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase()

  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col items-start gap-1">
          <span className="font-medium">{formatDate(inicio, "HH:mm")}</span>
          <AttendanceStatusBadge status={event.status} onStatusChange={onStatusChange} />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback>{iniciais}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">
              {event.patientName}
              {event.patientAge ? ` - ${event.patientAge} anos` : ""}
            </p>
            <p className="text-xs text-muted-foreground">
              {showObservations ? event.description || "—" : event.patientPhone || "—"}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>{event.procedureName}</TableCell>
      <TableCell>
        {event.paymentMethod ? (
          event.paymentMethod
        ) : (
          <Badge variant="destructive">Pendente</Badge>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={event.user.avatar ?? undefined} />
            <AvatarFallback>{event.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm">{event.user.name}</p>
            <p className="text-xs text-muted-foreground">{unidadeNome}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              onClick={onOpenActivities}
            >
              <History />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Atividades do agendamento</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
