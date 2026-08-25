"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  DIAS_SEMANA,
  gradeHorarioSchema,
  type GradeHorarioFormData,
} from "../_schemas/grade-horario.schema"

export const useGradeHorarioForm = () => {
  const form = useForm<GradeHorarioFormData>({
    resolver: zodResolver(gradeHorarioSchema),
    defaultValues: {
      titulo: "",
      unidade: "",
      qtdEncaixes: 1,
      recorrencia: "semanal",
      dias: DIAS_SEMANA.map((dia) => ({
        key: dia.key,
        rotulo: dia.rotulo,
        ativo: false,
        inicio: "",
        final: "",
      })),
      idadeMinima: "",
      idadeMaxima: "",
      generos: [],
      tiposAtendimento: [],
      convenios: [],
    },
  })

  return { form }
}
