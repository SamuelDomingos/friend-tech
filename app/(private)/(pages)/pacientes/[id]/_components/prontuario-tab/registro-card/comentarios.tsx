"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { iniciais } from "@/lib/avatar-utils"

import type { Comentario } from "../../dados-mock"
import { horaMin } from "../../formatadores"

interface RegistroComentariosProps {
  comentarios: Comentario[]
  onComentar: (texto: string) => void
}

export function RegistroComentarios({
  comentarios,
  onComentar,
}: RegistroComentariosProps) {
  const [comentario, setComentario] = useState("")

  function enviar() {
    onComentar(comentario)
    setComentario("")
  }

  return (
    <>
      {comentarios.length > 0 && (
        <CardContent className="border-t px-3 py-2.5">
          <div className="space-y-2">
            {comentarios.map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <Avatar size="sm">
                  <AvatarFallback className="text-[10px]">
                    {iniciais(item.autorNome)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 rounded-lg bg-muted/60 px-2.5 py-1.5">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium">{item.autorNome}</p>
                    <span className="text-[11px] text-muted-foreground">
                      {horaMin(item.criadoEm)}
                    </span>
                  </div>
                  <p className="text-[13px]">{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}

      <CardContent className="border-t px-3 py-2.5">
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
                  enviar()
                }
              }}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Enviar comentário"
                onClick={enviar}
              >
                <Send className="size-4" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </CardContent>
    </>
  )
}
