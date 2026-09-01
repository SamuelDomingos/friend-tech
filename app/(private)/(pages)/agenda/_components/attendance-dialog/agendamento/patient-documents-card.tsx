"use client"

import { useRef } from "react"
import { FileIcon, PaperclipIcon, XIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import { Card, CardContent } from "@/components/ui/card"

import type { AgendamentoFormValues } from "./types"

interface PatientDocumentsCardProps {
  values: AgendamentoFormValues
  onChange: <K extends keyof AgendamentoFormValues>(
    key: K,
    value: AgendamentoFormValues[K]
  ) => void
}

export function PatientDocumentsCard({
  values,
  onChange,
}: PatientDocumentsCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const adicionarArquivos = (files: FileList | null) => {
    if (!files?.length) return

    onChange("documentos", [
      ...values.documentos,
      ...Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        nome: file.name,
      })),
    ])
  }

  const removerDocumento = (id: string) => {
    onChange(
      "documentos",
      values.documentos.filter((documento) => documento.id !== id)
    )
  }

  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="documentos">
          <AccordionItem value="documentos">
            <AccordionTrigger>Documentos e anexos</AccordionTrigger>
            <AccordionContent>
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  adicionarArquivos(e.target.files)
                  e.target.value = ""
                }}
              />

              <Attachment state="idle" className="w-full">
                <AttachmentTrigger onClick={() => inputRef.current?.click()} />
                <AttachmentMedia>
                  <PaperclipIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>Clique aqui para anexar</AttachmentTitle>
                  <AttachmentDescription>
                    Documentos e exames do paciente
                  </AttachmentDescription>
                </AttachmentContent>
              </Attachment>

              {values.documentos.length > 0 && (
                <AttachmentGroup className="mt-3 flex-wrap">
                  {values.documentos.map((documento) => (
                    <Attachment key={documento.id} orientation="horizontal">
                      <AttachmentMedia>
                        <FileIcon />
                      </AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>{documento.nome}</AttachmentTitle>
                      </AttachmentContent>
                      <AttachmentActions>
                        <AttachmentAction
                          onClick={() => removerDocumento(documento.id)}
                        >
                          <XIcon />
                        </AttachmentAction>
                      </AttachmentActions>
                    </Attachment>
                  ))}
                </AttachmentGroup>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
