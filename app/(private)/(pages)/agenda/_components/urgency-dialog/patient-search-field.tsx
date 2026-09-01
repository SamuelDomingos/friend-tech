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

import { pacientesMock, type Paciente } from "@/app/(private)/(pages)/agenda/_components/attendance-dialog/mock-data"

interface PatientSearchFieldProps {
  onSelectPatient: (paciente: Paciente) => void
}

export function PatientSearchField({ onSelectPatient }: PatientSearchFieldProps) {
  const [term, setTerm] = useState("")
  const [open, setOpen] = useState(false)

  const termoNormalizado = term.trim().toLowerCase()
  const somenteDigitos = term.replace(/\D/g, "")

  const filtered = termoNormalizado
    ? pacientesMock.filter(
        (paciente) =>
          paciente.nome.toLowerCase().includes(termoNormalizado) ||
          (somenteDigitos && paciente.cpf.includes(somenteDigitos)) ||
          (somenteDigitos &&
            (paciente.telefone ?? "").replace(/\D/g, "").includes(somenteDigitos))
      )
    : []

  const handleSelect = (paciente: Paciente) => {
    onSelectPatient(paciente)
    setTerm(paciente.nome)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <InputGroup>
          <InputGroupInput
            placeholder="Busca por nome, CPF ou telefone"
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
            {filtered.map((paciente) => (
              <button
                key={paciente.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelect(paciente)
                }}
                className="w-full"
              >
                <Item variant="outline" className="cursor-pointer hover:bg-accent">
                  <ItemContent>
                    <ItemTitle className="font-semibold">{paciente.nome}</ItemTitle>
                    <ItemDescription className="text-xs">
                      CPF: {paciente.cpf}
                      {paciente.telefone ? ` · Tel: ${paciente.telefone}` : ""}
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
