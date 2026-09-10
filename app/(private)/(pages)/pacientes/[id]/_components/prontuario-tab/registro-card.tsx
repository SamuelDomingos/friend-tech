"use client"

import { useState } from "react"
import {
  FileText,
  Image as ImageIcon,
  Mail,
  MessageCircle,
  Pin,
  Printer,
  QrCode,
  RotateCcw,
  Send,
  Share2,
} from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import { cn } from "@/lib/utils"
import { iniciais } from "@/lib/avatar-utils"

import type { Registro } from "../dados-mock"
import { rotuloRegistro } from "../dados-mock"
import { rotuloDataHora, tempoRelativo, horaMin } from "../formatadores"
import { RegistroIcone } from "./registro-icones"

interface RegistroCardProps {
  registro: Registro
  onFixar: (id: string) => void
  onComentar: (id: string, texto: string) => void
}

function Acao({
  onClick,
  icone,
  children,
}: {
  onClick: () => void
  icone: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      className="gap-1 text-xs"
      onClick={onClick}
    >
      {icone}
      {children}
    </Button>
  )
}

export function RegistroCard({
  registro,
  onFixar,
  onComentar,
}: RegistroCardProps) {
  const [comentario, setComentario] = useState("")

  const enviarComentario = () => {
    onComentar(registro.id, comentario)
    setComentario("")
  }

  return (
    <article
      className={cn(
        "rounded-lg border bg-card",
        registro.fixado && "border-primary/40"
      )}
    >
      <header className="flex items-center justify-between gap-2 border-b px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback className="text-[10px]">
              {iniciais(registro.autorNome)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium">
              {registro.autorNome}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {rotuloDataHora(registro.criadoEm)}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          <span className="mr-1 text-[11px] whitespace-nowrap text-muted-foreground">
            {tempoRelativo(registro.criadoEm)}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Fixar"
            className={cn(registro.fixado && "text-primary")}
            onClick={() => onFixar(registro.id)}
          >
            <Pin className={cn("size-3.5", registro.fixado && "fill-current")} />
          </Button>
        </div>
      </header>

      <div className="px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-[13px] font-medium">
            <RegistroIcone tipo={registro.tipo} className="size-3.5" />
            {rotuloRegistro(registro.tipo)}
          </span>
          {registro.assinado && (
            <span className="flex items-center gap-1 rounded-md bg-blue-100 px-1.5 py-0.5 text-[11px] text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <QrCode className="size-3" />
              Assinado digitalmente
            </span>
          )}
        </div>

        {registro.texto && (
          <p className="mt-1.5 text-[13px] whitespace-pre-line text-foreground">
            {registro.texto}
          </p>
        )}

        {registro.arquivos && registro.arquivos.length > 0 && (
          <AttachmentGroup className="mt-2.5">
            {registro.arquivos.map((arquivo) => (
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
                    {arquivo.tipo === "pdf" ? "PDF" : "Imagem"}
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
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-t px-3 py-2">
        <Acao
          onClick={() => toast("Gerando PDF do registro.")}
          icone={<Printer className="size-3.5" />}
        >
          Imprimir
        </Acao>

        {!registro.assinado && (
          <Acao
            onClick={() => toast("Assinatura digital em breve.")}
            icone={<QrCode className="size-3.5" />}
          >
            Assinar
          </Acao>
        )}

        <Acao
          onClick={() => toast("Revalidação em breve.")}
          icone={<RotateCcw className="size-3.5" />}
        >
          Revalidar
        </Acao>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" size="xs" className="gap-1 text-xs">
              <Share2 className="size-3.5" />
              Compartilhar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => toast("Compartilhar por e-mail.")}>
              <Mail className="size-4" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast("Compartilhar no WhatsApp.")}>
              <MessageCircle className="size-4" />
              WhatsApp
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {registro.comentarios.length > 0 && (
        <div className="border-t px-3 py-2.5">
          <div className="space-y-2">
            {registro.comentarios.map((comentarioItem) => (
              <div key={comentarioItem.id} className="flex items-start gap-2">
                <Avatar size="sm">
                  <AvatarFallback className="text-[10px]">
                    {iniciais(comentarioItem.autorNome)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 rounded-lg bg-muted/60 px-2.5 py-1.5">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium">
                      {comentarioItem.autorNome}
                    </p>
                    <span className="text-[11px] text-muted-foreground">
                      {horaMin(comentarioItem.criadoEm)}
                    </span>
                  </div>
                  <p className="text-[13px]">{comentarioItem.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback className="text-[10px]">V</AvatarFallback>
          </Avatar>

          <InputGroup className="flex-1">
            <InputGroupTextarea
              rows={1}
              placeholder="Use @ para mencionar alguém"
              value={comentario}
              onChange={(event) => setComentario(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  enviarComentario()
                }
              }}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Enviar comentário"
                onClick={enviarComentario}
              >
                <Send className="size-4" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </article>
  )
}
