"use client"

import { useMemo, useState } from "react"

import {
  logsMock,
  type CategoriaLog,
} from "../_components/atualizacoes-tab/dados-mock"

export type FiltroLog = CategoriaLog | "all"

export function useAtualizacoes() {
  const [categoria, setCategoria] = useState<FiltroLog>("all")
  const [expandidos, setExpandidos] = useState<string[]>([])

  const logs = useMemo(() => {
    const ordenados = [...logsMock].sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    )

    if (categoria === "all") {
      return ordenados
    }

    return ordenados.filter((log) => log.categoria === categoria)
  }, [categoria])

  const contagens = useMemo(() => {
    return {
      all: logsMock.length,
      patient: logsMock.filter((log) => log.categoria === "patient").length,
      schedule: logsMock.filter((log) => log.categoria === "schedule").length,
      finance: logsMock.filter((log) => log.categoria === "finance").length,
    }
  }, [])

  const todosExpandidos =
    logs.length > 0 && logs.every((log) => expandidos.includes(log.id))

  function alternar(id: string) {
    setExpandidos((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]
    )
  }

  function alternarTodos() {
    setExpandidos(todosExpandidos ? [] : logs.map((log) => log.id))
  }

  return {
    logs,
    categoria,
    setCategoria,
    contagens,
    expandidos,
    alternar,
    alternarTodos,
    todosExpandidos,
    vazio: logs.length === 0,
  }
}
