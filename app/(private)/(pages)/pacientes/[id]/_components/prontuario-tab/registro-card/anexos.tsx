"use client"

import { FileText, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"

import type { Arquivo } from "../../dados-mock"

function descricaoArquivo(arquivo: Arquivo): string {
  if (arquivo.descricao) {
    return arquivo.descricao
  }
  if (arquivo.tipo === "imagem") {
    return "Imagem"
  }
  if (arquivo.tipo === "pdf") {
    return "PDF"
  }
  return "Arquivo"
}

interface RegistroAnexosProps {
  arquivos: Arquivo[]
}

export function RegistroAnexos({ arquivos }: RegistroAnexosProps) {
  return (
    <AttachmentGroup className="mt-2.5">
      {arquivos.map((arquivo) => (
        <Attachment key={arquivo.id} orientation="vertical">
          <AttachmentMedia variant={arquivo.url ? "image" : "icon"}>
            {arquivo.tipo === "imagem" ? (
              arquivo.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={arquivo.url} alt={arquivo.nome} />
              ) : (
                <ImageIcon className="text-muted-foreground" />
              )
            ) : (
              <FileText className="text-destructive" />
            )}
          </AttachmentMedia>

          <AttachmentContent>
            <AttachmentTitle>{arquivo.nome}</AttachmentTitle>
            <AttachmentDescription>
              {descricaoArquivo(arquivo)}
            </AttachmentDescription>
          </AttachmentContent>

          <AttachmentTrigger asChild>
            <a
              href="#"
              aria-label={`Abrir ${arquivo.nome}`}
              onClick={(event) => {
                event.preventDefault()
                toast("Abrindo arquivo em breve.")
              }}
            />
          </AttachmentTrigger>
        </Attachment>
      ))}
    </AttachmentGroup>
  )
}
