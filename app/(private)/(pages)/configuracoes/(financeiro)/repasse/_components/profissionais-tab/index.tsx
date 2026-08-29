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

import { profissionaisMock, regrasMock, type Profissional } from "../dados-mock"
import { ProfissionalRegras } from "./profissional-regras"

export function ProfissionaisTab() {
  const [search, setSearch] = useState("")
  const [selecionado, setSelecionado] = useState<Profissional | null>(null)

  if (selecionado) {
    return (
      <ProfissionalRegras
        profissional={selecionado}
        onVoltar={() => setSelecionado(null)}
      />
    )
  }

  const filtered = search.trim()
    ? profissionaisMock.filter((profissional) =>
        profissional.nome.toLowerCase().includes(search.toLowerCase())
      )
    : profissionaisMock

  const quantidadeRegras = (profissionalId: string) =>
    regrasMock.filter(
      (regra) =>
        regra.id.startsWith("r") &&
        profissionaisMock.findIndex((p) => p.id === profissionalId) >= 0
    ).length

  return (
    <div className="space-y-4">
      <InputGroup className="w-full sm:max-w-xs">
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
              <TableHead>Tipo</TableHead>
              <TableHead>Atendimento</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum profissional encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((profissional) => (
                <TableRow
                  key={profissional.id}
                  className="cursor-pointer"
                  onClick={() => setSelecionado(profissional)}
                >
                  <TableCell className="font-medium">
                    {profissional.nome}
                  </TableCell>
                  <TableCell>Profissional de saúde</TableCell>
                  <TableCell className="text-muted-foreground">
                    {quantidadeRegras(profissional.id)} regra(s)
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
