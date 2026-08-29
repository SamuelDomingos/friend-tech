"use client"

import { Controller } from "react-hook-form"
import type { Control } from "react-hook-form"

import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ESTADOS } from "../../_schemas/impressao.schema"
import type { ImpressaoFormData } from "../../_schemas/impressao.schema"

interface EnderecoPrincipalProps {
  control: Control<ImpressaoFormData>
}

export function EnderecoPrincipal({ control }: EnderecoPrincipalProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">Endereço principal</h3>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Controller
          name="nomeClinica"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Nome da clínica</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="remetenteSms"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Remetente SMS</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>CEP</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="endereco"
          control={control}
          render={({ field }) => (
            <Field className="md:col-span-2">
              <FieldLabel htmlFor={field.name}>Endereço</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="numero"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Número</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="complemento"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Complemento</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="bairro"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Bairro</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="cidade"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Cidade</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="estado"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Estado</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  {ESTADOS.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="telefone1"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Telefone 1</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="telefone2"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Telefone 2</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} type="email" />
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="site"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Site</FieldLabel>

              <InputGroup>
                <InputGroupInput {...field} id={field.name} />
              </InputGroup>
            </Field>
          )}
        />
      </div>
    </div>
  )
}
