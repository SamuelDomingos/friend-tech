"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  impressaoSchema,
  type ImpressaoFormData,
} from "../_schemas/impressao.schema"

export const useImpressaoForm = () => {
  const form = useForm<ImpressaoFormData>({
    resolver: zodResolver(impressaoSchema),
    defaultValues: {
      termoConsentimento: "",
      nomeClinica: "Infinity Way",
      remetenteSms: "Infinity Way",
      cep: "60120-020",
      endereco: "Rua Silva Paulet",
      numero: "984",
      complemento: "",
      bairro: "Meireles",
      cidade: "Fortaleza",
      estado: "Ceará",
      telefone1: "(85) 99985-4065",
      telefone2: "(85) 99985-4065",
      email: "financeiro@drandreguanabara.com.br",
      site: "",
      posicaoQrCode: "Superior direito",
      margemEsquerda: "0",
      posicaoLogo: "Superior esquerdo",
      logoPadrao: "",
      esconderCabecalho: false,
      esconderRodape: false,
      esconderCabecalhoPaciente: false,
      margemSuperiorPersonalizada: false,
      personalizarTamanhoFonte: false,
      enderecosAlternativos: [],
    },
  })

  return { form }
}
