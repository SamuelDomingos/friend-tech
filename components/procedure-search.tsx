"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover"
import { formatCurrency } from "@/lib/utils"

import {
  proceduresMock,
  type Procedure,
} from "@/app/(private)/(pages)/configuracoes/(agreement-management)/procedures/_components/mock-data"

export function parsePrecoParticular(precoParticular: string) {
  const numero = Number(
    precoParticular.replace(/\./g, "").replace(",", ".")
  )
  return Number.isFinite(numero) ? numero : 0
}

interface ProcedureSearchProps {
  onSelect: (procedure: Procedure) => void
}

export function ProcedureSearch({ onSelect }: ProcedureSearchProps) {
  const [term, setTerm] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = term.trim()
    ? proceduresMock.filter(
        (procedure) =>
          procedure.nome.toLowerCase().includes(term.toLowerCase()) ||
          procedure.codigoTuss.includes(term)
      )
    : []

  const handleSelect = (procedure: Procedure) => {
    onSelect(procedure)
    setTerm("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <InputGroup>
          <InputGroupInput
            placeholder="Buscar procedimento por nome ou código TUSS"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value)
              setOpen(e.target.value.trim().length > 0)
            }}
            onFocus={() => setOpen(term.trim().length > 0)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            autoComplete="off"
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>
      </PopoverAnchor>

      {filtered.length > 0 && (
        <PopoverContent
          className="w-96 p-2"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <ItemGroup>
            {filtered.map((procedure) => (
              <button
                key={procedure.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelect(procedure)
                }}
                className="w-full"
              >
                <Item variant="outline" className="cursor-pointer hover:bg-accent">
                  <ItemContent>
                    <ItemTitle className="font-semibold">
                      {procedure.nome}
                    </ItemTitle>
                    <ItemDescription className="text-xs">
                      {procedure.codigoTuss || "Sem código TUSS"} ·{" "}
                      {formatCurrency(parsePrecoParticular(procedure.precoParticular))}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </button>
            ))}
          </ItemGroup>
        </PopoverContent>
      )}
    </Popover>
  )
}
