"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Profissional {
  id: string
  nome: string
  especialidade: string
  regrasAgenda: string
}

// Dados fictícios — substituir pela listagem real quando o módulo existir.
const profissionaisMock: Profissional[] = [
  {
    id: "1",
    nome: "Dra. Maria Silva",
    especialidade: "Pediatria",
    regrasAgenda: "Padrão",
  },
  {
    id: "2",
    nome: "Dr. João Pereira",
    especialidade: "Clínico Geral",
    regrasAgenda: "Padrão",
  },
  {
    id: "3",
    nome: "Dra. Ana Souza",
    especialidade: "Cardiologia",
    regrasAgenda: "Personalizada",
  },
  {
    id: "4",
    nome: "Dr. Carlos Oliveira",
    especialidade: "Ortopedia",
    regrasAgenda: "Padrão",
  },
  {
    id: "5",
    nome: "Dra. Fernanda Lima",
    especialidade: "Dermatologia",
    regrasAgenda: "Personalizada",
  },
]

export function ExecutantesTab() {
  const [search, setSearch] = useState("")

  const filtered = search.trim()
    ? profissionaisMock.filter((profissional) =>
        profissional.nome.toLowerCase().includes(search.toLowerCase())
      )
    : profissionaisMock

  return (
    <div className="space-y-4">
      <InputGroup className="sm:max-w-xs">
        <InputGroupInput
          placeholder="Pesquisar profissional..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <SearchIcon className="size-4" />
        </InputGroupAddon>
      </InputGroup>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profissional</TableHead>
              <TableHead>Regras de agenda</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum profissional encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((profissional) => (
                <TableRow key={profissional.id}>
                  <TableCell>
                    <span className="font-medium">{profissional.nome}</span>
                    <span className="ml-2 text-muted-foreground">
                      {profissional.especialidade}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {profissional.regrasAgenda}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
