"use client"

import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { CLASSIFICACOES_LAUDO, CONVENIOS_LAUDO } from "../dados-mock"
import { useLaudoFiltrosForm } from "../../_hooks/use-laudo-filtros-form"
import type { LaudoFiltrosFormData } from "../../_schemas/laudo-filtros.schema"

interface LaudoFiltrosProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  iniciais: LaudoFiltrosFormData
  onAplicar: (dados: LaudoFiltrosFormData) => void
  onLimpar: () => void
}

export function LaudoFiltros({
  open,
  onOpenChange,
  iniciais,
  onAplicar,
  onLimpar,
}: LaudoFiltrosProps) {
  const { form, onSubmit, limpar, selecionar } = useLaudoFiltrosForm({
    iniciais,
    onAplicar,
    onLimpar,
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>
            Refine a lista de laudos por convênio, classificação e equipe.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={onSubmit}
          className="flex flex-1 flex-col justify-between gap-6 px-4"
          noValidate
        >
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Convênio</FieldLabel>
              <Controller
                name="convenio"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(valor) => selecionar("convenio", valor)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Buscar por convênio" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONVENIOS_LAUDO.map((convenio) => (
                        <SelectItem key={convenio} value={convenio}>
                          {convenio}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel>Classificação</FieldLabel>
              <Controller
                name="classificacao"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(valor) =>
                      selecionar("classificacao", valor)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filtrar por classificação" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASSIFICACOES_LAUDO.map((classificacao) => (
                        <SelectItem key={classificacao} value={classificacao}>
                          {classificacao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="laudo-filtro-solicitante">
                Solicitante
              </FieldLabel>
              <Input
                id="laudo-filtro-solicitante"
                placeholder="Buscar solicitante"
                {...form.register("solicitante")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="laudo-filtro-medico">Médico</FieldLabel>
              <Input
                id="laudo-filtro-medico"
                placeholder="Buscar médico"
                {...form.register("medico")}
              />
            </Field>
          </FieldGroup>

          <SheetFooter className="flex-row justify-end gap-2 px-0 pb-4">
            <Button type="button" variant="ghost" onClick={limpar}>
              Limpar filtros
            </Button>
            <Button type="submit">Pesquisar</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
