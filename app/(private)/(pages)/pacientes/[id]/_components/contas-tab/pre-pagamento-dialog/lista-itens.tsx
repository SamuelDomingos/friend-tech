"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { formatarMoeda } from "../../formatadores"
import type { ItemCatalogo } from "../dados-mock"

export interface ItemSelecionado {
  item: ItemCatalogo
  quantidade: number
}

export function adicionarItem(
  itens: ItemSelecionado[],
  item: ItemCatalogo
): ItemSelecionado[] {
  if (itens.some((i) => i.item.id === item.id)) {
    return itens.map((i) =>
      i.item.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
    )
  }
  return [...itens, { item, quantidade: 1 }]
}

interface ListaItensProps {
  itens: ItemSelecionado[]
  onChange: (itens: ItemSelecionado[]) => void
}

export function ListaItens({ itens, onChange }: ListaItensProps) {
  if (itens.length === 0) {
    return null
  }

  return (
    <ul className="mt-2 divide-y rounded-lg border">
      {itens.map((linha) => (
        <li
          key={linha.item.id}
          className="flex items-center gap-3 px-3 py-2 text-sm"
        >
          <span className="min-w-0 flex-1 truncate">{linha.item.nome}</span>

          <Input
            inputMode="numeric"
            className="h-8 w-16 text-center"
            value={String(linha.quantidade)}
            onChange={(event) =>
              onChange(
                itens.map((i) =>
                  i.item.id === linha.item.id
                    ? {
                        ...i,
                        quantidade: Math.max(
                          1,
                          Number.parseInt(event.target.value, 10) || 1
                        ),
                      }
                    : i
                )
              )
            }
          />

          <span className="w-24 text-right text-muted-foreground">
            {formatarMoeda(linha.item.preco * linha.quantidade)}
          </span>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Remover ${linha.item.nome}`}
            onClick={() =>
              onChange(itens.filter((i) => i.item.id !== linha.item.id))
            }
          >
            <Trash2 className="size-4" />
          </Button>
        </li>
      ))}
    </ul>
  )
}
