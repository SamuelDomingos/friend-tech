"use client"

import { Controller, useWatch, type Control } from "react-hook-form"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

import { Transfer } from "@/components/transfer"
import {
  GRUPOS_CONVENIO_MOCK,
  MEDICOS_DISPONIVEIS,
  type ConvenioFormData,
} from "../../_schemas/convenio.schema"

interface ResumoTabProps {
  control: Control<ConvenioFormData>
  isEdit?: boolean
}

export function ResumoTab({ control, isEdit }: ResumoTabProps) {
  const nome = useWatch({ control, name: "nome" })
  const isSUS = /SUS/i.test(nome)
  const allowedUsers = useWatch({ control, name: "allowedUsers" }) ?? []

  return (
    <section className="space-y-4">
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="nome"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel htmlFor={field.name}>
                Nome <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id={field.name}
                placeholder="Nome do convênio"
                maxLength={255}
                aria-invalid={!!fieldState.error}
                {...field}
              />
              <FieldError
                errors={
                  fieldState.error
                    ? [{ message: fieldState.error.message }]
                    : []
                }
              />
            </Field>
          )}
        />

        {isSUS && (
          <Controller
            name="nomeEstabelecimentoSUS"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Nome do estabelecimento
                </FieldLabel>
                <Input
                  id={field.name}
                  placeholder="Nome do estabelecimento"
                  maxLength={255}
                  {...field}
                />
              </Field>
            )}
          />
        )}
      </FieldGroup>

      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="grupoConvenioId"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Convênio (Grupo)
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {GRUPOS_CONVENIO_MOCK.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="nomeExibicaoAgenda"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Nome de exibição (Agendador)
              </FieldLabel>
              <Input
                id={field.name}
                placeholder="Nome na agenda"
                maxLength={255}
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="cardNumberStartWith"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Caracteres iniciais (Matrícula)
              </FieldLabel>
              <Input
                id={field.name}
                placeholder="Ex: AMI"
                maxLength={10}
                className="uppercase"
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="cardNumberLength"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Quantidade de caracteres (Matrícula)
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  placeholder="Ex: 12"
                  maxLength={25}
                  inputMode="numeric"
                  {...field}
                />
                <InputGroupAddon align="inline-end">
                  caracteres
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="period"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Período de carência</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  placeholder="Ex: 30"
                  inputMode="numeric"
                  {...field}
                />
                <InputGroupAddon align="inline-end">dias</InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />
      </FieldGroup>

      <Controller
        name="showOnlyEventsTied"
        control={control}
        render={({ field }) => (
          <Field>
            <div className="flex items-center gap-2">
              <Checkbox
                id={field.name}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
              <FieldLabel htmlFor={field.name} className="!mb-0 font-normal">
                Exibir apenas tipos de atendimentos vinculados a este convênio
              </FieldLabel>
            </div>
          </Field>
        )}
      />

      <Controller
        name="allowedUsers"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Médicos conveniados</FieldLabel>
            <Transfer
              disponiveisTitle="Médicos disponíveis"
              inclusosTitle="Médicos vinculados"
              disponiveisEmpty="Nenhum médico disponível."
              inclusosEmpty="Nenhum médico vinculado."
              searchPlaceholder="Buscar"
              disponiveis={MEDICOS_DISPONIVEIS.filter(
                (m) => !allowedUsers.includes(m)
              )}
              inclusos={allowedUsers}
              onIncludedChange={field.onChange}
            />
          </Field>
        )}
      />

      {isEdit && (
        <p className="text-sm text-muted-foreground">
          Os médicos vinculados são usados para restringir quem pode atender
          por este convênio.
        </p>
      )}
    </section>
  )
}
