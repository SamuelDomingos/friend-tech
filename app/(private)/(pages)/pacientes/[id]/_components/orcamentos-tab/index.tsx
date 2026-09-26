"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import type { PacienteDetalhe } from "../dados-mock"
import {
  orcamentosMock,
  resumirOrcamentos,
  type StatusOrcamento,
} from "./dados-mock"
import { OrcamentoDialog } from "./orcamento-dialog"
import { ResumoStatus } from "./resumo-status"
import { TabelaOrcamentos } from "./tabela-orcamentos"
import { ButtonGroup } from "@/components/ui/button-group"

interface OrcamentosTabProps {
  paciente: PacienteDetalhe
}

export function OrcamentosTab({ paciente }: OrcamentosTabProps) {
  const [inicio, setInicio] = useState<Date | undefined>()
  const [fim, setFim] = useState<Date | undefined>()
  const [busca, setBusca] = useState("")
  const [status, setStatus] = useState<StatusOrcamento | "">("")
  const [dialogAberto, setDialogAberto] = useState(false)

  const termo = busca.trim().toLowerCase()
  const filtrados = orcamentosMock.filter((orcamento) => {
    if (status && orcamento.status !== status) {
      return false
    }
    if (termo && !orcamento.descricao.toLowerCase().includes(termo)) {
      return false
    }
    return true
  })

  function selecionarMes() {
    const agora = new Date()
    setInicio(new Date(agora.getFullYear(), agora.getMonth(), 1))
    setFim(agora)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <ButtonGroup>
            <DatePicker
              value={inicio}
              onChange={setInicio}
              placeholder="00/00/0000"
              className="w-[170px]"
            />
            <DatePicker
              value={fim}
              onChange={setFim}
              placeholder="00/00/0000"
              className="w-[170px]"
            />
            <Button variant="secondary" size="sm" onClick={selecionarMes}>
              Mês
            </Button>
          </ButtonGroup>

          <InputGroup className="w-[216px]">
            <InputGroupAddon align="inline-start">
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Buscar"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </InputGroup>
        </div>

        <Button
          size="sm"
          className="gap-1.5"
          onClick={() => setDialogAberto(true)}
        >
          <Plus className="size-4" />
          Novo orçamento
        </Button>
      </div>

      <ResumoStatus
        resumo={resumirOrcamentos(orcamentosMock)}
        selecionado={status}
        onSelecionar={setStatus}
      />

      <TabelaOrcamentos
        orcamentos={filtrados}
        onEditar={() => setDialogAberto(true)}
        onExcluir={() => toast("Excluir orçamento em breve.")}
      />

      <OrcamentoDialog
        open={dialogAberto}
        onOpenChange={setDialogAberto}
        paciente={paciente}
      />
    </div>
  )
}
