"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface TransferProps {
  disponiveis: string[]
  inclusos: string[]
  onIncludedChange: (inclusos: string[]) => void
  disponiveisTitle?: string
  inclusosTitle?: string
  disponiveisEmpty?: string
  inclusosEmpty?: string
  searchPlaceholder?: string
}

export function Transfer({
  disponiveis,
  inclusos,
  onIncludedChange,
  disponiveisTitle = "Disponíveis",
  inclusosTitle = "Inclusos na regra",
  disponiveisEmpty = "Nenhum item disponível.",
  inclusosEmpty = "Nenhum item incluso.",
  searchPlaceholder = "Pesquisar...",
}: TransferProps) {
  const [searchDisp, setSearchDisp] = useState("")
  const [searchInc, setSearchInc] = useState("")
  const [selDisp, setSelDisp] = useState<Set<string>>(new Set())
  const [selInc, setSelInc] = useState<Set<string>>(new Set())

  const filteredDisp = disponiveis.filter((nome) =>
    nome.toLowerCase().includes(searchDisp.toLowerCase())
  )
  const filteredInc = inclusos.filter((nome) =>
    nome.toLowerCase().includes(searchInc.toLowerCase())
  )

  const toggle = (set: Set<string>, nome: string) => {
    const next = new Set(set)
    if (next.has(nome)) next.delete(nome)
    else next.add(nome)
    return next
  }

  const moveRight = () => {
    if (selDisp.size === 0) return
    onIncludedChange([...inclusos, ...selDisp])
    setSelDisp(new Set())
  }

  const moveLeft = () => {
    if (selInc.size === 0) return
    onIncludedChange(inclusos.filter((nome) => !selInc.has(nome)))
    setSelInc(new Set())
  }

  const renderList = (
    items: string[],
    selected: Set<string>,
    onSelect: (set: Set<string>) => void,
    empty: string
  ) =>
    items.length === 0 ? (
      <p className="px-2 py-4 text-center text-sm text-muted-foreground">
        {empty}
      </p>
    ) : (
      items.map((nome, index) => {
        const isSelected = selected.has(nome)

        return (
          <button
            key={`${nome}-${index}`}
            type="button"
            onClick={() => onSelect(toggle(selected, nome))}
            className={cn(
              "w-full rounded-md px-2 py-1.5 text-left text-sm",
              isSelected
                ? "bg-accent font-medium text-accent-foreground"
                : "hover:bg-muted"
            )}
          >
            {nome}
          </button>
        )
      })
    )

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{disponiveisTitle}</CardTitle>

          <InputGroup>
            <InputGroupInput
              placeholder={searchPlaceholder}
              value={searchDisp}
              onChange={(e) => setSearchDisp(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-64 rounded-md border">
            <div className="space-y-1 p-2">
              {renderList(filteredDisp, selDisp, setSelDisp, disponiveisEmpty)}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-2 md:flex-col">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={moveRight}
          aria-label="Incluir selecionados"
        >
          <ArrowRight className="size-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={moveLeft}
          aria-label="Remover selecionados"
        >
          <ArrowLeft className="size-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{inclusosTitle}</CardTitle>

          <InputGroup>
            <InputGroupInput
              placeholder={searchPlaceholder}
              value={searchInc}
              onChange={(e) => setSearchInc(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-64 rounded-md border">
            <div className="space-y-1 p-2">
              {renderList(filteredInc, selInc, setSelInc, inclusosEmpty)}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
