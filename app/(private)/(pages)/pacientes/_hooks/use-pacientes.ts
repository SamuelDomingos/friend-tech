"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { pacientesMock, type Paciente } from "../_components/dados-mock"

export interface PacienteFiltros {
  convenios: string[]
  cidadeEstado: string
  vip: "" | "sim" | "nao"
  aniversariante: "" | "hoje" | "mes"
  criadoInicio: string
  criadoFim: string
  atendimentoTipo: "" | "ultimo" | "proximo"
  atendimentoInicio: string
  atendimentoFim: string
}

export const FILTROS_INICIAIS: PacienteFiltros = {
  convenios: [],
  cidadeEstado: "",
  vip: "",
  aniversariante: "",
  criadoInicio: "",
  criadoFim: "",
  atendimentoTipo: "",
  atendimentoInicio: "",
  atendimentoFim: "",
}

const entreDatas = (iso: string, inicio: string, fim: string) => {
  if (!iso) {
    return false
  }
  if (inicio && iso < inicio) {
    return false
  }
  if (fim && iso > fim) {
    return false
  }
  return true
}

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesMock)
  const [deletando, setDeletando] = useState<Paciente | null>(null)
  const [busca, setBusca] = useState("")
  const [buscaDebounced, setBuscaDebounced] = useState("")
  const [filtros, setFiltros] = useState<PacienteFiltros>(FILTROS_INICIAIS)

  useEffect(() => {
    const timer = setTimeout(() => setBuscaDebounced(busca), 1000)
    return () => clearTimeout(timer)
  }, [busca])

  const filtrados = useMemo(() => {
    const termo = buscaDebounced.trim().toLowerCase()
    const hoje = new Date()
    const mesHoje = hoje.getMonth() + 1
    const diaHoje = hoje.getDate()

    return pacientes.filter((paciente) => {
      if (
        termo &&
        !paciente.nome.toLowerCase().includes(termo) &&
        !paciente.cidade.toLowerCase().includes(termo) &&
        !(paciente.estado ?? "").toLowerCase().includes(termo) &&
        !paciente.telefone
          .replace(/\D/g, "")
          .includes(termo.replace(/\D/g, ""))
      ) {
        return false
      }

      if (
        filtros.convenios.length > 0 &&
        !filtros.convenios.some((convenio) =>
          paciente.convenios.includes(convenio)
        )
      ) {
        return false
      }

      if (
        filtros.cidadeEstado &&
        !(
          paciente.cidade.toLowerCase().includes(filtros.cidadeEstado) ||
          (paciente.estado ?? "").toLowerCase().includes(filtros.cidadeEstado)
        )
      ) {
        return false
      }

      if (filtros.vip === "sim" && !paciente.vip) {
        return false
      }
      if (filtros.vip === "nao" && paciente.vip) {
        return false
      }

      if (filtros.aniversariante) {
        const [ano, mes, dia] = (paciente.dataNascimento ?? "")
          .split("-")
          .map(Number)

        if (!ano || !mes || !dia) {
          return false
        }
        if (
          filtros.aniversariante === "hoje" &&
          !(mes === mesHoje && dia === diaHoje)
        ) {
          return false
        }
        if (filtros.aniversariante === "mes" && mes !== mesHoje) {
          return false
        }
      }

      if (
        !entreDatas(
          paciente.dataCriacao,
          filtros.criadoInicio,
          filtros.criadoFim
        )
      ) {
        return false
      }

      if (filtros.atendimentoTipo === "ultimo") {
        return entreDatas(
          paciente.ultimoAtendimento,
          filtros.atendimentoInicio,
          filtros.atendimentoFim
        )
      }

      if (filtros.atendimentoTipo === "proximo") {
        return entreDatas(
          paciente.proximoAtendimento,
          filtros.atendimentoInicio,
          filtros.atendimentoFim
        )
      }

      return true
    })
  }, [pacientes, buscaDebounced, filtros])

  const temFiltros =
    filtros.convenios.length > 0 ||
    Boolean(filtros.cidadeEstado) ||
    filtros.vip !== "" ||
    filtros.aniversariante !== "" ||
    Boolean(filtros.criadoInicio || filtros.criadoFim) ||
    filtros.atendimentoTipo !== "" ||
    Boolean(filtros.atendimentoInicio || filtros.atendimentoFim)

  function limparFiltros() {
    setFiltros(FILTROS_INICIAIS)
    setBusca("")
    setBuscaDebounced("")
  }

  function confirmarExclusao() {
    if (!deletando) {
      return
    }

    setPacientes((atual) => atual.filter((p) => p.id !== deletando.id))
    toast(`Paciente "${deletando.nome}" excluído.`)
    setDeletando(null)
  }

  return {
    pacientes,
    busca,
    setBusca,
    filtros,
    setFiltros,
    limparFiltros,
    filtrados,
    temFiltros,
    deletando,
    setDeletando,
    confirmarExclusao,
  }
}
