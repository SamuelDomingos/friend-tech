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

import type { PacienteDetalhe } from "../../dados-mock"
import { CabecalhoPaciente } from "../cabecalho-paciente"
import { type ItemSelecionado } from "./lista-itens"
import { OrcamentoForm } from "./orcamento-form"
import { PagamentoForm } from "./pagamento-form"

type AbaPrePagamento = "orcamento" | "pagamento"

interface PrePagamentoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paciente: PacienteDetalhe
}

export function PrePagamentoDialog({
  open,
  onOpenChange,
  paciente,
}: PrePagamentoDialogProps) {
  const [aba, setAba] = useState<AbaPrePagamento>("orcamento")
  const [unidade, setUnidade] = useState("")
  const [modelo, setModelo] = useState("")
  const [aprovarSemFinanceiro, setAprovarSemFinanceiro] = useState(false)
  const [solicitantePrimario, setSolicitantePrimario] = useState("")
  const [solicitanteSecundario, setSolicitanteSecundario] = useState("")
  const [procedimentos, setProcedimentos] = useState<ItemSelecionado[]>([])
  const [matmeds, setMatmeds] = useState<ItemSelecionado[]>([])
  const [observacao, setObservacao] = useState("")

  const [formaPagamento, setFormaPagamento] = useState("")
  const [valorPagamento, setValorPagamento] = useState("")
  const [dataTransacao, setDataTransacao] = useState<Date | undefined>()
  const [pessoa, setPessoa] = useState<"PF" | "PJ">("PF")
  const [parcelas, setParcelas] = useState("1")
  const [observacaoPagamento, setObservacaoPagamento] = useState("")

  const total = [...procedimentos, ...matmeds].reduce(
    (soma, item) => soma + item.item.preco * item.quantidade,
    0
  )

  function salvar() {
    if (!unidade) {
      toast("Selecione a unidade.")
      return
    }
    if (!aprovarSemFinanceiro && !formaPagamento) {
      toast("Selecione a forma de pagamento.")
      return
    }
    toast("Pré-pagamento salvo.")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogTitle className="sr-only">Pré-pagamento</DialogTitle>

        <CabecalhoPaciente paciente={paciente} />

        <Tabs
          value={aba}
          onValueChange={(valor) => setAba(valor as AbaPrePagamento)}
        >
          <TabsList variant="line">
            <TabsTrigger value="orcamento">Orçamento</TabsTrigger>
            <TabsTrigger value="pagamento" disabled={aprovarSemFinanceiro}>
              Pagamento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orcamento" className="mt-4">
            <OrcamentoForm
              unidade={unidade}
              onUnidade={setUnidade}
              modelo={modelo}
              onModelo={setModelo}
              aprovarSemFinanceiro={aprovarSemFinanceiro}
              onAprovarSemFinanceiro={setAprovarSemFinanceiro}
              solicitantePrimario={solicitantePrimario}
              onSolicitantePrimario={setSolicitantePrimario}
              solicitanteSecundario={solicitanteSecundario}
              onSolicitanteSecundario={setSolicitanteSecundario}
              procedimentos={procedimentos}
              onProcedimentos={setProcedimentos}
              matmeds={matmeds}
              onMatmeds={setMatmeds}
              observacao={observacao}
              onObservacao={setObservacao}
            />
          </TabsContent>

          <TabsContent value="pagamento" className="mt-4">
            <PagamentoForm
              unidade={unidade}
              onUnidade={setUnidade}
              formaPagamento={formaPagamento}
              onFormaPagamento={setFormaPagamento}
              valor={valorPagamento}
              onValor={setValorPagamento}
              dataTransacao={dataTransacao}
              onDataTransacao={setDataTransacao}
              pessoa={pessoa}
              onPessoa={setPessoa}
              parcelas={parcelas}
              onParcelas={setParcelas}
              observacao={observacaoPagamento}
              onObservacao={setObservacaoPagamento}
              total={total}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="ghost"
            onClick={() => toast("Salvar como modelo em breve.")}
          >
            Salvar como Modelo
          </Button>
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
