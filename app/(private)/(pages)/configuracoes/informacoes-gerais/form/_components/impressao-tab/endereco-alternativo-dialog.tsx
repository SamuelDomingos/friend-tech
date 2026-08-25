"use client"

import { Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  enderecoAlternativoSchema,
  ESTADOS,
  type EnderecoAlternativoFormData,
} from "../../_schemas/impressao.schema"

const requiredMark = <span className="text-destructive">*</span>

function ErrorText({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-sm text-destructive">{message}</p>
}

interface EnderecoAlternativoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (endereco: EnderecoAlternativoFormData) => void
}

export function EnderecoAlternativoDialog({
  open,
  onOpenChange,
  onSave,
}: EnderecoAlternativoDialogProps) {
  const { control, handleSubmit, reset } = useForm<EnderecoAlternativoFormData>({
    resolver: zodResolver(enderecoAlternativoSchema),
    defaultValues: {
      id: "",
      endereco: "",
      complemento: "",
      cep: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  })

  const onSubmit = (data: EnderecoAlternativoFormData) => {
    onSave({ ...data, id: crypto.randomUUID() })
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo endereço alternativo</DialogTitle>
          <DialogDescription>
            Cadastre um endereço alternativo para a impressão.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="endereco"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="sm:col-span-2"
                >
                  <FieldLabel htmlFor={field.name}>
                    Endereço {requiredMark}
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      placeholder="Ex.: Rua das Flores"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>

                  <ErrorText message={fieldState.error?.message} />
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
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Estado {requiredMark}</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
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

                  <ErrorText message={fieldState.error?.message} />
                </Field>
              )}
            />
          </div>

          <DialogFooter>
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
