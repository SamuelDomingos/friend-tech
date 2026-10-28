"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import {
  consumoMock,
  type ConsumoItem,
} from "../_components/consumo-tab/dados-mock"

export interface FiltroConsumo {
  inicio?: Date
  fim?: Date
}

export function useConsumo() {
  const [itens, setItens] = useState<ConsumoItem[]>(consumoMock)
  const [selecionados, setSelecionados] = useState<string[]>([])
  const [filtro, setFiltro] = useState<FiltroConsumo>({})
  const [dialogAberto, setDialogAberto] = useState(false)
  const [atalho, setAtalho] = useState<"mes" | "hoje" | null>(null)

  const visiveis = useMemo(() => {
    return itens.filter((item) => {
      const data = new Date(item.data)

      if (filtro.inicio && data < filtro.inicio) {
        return false
      }

      if (filtro.fim) {
        const fim = new Date(filtro.fim)
        fim.setHours(23, 59, 59, 999)
        if (data > fim) {
          return false
        }
      }

      return true
    })
  }, [itens, filtro])

  const todosSelecionados =
    visiveis.length > 0 && visiveis.every((item) => selecionados.includes(item.id))

  function alternar(id: string) {
    setSelecionados((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]
    )
  }

  function alternarTodos() {
    setSelecionados(todosSelecionados ? [] : visiveis.map((item) => item.id))
  }

  function adicionar(item: Omit<ConsumoItem, "id" | "exportadoEm">) {
    setItens((atual) => [
      { ...item, id: `c${Date.now()}`, exportadoEm: null },
      ...atual,
    ])
  }

  function exportarParaContas() {
    if (selecionados.length === 0) {
      toast("Selecione ao menos um item para exportar.")
      return
    }

    const hoje = new Date().toISOString()

    setItens((atual) =>
      atual.map((item) =>
        selecionados.includes(item.id)
          ? { ...item, exportadoEm: hoje }
          : item
      )
    )
    setSelecionados([])
    toast("Itens exportados para contas.")
  }

  function setMesAtual() {
    const hoje = new Date()
    setFiltro({
      inicio: new Date(hoje.getFullYear(), hoje.getMonth(), 1),
      fim: hoje,
    })
    setAtalho("mes")
  }

  function setHoje() {
    setFiltro({ inicio: new Date(), fim: new Date() })
    setAtalho("hoje")
  }

  function limparFiltro() {
    setFiltro({})
    setAtalho(null)
  }

  return {
    itens: visiveis,
    selecionados,
    todosSelecionados,
    filtro,
    setFiltro,
    alternar,
    alternarTodos,
    adicionar,
    exportarParaContas,
    setMesAtual,
    setHoje,
    limparFiltro,
    dialogAberto,
    setDialogAberto,
    atalho,
    totalSelecionado: itens
      .filter((item) => selecionados.includes(item.id))
      .reduce((total, item) => total + item.quantidade, 0),
  }
}
