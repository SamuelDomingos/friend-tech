import z from "zod"

export const convenioSchema = z.object({
  convenio: z.string().min(1, "Selecione o convênio"),
  tipoRegra: z.string().min(1, "Selecione o tipo de regra"),
  unidade: z.string().min(1, "Selecione a unidade"),
  inicio: z.string().regex(/^\d{2}:\d{2}$/, "Informe o horário de início"),
  final: z.string().regex(/^\d{2}:\d{2}$/, "Informe o horário final"),
  diasSemana: z
    .array(z.string())
    .min(1, "Selecione ao menos um dia da semana"),
})

export type ConvenioFormData = z.infer<typeof convenioSchema>
