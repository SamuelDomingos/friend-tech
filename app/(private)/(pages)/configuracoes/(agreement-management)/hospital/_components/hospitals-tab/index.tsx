"use client"

import { useState } from "react"
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

import { HospitalDialog } from "./hospital-dialog"
import { hospitalsMock, type Hospital } from "../mock-data"

export function HospitalsTab() {
  const [hospitals, setHospitals] = useState<Hospital[]>(hospitalsMock)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Hospital | null>(null)

  const filtered = search.trim()
    ? hospitals.filter(
        (h) =>
          h.nome.toLowerCase().includes(search.toLowerCase()) ||
          h.cnes.toLowerCase().includes(search.toLowerCase())
      )
    : hospitals

  const abrirNovo = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const abrirEdicao = (hospital: Hospital) => {
    setEditing(hospital)
    setDialogOpen(true)
  }

  const salvar = (hospital: Hospital) => {
    setHospitals((atual) => {
      const existe = atual.some((h) => h.id === hospital.id)
      return existe
        ? atual.map((h) => (h.id === hospital.id ? hospital : h))
        : [...atual, hospital]
    })
    setDialogOpen(false)
  }

  const excluir = (id: string) => {
    setHospitals((atual) => atual.filter((h) => h.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button type="button" onClick={abrirNovo}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CNES</TableHead>
              <TableHead>Convênios configurados</TableHead>
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
                  Nenhum hospital encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((hospital) => {
                const configurados = hospital.convenios.filter(
                  (c) => c.hospitalCode || c.hospitalName || c.hospitalCnpj
                )

                return (
                  <TableRow key={hospital.id}>
                    <TableCell className="font-medium">
                      {hospital.nome}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {hospital.cnes}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {configurados.length > 0
                        ? configurados.map((c) => c.convenioNome).join(", ")
                        : "Nenhum convênio configurado"}
                    </TableCell>
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
                          <DropdownMenuItem
                            onClick={() => abrirEdicao(hospital)}
                          >
                            <Pencil className="size-4" />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => excluir(hospital.id)}
                          >
                            <Trash2 className="size-4" />
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <HospitalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        hospital={editing}
        onSave={salvar}
      />
    </div>
  )
}
