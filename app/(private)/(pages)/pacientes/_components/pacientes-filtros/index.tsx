"use client"

import { useState } from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useFiltrosPacientes } from "../../_hooks/use-filtros-pacientes"
import type { PacienteFiltros } from "../../_hooks/use-pacientes"
import { PeriodoDatas } from "./periodo-datas"

const VIP_OPCOES = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
] as const

const ANIVERSARIANTE_OPCOES = [
  { value: "hoje", label: "Hoje" },
  { value: "mes", label: "Mês" },
] as const

const ATENDIMENTO_OPCOES = [
  { value: "ultimo", label: "Último atendimento" },
  { value: "proximo", label: "Próximo atendimento" },
] as const

const MAX_CHIPS = 3

interface PacientesFiltrosProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filtros: PacienteFiltros
  onAplicar: (filtros: PacienteFiltros) => void
  onLimpar: () => void
}

export function PacientesFiltros({
  open,
  onOpenChange,
  filtros,
  onAplicar,
  onLimpar,
}: PacientesFiltrosProps) {
  const [convenioOpen, setConvenioOpen] = useState(false)

  const {
    rascunho,
    setCampo,
    limparRascunho,
    buscaConvenio,
    setBuscaConvenio,
    conveniosVisiveis,
    conveniosSelecionados,
    todosConveniosSelecionados,
    alternarConvenio,
    alternarTodosConvenios,
    removerConvenio,
  } = useFiltrosPacientes({ open, base: filtros })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 px-4 py-4">
            <Field>
              <FieldLabel>Convênio</FieldLabel>

              <Popover open={convenioOpen} onOpenChange={setConvenioOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={convenioOpen}
                    className="flex min-h-9 w-full items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-left text-sm transition-colors outline-none hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {conveniosSelecionados.length === 0 ? (
                      <span className="py-0.5 text-muted-foreground">
                        Buscar convênio
                      </span>
                    ) : (
                      <span className="flex flex-1 flex-wrap items-center gap-1">
                        {conveniosSelecionados
                          .slice(0, MAX_CHIPS)
                          .map((convenio) => (
                            <span
                              key={convenio}
                              className="flex h-6 items-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium"
                              role="button"
                              onClick={(event) => {
                                event.stopPropagation()
                                removerConvenio(convenio)
                              }}
                            >
                              {convenio}
                              <span className="text-muted-foreground">×</span>
                            </span>
                          ))}
                        {conveniosSelecionados.length > MAX_CHIPS && (
                          <span className="text-xs text-muted-foreground">
                            +{conveniosSelecionados.length - MAX_CHIPS}
                          </span>
                        )}
                      </span>
                    )}
                    <ChevronDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground" />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  side="bottom"
                  className="w-[var(--radix-popover-trigger-width)] p-0"
                >
                  <div className="space-y-1 p-2">
                    <InputGroup>
                      <InputGroupAddon align="inline-start">
                        <SearchIcon className="size-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="Buscar convênio"
                        value={buscaConvenio}
                        onChange={(event) =>
                          setBuscaConvenio(event.target.value)
                        }
                      />
                    </InputGroup>

                    <label className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent">
                      <Checkbox
                        checked={todosConveniosSelecionados}
                        onCheckedChange={alternarTodosConvenios}
                      />
                      <span className="text-sm">Selecionar todos</span>
                    </label>
                  </div>

                  <div className="border-t p-1">
                    {conveniosVisiveis.length === 0 ? (
                      <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                        Nenhum convênio encontrado.
                      </p>
                    ) : (
                      <ScrollArea className="max-h-56">
                        <div className="space-y-0.5">
                          {conveniosVisiveis.map((convenio) => {
                            const selecionado =
                              conveniosSelecionados.includes(convenio)

                            return (
                              <label
                                key={convenio}
                                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                              >
                                <Checkbox
                                  checked={selecionado}
                                  onCheckedChange={() =>
                                    alternarConvenio(convenio)
                                  }
                                />
                                <span className="flex-1">{convenio}</span>
                                {selecionado && (
                                  <CheckIcon className="size-4 text-primary" />
                                )}
                              </label>
                            )
                          })}
                        </div>
                      </ScrollArea>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </Field>

            <Field>
              <FieldLabel htmlFor="filtro-cidade-estado">
                Cidade ou Estado
              </FieldLabel>
              <Input
                id="filtro-cidade-estado"
                placeholder="Digite a cidade ou estado"
                value={rascunho.cidadeEstado}
                onChange={(event) =>
                  setCampo("cidadeEstado", event.target.value)
                }
              />
            </Field>

            <Field>
              <FieldLabel>VIP</FieldLabel>
              <Select
                value={rascunho.vip}
                onValueChange={(valor) =>
                  setCampo("vip", valor as PacienteFiltros["vip"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {VIP_OPCOES.map((opcao) => (
                      <SelectItem key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Aniversariante</FieldLabel>
              <Select
                value={rascunho.aniversariante}
                onValueChange={(valor) =>
                  setCampo(
                    "aniversariante",
                    valor as PacienteFiltros["aniversariante"]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {ANIVERSARIANTE_OPCOES.map((opcao) => (
                      <SelectItem key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Data de criação</FieldLabel>
              <PeriodoDatas
                inicio={rascunho.criadoInicio}
                fim={rascunho.criadoFim}
                onInicioChange={(valor) =>
                  setCampo("criadoInicio", valor)
                }
                onFimChange={(valor) => setCampo("criadoFim", valor)}
              />
            </Field>

            <Field>
              <FieldLabel>Data de agendamentos</FieldLabel>
              <Select
                value={rascunho.atendimentoTipo}
                onValueChange={(valor) =>
                  setCampo(
                    "atendimentoTipo",
                    valor as PacienteFiltros["atendimentoTipo"]
                  )
                }
              >
                <SelectTrigger className="mb-2">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {ATENDIMENTO_OPCOES.map((opcao) => (
                      <SelectItem key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {rascunho.atendimentoTipo && (
                <PeriodoDatas
                  inicio={rascunho.atendimentoInicio}
                  fim={rascunho.atendimentoFim}
                  onInicioChange={(valor) =>
                    setCampo("atendimentoInicio", valor)
                  }
                  onFimChange={(valor) =>
                    setCampo("atendimentoFim", valor)
                  }
                />
              )}
            </Field>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between gap-2 border-t p-4">
          <Button
            variant="ghost"
            onClick={() => {
              limparRascunho()
              onLimpar()
            }}
          >
            <Trash2 className="size-4" />
            Limpar
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                onAplicar(rascunho)
                onOpenChange(false)
              }}
            >
              Filtrar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
