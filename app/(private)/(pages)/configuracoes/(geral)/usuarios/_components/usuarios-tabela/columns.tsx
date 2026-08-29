"use client"

import { useMemo } from "react"
import { createColumnHelper } from "@tanstack/react-table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { TableFeatures } from "@/components/ui/data-table-features"

import {
  TIPO_LABELS,
  formatarData,
  iniciais,
  type Usuario,
} from "../dados-mock"
import { RowActions } from "./row-actions"
import { DataTableColumnHeader } from "./column-header"

interface UseUsuariosColumnsProps {
  onEditar: (usuario: Usuario) => void
  onDeletar: (usuario: Usuario) => void
}

const columnHelper = createColumnHelper<TableFeatures, Usuario>()

export function useUsuariosColumns({
  onEditar,
  onDeletar,
}: UseUsuariosColumnsProps) {
  return useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor("nome", {
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nome" />
          ),
          cell: ({ row }) => (
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarImage
                  src={row.original.avatarUrl}
                  alt={row.original.nome}
                />
                <AvatarFallback>{iniciais(row.original.nome)}</AvatarFallback>
              </Avatar>

              <span className="font-medium">{row.original.nome}</span>
            </div>
          ),
        }),

        columnHelper.accessor("email", {
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
          ),
          cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue()}</span>
          ),
        }),

        columnHelper.accessor("tipo", {
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tipo" />
          ),
          cell: ({ getValue }) => TIPO_LABELS[getValue()],
          filterFn: "includesString",
        }),

        columnHelper.accessor("pessoaFisica", {
          header: "Pessoa Física",
          cell: ({ getValue }) => (getValue() ? "Sim" : "Não"),
        }),

        columnHelper.accessor("criadoEm", {
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Criado em" />
          ),
          cell: ({ getValue }) => (
            <span className="text-muted-foreground">
              {formatarData(getValue())}
            </span>
          ),
        }),

        columnHelper.accessor("status", {
          enableHiding: true,
          filterFn: "includesString",
        }),

        columnHelper.accessor((row) => `${row.nome} ${row.email}`, {
          id: "busca",
          enableHiding: true,
          filterFn: "includesString",
        }),

        columnHelper.display({
          id: "acoes",
          header: () => <div className="text-right">Ação</div>,
          cell: ({ row }) => (
            <div data-acao className="flex justify-end">
              <RowActions
                usuario={row.original}
                onEditar={onEditar}
                onDeletar={onDeletar}
              />
            </div>
          ),
        }),
      ]),
    [onEditar, onDeletar]
  )
}
