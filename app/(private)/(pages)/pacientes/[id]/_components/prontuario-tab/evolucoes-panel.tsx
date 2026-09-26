"use client"

import { useState } from "react"
import { Check, ChevronDown, Search, Users } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { iniciais } from "@/lib/avatar-utils"

import type { ResumoEvolucao, Agrupamento } from "../../_hooks/use-prontuario"
import type { Profissional, TipoRegistro } from "../dados-mock"
import { RegistroIcone } from "./registro-timeline/icones"

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
    agrupamento === "tipo" ? filtroTipo === chave : filtroData === chave

  return (
    <Card size="sm" className="gap-3 p-3">
      <CardHeader className="p-0">
        <CardTitle className="text-sm font-medium">
          Histórico de evoluções
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Agrupar por:</span>
            <ButtonGroup>
              {(["tipo", "data"] as Agrupamento[]).map((valor) => (
                <Button
                  key={valor}
                  type="button"
                  variant="outline"
                  size="xs"
                  aria-pressed={agrupamento === valor}
                  onClick={() => onAgrupamentoChange(valor)}
                  className="capitalize"
                >
                  {valor}
                </Button>
              ))}
            </ButtonGroup>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
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

              <ScrollArea className="mt-2 *:data-[slot=scroll-area-viewport]:max-h-40">
                <div className="space-y-1">
                  {equipeVisivel.map((profissional) => {
                    const selecionado = filtroEquipe.includes(profissional.id)

                    return (
                      <Item
                        key={profissional.id}
                        asChild
                        size="xs"
                        className="flex-nowrap cursor-pointer"
                      >
                        <label>
                          <Checkbox
                            checked={selecionado}
                            onCheckedChange={() =>
                              onAlternarEquipe(profissional.id)
                            }
                          />
                          <Avatar className="size-5 shrink-0">
                            <AvatarFallback className="text-[9px]">
                              {iniciais(profissional.nome)}
                            </AvatarFallback>
                          </Avatar>
                          <ItemContent className="min-w-0">
                            <ItemTitle className="w-full truncate">
                              {profissional.nome}
                            </ItemTitle>
                          </ItemContent>
                        </label>
                      </Item>
                    )
                  })}
                </div>
              </ScrollArea>

              <div className="mt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onLimparEquipe}
                >
                  Limpar
                </Button>
                <Button type="button" size="sm">
                  Filtrar ({filtroEquipe.length})
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <ScrollArea className="mt-3 *:data-[slot=scroll-area-viewport]:max-h-64">
          <div className="space-y-1">
            {resumo.map((item) => {
              const selecionado = ativo(item.chave)

              return (
                <Item
                  key={item.chave}
                  asChild
                  size="sm"
                  className={cn(
                    "flex-nowrap cursor-pointer",
                    selecionado && "bg-accent"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onFiltrarResumo(item.chave)}
                  >
                    <ItemMedia variant="icon">
                      {agrupamento === "tipo" ? (
                        <RegistroIcone tipo={item.chave as TipoRegistro} />
                      ) : (
                        <span className="size-4" />
                      )}
                    </ItemMedia>
                    <ItemContent className="min-w-0">
                      <ItemTitle className="w-full truncate">
                        {item.rotulo} ({item.quantidade})
                      </ItemTitle>
                    </ItemContent>
                    {selecionado && (
                      <ItemActions>
                        <Check className="size-4 shrink-0 text-primary" />
                      </ItemActions>
                    )}
                  </button>
                </Item>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
