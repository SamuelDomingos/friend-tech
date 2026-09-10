"use client"

import { useState } from "react"
import { Star, X } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { calcularIdade } from "@/lib/utils"
import { iniciais } from "@/lib/avatar-utils"

import type {
  Etiqueta,
  PacienteDetalhe,
  Registro,
  TipoRegistro,
} from "../dados-mock"
import { rotuloRegistro } from "../dados-mock"
import { rotuloDataHora } from "../formatadores"
import { RegistroForm } from "./registro-form"
import { RegistroMenuBar } from "./registro-menu-bar"
import { RegistroSidebar } from "./registro-sidebar"

interface RegistroDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tipoInicial: TipoRegistro
  paciente: PacienteDetalhe
  grupos: import("../dados-mock").BarraGrupo[]
  registros: Registro[]
  etiquetas: Etiqueta[]
  onAdicionarEtiqueta: (nome: string) => void
  onRemoverEtiqueta: (id: string) => void
  onSalvar: (tipo: TipoRegistro, texto: string) => void
}

export function RegistroDialog({
  open,
  onOpenChange,
  tipoInicial,
  paciente,
  grupos,
  registros,
  etiquetas,
  onAdicionarEtiqueta,
  onRemoverEtiqueta,
  onSalvar,
}: RegistroDialogProps) {
  const [tipoAtivo, setTipoAtivo] = useState<TipoRegistro>(tipoInicial)
  const [valores, setValores] = useState<Record<string, string | string[]>>({})

  function handleChange(id: string, valor: string | string[]) {
    setValores((atual) => ({ ...atual, [id]: valor }))
  }

  function handleSalvar() {
    const texto =
      (valores._texto as string) ??
      (valores.nomeCompleto as string) ??
      ""
    onSalvar(tipoAtivo, texto)
    onOpenChange(false)
  }

  const idade = paciente.dataNascimento
    ? calcularIdade(new Date(paciente.dataNascimento))
    : "—"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-screen w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-none p-0 top-0 left-0 sm:max-w-none">
        <DialogTitle className="sr-only">
          Novo registro — {rotuloRegistro(tipoAtivo)}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Formulário para criar um novo registro de{" "}
          {rotuloRegistro(tipoAtivo)} no prontuário do paciente.
        </DialogDescription>

        {/* Header compacto do paciente */}
        <div className="flex items-center gap-3 border-b px-6 py-3">
          <Avatar className="size-9">
            <AvatarImage src={paciente.avatar} alt={paciente.nome} />
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {iniciais(paciente.nome)}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{paciente.nome}</span>
            {paciente.vip && (
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
            )}
          </div>

          <span className="text-xs text-muted-foreground">
            {idade} anos
          </span>

          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
            {paciente.convenioPrincipal}
          </span>

          <div className="flex-1" />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Barra de registros */}
        <div className="px-6 py-3">
          <RegistroMenuBar
            grupos={grupos}
            edicao={false}
            estaAtivo={(_, tipo) => tipo === tipoAtivo}
            onAlternarAtivo={() => {}}
            onSelecionar={setTipoAtivo}
          />
        </div>

        {/* Corpo: conteúdo + sidebar */}
        <div className="flex min-h-0 flex-1">
          {/* Coluna esquerda: título + data + formulário + footer */}
          <div className="flex min-h-0 flex-1 flex-col">
            <ScrollArea className="flex-1 px-6">
              {/* Título e data */}
              <div className="mb-4 flex items-baseline justify-between pt-2">
                <h2 className="text-lg font-semibold">
                  {rotuloRegistro(tipoAtivo)}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {rotuloDataHora(new Date().toISOString())}
                </span>
              </div>

              <Separator className="mb-4" />

              {/* Formulário */}
              <RegistroForm
                tipo={tipoAtivo}
                valores={valores}
                onChange={handleChange}
              />

              <div className="h-4" />
            </ScrollArea>

            {/* Footer esquerda */}
            <div className="flex items-center gap-2 border-t px-6 py-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => toast("Salvar modelo em breve.")}
              >
                Salvar modelo
              </Button>
              <div className="flex-1" />
              <Button type="button" onClick={handleSalvar}>
                Registrar no prontuário
              </Button>
            </div>
          </div>

          {/* Coluna direita: sidebar 380px */}
          <div className="w-[380px] shrink-0">
            <RegistroSidebar
              paciente={paciente}
              etiquetas={etiquetas}
              onAdicionarEtiqueta={onAdicionarEtiqueta}
              onRemoverEtiqueta={onRemoverEtiqueta}
              registros={registros}
              onCancelar={() => onOpenChange(false)}
              onSalvar={handleSalvar}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
