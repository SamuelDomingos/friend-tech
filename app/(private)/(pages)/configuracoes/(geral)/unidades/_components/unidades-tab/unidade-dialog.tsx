"use client"

import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { formatarCep, formatarTelefone } from "@/lib/masks"
import { ESTADOS } from "../../../informacoes-gerais/form/_schemas/impressao.schema"

import { useUnidadeForm } from "../../_hooks/use-unidade-form"
import type { UnidadeFormData } from "../../_schemas/unidade.schema"
import { gruposMock, type Grupo, type Unidade } from "../dados-mock"

interface UnidadeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  unidade?: Unidade | null
  onSave: (unidade: Unidade) => void
}

export function UnidadeDialog({
  open,
  onOpenChange,
  unidade,
  onSave,
}: UnidadeDialogProps) {
  const { form } = useUnidadeForm(unidade)
  const { control, handleSubmit } = form

  const onSubmit = (data: UnidadeFormData) => {
    onSave({
      id: unidade?.id ?? crypto.randomUUID(),
      ...data,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {unidade ? "Editar unidade" : "Nova unidade"}
          </DialogTitle>
          <DialogDescription>
            {unidade
              ? "Altere as informações da unidade."
              : "Cadastre uma nova unidade da clínica."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="nome"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Nome <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Input
                    id={field.name}
                    placeholder="Ex.: Unidade Central"
                    aria-invalid={fieldState.invalid}
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

            <Controller
              name="prefixo"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Prefixo <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Input
                    id={field.name}
                    placeholder="Ex.: 001"
                    maxLength={6}
                    aria-invalid={fieldState.invalid}
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

            <Controller
              name="telefone"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Telefone</FieldLabel>

                  <Input
                    id={field.name}
                    placeholder="(DDD) número"
                    inputMode="numeric"
                    maxLength={15}
                    {...field}
                    onChange={(event) =>
                      field.onChange(formatarTelefone(event.target.value))
                    }
                  />
                </Field>
              )}
            />

            <Controller
              name="cep"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>CEP</FieldLabel>

                  <Input
                    id={field.name}
                    placeholder="_____-___"
                    inputMode="numeric"
                    maxLength={9}
                    {...field}
                    onChange={(event) =>
                      field.onChange(formatarCep(event.target.value))
                    }
                  />
                </Field>
              )}
            />

            <Controller
              name="endereco"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Endereço <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Input
                    id={field.name}
                    placeholder="Rua / Avenida"
                    aria-invalid={fieldState.invalid}
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

            <Controller
              name="numero"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Número</FieldLabel>

                  <Input id={field.name} placeholder="Número" {...field} />
                </Field>
              )}
            />

            <Controller
              name="complemento"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Complemento</FieldLabel>

                  <Input id={field.name} placeholder="Ex.: Sala 5" {...field} />
                </Field>
              )}
            />

            <Controller
              name="bairro"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Bairro</FieldLabel>

                  <Input id={field.name} placeholder="Bairro" {...field} />
                </Field>
              )}
            />

            <Controller
              name="cidade"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Cidade</FieldLabel>

                  <Input id={field.name} placeholder="Cidade" {...field} />
                </Field>
              )}
            />

            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Estado</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name} className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {ESTADOS.map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="cnes"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>CNES</FieldLabel>

                  <Input
                    id={field.name}
                    inputMode="numeric"
                    placeholder="CNES"
                    {...field}
                  />
                </Field>
              )}
            />

            <Controller
              name="grupoId"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Grupo</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name} className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {gruposMock.map((grupo: Grupo) => (
                          <SelectItem key={grupo.id} value={grupo.id}>
                            {grupo.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
