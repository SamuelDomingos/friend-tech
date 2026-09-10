"use client"

import { useState } from "react"
import { Check, ChevronDown, Search, Users } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { iniciais } from "@/lib/avatar-utils"

import type { ResumoEvolucao, Agrupamento } from "../../_hooks/use-prontuario"
import type { Profissional } from "../dados-mock"
import { RegistroIcone } from "./registro-icones"
import type { TipoRegistro } from "../dados-mock"

interface EvolucoesPanelProps {
  agrupamento: Agrupamento
  onAgrupamentoChange: (agrupamento: Agrupamento) => void
  equipe: Profissional[]
  filtroEquipe: string[]
  onAlternarEquipe: (id: string) => void
  onLimparEquipe: () => void
  resumo: ResumoEvolucao[]
  filtroTipo: TipoRegistro | ""
  filtroData: string
  onFiltrarResumo: (chave: string) => void
}

export function EvolucoesPanel({
  agrupamento,
  onAgrupamentoChange,
  equipe,
  filtroEquipe,
  onAlternarEquipe,
  onLimparEquipe,
  resumo,
  filtroTipo,
  filtroData,
  onFiltrarResumo,
}: EvolucoesPanelProps) {
  const [buscaEquipe, setBuscaEquipe] = useState("")

  const equipeVisivel = equipe.filter((profissional) =>
    profissional.nome.toLowerCase().includes(buscaEquipe.toLowerCase())
  )

  const ativo = (chave: string) =>
    agrupamento === "tipo"
      ? filtroTipo === chave
      : filtroData === chave

  return (
    <div className="rounded-lg border bg-card p-3">
      <p className="mb-3 text-sm font-medium">Histórico de evoluções</p>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Agrupar por:</span>
          <div className="flex gap-1 rounded-lg border bg-muted p-0.5">
            {(["tipo", "data"] as Agrupamento[]).map((valor) => (
              <button
                key={valor}
                type="button"
                onClick={() => onAgrupamentoChange(valor)}
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-medium capitalize transition-colors",
                  agrupamento === valor
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                {valor === "tipo" ? "Tipo" : "Data"}
              </button>
            ))}
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" size="sm" className="gap-1.5">
              <Users className="size-4" />
              <ChevronDown className="size-3" />
              {filtroEquipe.length > 0 && `(${filtroEquipe.length})`}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Pesquisar"
                value={buscaEquipe}
                onChange={(event) => setBuscaEquipe(event.target.value)}
              />
            </InputGroup>

            <ScrollArea className="mt-2 max-h-40">
              <div className="space-y-1">
                {equipeVisivel.map((profissional) => {
                  const selecionado = filtroEquipe.includes(profissional.id)

                  return (
                    <label
                      key={profissional.id}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                    >
                      <Checkbox
                        checked={selecionado}
                        onCheckedChange={() =>
                          onAlternarEquipe(profissional.id)
                        }
                      />
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[9px]">
                          {iniciais(profissional.nome)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate">{profissional.nome}</span>
                    </label>
                  )
                })}
              </div>
            </ScrollArea>

            <div className="mt-2 flex items-center justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={onLimparEquipe}>
                Limpar
              </Button>
              <Button type="button" size="sm">
                Filtrar ({filtroEquipe.length})
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <ScrollArea className="mt-3 max-h-64">
        <ul className="divide-y">
          {resumo.map((item) => (
            <li key={item.chave}>
              <button
                type="button"
                onClick={() => onFiltrarResumo(item.chave)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-accent",
                  ativo(item.chave) && "bg-accent"
                )}
              >
                {agrupamento === "tipo" ? (
                  <RegistroIcone
                    tipo={item.chave as TipoRegistro}
                    className="size-4"
                  />
                ) : (
                  <span className="w-4" />
                )}
                <span className="flex-1 truncate">
                  {item.rotulo} ({item.quantidade})
                </span>
                {ativo(item.chave) && <Check className="size-4 text-primary" />}
              </button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
