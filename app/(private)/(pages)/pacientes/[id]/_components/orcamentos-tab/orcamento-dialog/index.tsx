"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CabecalhoPaciente } from "../../contas-tab/cabecalho-paciente"
import type { ItemSelecionado } from "../../contas-tab/pre-pagamento-dialog/lista-itens"
import type { PacienteDetalhe } from "../../dados-mock"
import { DetalhesForm } from "./detalhes-form"
import { OrcamentoForm } from "./orcamento-form"
import { PagamentoForm } from "./pagamento-form"

type Aba = "orcamento" | "detalhes" | "pagamento"

interface OrcamentoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paciente: PacienteDetalhe
}

export function OrcamentoDialog({
  open,
  onOpenChange,
  paciente,
}: OrcamentoDialogProps) {
  const [aba, setAba] = useState<Aba>("orcamento")
  const [modelo, setModelo] = useState("")
  const [procedimentos, setProcedimentos] = useState<ItemSelecionado[]>([])
  const [matmeds, setMatmeds] = useState<ItemSelecionado[]>([])
  const [descontoAdicional, setDescontoAdicional] = useState("")

  const [solicitantePrimario, setSolicitantePrimario] = useState("")
  const [solicitanteSecundario, setSolicitanteSecundario] = useState("")
  const [unidade, setUnidade] = useState("")
  const [observacoes, setObservacoes] = useState("")

  const procedimentosTotal = procedimentos.reduce(
    (soma, item) => soma + item.item.preco * item.quantidade,
    0
  )
  const matmedsTotal = matmeds.reduce(
    (soma, item) => soma + item.item.preco * item.quantidade,
    0
  )
  const valorTotal = procedimentosTotal + matmedsTotal
  const desconto =
    (valorTotal * (Number.parseFloat(descontoAdicional) || 0)) / 100
  const total = valorTotal - desconto

  function salvar() {
    if (!unidade) {
      toast("Selecione a unidade.")
      return
    }
    toast("Orçamento salvo.")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-4xl">
        <DialogTitle className="sr-only">Novo orçamento</DialogTitle>

        <CabecalhoPaciente paciente={paciente} />

        <Tabs value={aba} onValueChange={(valor) => setAba(valor as Aba)}>
          <TabsList variant="line">
            <TabsTrigger value="orcamento">Orçamento</TabsTrigger>
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
          </TabsList>

          <TabsContent value="orcamento" className="mt-4">
            <OrcamentoForm
              modelo={modelo}
              onModelo={setModelo}
              procedimentos={procedimentos}
              onProcedimentos={setProcedimentos}
              matmeds={matmeds}
              onMatmeds={setMatmeds}
              descontoAdicional={descontoAdicional}
              onDescontoAdicional={setDescontoAdicional}
            />
          </TabsContent>

          <TabsContent value="detalhes" className="mt-4">
            <DetalhesForm
              solicitantePrimario={solicitantePrimario}
              onSolicitantePrimario={setSolicitantePrimario}
              solicitanteSecundario={solicitanteSecundario}
              onSolicitanteSecundario={setSolicitanteSecundario}
              unidade={unidade}
              onUnidade={setUnidade}
              observacoes={observacoes}
              onObservacoes={setObservacoes}
            />
          </TabsContent>

          <TabsContent value="pagamento" className="mt-4">
            <PagamentoForm
              procedimentosTotal={procedimentosTotal}
              matmedsTotal={matmedsTotal}
              total={total}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-between">
          {aba === "orcamento" ? (
            <Button
              variant="ghost"
              onClick={() => toast("Salvar como modelo em breve.")}
            >
              Salvar como modelo
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={salvar}>Salvar alterações</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
