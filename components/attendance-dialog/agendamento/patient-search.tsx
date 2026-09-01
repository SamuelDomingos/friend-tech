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
import { Badge } from "@/components/ui/badge"
import { formatCPF, formatDate } from "@/lib/utils"

import { pacientesMock, type Paciente } from "../mock-data"

interface PatientSearchProps {
  value: string
  onChange: (nome: string) => void
  selectedPatient: Paciente | null
  onSelectPatient: (paciente: Paciente | null) => void
}

export function PatientSearch({
  value,
  onChange,
  selectedPatient,
  onSelectPatient,
}: PatientSearchProps) {
  const [open, setOpen] = useState(false)

  const cpfDigits = value.replace(/\D/g, "")
  const filteredPacientes = value.trim()
    ? pacientesMock.filter(
        (paciente) =>
          paciente.nome.toLowerCase().includes(value.toLowerCase()) ||
          (cpfDigits && paciente.cpf.includes(cpfDigits))
      )
    : []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    onSelectPatient(null)
    setOpen(e.target.value.trim().length > 0)
  }

  const handleSelect = (paciente: Paciente) => {
    onSelectPatient(paciente)
    onChange(paciente.nome)
    setOpen(false)
  }

  const handleBlur = () => {
    setTimeout(() => setOpen(false), 150)
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="attendance-patient-search" className="text-sm font-medium">
          Nome <span className="text-destructive">*</span>
        </label>
        {value.trim() && !selectedPatient && (
          <Badge variant="default">NOVO</Badge>
        )}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <InputGroup>
            <InputGroupInput
              id="attendance-patient-search"
              placeholder="Busque por nome ou CPF"
              value={value}
              onChange={handleChange}
              onFocus={() => setOpen(value.trim().length > 0)}
              onBlur={handleBlur}
              autoComplete="off"
            />
            <InputGroupAddon align="inline-end">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </PopoverAnchor>

        {filteredPacientes.length > 0 && (
          <PopoverContent
            className="w-96 p-2"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <ItemGroup>
              {filteredPacientes.map((paciente) => (
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
                      <ItemTitle className="font-semibold">
                        {paciente.nome}
                      </ItemTitle>
                      <ItemDescription className="text-xs">
                        {formatCPF(paciente.cpf)} ·{" "}
                        {formatDate(paciente.dataNascimento)}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </button>
              ))}
            </ItemGroup>
          </PopoverContent>
        )}
      </Popover>
    </div>
  )
}
