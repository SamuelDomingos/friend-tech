"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Download, SearchIcon, SlidersHorizontal } from "lucide-react"
import { toast } from "sonner"

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

import { usePacientes } from "../_hooks/use-pacientes"
import type { Paciente } from "./dados-mock"
import { PacientesTabela } from "./pacientes-tabela"
import { DeletePacienteDialog } from "./pacientes-tabela/delete-paciente-dialog"
import { PacientesFiltros } from "./pacientes-filtros"

export function PacientesView() {
  const router = useRouter()
  const [filtrosOpen, setFiltrosOpen] = useState(false)

  const {
    pacientes,
    busca,
    setBusca,
    filtros,
    setFiltros,
    limparFiltros,
    filtrados,
    temFiltros,
    deletando,
    setDeletando,
    confirmarExclusao,
  } = usePacientes()

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
              placeholder="Buscar"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </InputGroup>

          <Button
            variant="outline"
            onClick={() => setFiltrosOpen(true)}
            disabled={pacientes.length === 0}
          >
            <SlidersHorizontal className="size-4" />
            Filtros
            {temFiltros && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
                {filtros.convenios.length +
                  Number(Boolean(filtros.cidadeEstado)) +
                  Number(filtros.vip !== "") +
                  Number(filtros.aniversariante !== "") +
                  Number(Boolean(filtros.criadoInicio || filtros.criadoFim)) +
                  Number(filtros.atendimentoTipo !== "")}
              </span>
            )}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={filtrados.length === 0}>
              <Download className="size-4" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast("Exportação em PDF em breve.")}>
              PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast("Exportação em Excel em breve.")}>
              EXCEL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <PacientesTabela
        pacientes={filtrados}
        onAbrir={abrirPaciente}
        onDeletar={setDeletando}
      />

      <PacientesFiltros
        open={filtrosOpen}
        onOpenChange={setFiltrosOpen}
        filtros={filtros}
        onAplicar={setFiltros}
        onLimpar={limparFiltros}
      />

      <DeletePacienteDialog
        paciente={deletando}
        onOpenChange={(open) => {
          if (!open) {
            setDeletando(null)
          }
        }}
        onConfirmar={confirmarExclusao}
      />
    </div>
  )
}
