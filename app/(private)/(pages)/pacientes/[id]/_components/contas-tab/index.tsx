"use client"

import { useState } from "react"
import { ChevronDown, FileDown, Plus, Search } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { DatePicker } from "@/components/ui/date-picker"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { CreateAttendanceDialog } from "../../../../agenda/_components/attendance-dialog"

import type { PacienteDetalhe } from "../dados-mock"
import { AjusteSaldoDialog } from "./ajuste-saldo-dialog"
import {
  atendimentosContasMock,
  extratoContasMock,
  totaisContasMock,
} from "./dados-mock"
import { PrePagamentoDialog } from "./pre-pagamento-dialog"
import { ResumoFinanceiro } from "./resumo-financeiro"
import { TabelaAtendimentos } from "./tabela-atendimentos"
import { TabelaExtrato } from "./tabela-extrato"

type AbaContas = "atendimentos" | "extrato"

interface ContasTabProps {
  paciente: PacienteDetalhe
}

export function ContasTab({ paciente }: ContasTabProps) {
  const [aba, setAba] = useState<AbaContas>("atendimentos")
  const [inicio, setInicio] = useState<Date | undefined>()
  const [fim, setFim] = useState<Date | undefined>()
  const [busca, setBusca] = useState("")

  const [atendimentoAberto, setAtendimentoAberto] = useState(false)
  const [prePagamentoAberto, setPrePagamentoAberto] = useState(false)
  const [ajusteAberto, setAjusteAberto] = useState(false)

  const pacienteAgenda = {
    id: paciente.id,
    nome: paciente.nome,
    cpf: "",
    dataNascimento: paciente.dataNascimento ?? "",
  }

  const filtrar = <T extends { descricao: string }>(itens: T[]) => {
    const termo = busca.trim().toLowerCase()
    if (!termo) {
      return itens
    }
    return itens.filter((item) =>
      item.descricao.toLowerCase().includes(termo)
    )
  }

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
            <Button
              size="sm"
              variant="outline"
              aria-pressed={aba === "atendimentos"}
              onClick={() => setAba("atendimentos")}
            >
              Atendimentos
            </Button>
            <Button
              size="sm"
              variant="outline"
              aria-pressed={aba === "extrato"}
              onClick={() => setAba("extrato")}
            >
              Extrato do paciente
            </Button>
          </ButtonGroup>

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
            <Button
              variant="secondary"
              size="sm"
              onClick={selecionarMes}
            >
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

        <div className="flex items-center gap-2">
          {aba === "atendimentos" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  <FileDown className="size-4" />
                  Exportar
                  <ChevronDown className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>PDF</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => toast("Exportando PDF sintético.")}
                >
                  Sintético
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toast("Exportando PDF detalhado.")}
                >
                  Detalhado
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" size="sm" className="gap-1.5">
                <Plus className="size-4" />
                Adicionar
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setAtendimentoAberto(true)}>
                Atendimento
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPrePagamentoAberto(true)}>
                Pré-Pagamento
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAjusteAberto(true)}>
                Ajuste de saldo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ResumoFinanceiro totais={totaisContasMock} />

      {aba === "atendimentos" ? (
        <TabelaAtendimentos
          atendimentos={filtrar(atendimentosContasMock)}
          onEditar={() => setAtendimentoAberto(true)}
        />
      ) : (
        <TabelaExtrato lancamentos={filtrar(extratoContasMock)} />
      )}

      <CreateAttendanceDialog
        open={atendimentoAberto}
        onOpenChange={setAtendimentoAberto}
        mode="atendimento"
        initialPaciente={pacienteAgenda}
      />

      <PrePagamentoDialog
        open={prePagamentoAberto}
        onOpenChange={setPrePagamentoAberto}
        paciente={paciente}
      />

      <AjusteSaldoDialog
        open={ajusteAberto}
        onOpenChange={setAjusteAberto}
        paciente={paciente}
      />
    </div>
  )
}
