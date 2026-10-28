"use client"

import { useRouter } from "next/navigation"
import {
  Download,
  FileSpreadsheet,
  FileText,
  SearchIcon,
  SlidersHorizontal,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { POR_PAGINA, usePacientes } from "../_hooks/use-pacientes"
import type { Paciente } from "./dados-mock"
import { ChipsFiltros } from "./pacientes-filtros/chips-filtros"
import { PacientesFiltros } from "./pacientes-filtros"
import { PacientesTabela } from "./pacientes-tabela"
import { DeletePacienteDialog } from "./pacientes-tabela/delete-paciente-dialog"
import { Paginacao } from "./pacientes-tabela/paginacao"

export function PacientesView() {
  const router = useRouter()
  const pacientes = usePacientes()

  function abrirPaciente(paciente: Paciente) {
    router.push(`/pacientes/${paciente.id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <InputGroup className="sm:w-72">
            <InputGroupAddon align="inline-start">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Buscar por nome, cidade ou telefone"
              value={pacientes.busca}
              onChange={(event) => pacientes.setBusca(event.target.value)}
            />
          </InputGroup>

          <Button
            variant="outline"
            onClick={() => pacientes.setFiltrosAberto(true)}
            disabled={pacientes.pacientes.length === 0}
          >
            <SlidersHorizontal className="size-4" />
            Filtros
            {pacientes.temFiltros && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
                {pacientes.filtrosAtivos.length}
              </span>
            )}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              disabled={pacientes.totalFiltrados === 0}
            >
              <Download className="size-4" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={pacientes.exportarPdf}>
              <FileText className="size-4" />
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={pacientes.exportarCsv}>
              <FileSpreadsheet className="size-4" />
              Excel (CSV)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ChipsFiltros
        filtros={pacientes.filtrosAtivos}
        onRemover={pacientes.removerFiltro}
        onLimpar={pacientes.limparFiltros}
      />

      {pacientes.totalFiltrados === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle>Nenhum paciente encontrado</EmptyTitle>
            <EmptyDescription>
              {pacientes.temFiltros || pacientes.busca
                ? "Ajuste a busca ou remova os filtros aplicados."
                : "Cadastre o primeiro paciente para começar."}
            </EmptyDescription>
          </EmptyHeader>

          {(pacientes.temFiltros || pacientes.busca) && (
            <EmptyContent>
              <Button
                variant="outline"
                size="sm"
                onClick={pacientes.limparFiltros}
              >
                Limpar filtros
              </Button>
            </EmptyContent>
          )}
        </Empty>
      ) : (
        <>
          <PacientesTabela
            pacientes={pacientes.paginados}
            onAbrir={abrirPaciente}
            onDeletar={pacientes.setDeletando}
          />

          <Paginacao
            paginaAtual={pacientes.paginaAtual}
            totalPaginas={pacientes.totalPaginas}
            totalItens={pacientes.totalFiltrados}
            porPagina={POR_PAGINA}
            onMudarPagina={pacientes.setPagina}
          />
        </>
      )}

      <PacientesFiltros
        open={pacientes.filtrosAberto}
        onOpenChange={pacientes.setFiltrosAberto}
        filtros={pacientes.filtros}
        onAplicar={pacientes.setFiltros}
        onLimpar={pacientes.limparFiltros}
      />

      <DeletePacienteDialog
        paciente={pacientes.deletando}
        onOpenChange={(open) => {
          if (!open) {
            pacientes.setDeletando(null)
          }
        }}
        onConfirmar={pacientes.confirmarExclusao}
      />
    </div>
  )
}
