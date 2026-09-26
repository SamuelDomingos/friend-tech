"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Download,
  MoreHorizontal,
  Plus,
  SearchIcon,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

import { conveniosMock, type Convenio } from "../dados-mock"

export function ConveniosTab() {
  const router = useRouter()
  const [convenios, setConvenios] = useState<Convenio[]>(conveniosMock)
  const [search, setSearch] = useState("")

  const filtered = search.trim()
    ? convenios.filter(
        (c) =>
          c.nome.toLowerCase().includes(search.toLowerCase()) ||
          c.contractName.toLowerCase().includes(search.toLowerCase())
      )
    : convenios

  const excluir = (id: string) => {
    setConvenios((atual) => atual.filter((c) => c.id !== id))
  }

  const formatarData = (iso: string) => {
    const [y, m, d] = iso.split("-")
    return `${d}/${m}/${y}`
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar convênio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="size-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>PDF Resumo Completo</DropdownMenuItem>
              <DropdownMenuItem>Excel Resumo Completo</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Excel Detalhado</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/configuracoes/agreement/novo">
            <Button>
              <Plus className="size-4" />
              Adicionar
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Contratado</TableHead>
              <TableHead>Última atualização</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum convênio encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((convenio) => (
                <TableRow
                  key={convenio.id}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/configuracoes/agreement/${convenio.id}`)
                  }
                >
                  <TableCell className="font-medium">
                    {convenio.nome}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {convenio.contractName || "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatarData(convenio.ultimaAtualizacao)}
                  </TableCell>
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label="Ações"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(convenio.id)}
                        >
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
