"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import { calcularIdade } from "@/lib/utils"

import type { PacienteDetalhe } from "../_components/dados-mock"

export function usePacienteHeader(paciente: PacienteDetalhe) {
  const [avatarUrl, setAvatarUrl] = useState(paciente.avatar)
  const [vip, setVip] = useState(paciente.vip)
  const [teleconsultaAberto, setTeleconsultaAberto] = useState(false)
  const [impressoAberto, setImpressoAberto] = useState(false)

  const nascimento = useMemo(() => {
    const [ano, mes, dia] = paciente.dataNascimento.split("-").map(Number)
    return new Date(ano, mes - 1, dia)
  }, [paciente.dataNascimento])

  const idade = calcularIdade(nascimento)

  function aoSelecionarFoto(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0]

    if (!arquivo) {
      return
    }

    setAvatarUrl(URL.createObjectURL(arquivo))
    toast("Foto do paciente atualizada.")
  }

  function alternarVip() {
    const proximo = !vip
    setVip(proximo)
    toast(proximo ? "Marcado como VIP." : "Removido de VIP.")
  }

  function abrirWhatsapp() {
    const digitos = paciente.telefone.replace(/\D/g, "")
    const numero = digitos.startsWith("55") ? digitos : `55${digitos}`

    window.open(`https://wa.me/${numero}`, "_blank", "noopener,noreferrer")
  }

  return {
    avatarUrl,
    vip,
    idade,
    teleconsultaAberto,
    setTeleconsultaAberto,
    impressoAberto,
    setImpressoAberto,
    aoSelecionarFoto,
    alternarVip,
    abrirWhatsapp,
  }
}
