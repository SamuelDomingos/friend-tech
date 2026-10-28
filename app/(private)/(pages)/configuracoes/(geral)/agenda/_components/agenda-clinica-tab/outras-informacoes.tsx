"use client"

import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { useOutrasInformacoesForm } from "../../_hooks/use-outras-informacoes-form"

export function OutrasInformacoes() {
  const { form, onSubmit, descartar } = useOutrasInformacoesForm()

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field orientation="horizontal">
          <Controller
            name="agendamentoOnline"
            control={form.control}
            render={({ field }) => (
              <Switch
                id="agenda-online"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <div className="space-y-1">
            <FieldLabel htmlFor="agenda-online">
              Permitir agendamento online
            </FieldLabel>
            <FieldDescription>
              Pacientes podem agendar pelo portal e pelo app.
            </FieldDescription>
          </div>
        </Field>

        <Field orientation="horizontal">
          <Controller
            name="exibirFimDeSemana"
            control={form.control}
            render={({ field }) => (
              <Switch
                id="agenda-fim-semana"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <div className="space-y-1">
            <FieldLabel htmlFor="agenda-fim-semana">
              Exibir finais de semana
            </FieldLabel>
            <FieldDescription>
              Mostra sábado e domingo na visão semanal.
            </FieldDescription>
          </div>
        </Field>

        <Field orientation="horizontal">
          <Controller
            name="bloquearEncaixe"
            control={form.control}
            render={({ field }) => (
              <Switch
                id="agenda-encaixe"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <div className="space-y-1">
            <FieldLabel htmlFor="agenda-encaixe">
              Bloquear encaixe entre atendimentos
            </FieldLabel>
            <FieldDescription>
              Impede sobreposição mesmo quando houver horário livre.
            </FieldDescription>
          </div>
        </Field>

        <Field data-invalid={!!form.formState.errors.intervaloAtendimentos}>
          <FieldLabel htmlFor="agenda-intervalo">
            Intervalo entre atendimentos
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="agenda-intervalo"
              type="number"
              min={0}
              {...form.register("intervaloAtendimentos")}
            />
            <InputGroupAddon align="inline-end">min</InputGroupAddon>
          </InputGroup>
          <FieldError errors={[form.formState.errors.intervaloAtendimentos]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.antecedenciaCancelamento}>
          <FieldLabel htmlFor="agenda-antecedencia">
            Antecedência para cancelamento
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="agenda-antecedencia"
              type="number"
              min={0}
              {...form.register("antecedenciaCancelamento")}
            />
            <InputGroupAddon align="inline-end">horas</InputGroupAddon>
          </InputGroup>
          <FieldError errors={[form.formState.errors.antecedenciaCancelamento]} />
        </Field>

        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="agenda-observacoes">Observações</FieldLabel>
          <Textarea
            id="agenda-observacoes"
            placeholder="Regras internas da clínica para a agenda"
            className="min-h-20"
            {...form.register("observacoes")}
          />
        </Field>
      </FieldGroup>

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="ghost" onClick={descartar}>
          Descartar
        </Button>
        <Button type="submit">Salvar configurações</Button>
      </div>
    </form>
  )
}
