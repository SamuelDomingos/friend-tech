import z from "zod"

export const DIAS_SEMANA = [
  { key: "seg", rotulo: "Segunda-feira" },
  { key: "ter", rotulo: "Terça-feira" },
  { key: "qua", rotulo: "Quarta-feira" },
  { key: "qui", rotulo: "Quinta-feira" },
  { key: "sex", rotulo: "Sexta-feira" },
  { key: "sab", rotulo: "Sábado" },
] as const

export const RECORRENCIAS = ["semanal", "quinzenal", "mensal"] as const

const horarioRegex = /^([01]\d|2[0-3]):[0-5]\d$/

export const gradeHorarioSchema = z.object({
  titulo: z.string().min(1, "Informe o título do modelo"),
  unidade: z.string().min(1, "Selecione a unidade"),
  qtdEncaixes: z.number().min(0, "Informe a quantidade de encaixes"),
  recorrencia: z.enum(RECORRENCIAS, "Selecione a recorrência"),
  dias: z
    .array(
      z.object({
        key: z.string(),
        rotulo: z.string(),
        ativo: z.boolean(),
        inicio: z.string(),
        final: z.string(),
      })
    )
    .superRefine((dias, ctx) => {
      const ativos = dias.filter((dia) => dia.ativo)

      if (ativos.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Selecione ao menos um dia da semana",
          path: ["dias"],
        })
        return
      }

      for (const dia of ativos) {
        if (!horarioRegex.test(dia.inicio) || !horarioRegex.test(dia.final)) {
          ctx.addIssue({
            code: "custom",
            message: `Informe os horários de ${dia.rotulo}`,
            path: ["dias"],
          })
          break
        }
      }
    }),
  idadeMinima: z.string(),
  idadeMaxima: z.string(),
  generos: z.array(z.string()),
  tiposAtendimento: z.array(z.string()),
  convenios: z.array(z.string()),
})

export type GradeHorarioFormData = z.infer<typeof gradeHorarioSchema>
