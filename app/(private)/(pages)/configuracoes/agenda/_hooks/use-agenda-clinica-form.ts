"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  agendaClinicaSchema,
  type AgendaClinicaFormData,
} from "../_schemas/agenda-clinica.schema"

export const useAgendaClinicaForm = () => {
  const form = useForm<AgendaClinicaFormData>({
    resolver: zodResolver(agendaClinicaSchema),
    defaultValues: {
      visualizacao: "semana",
      intervalo: "30",
      unidade: "",
      atendimento: "",
      diasFuncionamento: [
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
      ],
      inicio: "07:00",
      fim: "22:00",
    },
  })

  return { form }
}
