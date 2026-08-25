"use client"

import { useRef, useState } from "react"
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
import { formatCPF, formatDate } from "@/lib/utils"

interface Paciente {
  id: string
  nome: string
  cpf: string
  dataNascimento: string
}

// Dados fictícios — substituir pela busca real quando o módulo de pacientes existir.
const pacientesMock: Paciente[] = [
  { id: "1", nome: "Maria Silva", cpf: "12345678901", dataNascimento: "1985-03-12" },
  { id: "2", nome: "João Pereira", cpf: "98765432100", dataNascimento: "1978-07-25" },
  { id: "3", nome: "Ana Souza", cpf: "45678912345", dataNascimento: "1992-11-03" },
  { id: "4", nome: "Carlos Oliveira", cpf: "32165498712", dataNascimento: "1965-01-30" },
  { id: "5", nome: "Fernanda Lima", cpf: "78912345678", dataNascimento: "2001-05-19" },
  { id: "6", nome: "Rafael Costa", cpf: "15975348620", dataNascimento: "1988-09-08" },
]

export function SearchPacientes() {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const cpfDigits = search.replace(/\D/g, "")
  const filteredPacientes = search.trim()
    ? pacientesMock.filter(
        (paciente) =>
          paciente.nome.toLowerCase().includes(search.toLowerCase()) ||
          paciente.cpf.includes(cpfDigits)
      )
    : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleSelect = () => {
    // Sem navegação por enquanto — apenas fecha a busca.
    setOpen(false)
    setSearch("")
    inputRef.current?.blur()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    setOpen(value.trim().length > 0)
  }

  const handleBlur = () => {
    setTimeout(() => setOpen(false), 150)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="relative mx-4 hidden max-w-md flex-1 md:block">
          <form onSubmit={handleSubmit} className="w-full">
            <InputGroup>
              <InputGroupInput
                ref={inputRef}
                placeholder="Buscar paciente..."
                value={search}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <InputGroupAddon align="inline-end">
                <SearchIcon className="size-4" />
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>
      </PopoverAnchor>

      {filteredPacientes.length > 0 && (
        <PopoverContent
          className="w-100 mt-2 p-2"
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
                  handleSelect()
                }}
                className="w-full"
              >
                <Item
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                >
                  <ItemContent>
                    <ItemTitle className="font-semibold">
                      {paciente.nome}
                    </ItemTitle>

                    <ItemDescription className="text-xs">
                      {formatCPF(paciente.cpf)} · {formatDate(paciente.dataNascimento)}
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
