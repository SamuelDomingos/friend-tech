"use client"

import { Controller } from "react-hook-form"
import { Check } from "lucide-react"

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
import { cn } from "@/lib/utils"

import { useFilaEsperaForm } from "../../_hooks/use-fila-espera-form"
import { CORES_FILA_ESPERA } from "../../_schemas/fila-espera.schema"

const requiredMark = <span className="text-destructive">*</span>

function ErrorText({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-sm text-destructive">{message}</p>
}

export function FilaEsperaDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { form } = useFilaEsperaForm()
  const { control, handleSubmit, reset } = form

  const onSubmit = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova fila de espera</DialogTitle>
          <DialogDescription>
            Cadastre uma fila de espera com uma cor de identificação.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    placeholder="Ex.: Fila de retorno"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />

          <Controller
            name="cor"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Cor {requiredMark}</FieldLabel>

                <div className="grid grid-cols-9 gap-2">
                  {CORES_FILA_ESPERA.map((cor) => {
                    const selected = field.value === cor.id

                    return (
                      <button
                        key={cor.id}
                        type="button"
                        onClick={() => field.onChange(cor.id)}
                        aria-label={`Selecionar cor ${cor.label}`}
                        title={cor.label}
                        className={cn(
                          "flex aspect-square items-center justify-center rounded-md ring-2 ring-offset-2 transition-all",
                          cor.className,
                          selected ? "ring-ring" : "ring-transparent"
                        )}
                      >
                        {selected && (
                          <Check className="size-4 text-white mix-blend-difference" />
                        )}
                      </button>
                    )
                  })}
                </div>

                <ErrorText message={fieldState.error?.message} />
              </Field>
            )}
          />

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
