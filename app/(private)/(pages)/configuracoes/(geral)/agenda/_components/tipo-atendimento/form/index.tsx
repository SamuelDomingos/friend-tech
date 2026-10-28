"use client"

import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { useTipoAtendimentoForm } from "../../../_hooks/use-tipo-atendimento-form"

const TIPOS = ["Consulta", "Retorno", "Exame", "Procedimento", "Teleconsulta"]

const CORES = [
  "#4f46e5",
  "#0ea5e9",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
]

export function TipoAtendimentoForm() {
  const { form, selecionarTipo, selecionarCor, onSubmit, descartar } =
    useTipoAtendimentoForm()

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <FieldSet className="rounded-lg border bg-card p-6">
        <FieldLegend>Dados do tipo de atendimento</FieldLegend>
        <FieldDescription>
          Essas informações definem como o atendimento aparece na agenda.
        </FieldDescription>

        <FieldGroup className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            className="sm:col-span-2"
            data-invalid={!!form.formState.errors.nome}
          >
            <FieldLabel htmlFor="tipo-nome">Nome</FieldLabel>
            <Input
              id="tipo-nome"
              placeholder="Ex.: Consulta inicial"
              {...form.register("nome")}
            />
            <FieldError errors={[form.formState.errors.nome]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.tipo}>
            <FieldLabel>Tipo</FieldLabel>
            <Controller
              name="tipo"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={selecionarTipo}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[form.formState.errors.tipo]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.duracao}>
            <FieldLabel htmlFor="tipo-duracao">Duração</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="tipo-duracao"
                type="number"
                min={5}
                max={480}
                {...form.register("duracao")}
              />
              <InputGroupAddon align="inline-end">min</InputGroupAddon>
            </InputGroup>
            <FieldError errors={[form.formState.errors.duracao]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.prazoRetorno}>
            <FieldLabel htmlFor="tipo-prazo">Prazo de retorno</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="tipo-prazo"
                type="number"
                min={0}
                {...form.register("prazoRetorno")}
              />
              <InputGroupAddon align="inline-end">dias</InputGroupAddon>
            </InputGroup>
            <FieldError errors={[form.formState.errors.prazoRetorno]} />
          </Field>

          <Field data-invalid={!!form.formState.errors.cor}>
            <FieldLabel htmlFor="tipo-cor">Cor na agenda</FieldLabel>

            <Controller
              name="cor"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-wrap items-center gap-2">
                  {CORES.map((cor) => (
                    <Button
                      key={cor}
                      type="button"
                      size="icon-sm"
                      variant={field.value === cor ? "default" : "outline"}
                      aria-label={`Usar cor ${cor}`}
                      aria-pressed={field.value === cor}
                      onClick={() => selecionarCor(cor)}
                    >
                      <span
                        className="size-3.5 rounded-full"
                        style={{ backgroundColor: cor }}
                      />
                    </Button>
                  ))}

                  <Input
                    id="tipo-cor"
                    className="w-24 font-mono text-xs uppercase"
                    maxLength={7}
                    value={field.value}
                    onChange={(event) => selecionarCor(event.target.value)}
                    onBlur={field.onBlur}
                  />
                </div>
              )}
            />

            <FieldError errors={[form.formState.errors.cor]} />
          </Field>

          <Field orientation="horizontal" className="sm:col-span-2">
            <Controller
              name="ativo"
              control={form.control}
              render={({ field }) => (
                <Switch
                  id="tipo-ativo"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <div className="space-y-1">
              <FieldLabel htmlFor="tipo-ativo">Ativo</FieldLabel>
              <FieldDescription>
                Tipos inativos não aparecem ao criar um agendamento.
              </FieldDescription>
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="ghost" onClick={descartar}>
          Cancelar
        </Button>
        <Button type="submit">Salvar tipo de atendimento</Button>
      </div>
    </form>
  )
}
