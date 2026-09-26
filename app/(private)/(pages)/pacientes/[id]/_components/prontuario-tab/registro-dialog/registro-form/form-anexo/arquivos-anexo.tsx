"use client"

import { useState } from "react"
import {
  FileCodeIcon,
  FileTextIcon,
  TableIcon,
  UploadCloud,
  XIcon,
  type LucideIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { cn } from "@/lib/utils"

export interface ArquivoAnexo {
  nome: string
  tamanho?: number
  imagem?: boolean
  previewUrl?: string
}

const EXTENSOES_CODE = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "css",
  "html",
  "md",
  "sql",
  "prisma",
]

function iconeDaExtensao(extensao: string): LucideIcon {
  if (["csv", "xls", "xlsx", "ods"].includes(extensao)) {
    return TableIcon
  }
  if (EXTENSOES_CODE.includes(extensao)) {
    return FileCodeIcon
  }
  return FileTextIcon
}

function formatarTamanho(bytes?: number): string {
  if (!bytes) {
    return ""
  }
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }
  if (bytes >= 1024) {
    return `${Math.round(bytes / 1024)} KB`
  }
  return `${bytes} B`
}

function metaDaArquivo(arquivo: ArquivoAnexo): string {
  const extensao = arquivo.nome.split(".").pop()?.toLowerCase() ?? ""
  const tamanho = formatarTamanho(arquivo.tamanho)
  const tipo = extensao ? extensao.toUpperCase() : "Arquivo"
  return tamanho ? `${tipo} · ${tamanho}` : tipo
}

interface CampoArquivosProps {
  arquivos: ArquivoAnexo[]
  onAdicionar: (files: FileList | null) => void
  onRemover: (index: number) => void
}

export function CampoArquivos({
  arquivos,
  onAdicionar,
  onRemover,
}: CampoArquivosProps) {
  const [arrastando, setArrastando] = useState(false)

  return (
    <>
      <label
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-muted/50",
          arrastando && "border-primary bg-primary/5"
        )}
        onDragOver={(event) => {
          event.preventDefault()
          setArrastando(true)
        }}
        onDragLeave={() => setArrastando(false)}
        onDrop={(event) => {
          event.preventDefault()
          setArrastando(false)
          onAdicionar(event.dataTransfer.files)
        }}
      >
        <UploadCloud className="size-7 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Arraste os arquivos ou imagens aqui
        </p>
        <span className="text-xs font-medium text-primary">
          ou clique para selecionar
        </span>
        <input
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.csv,.xls,.xlsx"
          className="sr-only"
          onChange={(event) => {
            onAdicionar(event.target.files)
            event.target.value = ""
          }}
        />
      </label>

      {arquivos.length > 0 && (
        <AttachmentGroup className="flex-wrap overflow-x-visible">
          {arquivos.map((arquivo, index) => {
            const Icone = iconeDaExtensao(
              arquivo.nome.split(".").pop()?.toLowerCase() ?? ""
            )

            return (
              <Attachment key={`${arquivo.nome}-${index}`}>
                {arquivo.previewUrl ? (
                  <AttachmentMedia variant="image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={arquivo.previewUrl} alt={arquivo.nome} />
                  </AttachmentMedia>
                ) : (
                  <AttachmentMedia>
                    <Icone />
                  </AttachmentMedia>
                )}

                <AttachmentContent>
                  <AttachmentTitle>{arquivo.nome}</AttachmentTitle>
                  <AttachmentDescription>
                    {metaDaArquivo(arquivo)}
                  </AttachmentDescription>
                </AttachmentContent>

                <AttachmentActions>
                  <AttachmentAction
                    aria-label={`Remover ${arquivo.nome}`}
                    onClick={() => onRemover(index)}
                  >
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            )
          })}
        </AttachmentGroup>
      )}
    </>
  )
}
