"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Plus, SearchIcon, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { formatDate } from "@/lib/utils"

interface TipoAtendimento {
  id: string
  nome: string
  duracao: number
  prazoRetorno: string
  tipo: string
  cor: string
  dataCriacao: string
}

// Dados fictícios — substituir pela listagem real quando o módulo existir.
const tiposMock: TipoAtendimento[] = [
  {
    id: "1",
    nome: "Consulta inicial",
    duracao: 30,
    prazoRetorno: "15 dias",
    tipo: "Consulta",
    cor: "#4f46e5",
    dataCriacao: "2026-01-10",
  },
  {
    id: "2",
    nome: "Retorno",
    duracao: 20,
    prazoRetorno: "7 dias",
    tipo: "Retorno",
    cor: "#16a34a",
    dataCriacao: "2026-01-12",
  },
  {
    id: "3",
    nome: "Exame de sangue",
    duracao: 15,
    prazoRetorno: "30 dias",
    tipo: "Exame",
    cor: "#dc2626",
    dataCriacao: "2026-02-03",
  },
  {
    id: "4",
    nome: "Curativo",
    duracao: 10,
    prazoRetorno: "-",
    tipo: "Procedimento",
    cor: "#d97706",
    dataCriacao: "2026-02-20",
  },
  {
    id: "5",
    nome: "Teleconsulta",
    duracao: 30,
    prazoRetorno: "15 dias",
    tipo: "Consulta",
    cor: "#0891b2",
    dataCriacao: "2026-03-05",
  },
  {
    id: "6",
    nome: "Avaliação pré-operatória",
    duracao: 45,
    prazoRetorno: "60 dias",
    tipo: "Procedimento",
    cor: "#7c3aed",
    dataCriacao: "2026-04-02",
  },
]

export function TiposAtendimentoTab() {
  const [search, setSearch] = useState("")

  const filtered = search.trim()
    ? tiposMock.filter((tipo) =>
        tipo.nome.toLowerCase().includes(search.toLowerCase())
      )
    : tiposMock

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar tipo de atendimento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button asChild>
          <Link href="/configuracoes/agenda/tipos-de-atendimento/novo">
            <Plus className="size-4" />
            Adicionar
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do tipo de atendimento</TableHead>
              <TableHead>Duração (min)</TableHead>
              <TableHead>Prazo retorno</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Cor</TableHead>
              <TableHead>Data da criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum tipo de atendimento encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((tipo) => (
                <TableRow key={tipo.id}>
                  <TableCell className="font-medium">{tipo.nome}</TableCell>
                  <TableCell>{tipo.duracao} min</TableCell>
                  <TableCell>{tipo.prazoRetorno}</TableCell>
                  <TableCell>{tipo.tipo}</TableCell>
                  <TableCell>
                    <span
                      className="inline-block size-4 rounded-sm border border-border"
                      style={{ backgroundColor: tipo.cor }}
                    />
                  </TableCell>
                  <TableCell>{formatDate(tipo.dataCriacao)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Ações"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/configuracoes/agenda/tipos-de-atendimento/${tipo.id}`}
                          >
                            <Pencil className="size-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="size-4" />
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
