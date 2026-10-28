"use client"

import { useMemo, useState } from "react"
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

export interface FiltroAtivo {
  chave: string
  rotulo: string
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

export const POR_PAGINA = 10

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

const formatarData = (iso: string) => {
  if (!iso) {
    return ""
  }
  const [ano, mes, dia] = iso.split("-")
  return `${dia}/${mes}/${ano}`
}

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesMock)
  const [deletando, setDeletando] = useState<Paciente | null>(null)
  const [busca, setBuscaInterna] = useState("")
  const [buscaDebounced, setBuscaDebounced] = useState("")
  const [filtros, setFiltrosInterno] = useState<PacienteFiltros>(FILTROS_INICIAIS)
  const [pagina, setPagina] = useState(1)
  const [filtrosAberto, setFiltrosAberto] = useState(false)

  // Termo de busca aplicado imediatamente ao filtro e à primeira página.
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

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA))
  const paginaAtual = Math.min(pagina, totalPaginas)
  const paginados = filtrados.slice(
    (paginaAtual - 1) * POR_PAGINA,
    paginaAtual * POR_PAGINA
  )

  const temFiltros =
    filtros.convenios.length > 0 ||
    Boolean(filtros.cidadeEstado) ||
    filtros.vip !== "" ||
    filtros.aniversariante !== "" ||
    Boolean(filtros.criadoInicio || filtros.criadoFim) ||
    filtros.atendimentoTipo !== "" ||
    Boolean(filtros.atendimentoInicio || filtros.atendimentoFim)

  const filtrosAtivos: FiltroAtivo[] = [
    ...filtros.convenios.map((convenio) => ({
      chave: `convenio:${convenio}`,
      rotulo: `Convênio: ${convenio}`,
    })),
    ...(filtros.cidadeEstado
      ? [{ chave: "cidade", rotulo: `Cidade/UF: ${filtros.cidadeEstado}` }]
      : []),
    ...(filtros.vip
      ? [
          {
            chave: "vip",
            rotulo: `VIP: ${filtros.vip === "sim" ? "Sim" : "Não"}`,
          },
        ]
      : []),
    ...(filtros.aniversariante
      ? [
          {
            chave: "aniversariante",
            rotulo: `Aniversariantes: ${
              filtros.aniversariante === "hoje" ? "hoje" : "do mês"
            }`,
          },
        ]
      : []),
    ...(filtros.criadoInicio || filtros.criadoFim
      ? [
          {
            chave: "criado",
            rotulo: `Cadastro: ${formatarData(filtros.criadoInicio) || "…"} – ${
              formatarData(filtros.criadoFim) || "…"
            }`,
          },
        ]
      : []),
    ...(filtros.atendimentoTipo
      ? [
          {
            chave: "atendimento",
            rotulo: `${
              filtros.atendimentoTipo === "ultimo"
                ? "Último atendimento"
                : "Próximo atendimento"
            }: ${formatarData(filtros.atendimentoInicio) || "…"} – ${
              formatarData(filtros.atendimentoFim) || "…"
            }`,
          },
        ]
      : []),
  ]

  function setBusca(valor: string) {
    setBuscaInterna(valor)
    setBuscaDebounced(valor)
    setPagina(1)
  }

  function setFiltros(valor: PacienteFiltros) {
    setFiltrosInterno(valor)
    setPagina(1)
  }

  function removerFiltro(chave: string) {
    setFiltrosInterno((atual) => {
      if (chave.startsWith("convenio:")) {
        const convenio = chave.replace("convenio:", "")
        return {
          ...atual,
          convenios: atual.convenios.filter((item) => item !== convenio),
        }
      }

      switch (chave) {
        case "cidade":
          return { ...atual, cidadeEstado: "" }
        case "vip":
          return { ...atual, vip: "" }
        case "aniversariante":
          return { ...atual, aniversariante: "" }
        case "criado":
          return { ...atual, criadoInicio: "", criadoFim: "" }
        case "atendimento":
          return {
            ...atual,
            atendimentoTipo: "",
            atendimentoInicio: "",
            atendimentoFim: "",
          }
        default:
          return atual
      }
    })
    setPagina(1)
  }

  function limparFiltros() {
    setFiltrosInterno(FILTROS_INICIAIS)
    setBuscaInterna("")
    setBuscaDebounced("")
    setPagina(1)
  }

  function confirmarExclusao() {
    if (!deletando) {
      return
    }

    setPacientes((atual) => atual.filter((p) => p.id !== deletando.id))
    toast(`Paciente "${deletando.nome}" excluído.`)
    setDeletando(null)
  }

  function exportarCsv() {
    if (filtrados.length === 0) {
      toast("Nenhum paciente para exportar.")
      return
    }

    const linhas = [
      ["Nome", "Telefone", "Cidade", "UF", "Último atendimento", "Próximo atendimento", "Convênios"],
      ...filtrados.map((paciente) => [
        paciente.nome,
        paciente.telefone,
        paciente.cidade,
        paciente.estado,
        formatarData(paciente.ultimoAtendimento),
        formatarData(paciente.proximoAtendimento),
        paciente.convenios.join(" / "),
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
    link.download = "pacientes.csv"
    link.click()
    URL.revokeObjectURL(url)

    toast(`${filtrados.length} paciente(s) exportado(s).`)
  }

  function exportarPdf() {
    if (filtrados.length === 0) {
      toast("Nenhum paciente para exportar.")
      return
    }

    window.print()
  }

  return {
    pacientes,
    busca,
    setBusca,
    filtros,
    setFiltros,
    filtrosAberto,
    setFiltrosAberto,
    limparFiltros,
    filtrosAtivos,
    removerFiltro,
    filtrados,
    paginados,
    paginaAtual,
    totalPaginas,
    totalFiltrados: filtrados.length,
    setPagina,
    temFiltros,
    deletando,
    setDeletando,
    confirmarExclusao,
    exportarCsv,
    exportarPdf,
  }
}
