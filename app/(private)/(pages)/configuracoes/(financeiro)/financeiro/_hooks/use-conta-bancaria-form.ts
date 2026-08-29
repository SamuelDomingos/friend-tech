"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  contaBancariaSchema,
  type ContaBancariaFormData,
} from "../_schemas/conta-bancaria.schema"
import type { ContaBancaria } from "../_components/dados-mock"

export const useContaBancariaForm = (conta?: ContaBancaria | null) => {
  const form = useForm<ContaBancariaFormData>({
    resolver: zodResolver(contaBancariaSchema),
    defaultValues: conta
      ? {
          codigo: conta.codigo,
          banco: conta.banco,
          agencia: conta.agencia,
          conta: conta.conta,
          digito: conta.digito,
          saldoInicial: conta.saldoInicial,
          dataSaldoInicial: conta.dataSaldoInicial,
          limiteCredito: conta.limiteCredito,
          principal: conta.principal,
        }
      : {
          codigo: "",
          banco: "",
          agencia: "",
          conta: "",
          digito: "",
          saldoInicial: "",
          dataSaldoInicial: "",
          limiteCredito: "",
          principal: false,
        },
  })

  return { form }
}
