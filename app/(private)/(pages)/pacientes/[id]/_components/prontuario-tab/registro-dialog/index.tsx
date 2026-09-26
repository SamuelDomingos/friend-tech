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
  Arquivo,
  Etiqueta,
  PacienteDetalhe,
  Registro,
  TipoRegistro,
} from "../../dados-mock"
import { camposQuestionarioMock, rotuloRegistro } from "../../dados-mock"
import { rotuloDataHora } from "../../formatadores"
import {
  RegistroForm,
  estadoAnexoInicial,
  estadoAtestadoInicial,
  estadoLaudoInicial,
  estadoReceituarioInicial,
  estadoSolicitacaoGuiaInicial,
  type EstadoAnexo,
  type EstadoAtestado,
  type EstadoLaudo,
  type EstadoReceituario,
  type EstadoSolicitacaoGuia,
} from "./registro-form"
import { RegistroSidebar } from "./sidebar"
import { RegistroMenuBar } from "../menu-bar"
import { Badge } from "@/components/ui/badge"

function textoVisivel(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim()
}

interface RegistroDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tipoInicial: TipoRegistro
  paciente: PacienteDetalhe
  grupos: import("../../dados-mock").BarraGrupo[]
  registros: Registro[]
  etiquetas: Etiqueta[]
  onAdicionarEtiqueta: (nome: string) => void
  onRemoverEtiqueta: (id: string) => void
  onSalvar: (tipo: TipoRegistro, texto: string, arquivos?: Arquivo[]) => void
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
  const [valores, setValores] = useState<Record<string, unknown>>(() => ({
    _anexo: estadoAnexoInicial(),
    _receituario: estadoReceituarioInicial(),
    _guia: estadoSolicitacaoGuiaInicial(),
    _laudo: estadoLaudoInicial(),
    _atestado: estadoAtestadoInicial(),
  }))

  function handleChange(id: string, valor: unknown) {
    setValores((atual) => ({ ...atual, [id]: valor }))
  }

  function handleSalvar() {
    const { texto, arquivos, vazio } = montarConteudo()

    if (vazio) {
      toast("Preencha o registro antes de salvar.")
      return
    }

    onSalvar(tipoAtivo, texto, arquivos)
    onOpenChange(false)
  }

  function montarConteudo(): {
    texto: string
    arquivos?: Arquivo[]
    vazio: boolean
  } {
    if (tipoAtivo === "ANEXO") {
      const estado =
        (valores._anexo as EstadoAnexo | undefined) ?? estadoAnexoInicial()
      const arquivos: Arquivo[] = estado.arquivos.map((arquivo, index) => ({
        id: `f-${Date.now()}-${index}`,
        nome: arquivo.nome,
        tipo: arquivo.imagem
          ? "imagem"
          : arquivo.nome.toLowerCase().endsWith(".pdf")
            ? "pdf"
            : "outro",
        descricao: estado.descricao.trim() || undefined,
      }))

      return {
        texto:
          estado.descricao.trim() ||
          estado.arquivos.map((arquivo) => arquivo.nome).join("\n"),
        arquivos,
        vazio: estado.arquivos.length === 0,
      }
    }

    if (tipoAtivo === "RECEITUARIO") {
      const estado =
        (valores._receituario as EstadoReceituario | undefined) ??
        estadoReceituarioInicial()
      const texto = [
        estado.controleEspecial ? "Receituário de controle especial" : "",
        ...estado.itens,
      ]
        .filter(Boolean)
        .join("\n")

      return { texto, vazio: estado.itens.length === 0 }
    }

    if (tipoAtivo === "SOLICITACAO_EXAME_GUIA") {
      const estado =
        (valores._guia as EstadoSolicitacaoGuia | undefined) ??
        estadoSolicitacaoGuiaInicial()
      const linhas = [
        estado.convenio && `Convênio: ${estado.convenio}`,
        estado.carater && `Caráter: ${estado.carater}`,
        estado.solicitante && `Profissional solicitante: ${estado.solicitante}`,
        estado.indicacaoClinica.trim() &&
          `Indicação clínica: ${estado.indicacaoClinica.trim()}`,
        estado.observacao.trim() && `Observação: ${estado.observacao.trim()}`,
        ...estado.procedimentos.map(
          (procedimento) =>
            `${procedimento.codigo ? `${procedimento.codigo} - ` : ""}${procedimento.descricao} (qtd ${procedimento.quantidade})`
        ),
      ].filter(Boolean) as string[]

      return {
        texto: linhas.join("\n"),
        vazio:
          estado.procedimentos.length === 0 &&
          !estado.indicacaoClinica.trim() &&
          !estado.observacao.trim(),
      }
    }

    if (tipoAtivo === "LAUDO") {
      const estado =
        (valores._laudo as EstadoLaudo | undefined) ?? estadoLaudoInicial()
      const corpo = textoVisivel(estado.texto)
      const linhas = [
        estado.titulo.trim() && `Título: ${estado.titulo.trim()}`,
        estado.procedimento.trim() &&
          `Procedimento/Exame: ${estado.procedimento.trim()}`,
        estado.executante && `Executante: ${estado.executante}`,
        estado.solicitante && `Solicitante: ${estado.solicitante}`,
        corpo,
      ].filter(Boolean) as string[]

      return {
        texto: linhas.join("\n"),
        vazio: corpo === "" && !estado.titulo.trim(),
      }
    }

    if (tipoAtivo === "ATESTADO") {
      const estado =
        (valores._atestado as EstadoAtestado | undefined) ??
        estadoAtestadoInicial()
      const corpo = textoVisivel(estado.texto)
      const rotulo =
        estado.subtipo === "ATESTADO"
          ? "Atestado"
          : estado.subtipo === "DECLARACAO"
            ? "Declaração"
            : "Outros"

      return {
        texto: `[${rotulo}]\n${corpo}`.trim(),
        vazio: corpo === "",
      }
    }

    if (tipoAtivo === "QUESTIONARIO") {
      const linhas = camposQuestionarioMock
        .map((campo) => {
          const valor = valores[campo.id]
          const texto = Array.isArray(valor)
            ? valor.join(", ")
            : ((valor as string | undefined) ?? "")

          return texto.trim() ? `${campo.titulo} ${texto.trim()}` : ""
        })
        .filter(Boolean) as string[]

      return { texto: linhas.join("\n"), vazio: linhas.length === 0 }
    }

    const texto = (
      (valores._texto as string | undefined) ??
      (valores.nomeCompleto as string | undefined) ??
      ""
    ).trim()

    return { texto, vazio: textoVisivel(texto) === "" }
  }

  const idade = paciente.dataNascimento
    ? calcularIdade(new Date(paciente.dataNascimento))
    : "—"
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex h-screen w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-none p-0 top-0 left-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">
          Novo registro — {rotuloRegistro(tipoAtivo)}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Formulário para criar um novo registro de{" "}
          {rotuloRegistro(tipoAtivo)} no prontuário do paciente.
        </DialogDescription>

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

          <Badge variant="secondary">
            {paciente.convenioPrincipal}
          </Badge>

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
            selecao
            estaAtivo={(_, tipo) => tipo === tipoAtivo}
            onAlternarAtivo={() => {}}
            onSelecionar={setTipoAtivo}
          />
        </div>

        {/* Corpo: conteúdo + sidebar */}
        <div className="flex min-h-0 flex-1">
          {/* Coluna esquerda: título + data + formulário + footer */}
          <div className="flex min-h-0 flex-1 flex-col">
            <ScrollArea className="min-h-0 flex-1 px-6">
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
