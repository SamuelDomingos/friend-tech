"use client"

import { useState } from "react"
import {
  CalendarDays,
  ChevronDown,
  Mail,
  MessageCircle,
  PenLine,
  Shield,
  ShieldCheck,
  Star,
  StickyNote,
  Upload,
  Video,
  Camera,
} from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { iniciais } from "@/lib/avatar-utils"
import { calcularIdade } from "@/lib/utils"

import type { PacienteDetalhe } from "./dados-mock"

interface PacienteHeaderProps {
  paciente: PacienteDetalhe
}

export function PacienteHeader({ paciente }: PacienteHeaderProps) {
  const [vip, setVip] = useState(paciente.vip)
  const [nascimento, setNascimento] = useState(() => {
    const [ano, mes, dia] = paciente.dataNascimento.split("-").map(Number)
    return new Date(ano, mes - 1, dia)
  })

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex flex-col gap-6 border-b px-6 py-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <Avatar size="lg" className="size-14!">
              {paciente.avatar ? (
                <AvatarImage src={paciente.avatar} alt={paciente.nome} />
              ) : (
                <AvatarFallback className="text-lg">
                  {iniciais(paciente.nome)}
                </AvatarFallback>
              )}
            </Avatar>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="absolute -right-1 -bottom-1 size-5 rounded-full shadow-sm"
                  aria-label="Alterar foto"
                >
                  <PenLine className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuItem onClick={() => toast("Captura de foto em breve.")}>
                  <Camera className="size-4" />
                  Tirar foto
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast("Anexar foto em breve.")}>
                  <Upload className="size-4" />
                  Anexar foto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="min-w-0 space-y-2">
            <div className="flex items-center gap-3">
              <p className="truncate text-xl font-semibold">{paciente.nome}</p>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-amber-500 hover:text-amber-500"
                aria-label="Alternar VIP"
                onClick={() => {
                  setVip((atual) => !atual)
                  toast(vip ? "Removido de VIP." : "Marcado como VIP.")
                }}
              >
                <Star className={vip ? "fill-current" : ""} />
              </Button>

              {paciente.notaHeader && (
                <Button
                  size="icon-sm"
                  aria-label="Nota do paciente"
                >
                  <StickyNote className="size-4" />
                </Button>
              )}
            </div>

            <ul className="flex flex-wrap items-center gap-6">
              <li>
                <span className="block text-[10px] leading-4 text-muted-foreground uppercase">
                  Idade
                </span>
                <span className="block max-w-32 truncate text-sm">
                  {calcularIdade(nascimento)} anos
                </span>
              </li>
              <li>
                <span className="block text-[10px] leading-4 text-muted-foreground uppercase">
                  Convênio
                </span>
                <span className="block max-w-32 truncate text-sm">
                  {paciente.convenioPrincipal}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Video className="size-4" />
                  <ChevronDown className="size-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => toast("Teleconsulta em breve.")}>
                  <Video className="size-4" />
                  Teleconsulta
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => toast("Abrindo WhatsApp do paciente.")}
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast("Envio de impresso em breve.")}>
                  <Mail className="size-4" />
                  Enviar impresso
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-1 text-xs">
            {paciente.lgpd === "ASSINADO" ? (
              <>
                <ShieldCheck className="size-3.5 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400">
                  Termo LGPD assinado
                </span>
              </>
            ) : (
              <>
                <Shield className="size-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Termo LGPD não assinado
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
