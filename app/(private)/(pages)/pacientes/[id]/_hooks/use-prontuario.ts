"use client"

import { useMemo, useState } from "react"

import type {
  BarraGrupo,
  Etiqueta,
  ProntuarioDados,
  Registro,
  TipoRegistro,
} from "../_components/dados-mock"
import { rotuloRegistro } from "../_components/dados-mock"
import {
  anoDeISO,
  chaveData,
  rotuloDiaMes,
} from "../_components/formatadores"

export type Agrupamento = "tipo" | "data"

export interface ResumoEvolucao {
  chave: string
  rotulo: string
  quantidade: number
}

export interface TimelineData {
  chave: string
  rotulo: string
  tipos: TipoRegistro[]
}

export interface TimelineAno {
  ano: number
  datas: TimelineData[]
}

export function useProntuario(dados: ProntuarioDados) {
  const [grupos, setGrupos] = useState<BarraGrupo[]>(dados.grupos)
  const [registros, setRegistros] = useState<Registro[]>(dados.registros)
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>(dados.etiquetas)
  const [edicaoMenu, setEdicaoMenu] = useState(false)
  const [ativosTemp, setAtivosTemp] = useState<Record<string, boolean>>({})
  const [filtroTipo, setFiltroTipo] = useState<TipoRegistro | "">("")
  const [filtroData, setFiltroData] = useState("")
  const [filtroEquipe, setFiltroEquipe] = useState<string[]>([])
  const [agrupamento, setAgrupamento] = useState<Agrupamento>("tipo")

  const chaveTemp = (grupoId: string, tipo: TipoRegistro) => `${grupoId}:${tipo}`

  function iniciarEdicaoMenu() {
    const iniciais: Record<string, boolean> = {}
    for (const grupo of grupos) {
      for (const item of grupo.itens) {
        iniciais[chaveTemp(grupo.id, item.tipo)] = item.ativo
      }
    }
    setAtivosTemp(iniciais)
    setEdicaoMenu(true)
  }

  function alternarAtivoTemp(grupoId: string, tipo: TipoRegistro) {
    setAtivosTemp((atual) => ({
      ...atual,
      [chaveTemp(grupoId, tipo)]: !atual[chaveTemp(grupoId, tipo)],
    }))
  }

  function confirmarEdicaoMenu() {
    setGrupos((atual) =>
      atual.map((grupo) => ({
        ...grupo,
        itens: grupo.itens.map((item) => ({
          ...item,
          ativo: ativosTemp[chaveTemp(grupo.id, item.tipo)] ?? item.ativo,
        })),
      }))
    )
    setEdicaoMenu(false)
    setAtivosTemp({})
  }

  function cancelarEdicaoMenu() {
    setEdicaoMenu(false)
    setAtivosTemp({})
  }

  function estaAtivo(grupoId: string, tipo: TipoRegistro) {
    const item = grupos
      .find((grupo) => grupo.id === grupoId)
      ?.itens.find((i) => i.tipo === tipo)

    if (edicaoMenu) {
      return ativosTemp[chaveTemp(grupoId, tipo)] ?? item?.ativo ?? true
    }
    return item?.ativo ?? true
  }

  const registrosComEquipe = useMemo(() => {
    const porNome = new Map(dados.equipe.map((p) => [p.nome, p.id]))

    return registros.map((registro) => ({
      ...registro,
      autorId: porNome.get(registro.autorNome) ?? registro.autorNome,
    }))
  }, [registros, dados.equipe])

  const registrosEquipe = useMemo(() => {
    if (filtroEquipe.length === 0) {
      return registrosComEquipe
    }
    return registrosComEquipe.filter(
      (registro) =>
        !dados.equipe.some((p) => p.id === registro.autorId) ||
        filtroEquipe.includes(registro.autorId as string)
    )
  }, [registrosComEquipe, filtroEquipe, dados.equipe])

  const registrosVisiveis = useMemo(() => {
    return registrosEquipe
      .filter((registro) => {
        if (filtroTipo && registro.tipo !== filtroTipo) {
          return false
        }
        if (filtroData && chaveData(registro.criadoEm) !== filtroData) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        if (a.fixado !== b.fixado) {
          return a.fixado ? -1 : 1
        }
        return b.criadoEm.localeCompare(a.criadoEm)
      })
  }, [registrosEquipe, filtroTipo, filtroData])

  const timeline = useMemo<TimelineAno[]>(() => {
    const anos = new Map<number, Map<string, TimelineData>>()

    for (const registro of registrosEquipe) {
      const ano = anoDeISO(registro.criadoEm)
      const chave = chaveData(registro.criadoEm)

      if (!anos.has(ano)) {
        anos.set(ano, new Map())
      }
      const datas = anos.get(ano)!

      if (!datas.has(chave)) {
        datas.set(chave, {
          chave,
          rotulo: rotuloDiaMes(registro.criadoEm),
          tipos: [],
        })
      }

      const data = datas.get(chave)!
      if (!data.tipos.includes(registro.tipo)) {
        data.tipos.push(registro.tipo)
      }
    }

    return [...anos.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([ano, datas]) => ({
        ano,
        datas: [...datas.values()].sort((a, b) =>
          a.chave.localeCompare(b.chave)
        ),
      }))
  }, [registrosEquipe])

  const resumo = useMemo<ResumoEvolucao[]>(() => {
    if (agrupamento === "tipo") {
      const porTipo = new Map<TipoRegistro, number>()
      for (const registro of registrosEquipe) {
        porTipo.set(registro.tipo, (porTipo.get(registro.tipo) ?? 0) + 1)
      }
      return [...porTipo.entries()]
        .map(([tipo, quantidade]) => ({
          chave: tipo,
          rotulo: rotuloRegistro(tipo),
          quantidade,
        }))
        .sort((a, b) => a.rotulo.localeCompare(b.rotulo))
    }

    const porData = new Map<string, number>()
    for (const registro of registrosEquipe) {
      const chave = chaveData(registro.criadoEm)
      porData.set(chave, (porData.get(chave) ?? 0) + 1)
    }
    return [...porData.entries()]
      .map(([chave, quantidade]) => ({
        chave,
        rotulo: rotuloDiaMes(registrosEquipe.find((r) => chaveData(r.criadoEm) === chave)!.criadoEm),
        quantidade,
      }))
      .sort((a, b) => b.chave.localeCompare(a.chave))
  }, [registrosEquipe, agrupamento])

  function filtrarTimeline(chave: string, tipo: TipoRegistro) {
    if (filtroData === chave && filtroTipo === tipo) {
      setFiltroData("")
      setFiltroTipo("")
      return
    }
    setFiltroData(chave)
    setFiltroTipo(tipo)
  }

  function filtrarResumo(chave: string) {
    if (agrupamento === "tipo") {
      setFiltroTipo((atual) => (atual === chave ? "" : (chave as TipoRegistro)))
      return
    }
    setFiltroData((atual) => (atual === chave ? "" : chave))
  }

  function limparFiltros() {
    setFiltroTipo("")
    setFiltroData("")
    setFiltroEquipe([])
  }

  function limparEquipe() {
    setFiltroEquipe([])
  }

  function alternarEquipe(id: string) {
    setFiltroEquipe((atual) =>
      atual.includes(id)
        ? atual.filter((e) => e !== id)
        : [...atual, id]
    )
  }

  function alternarFixado(id: string) {
    setRegistros((atual) =>
      atual.map((registro) =>
        registro.id === id ? { ...registro, fixado: !registro.fixado } : registro
      )
    )
  }

  function adicionarComentario(id: string, texto: string) {
    if (!texto.trim()) {
      return
    }
    setRegistros((atual) =>
      atual.map((registro) =>
        registro.id === id
          ? {
              ...registro,
              comentarios: [
                ...registro.comentarios,
                {
                  id: `c-${Date.now()}`,
                  autorNome: "Você",
                  criadoEm: new Date().toISOString(),
                  texto,
                },
              ],
            }
          : registro
      )
    )
  }

  function adicionarEtiqueta(nome: string) {
    if (!nome.trim()) {
      return
    }
    setEtiquetas((atual) => [
      ...atual,
      { id: `e-${Date.now()}`, nome: nome.trim() },
    ])
  }

  function removerEtiqueta(id: string) {
    setEtiquetas((atual) => atual.filter((e) => e.id !== id))
  }

  function adicionarRegistro(tipo: TipoRegistro, texto: string) {
    const novoRegistro: Registro = {
      id: `r-${Date.now()}`,
      tipo,
      autorNome: "Você",
      criadoEm: new Date().toISOString(),
      texto: texto || undefined,
      fixado: false,
      comentarios: [],
    }
    setRegistros((atual) => [novoRegistro, ...atual])
  }

  return {
    grupos,
    estaAtivo,
    edicaoMenu,
    iniciarEdicaoMenu,
    alternarAtivoTemp,
    confirmarEdicaoMenu,
    cancelarEdicaoMenu,
    registrosVisiveis,
    timeline,
    resumo,
    agrupamento,
    setAgrupamento,
    filtroTipo,
    filtroData,
    filtroEquipe,
    filtrarTimeline,
    filtrarResumo,
    limparFiltros,
    limparEquipe,
    alternarEquipe,
    alternarFixado,
    adicionarComentario,
    etiquetas,
    adicionarEtiqueta,
    removerEtiqueta,
    adicionarRegistro,
    temFiltro:
      filtroTipo !== "" || filtroData !== "" || filtroEquipe.length > 0,
  }
}
