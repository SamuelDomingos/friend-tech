"use client"

import { useEffect, useMemo, useState } from "react"

import { CONVENIOS_FILTRO } from "../_components/dados-mock"
import {
  FILTROS_INICIAIS,
  type PacienteFiltros,
} from "./use-pacientes"

interface UseFiltrosPacientesParams {
  open: boolean
  base: PacienteFiltros
}

export function useFiltrosPacientes({ open, base }: UseFiltrosPacientesParams) {
  const [rascunho, setRascunho] = useState<PacienteFiltros>(base)
  const [buscaConvenio, setBuscaConvenio] = useState("")

  useEffect(() => {
    if (open) {
      setRascunho(base)
      setBuscaConvenio("")
    }
  }, [open, base])

  const conveniosVisiveis = useMemo(
    () =>
      CONVENIOS_FILTRO.filter((convenio) =>
        convenio.toLowerCase().includes(buscaConvenio.toLowerCase())
      ),
    [buscaConvenio]
  )

  const conveniosSelecionados = rascunho.convenios

  const todosConveniosSelecionados =
    conveniosVisiveis.length > 0 &&
    conveniosVisiveis.every((convenio) =>
      conveniosSelecionados.includes(convenio)
    )

  function setCampo<K extends keyof PacienteFiltros>(
    campo: K,
    valor: PacienteFiltros[K]
  ) {
    setRascunho((atual) => ({ ...atual, [campo]: valor }))
  }

  function alternarConvenio(convenio: string) {
    setCampo(
      "convenios",
      conveniosSelecionados.includes(convenio)
        ? conveniosSelecionados.filter((c) => c !== convenio)
        : [...conveniosSelecionados, convenio]
    )
  }

  function alternarTodosConvenios() {
    if (todosConveniosSelecionados) {
      setCampo(
        "convenios",
        conveniosSelecionados.filter((c) => !conveniosVisiveis.includes(c))
      )
      return
    }

    setCampo(
      "convenios",
      [...new Set([...conveniosSelecionados, ...conveniosVisiveis])]
    )
  }

  function removerConvenio(convenio: string) {
    setCampo("convenios", conveniosSelecionados.filter((c) => c !== convenio))
  }

  function limparRascunho() {
    setRascunho(FILTROS_INICIAIS)
    setBuscaConvenio("")
  }

  return {
    rascunho,
    setCampo,
    limparRascunho,
    buscaConvenio,
    setBuscaConvenio,
    conveniosVisiveis,
    conveniosSelecionados,
    todosConveniosSelecionados,
    alternarConvenio,
    alternarTodosConvenios,
    removerConvenio,
  }
}
