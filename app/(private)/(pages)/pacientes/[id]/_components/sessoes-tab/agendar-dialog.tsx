"use client"

import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { useAgendarSessaoForm } from "../../_hooks/use-agendar-sessao-form"
import type { Sessao } from "./dados-mock"

const DIAS = [
  { value: "SEG", label: "Seg" },
  { value: "TER", label: "Ter" },
  { value: "QUA", label: "Qua" },
  { value: "QUI", label: "Qui" },
  { value: "SEX", label: "Sex" },
  { value: "SAB", label: "Sáb" },
  { value: "DOM", label: "Dom" },
]

interface AgendarSessaoDialogProps {
  sessao: Sessao | null
  onOpenChange: (open: boolean) => void
  onConfirmar: (quantidade: number) => void
}

export function AgendarSessaoDialog({
  sessao,
  onOpenChange,
  onConfirmar,
}: AgendarSessaoDialogProps) {
  const { form, frequencia, dias, alternarDia, onSubmit, descartar } = useAgendarSessaoForm({
    onConfirmar,
    onConcluir: () => onOpenChange(false),
  })

  const semanal = frequencia === "WEEKLY"

  return (
    <Dialog
      open={!!sessao}
      onOpenChange={(open) => {
        if (!open) descartar()
        onOpenChange(open)
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Agendamento de Sessões</DialogTitle>
          <DialogDescription>
            {sessao
              ? `Pacote com ${sessao.realizado}/${sessao.agendado} sessões realizadas.`
              : ""}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Detalhes do atendimento</h3>

            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Frequência</FieldLabel>
                <Controller
                  name="frequencia"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DAILY">Diariamente</SelectItem>
                        <SelectItem value="WEEKLY">Semanalmente</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field data-invalid={!!form.formState.errors.quantidade}>
                <FieldLabel htmlFor="sessao-quantidade">
                  Nº de Sessões
                </FieldLabel>
                <Input
                  id="sessao-quantidade"
                  type="number"
                  min={1}
                  max={52}
                  {...form.register("quantidade")}
                />
                <FieldError errors={[form.formState.errors.quantidade]} />
              </Field>

              <Field data-invalid={!!form.formState.errors.inicio}>
                <FieldLabel>Início das Sessões</FieldLabel>
                <Controller
                  name="inicio"
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="00/00/0000"
                      className="w-full"
                    />
                  )}
                />
                <FieldError errors={[form.formState.errors.inicio]} />
              </Field>

              <Field data-invalid={!!form.formState.errors.hora}>
                <FieldLabel htmlFor="sessao-hora">Hora</FieldLabel>
                <Input
                  id="sessao-hora"
                  type="time"
                  {...form.register("hora")}
                />
                <FieldError errors={[form.formState.errors.hora]} />
              </Field>
            </FieldGroup>

            {semanal && (
              <Field>
                <FieldLabel>Dias para as Sessões</FieldLabel>

                <div className="flex flex-wrap gap-2">
                  {DIAS.map((dia) => {
                    const ativo = dias.includes(dia.value)

                    return (
                      <Button
                        key={dia.value}
                        type="button"
                        size="sm"
                        variant={ativo ? "default" : "outline"}
                        aria-pressed={ativo}
                        onClick={() => alternarDia(dia.value)}
                      >
                        {dia.label}
                      </Button>
                    )
                  })}
                </div>

                <FieldError errors={[form.formState.errors.dias]} />
              </Field>
            )}
          </div>

          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <Field orientation="horizontal">
              <Controller
                name="reembolso"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    id="sessao-reembolso"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <div className="space-y-1">
                <FieldLabel htmlFor="sessao-reembolso">
                  Pagamento via Reembolso
                </FieldLabel>
                <FieldDescription>
                  O paciente paga e solicita reembolso ao convênio.
                </FieldDescription>
              </div>
            </Field>

            <Field orientation="horizontal">
              <Controller
                name="faturamentoConvenio"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    id="sessao-convenio"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <div className="space-y-1">
                <FieldLabel htmlFor="sessao-convenio">
                  Faturamento Convênio
                </FieldLabel>
                <FieldDescription>
                  As sessões entram na guia do convênio.
                </FieldDescription>
              </div>
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="sessao-autorizacao">Autorização</FieldLabel>
              <Input
                id="sessao-autorizacao"
                placeholder="Senha ou nÂº da guia (opcional)"
                {...form.register("autorizacao")}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={descartar}>
              Cancelar
            </Button>
            <Button type="submit">Agendar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
