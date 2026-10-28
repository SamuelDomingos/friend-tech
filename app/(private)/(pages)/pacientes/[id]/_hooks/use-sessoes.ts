"use client"

import { useMemo, useState } from "react"

import {
  sessoesMock,
  type Sessao,
  type SituacaoPagamentoSessao,
} from "../_components/sessoes-tab/dados-mock"

export interface FiltroSessoes {
  inicio?: Date
  fim?: Date
  situacao: SituacaoPagamentoSessao | ""
}

const filtroInicial: FiltroSessoes = { situacao: "" }

export function useSessoes() {
  const [todas, setTodas] = useState<Sessao[]>(sessoesMock)
  const [filtro, setFiltro] = useState<FiltroSessoes>(filtroInicial)
  const [finalizando, setFinalizando] = useState<Sessao | null>(null)
  const [agendando, setAgendando] = useState<Sessao | null>(null)
  const [cancelando, setCancelando] = useState<Sessao | null>(null)

  const sessoes = useMemo(() => {
    return todas.filter((sessao) => {
      if (filtro.situacao && sessao.situacaoPagamento !== filtro.situacao) {
        return false
      }

      const criadaEm = new Date(sessao.criadaEm)

      if (filtro.inicio && criadaEm < filtro.inicio) {
        return false
      }

      if (filtro.fim) {
        const fim = new Date(filtro.fim)
        fim.setHours(23, 59, 59, 999)
        if (criadaEm > fim) {
          return false
        }
      }

      return true
    })
  }, [todas, filtro])

  const temFiltro = Boolean(filtro.inicio || filtro.fim || filtro.situacao)

  function selecionarMes() {
    const hoje = new Date()
    setFiltro((atual) => ({
      ...atual,
      inicio: new Date(hoje.getFullYear(), hoje.getMonth(), 1),
      fim: hoje,
    }))
  }

  function limparFiltros() {
    setFiltro(filtroInicial)
  }

  function finalizar(id: string) {
    setTodas((atual) =>
      atual.map((sessao) =>
        sessao.id === id ? { ...sessao, realizado: sessao.agendado } : sessao
      )
    )
  }

  function agendar(id: string, quantidade: number) {
    setTodas((atual) =>
      atual.map((sessao) =>
        sessao.id === id
          ? { ...sessao, agendado: sessao.agendado + quantidade }
          : sessao
      )
    )
  }

  function cancelar(
    id: string,
    escopo: "CURRENT" | "CURRENT_AND_NEXT"
  ) {
    setTodas((atual) => {
      const alvo = atual.find((sessao) => sessao.id === id)

      if (!alvo) {
        return atual
      }

      if (escopo === "CURRENT") {
        return atual.filter((sessao) => sessao.id !== id)
      }

      const referencia = new Date(alvo.criadaEm)

      return atual.filter(
        (sessao) => new Date(sessao.criadaEm) < referencia
      )
    })
  }

  return {
    sessoes,
    filtro,
    setFiltro,
    temFiltro,
    selecionarMes,
    limparFiltros,
    finalizar,
    agendar,
    cancelar,
    finalizando,
    setFinalizando,
    agendando,
    setAgendando,
    cancelando,
    setCancelando,
    totalRealizado: sessoes.reduce((total, sessao) => total + sessao.realizado, 0),
    totalAgendado: sessoes.reduce((total, sessao) => total + sessao.agendado, 0),
    valorTotal: sessoes.reduce((total, sessao) => total + sessao.valorTotal, 0),
  }
}
