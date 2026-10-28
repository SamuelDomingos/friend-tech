"use client"

import {
  CheckCircle2,
  Eye,
  Image as ImageIcon,
  MoreHorizontal,
  Printer,
  Send,
  TriangleAlert,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import type { Laudo } from "../dados-mock"

interface AcoesLaudoProps {
  laudo: Laudo
  onVisualizar: (laudo: Laudo) => void
  onImprimir: (laudo: Laudo) => void
  onLiberar: (laudo: Laudo) => void
  onEntregar: (laudo: Laudo) => void
}

export function AcoesLaudo({
  laudo,
  onVisualizar,
  onImprimir,
  onLiberar,
  onEntregar,
}: AcoesLaudoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Ações"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => onVisualizar(laudo)}>
          <Eye className="size-4" />
          {laudo.status === "A_DESCREVER" ? "Editar" : "Visualizar"}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onImprimir(laudo)}>
          <Printer className="size-4" />
          Imprimir
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {laudo.status === "A_DESCREVER" && (
          <DropdownMenuItem onClick={() => onLiberar(laudo)}>
            <CheckCircle2 className="size-4" />
            Liberar laudo
          </DropdownMenuItem>
        )}

        {laudo.status === "LIBERADO" && (
          <DropdownMenuItem onClick={() => onEntregar(laudo)}>
            <Send className="size-4" />
            Entregar laudo
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SeloRevisado() {
  return (
    <Badge
      variant="outline"
      className="border-amber-500/60 bg-amber-500/10 text-[10px] text-amber-700"
    >
      Revisado
    </Badge>
  )
}

export function IconesExame({ laudo }: { laudo: Laudo }) {
  const achadoCritico = laudo.classificacao === "Achado crítico"
  const assinado = laudo.status !== "A_DESCREVER"

  return (
    <div className="flex items-center gap-1.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <ImageIcon className="size-3.5 text-primary" />
          </span>
        </TooltipTrigger>
        <TooltipContent>Imagens anexadas</TooltipContent>
      </Tooltip>

      {assinado && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <CheckCircle2 className="size-3.5 text-primary" />
            </span>
          </TooltipTrigger>
          <TooltipContent>Assinado digitalmente</TooltipContent>
        </Tooltip>
      )}

      {achadoCritico && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <TriangleAlert className="size-3.5 text-primary" />
            </span>
          </TooltipTrigger>
          <TooltipContent>Achados críticos</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
