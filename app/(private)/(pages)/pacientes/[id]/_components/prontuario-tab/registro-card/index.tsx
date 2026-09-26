"use client"

import { Pin, QrCode } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { iniciais } from "@/lib/avatar-utils"

import type { Registro } from "../../dados-mock"
import { rotuloRegistro } from "../../dados-mock"
import { rotuloDataHora, tempoRelativo } from "../../formatadores"
import { RegistroIcone } from "../registro-timeline/icones"
import { RegistroAcoes } from "./acoes"
import { RegistroAnexos } from "./anexos"
import { RegistroComentarios } from "./comentarios"

interface RegistroCardProps {
  registro: Registro
  onFixar: (id: string) => void
  onComentar: (id: string, texto: string) => void
}

export function RegistroCard({
  registro,
  onFixar,
  onComentar,
}: RegistroCardProps) {
  return (
    <Card
      size="sm"
      className={cn("gap-0 py-0", registro.fixado && "ring-primary/40")}
    >
      <CardHeader className="border-b px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {iniciais(registro.autorNome)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="truncate text-[13px] font-medium">
              {registro.autorNome}
            </CardTitle>
            <CardDescription className="truncate text-[11px]">
              {rotuloDataHora(registro.criadoEm)}
            </CardDescription>
          </div>
        </div>

        <CardAction>
          <div className="flex items-center">
            <span className="mr-1 text-[11px] whitespace-nowrap text-muted-foreground">
              {tempoRelativo(registro.criadoEm)}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Fixar"
              className={cn(registro.fixado && "text-primary")}
              onClick={() => onFixar(registro.id)}
            >
              <Pin
                className={cn("size-3.5", registro.fixado && "fill-current")}
              />
            </Button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="px-3 py-2.5">
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
          <RegistroAnexos arquivos={registro.arquivos} />
        )}
      </CardContent>

      <RegistroAcoes registro={registro} />

      <RegistroComentarios
        comentarios={registro.comentarios}
        onComentar={(texto) => onComentar(registro.id, texto)}
      />
    </Card>
  )
}
