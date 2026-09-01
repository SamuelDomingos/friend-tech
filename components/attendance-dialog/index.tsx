"use client"

import { useState } from "react"
import { ChevronDown, FileText, History, Tag, Watch } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { AgendamentoTab, type AgendamentoFormValues } from "./agendamento"
import { ProcedimentoTab } from "./procedimento"
import { FinanceiroTab } from "./financeiro"
import { ActivitiesDrawer } from "./activities-drawer"
import { BlockAgendaForm, type BlockAgendaFormValues } from "./bloqueio"
import type { PagamentoItem, ProcedimentoItem } from "./mock-data"

export type CreateAttendanceMode = "atendimento" | "urgencia"

interface CreateAttendanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: CreateAttendanceMode
}

type Tab = "agendamento" | "procedimento" | "financeiro"

const TABS: { value: Tab; label: string }[] = [
  { value: "agendamento", label: "Agendamento" },
  { value: "procedimento", label: "Procedimento" },
  { value: "financeiro", label: "Financeiro" },
]

export function CreateAttendanceDialog({
  open,
  onOpenChange,
  mode,
}: CreateAttendanceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex h-screen w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none p-0 top-0 left-0 sm:max-w-none"
      >
        <AttendanceForm mode={mode} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

interface AttendanceFormProps {
  mode: CreateAttendanceMode
  onClose: () => void
}

const valoresIniciais: AgendamentoFormValues = {
  pacienteNome: "",
  pacienteSelecionado: null,
  cpf: "",
  rg: "",
  dataNascimento: undefined,
  telefone: "",
  email: "",
  convenioId: "particular",
  matricula: "",
  validade: "",
  nomeSocial: "",
  outroDocumentoTipo: "",
  outroDocumentoNumero: "",
  sexo: "",
  raca: "",
  etnia: "",
  naturalidade: "",
  nacionalidade: "",
  estadoCivil: "",
  plano: "",
  utilizarRnGuia: "Não",
  telefone2: "",
  comoConheceu: "",
  profissao: "",
  cep: "",
  tipoLogradouro: "",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  alergias: "",
  tipoSanguineo: "",
  nomeResponsavel: "",
  cpfResponsavel: "",
  nomeMae: "",
  observacoesResponsavel: "",
  documentos: [],
  etiquetas: [],
  preferencial: "",
  profissionalId: "",
  unidadeId: "",
  tipoAtendimento: "",
  pagamentoViaReembolso: false,
  data: undefined,
  horaInicio: "",
  horaFim: "",
  profissionalSolicitanteId: "",
  observacoes: "",
  imprimirEtiqueta: false,
}

const blockValoresIniciais: BlockAgendaFormValues = {
  profissionalId: "",
  unidadeId: "",
  dataInicio: undefined,
  dataFim: undefined,
  horaInicio: "",
  horaFim: "",
  observacoes: "",
}

function AttendanceForm({ mode, onClose }: AttendanceFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>("agendamento")
  const [values, setValues] = useState<AgendamentoFormValues>(valoresIniciais)
  const [procedimentos, setProcedimentos] = useState<ProcedimentoItem[]>([])
  const [pagamentos, setPagamentos] = useState<PagamentoItem[]>([])
  const [activitiesOpen, setActivitiesOpen] = useState(false)
  const [blockMode, setBlockMode] = useState(false)
  const [blockValues, setBlockValues] = useState<BlockAgendaFormValues>(
    blockValoresIniciais
  )

  const titulo = blockMode
    ? "Bloquear Agenda"
    : mode === "urgencia"
      ? "Urgência"
      : "Agendamento"

  const procedimentosTotal = procedimentos.reduce(
    (soma, item) => soma + item.quantidade * item.precoUnitario,
    0
  )

  const handleChange = <K extends keyof AgendamentoFormValues>(
    key: K,
    value: AgendamentoFormValues[K]
  ) => {
    setValues((atual) => ({ ...atual, [key]: value }))
  }

  const handleBlockChange = <K extends keyof BlockAgendaFormValues>(
    key: K,
    value: BlockAgendaFormValues[K]
  ) => {
    setBlockValues((atual) => ({ ...atual, [key]: value }))
  }

  const salvar = () => {
    if (blockMode) {
      if (
        !blockValues.profissionalId ||
        !blockValues.unidadeId ||
        !blockValues.dataInicio ||
        !blockValues.dataFim ||
        !blockValues.horaInicio ||
        !blockValues.horaFim
      ) {
        toast("Preencha os campos obrigatórios antes de salvar.")
        return
      }

      toast("Bloqueio de agenda criado com sucesso.")
      onClose()
      return
    }

    if (
      !values.pacienteNome.trim() ||
      !values.profissionalId ||
      !values.unidadeId ||
      !values.data
    ) {
      toast("Preencha os campos obrigatórios antes de salvar.")
      return
    }

    toast(
      mode === "urgencia"
        ? "Urgência criada com sucesso."
        : "Agendamento criado com sucesso."
    )
    onClose()
  }

  return (
    <>
      <div className="flex flex-col gap-4 border-b px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <DialogTitle className="text-lg">{titulo}</DialogTitle>

        <div className="flex flex-wrap items-center gap-2">
          {!blockMode && (
            <ButtonGroup>
              {TABS.map((tab) => (
                <Button
                  key={tab.value}
                  type="button"
                  variant={activeTab === tab.value ? "default" : "outline"}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline">
                Ações
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Imprimir</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast("Em construção.")}>
                <Tag />
                Etiqueta do Paciente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast("Em construção.")}>
                <Watch />
                Pulseira de Circulação
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast("Em construção.")}>
                <FileText />
                Ficha de atendimento
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                onClick={() => setActivitiesOpen(true)}
              >
                <History />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atividades do agendamento</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="px-6 py-6">
          {blockMode ? (
            <BlockAgendaForm values={blockValues} onChange={handleBlockChange} />
          ) : (
            <>
              {activeTab === "agendamento" && (
                <AgendamentoTab values={values} onChange={handleChange} />
              )}
              {activeTab === "procedimento" && (
                <ProcedimentoTab itens={procedimentos} onChange={setProcedimentos} />
              )}
              {activeTab === "financeiro" && (
                <FinanceiroTab
                  procedimentosTotal={procedimentosTotal}
                  pagamentos={pagamentos}
                  onChangePagamentos={setPagamentos}
                  patientConvenioId={values.convenioId}
                />
              )}
            </>
          )}
        </div>
      </ScrollArea>

      <ActivitiesDrawer open={activitiesOpen} onOpenChange={setActivitiesOpen} />

      <div className="flex items-center justify-between gap-2 border-t px-6 py-4">
        <div className="flex items-center gap-2">
          <Switch
            id="bloqueio-agenda"
            checked={blockMode}
            onCheckedChange={setBlockMode}
          />
          <Label htmlFor="bloqueio-agenda" className="font-normal">
            Bloqueio de Agenda
          </Label>
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={salvar}>
            Salvar
          </Button>
        </div>
      </div>
    </>
  )
}
