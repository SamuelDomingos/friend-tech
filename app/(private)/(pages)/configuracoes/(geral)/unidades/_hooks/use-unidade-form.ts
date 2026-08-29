"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { unidadeSchema, type UnidadeFormData } from "../_schemas/unidade.schema"
import type { Unidade } from "../_components/dados-mock"

export const useUnidadeForm = (unidade?: Unidade | null) => {
  const form = useForm<UnidadeFormData>({
    resolver: zodResolver(unidadeSchema),
    defaultValues: unidade
      ? {
          nome: unidade.nome,
          prefixo: unidade.prefixo,
          telefone: unidade.telefone,
          cep: unidade.cep,
          endereco: unidade.endereco,
          numero: unidade.numero,
          complemento: unidade.complemento,
          bairro: unidade.bairro,
          cidade: unidade.cidade,
          estado: unidade.estado,
          cnes: unidade.cnes,
          grupoId: unidade.grupoId,
        }
      : {
          nome: "",
          prefixo: "",
          telefone: "",
          cep: "",
          endereco: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          cnes: "",
          grupoId: "",
        },
  })

  return { form }
}
