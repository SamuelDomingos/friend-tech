"use client"

import { useState } from "react"
import { isSameDay, parseISO } from "date-fns"
import { CheckIcon, InfoIcon, SearchIcon } from "lucide-react"

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import type { IEvent, IUser } from "@/app/(private)/(pages)/agenda/_components/calendar/interfaces"

interface SelectProfessionalsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  users: IUser[]
  events: IEvent[]
  favoriteIds: Set<string>
  onConfirm: (ids: Set<string>) => void
}

export function SelectProfessionalsDialog({
  open,
  onOpenChange,
  users,
  events,
  favoriteIds,
  onConfirm,
}: SelectProfessionalsDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [onlyWithScheduleToday, setOnlyWithScheduleToday] = useState(false)
  const [staged, setStaged] = useState<Set<string>>(new Set(favoriteIds))

  // Reseed a seleção rascunho toda vez que o diálogo abre (padrão "ajustar
  // estado durante a renderização" do React, evitando setState num efeito).
  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setStaged(new Set(favoriteIds))
      setSearchTerm("")
      setOnlyWithScheduleToday(false)
    }
  }

  const toggleUser = (id: string) => {
    setStaged((atual) => {
      const proximo = new Set(atual)
      if (proximo.has(id)) {
        proximo.delete(id)
      } else {
        proximo.add(id)
      }
      return proximo
    })
  }

  const hasScheduleToday = (userId: string) =>
    events.some(
      (event) => event.user.id === userId && isSameDay(parseISO(event.startDate), new Date())
    )

  const filtrados = users.filter((user) => {
    if (searchTerm.trim() && !user.name.toLowerCase().includes(searchTerm.trim().toLowerCase())) {
      return false
    }
    if (onlyWithScheduleToday && !hasScheduleToday(user.id)) {
      return false
    }
    return true
  })

  const confirmar = () => {
    onConfirm(staged)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <DialogHeader className="flex-row items-center justify-between gap-2 space-y-0">
          <DialogTitle>Selecionar profissionais</DialogTitle>

          <Tooltip>
            <TooltipTrigger asChild>
              <label className="flex cursor-pointer items-center gap-1.5 text-xs font-normal text-muted-foreground">
                <Checkbox
                  checked={onlyWithScheduleToday}
                  onCheckedChange={(checked) => setOnlyWithScheduleToday(Boolean(checked))}
                />
                Somente com agenda hoje
                <InfoIcon className="size-3.5" />
              </label>
            </TooltipTrigger>
            <TooltipContent>
              <p>Profissionais com agendamentos para hoje</p>
            </TooltipContent>
          </Tooltip>
        </DialogHeader>

        <InputGroup>
          <InputGroupInput
            placeholder="Buscar profissional"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <div className="grid max-h-80 grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4">
          {filtrados.map((user) => {
            const [primeiroNome, ...resto] = user.name.split(" ")
            const isSelected = staged.has(user.id)

            return (
              <button
                key={user.id}
                type="button"
                onClick={() => toggleUser(user.id)}
                className="flex flex-col items-center gap-1 rounded-lg p-2 text-center hover:bg-muted"
              >
                <Avatar size="lg">
                  <AvatarImage src={user.avatar ?? undefined} />
                  <AvatarFallback>{primeiroNome[0]}</AvatarFallback>
                  {isSelected && (
                    <AvatarBadge>
                      <CheckIcon />
                    </AvatarBadge>
                  )}
                </Avatar>
                <span className="w-full truncate text-xs font-medium">{primeiroNome}</span>
                {resto.length > 0 && (
                  <span className="w-full truncate text-xs text-muted-foreground">
                    {resto.join(" ")}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
          <Button type="button" onClick={confirmar}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
