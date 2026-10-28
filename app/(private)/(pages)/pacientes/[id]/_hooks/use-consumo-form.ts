"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { ConsumoItem } from "../_components/consumo-tab/dados-mock"
import { PRODUTOS_ESTOQUE } from "../_components/consumo-tab/dados-mock"
import {
  consumoSchema,
  type ConsumoFormData,
} from "../_schemas/consumo.schema"

export interface ItemSaida {
  produtoId: string
  nome: string
  estoque: number
  quantidadeModelo: number
  quantidade: number
  lote: string
  validade: string
}

const valoresIniciais: ConsumoFormData = {
  tipoSaida: "Consumo do paciente",
  data: undefined as unknown as Date,
  origem: "",
  observacao: "",
  produto: "",
  quantidade: "1",
  lote: "",
  validade: undefined,
}

const padrao = (): ConsumoFormData => ({
  ...valoresIniciais,
  data: new Date(),
})

interface UseConsumoFormParams {
  onAdicionar: (item: Omit<ConsumoItem, "id" | "exportadoEm">) => void
  onConcluir: () => void
}

export function useConsumoForm({
  onAdicionar,
  onConcluir,
}: UseConsumoFormParams) {
  const [itensAdicionados, setItensAdicionados] = useState<ItemSaida[]>([])
  const [etiquetaAtiva, setEtiquetaAtiva] = useState(false)

  const form = useForm<ConsumoFormData>({
    resolver: zodResolver(consumoSchema),
    defaultValues: padrao(),
  })

  async function adicionarItem() {
    const camposValidos = await form.trigger(["produto", "quantidade"])

    if (!camposValidos) {
      return
    }

    const valores = form.getValues()
    const produto = PRODUTOS_ESTOQUE.find(
      (item) => item.id === valores.produto
    )

    if (!produto) {
      return
    }

    if (produto.estoque <= 0) {
      toast("Esse produto não está disponível no estoque selecionado.")
      return
    }

    setItensAdicionados((atual) => [
      ...atual,
      {
        produtoId: produto.id,
        nome: produto.nome,
        estoque: produto.estoque,
        quantidadeModelo: produto.quantidadeModelo,
        quantidade: Number(valores.quantidade),
        lote: valores.lote || produto.lote,
        validade: valores.validade
          ? valores.validade.toISOString().slice(0, 10)
          : produto.validade,
      },
    ])

    form.setValue("produto", "")
    form.setValue("quantidade", "1")
    form.setValue("lote", "")
    form.setValue("validade", undefined)
  }

  function removerItem(produtoId: string) {
    setItensAdicionados((atual) =>
      atual.filter((item) => item.produtoId !== produtoId)
    )
  }

  const onSubmit = form.handleSubmit(() => {
    if (itensAdicionados.length === 0) {
      return
    }

    itensAdicionados.forEach((item) => {
      onAdicionar({
        data: new Date().toISOString().slice(0, 10),
        item: item.nome,
        quantidade: item.quantidade,
        lote: item.lote || null,
        validade: item.validade || null,
        origem: form.getValues("origem") || null,
        matmeds: [],
      })
    })

    toast(`${itensAdicionados.length} item(ns) adicionado(s).`)
    setItensAdicionados([])
    form.reset(padrao())
    onConcluir()
  })

  function descartar() {
    setItensAdicionados([])
    form.reset(padrao())
    onConcluir()
  }

  return {
    form,
    itensAdicionados,
    adicionarItem,
    removerItem,
    etiquetaAtiva,
    alternarEtiqueta: () => setEtiquetaAtiva((atual) => !atual),
    onSubmit,
    descartar,
  }
}
