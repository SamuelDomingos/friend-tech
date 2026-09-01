"use client"

import { useState } from "react"
import {
  Accessibility,
  Baby,
  Heart,
  PlusIcon,
  Puzzle,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { RequesterDialog } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/requesters/_components/requesters-tab/requester-dialog"
import {
  requestersMock,
  type Requester,
} from "@/app/(private)/(pages)/configuracoes/(agreement-management)/requesters/_components/mock-data"

import type { AgendamentoFormValues } from "./types"

import { professionalsMock, unidadesFilterMock } from "@/app/(private)/(pages)/agenda/_components/mock-data"
import { TIPOS_ATENDIMENTO } from "@/app/(private)/(pages)/configuracoes/(geral)/agenda/_components/_shared/tipos-atendimento"

interface AttendanceInfoSectionProps {
  values: AgendamentoFormValues
  onChange: <K extends keyof AgendamentoFormValues>(
    key: K,
    value: AgendamentoFormValues[K]
  ) => void
}

const requiredMark = <span className="text-destructive">*</span>

const PREFERENCIAIS = [
  { value: "WEELCHAIR", label: "Pessoas com deficiência", icon: Accessibility },
  { value: "OLD_MAN", label: "Idosos acima de 60 anos", icon: UserRound },
  { value: "PREGNANT", label: "Gestante", icon: Heart },
  { value: "TODDLER", label: "Pessoas com criança de colo", icon: Baby },
  { value: "AUTISM", label: "Pessoas com autismo", icon: Puzzle },
] as const

export function AttendanceInfoSection({
  values,
  onChange,
}: AttendanceInfoSectionProps) {
  const [solicitantes, setSolicitantes] = useState<Requester[]>(requestersMock)
  const [solicitanteDialogOpen, setSolicitanteDialogOpen] = useState(false)

  const salvarSolicitante = (solicitante: Requester) => {
    setSolicitantes((atual) => {
      const existe = atual.some((r) => r.id === solicitante.id)
      return existe
        ? atual.map((r) => (r.id === solicitante.id ? solicitante : r))
        : [...atual, solicitante]
    })
    onChange("profissionalSolicitanteId", solicitante.id)
    setSolicitanteDialogOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Informações do atendimento</h3>

        <ToggleGroup
          type="single"
          variant="outline"
          value={values.preferencial}
          onValueChange={(v) => onChange("preferencial", v)}
        >
          {PREFERENCIAIS.map((pref) => {
            const Icon = pref.icon
            return (
              <Tooltip key={pref.value}>
                <TooltipTrigger asChild>
                  <ToggleGroupItem
                    value={pref.value}
                    aria-label={pref.label}
                    className="data-[state=on]:border-primary data-[state=on]:bg-primary/15 data-[state=on]:text-primary"
                  >
                    <Icon />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{pref.label}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </ToggleGroup>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="attendance-profissional">
            Nome do profissional {requiredMark}
          </FieldLabel>
          <Select
            value={values.profissionalId}
            onValueChange={(v) => onChange("profissionalId", v)}
          >
            <SelectTrigger id="attendance-profissional">
              <SelectValue placeholder="Selecione o profissional" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {professionalsMock.map((profissional) => (
                  <SelectItem key={profissional.id} value={profissional.id}>
                    {profissional.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="attendance-unidade">
            Unidade {requiredMark}
          </FieldLabel>
          <Select
            value={values.unidadeId}
            onValueChange={(v) => onChange("unidadeId", v)}
          >
            <SelectTrigger id="attendance-unidade">
              <SelectValue placeholder="Selecione a unidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {unidadesFilterMock.map((unidade) => (
                  <SelectItem key={unidade.id} value={unidade.id}>
                    {unidade.nome}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="attendance-tipo">
              Tipo de atendimento
            </FieldLabel>
            <div className="mb-1.5 flex items-center gap-2">
              <Checkbox
                id="attendance-reembolso"
                checked={values.pagamentoViaReembolso}
                onCheckedChange={(checked) =>
                  onChange("pagamentoViaReembolso", checked === true)
                }
              />
              <Label htmlFor="attendance-reembolso" className="font-normal">
                Pagamento via Reembolso
              </Label>
            </div>
          </div>
          <Select
            value={values.tipoAtendimento}
            onValueChange={(v) => onChange("tipoAtendimento", v)}
          >
            <SelectTrigger id="attendance-tipo">
              <SelectValue placeholder="Selecione o tipo de atendimento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {TIPOS_ATENDIMENTO.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="attendance-data">Data {requiredMark}</FieldLabel>
          <DatePicker
            value={values.data}
            onChange={(date) => onChange("data", date)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="attendance-hora-inicio">
              Início {requiredMark}
            </FieldLabel>
            <Input
              id="attendance-hora-inicio"
              type="time"
              value={values.horaInicio}
              onChange={(e) => onChange("horaInicio", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="attendance-hora-fim">
              Término {requiredMark}
            </FieldLabel>
            <Input
              id="attendance-hora-fim"
              type="time"
              value={values.horaFim}
              onChange={(e) => onChange("horaFim", e.target.value)}
            />
          </Field>
        </div>

        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="attendance-solicitante">
            Profissional solicitante
          </FieldLabel>
          <div className="flex items-center gap-2">
            <Select
              value={values.profissionalSolicitanteId}
              onValueChange={(v) => onChange("profissionalSolicitanteId", v)}
            >
              <SelectTrigger id="attendance-solicitante" className="flex-1">
                <SelectValue placeholder="Selecione o solicitante" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {solicitantes.map((solicitante) => (
                    <SelectItem key={solicitante.id} value={solicitante.id}>
                      {solicitante.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              onClick={() => setSolicitanteDialogOpen(true)}
            >
              <PlusIcon />
              Adicione solicitante
            </Button>
          </div>
        </Field>

        <Field className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="attendance-observacoes">
              Observações
            </FieldLabel>
            <div className="mb-1.5 flex items-center gap-2">
              <Checkbox
                id="attendance-imprimir-etiqueta"
                checked={values.imprimirEtiqueta}
                onCheckedChange={(checked) =>
                  onChange("imprimirEtiqueta", checked === true)
                }
              />
              <Label
                htmlFor="attendance-imprimir-etiqueta"
                className="font-normal"
              >
                Imprimir na Etiqueta / Pulseira
              </Label>
            </div>
          </div>
          <Textarea
            id="attendance-observacoes"
            className="h-28 resize-none"
            value={values.observacoes}
            onChange={(e) => onChange("observacoes", e.target.value)}
          />
        </Field>
      </div>

      <RequesterDialog
        open={solicitanteDialogOpen}
        onOpenChange={setSolicitanteDialogOpen}
        requester={null}
        onSave={salvarSolicitante}
      />
    </div>
  )
}
