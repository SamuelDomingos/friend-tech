"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Plus, SearchIcon, Trash2 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

import { iniciais } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"

import { ExternalDoctorDialog } from "./_components/external-doctor-dialog"
import {
  externalDoctorsMock,
  type ExternalDoctor,
} from "./_components/mock-data"

export default function ExternalDoctorsManagementPage() {
  const [doctors, setDoctors] = useState<ExternalDoctor[]>(
    externalDoctorsMock
  )
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ExternalDoctor | null>(null)

  const filtered = search.trim()
    ? doctors.filter(
        (d) =>
          d.nome.toLowerCase().includes(search.toLowerCase()) ||
          d.cpfCnpj.toLowerCase().includes(search.toLowerCase())
      )
    : doctors

  const abrirNovo = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const abrirEdicao = (doctor: ExternalDoctor) => {
    setEditing(doctor)
    setDialogOpen(true)
  }

  const salvar = (doctor: ExternalDoctor) => {
    setDoctors((atual) => {
      const existe = atual.some((d) => d.id === doctor.id)
      return existe
        ? atual.map((d) => (d.id === doctor.id ? doctor : d))
        : [...atual, doctor]
    })
    setDialogOpen(false)
  }

  const excluir = (id: string) => {
    setDoctors((atual) => atual.filter((d) => d.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Gerenciamento de Médicos Externos
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode gerenciar os médicos externos da sua
          clínica.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <InputGroup className="sm:max-w-xs">
            <InputGroupInput
              placeholder="Filtrar por nome/CPF/CNPJ"
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
                <TableHead>CPF/CNPJ</TableHead>
                <TableHead>Conselho</TableHead>
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
                    Nenhum médico externo cadastrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((doctor) => (
                  <TableRow
                    key={doctor.id}
                    className="cursor-pointer"
                    onClick={() => abrirEdicao(doctor)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarImage
                            src={doctor.avatarUrl}
                            alt={doctor.nome}
                          />
                          <AvatarFallback>
                            {iniciais(doctor.nome)}
                          </AvatarFallback>
                        </Avatar>
                        {doctor.nome}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {doctor.cpfCnpj || "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {doctor.conselho
                        ? `${doctor.conselho} ${doctor.numeroConselho}`
                        : "—"}
                    </TableCell>
                    <TableCell
                      className="text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                            onClick={() => abrirEdicao(doctor)}
                          >
                            <Pencil className="size-4" />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => excluir(doctor.id)}
                          >
                            <Trash2 className="size-4" />
                            Remover
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

      <ExternalDoctorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        doctor={editing}
        onSave={salvar}
      />
    </div>
  )
}
