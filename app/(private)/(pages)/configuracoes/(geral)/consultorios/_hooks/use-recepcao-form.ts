"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  recepcaoSchema,
  type RecepcaoFormData,
} from "../_schemas/recepcao.schema"

export const useRecepcaoForm = () => {
  const form = useForm<RecepcaoFormData>({
    resolver: zodResolver(recepcaoSchema),
    defaultValues: {
      nome: "",
      nomeRecepcao: "",
      salas: [],
      unidade: "",
      habilitarChamador: false,
      codigoChamado: "",
      exibirHistorico: false,
      preferenciaIdentificacao: "nome_completo",
      habilitarTotem: false,
      marcarPresenteCpf: false,
      qtdGuiches: "1",
      tiposSenha: [
        {
          id: "senha-normal",
          habilitado: true,
          nome: "Normal",
          preferencia: false,
        },
        {
          id: "senha-preferencial",
          habilitado: true,
          nome: "Preferencial",
          preferencia: true,
        },
      ],
    },
  })

  return { form }
}
