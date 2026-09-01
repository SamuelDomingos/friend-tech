"use client"

import { useState } from "react"
import { PlusIcon, XIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import type { AgendamentoFormValues } from "./types"
import { etiquetasMock } from "./patient-field-options"

interface PatientTagsCardProps {
  values: AgendamentoFormValues
  onChange: <K extends keyof AgendamentoFormValues>(
    key: K,
    value: AgendamentoFormValues[K]
  ) => void
  patientPresent: boolean
}

export function PatientTagsCard({
  values,
  onChange,
  patientPresent,
}: PatientTagsCardProps) {
  const [open, setOpen] = useState(false)

  const disponiveis = etiquetasMock.filter(
    (etiqueta) => !values.etiquetas.includes(etiqueta)
  )

  const adicionarEtiqueta = (etiqueta: string) => {
    onChange("etiquetas", [...values.etiquetas, etiqueta])
    setOpen(false)
  }

  const removerEtiqueta = (etiqueta: string) => {
    onChange(
      "etiquetas",
      values.etiquetas.filter((atual) => atual !== etiqueta)
    )
  }

  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="etiquetas">
          <AccordionItem value="etiquetas">
            <AccordionTrigger>Etiquetas do paciente</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap items-center gap-2">
                {values.etiquetas.map((etiqueta) => (
                  <Badge key={etiqueta} variant="secondary" className="gap-1">
                    {etiqueta}
                    <button
                      type="button"
                      onClick={() => removerEtiqueta(etiqueta)}
                      className="rounded-full hover:opacity-70"
                    >
                      <XIcon className="size-3" />
                    </button>
                  </Badge>
                ))}

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={!patientPresent || disponiveis.length === 0}
                    >
                      <PlusIcon />
                      Adicionar
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-1" align="start">
                    <div className="flex flex-col gap-0.5">
                      {disponiveis.map((etiqueta) => (
                        <Button
                          key={etiqueta}
                          type="button"
                          variant="ghost"
                          className="justify-start px-2"
                          onClick={() => adicionarEtiqueta(etiqueta)}
                        >
                          {etiqueta}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {!patientPresent && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Selecione um paciente para adicionar etiquetas.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
