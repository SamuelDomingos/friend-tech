"use client"

import { Controller } from "react-hook-form"
import { Minus, Plus } from "lucide-react"

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useGradeHorarioForm } from "../../_hooks/use-grade-horario-form"
import { RECORRENCIAS } from "../../_schemas/grade-horario.schema"
import { AcordeonRestricoes } from "./acordeon-restricoes"
import { ConfiguracaoAtendimento } from "./configuracao-atendimento"

const unidades = ["Unidade A", "Unidade B", "Unidade C"]

const requiredMark = <span className="text-destructive">*</span>

function ErrorText({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-sm text-destructive">{message}</p>
}

export function GradeHorarioDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { form } = useGradeHorarioForm()
  const { control, handleSubmit, reset } = form

  const onSubmit = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Criar grade de horário</DialogTitle>
          <DialogDescription>
            Defina o modelo de horário de atendimento da unidade.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ScrollArea className="h-[min(60vh,480px)] pr-3">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="titulo"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
                    <FieldLabel htmlFor={field.name}>
                      Título do modelo {requiredMark}
                    </FieldLabel>

                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        placeholder="Ex.: Atendimento padrão"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>

                    <ErrorText message={fieldState.error?.message} />
                  </Field>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
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

              <Controller
                name="qtdEncaixes"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Qtd de encaixes {requiredMark}
                    </FieldLabel>

                    <InputGroup>
                      <InputGroupAddon align="inline-start">
                        <InputGroupButton
                          variant="ghost"
                          size="icon-xs"
                          onClick={() =>
                            field.onChange(Math.max(0, field.value - 1))
                          }
                          aria-label="Diminuir quantidade de encaixes"
                        >
                          <Minus />
                        </InputGroupButton>
                      </InputGroupAddon>

                      <InputGroupInput
                        id={field.name}
                        type="number"
                        min={0}
                        readOnly
                        value={field.value}
                        inputMode="numeric"
                        aria-invalid={fieldState.invalid}
                      />

                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => field.onChange(field.value + 1)}
                          aria-label="Aumentar quantidade de encaixes"
                        >
                          <Plus />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>

                    <ErrorText message={fieldState.error?.message} />
                  </Field>
                )}
              />

              <Controller
                name="recorrencia"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Recorrência {requiredMark}</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>

                      <SelectContent>
                        {RECORRENCIAS.map((recorrencia) => (
                          <SelectItem key={recorrencia} value={recorrencia}>
                            {recorrencia.charAt(0).toUpperCase() +
                              recorrencia.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <ErrorText message={fieldState.error?.message} />
                  </Field>
                )}
              />
            </div>

            <ConfiguracaoAtendimento form={form} />

            <AcordeonRestricoes form={form} />
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
