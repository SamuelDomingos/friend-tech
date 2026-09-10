"use client"

import { useState } from "react"
import { MinusIcon, PlusCircleIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item"
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover"
import { formatCurrency } from "@/lib/utils"

import { ProcedureSearch, parsePrecoParticular } from "@/components/procedure-search"
import type { ProcedimentoItem } from "../mock-data"

import { TIPOS_ATENDIMENTO } from "@/app/(private)/(pages)/configuracoes/(geral)/agenda/_components/_shared/tipos-atendimento"

interface ProcedimentoTabProps {
  itens: ProcedimentoItem[]
  onChange: (itens: ProcedimentoItem[]) => void
}

function AtendimentoMultiSelect() {
  const [mostrar, setMostrar] = useState(false)
  const [atendimentos, setAtendimentos] = useState<string[]>([])
  const [termo, setTermo] = useState("")
  const [open, setOpen] = useState(false)

  const disponiveis = TIPOS_ATENDIMENTO.filter(
    (tipo) =>
      !atendimentos.includes(tipo) &&
      tipo.toLowerCase().includes(termo.toLowerCase())
  )

  const adicionar = (tipo: string) => {
    setAtendimentos((atual) => [...atual, tipo])
    setTermo("")
    setOpen(false)
  }

  const remover = (index: number) => {
    setAtendimentos((atual) => atual.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        variant="secondary"
        className="w-fit"
        onClick={() => setMostrar((atual) => !atual)}
      >
        <PlusCircleIcon />
        Atendimento
      </Button>

      {mostrar && (
        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Atendimento
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverAnchor asChild>
                <InputGroup>
                  <InputGroupInput
                    placeholder="Buscar"
                    value={termo}
                    onChange={(e) => {
                      setTermo(e.target.value)
                      setOpen(true)
                    }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                    autoComplete="off"
                  />
                </InputGroup>
              </PopoverAnchor>

              {disponiveis.length > 0 && (
                <PopoverContent
                  className="w-96 p-2"
                  align="start"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <ItemGroup>
                    {disponiveis.map((tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          adicionar(tipo)
                        }}
                        className="w-full"
                      >
                        <Item variant="outline" className="cursor-pointer hover:bg-accent">
                          <ItemContent>
                            <ItemTitle>{tipo}</ItemTitle>
                          </ItemContent>
                        </Item>
                      </button>
                    ))}
                  </ItemGroup>
                </PopoverContent>
              )}
            </Popover>
          </div>

          {atendimentos.length > 0 && (
            <ul className="flex flex-col divide-y rounded-md border">
              {atendimentos.map((tipo, index) => (
                <li
                  key={`${tipo}-${index}`}
                  className="flex items-center justify-between px-4 py-2 text-sm"
                >
                  {tipo}
                  <button type="button" onClick={() => remover(index)}>
                    <XIcon className="size-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export function ProcedimentoTab({ itens, onChange }: ProcedimentoTabProps) {
  const total = itens.reduce(
    (soma, item) => soma + item.quantidade * item.precoUnitario,
    0
  )

  const adicionarProcedimento = (procedure: ProcedimentoItem["procedure"]) => {
    const existente = itens.find((item) => item.procedure.id === procedure.id)
    if (existente) {
      onChange(
        itens.map((item) =>
          item.procedure.id === procedure.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      )
      return
    }

    onChange([
      ...itens,
      {
        procedure,
        quantidade: 1,
        precoUnitario: parsePrecoParticular(procedure.precoParticular),
      },
    ])
  }

  const atualizarQuantidade = (procedureId: string, delta: number) => {
    onChange(
      itens
        .map((item) =>
          item.procedure.id === procedureId
            ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
            : item
        )
    )
  }

  const atualizarPreco = (procedureId: string, precoUnitario: number) => {
    onChange(
      itens.map((item) =>
        item.procedure.id === procedureId ? { ...item, precoUnitario } : item
      )
    )
  }

  const remover = (procedureId: string) => {
    onChange(itens.filter((item) => item.procedure.id !== procedureId))
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 py-2">
      <AtendimentoMultiSelect />

      <ProcedureSearch onSelect={adicionarProcedimento} />

      {itens.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Nenhum procedimento adicionado.
        </p>
      ) : (
        <div className="flex flex-col divide-y rounded-md border">
          {itens.map((item) => (
            <div
              key={item.procedure.id}
              className="flex flex-wrap items-center gap-4 px-4 py-3"
            >
              <div className="min-w-40 flex-1">
                <p className="text-sm font-medium">{item.procedure.nome}</p>
                <p className="text-xs text-muted-foreground">
                  {item.procedure.codigoTuss || "Sem código TUSS"}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  size="icon-sm"
                  variant="outline"
                  onClick={() => atualizarQuantidade(item.procedure.id, -1)}
                  disabled={item.quantidade <= 1}
                >
                  <MinusIcon />
                </Button>
                <span className="w-6 text-center text-sm">
                  {item.quantidade}
                </span>
                <Button
                  type="button"
                  size="icon-sm"
                  variant="outline"
                  onClick={() => atualizarQuantidade(item.procedure.id, 1)}
                >
                  <PlusIcon />
                </Button>
              </div>

              <Input
                type="number"
                min={0}
                step="0.01"
                value={item.precoUnitario}
                onChange={(e) =>
                  atualizarPreco(item.procedure.id, Number(e.target.value) || 0)
                }
                className="w-28 text-right"
              />

              <p className="w-24 text-right text-sm font-semibold">
                {formatCurrency(item.quantidade * item.precoUnitario)}
              </p>

              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => remover(item.procedure.id)}
              >
                <TrashIcon className="text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end border-t pt-4">
        <p className="text-base font-semibold">
          Total: {formatCurrency(total)}
        </p>
      </div>
    </div>
  )
}
