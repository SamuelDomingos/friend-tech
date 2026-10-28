"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns"

import { laudosMock, type Laudo, type StatusLaudo } from "../_components/dados-mock"
import {
  LAUDO_FILTROS_INICIAIS,
  type LaudoFiltrosFormData,
} from "../_schemas/laudo-filtros.schema"

export type CampoOrdenacao = "id" | "data" | "paciente"

export interface Ordenacao {
  campo: CampoOrdenacao
  desc: boolean
}

export interface Intervalo {
  inicio: Date
  fim: Date
}

const formatarData = (iso: string) => {
  if (!iso) {
    return "—"
  }
  const [data] = iso.split("T")
  const [ano, mes, dia] = data.split("-")
  return `${dia}/${mes}/${ano}`
}

const semanaAtual = (): Intervalo => {
  const hoje = new Date()
  return {
    inicio: startOfWeek(hoje, { weekStartsOn: 0 }),
    fim: endOfWeek(hoje, { weekStartsOn: 0 }),
  }
}

export function useLaudos() {
  const [laudos, setLaudos] = useState<Laudo[]>(laudosMock)
  const [status, setStatus] = useState<StatusLaudo>("A_DESCREVER")
  const [busca, setBusca] = useState("")
  const [filtros, setFiltros] = useState<LaudoFiltrosFormData>(
    LAUDO_FILTROS_INICIAIS
  )
  const [filtrosAberto, setFiltrosAberto] = useState(false)
  const [visualizando, setVisualizando] = useState<Laudo | null>(null)
  const [intervalo, setIntervalo] = useState<Intervalo>(semanaAtual)
  const [ordenacao, setOrdenacao] = useState<Ordenacao>({
    campo: "data",
    desc: true,
  })

  const contagens = useMemo(
    () => ({
      A_DESCREVER: laudos.filter((l) => l.status === "A_DESCREVER").length,
      LIBERADO: laudos.filter((l) => l.status === "LIBERADO").length,
      ENTREGUE: laudos.filter((l) => l.status === "ENTREGUE").length,
    }),
    [laudos]
  )

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    const inicio = new Date(intervalo.inicio)
    inicio.setHours(0, 0, 0, 0)
    const fim = new Date(intervalo.fim)
    fim.setHours(23, 59, 59, 999)

    const lista = laudos.filter((laudo) => {
      if (laudo.status !== status) {
        return false
      }

      const data = new Date(laudo.data)

      if (data < inicio || data > fim) {
        return false
      }

      if (termo) {
        const alvo = [
          laudo.pacienteNome,
          laudo.id,
          laudo.attendanceId,
          laudo.procedimento,
        ]
          .join(" ")
          .toLowerCase()

        if (!alvo.includes(termo)) {
          return false
        }
      }

      if (filtros.convenio && laudo.convenio !== filtros.convenio) {
        return false
      }

      if (
        filtros.classificacao &&
        laudo.classificacao !== filtros.classificacao
      ) {
        return false
      }

      if (
        filtros.solicitante &&
        !laudo.solicitante
          .toLowerCase()
          .includes(filtros.solicitante.toLowerCase())
      ) {
        return false
      }

      if (
        filtros.medico &&
        !laudo.executante.toLowerCase().includes(filtros.medico.toLowerCase())
      ) {
        return false
      }

      return true
    })

    return [...lista].sort((a, b) => {
      const fator = ordenacao.desc ? -1 : 1

      if (ordenacao.campo === "id") {
        return Number(a.id) > Number(b.id) ? fator : -fator
      }

      if (ordenacao.campo === "paciente") {
        return a.pacienteNome.localeCompare(b.pacienteNome) * fator
      }

      return a.data.localeCompare(b.data) * fator
    })
  }, [laudos, status, busca, filtros, intervalo, ordenacao])

  const filtrosAtivos = Object.values(filtros).filter(Boolean).length

  function alternarOrdenacao(campo: CampoOrdenacao) {
    setOrdenacao((atual) =>
      atual.campo === campo
        ? { campo, desc: !atual.desc }
        : { campo, desc: false }
    )
  }

  function alternarRevisado(id: string) {
    setLaudos((atual) =>
      atual.map((laudo) =>
        laudo.id === id ? { ...laudo, revisado: !laudo.revisado } : laudo
      )
    )
  }

  function alterarStatus(id: string, novo: StatusLaudo) {
    setLaudos((atual) =>
      atual.map((laudo) =>
        laudo.id === id ? { ...laudo, status: novo } : laudo
      )
    )
  }

  function liberar(id: string) {
    alterarStatus(id, "LIBERADO")
    toast("Laudo liberado.")
  }

  function entregar(id: string) {
    alterarStatus(id, "ENTREGUE")
    toast("Laudo entregue.")
  }

  function imprimir() {
    window.print()
  }

  function aplicarFiltros(dados: LaudoFiltrosFormData) {
    setFiltros(dados)
    setFiltrosAberto(false)
  }

  function limparFiltros() {
    setFiltros(LAUDO_FILTROS_INICIAIS)
    setBusca("")
  }

  function selecionarHoje() {
    const hoje = new Date()
    setIntervalo({ inicio: hoje, fim: hoje })
  }

  function selecionarSemana() {
    setIntervalo(semanaAtual())
  }

  function selecionarMes() {
    const hoje = new Date()
    setIntervalo({ inicio: startOfMonth(hoje), fim: endOfMonth(hoje) })
  }

  function exportarCsv() {
    if (filtrados.length === 0) {
      toast("Nenhum laudo para exportar.")
      return
    }

    const linhas = [
      [
        "Pedido",
        "Data",
        "Prazo",
        "Paciente",
        "Executante",
        "Solicitante",
        "Exame",
        "Classificação",
      ],
      ...filtrados.map((laudo) => [
        laudo.id,
        formatarData(laudo.data),
        formatarData(laudo.prazo),
        laudo.pacienteNome,
        laudo.executante,
        laudo.solicitante,
        laudo.procedimento,
        laudo.classificacao,
      ]),
    ]

    const csv = linhas
      .map((linha) => linha.map((valor) => `"${valor}"`).join(";"))
      .join("\r\n")

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "laudos.csv"
    link.click()
    URL.revokeObjectURL(url)

    toast(`${filtrados.length} laudo(s) exportado(s).`)
  }

  function exportarPdf() {
    if (filtrados.length === 0) {
      toast("Nenhum laudo para exportar.")
      return
    }

    window.print()
  }

  return {
    status,
    setStatus,
    busca,
    setBusca,
    filtros,
    filtrosAtivos,
    filtrosAberto,
    setFiltrosAberto,
    filtrados,
    contagens,
    ordenacao,
    alternarOrdenacao,
    alternarRevisado,
    alterarStatus,
    liberar,
    entregar,
    imprimir,
    aplicarFiltros,
    limparFiltros,
    intervalo,
    setIntervalo,
    selecionarHoje,
    selecionarSemana,
    selecionarMes,
    visualizando,
    setVisualizando,
    exportarCsv,
    exportarPdf,
  }
}
