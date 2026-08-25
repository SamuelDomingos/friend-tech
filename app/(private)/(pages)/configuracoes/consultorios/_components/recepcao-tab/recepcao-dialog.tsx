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
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRecepcaoForm } from "../../_hooks/use-recepcao-form"
import { ChamadorConfig } from "./chamador-config"
import { MultiSelect } from "./multi-select"
import { TotemConfig } from "./totem-config"

const unidades = ["Unidade A", "Unidade B", "Unidade C"]

const salas = [
  "Sala 01",
  "Sala 02",
  "Consultório A",
  "Consultório B",
  "Sala de cirurgia 1",
]

const requiredMark = <span className="text-destructive">*</span>

function ErrorText({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-sm text-destructive">{message}</p>
}

export function RecepcaoDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { form } = useRecepcaoForm()
  const { control, handleSubmit, reset } = form

  const onSubmit = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Nova recepção</DialogTitle>
          <DialogDescription>
            Configure a recepção e o painel chamador.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ScrollArea className="h-[min(60vh,480px)] pr-3">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="nome"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Nome {requiredMark}
                      </FieldLabel>

                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={field.name}
                          placeholder="Ex.: Recepção Principal"
                          aria-invalid={fieldState.invalid}
                        />
                      </InputGroup>

                      <ErrorText message={fieldState.error?.message} />
                    </Field>
                  )}
                />

                <Controller
                  name="nomeRecepcao"
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Nome da recepção
                      </FieldLabel>

                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={field.name}
                          placeholder="Ex.: Recepção"
                        />
                      </InputGroup>
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="salas"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Salas {requiredMark}</FieldLabel>

                    <MultiSelect
                      options={salas}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Selecione as salas"
                    />

                    <ErrorText message={fieldState.error?.message} />
                  </Field>
                )}
              />

              <Controller
                name="unidade"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Unidade {requiredMark}</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>

                      <SelectContent>
                        {unidades.map((unidade) => (
                          <SelectItem key={unidade} value={unidade}>
                            {unidade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <ErrorText message={fieldState.error?.message} />
                  </Field>
                )}
              />

              <ChamadorConfig form={form} />

              <TotemConfig form={form} />
            </div>
          </ScrollArea>

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
