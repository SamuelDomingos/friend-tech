import z from "zod"

export const agendaClinicaSchema = z.object({
  visualizacao: z.string().min(1, "Selecione a visualização padrão"),
  intervalo: z
    .string()
    .min(1, "Informe o intervalo de blocos")
    .regex(/^\d+$/, "Somente números"),
  unidade: z.string(),
  atendimento: z.string(),
  diasFuncionamento: z
    .array(z.string())
    .min(1, "Selecione ao menos um dia de funcionamento"),
  inicio: z.string().regex(/^\d{2}:\d{2}$/, "Horário inválido"),
  fim: z.string().regex(/^\d{2}:\d{2}$/, "Horário inválido"),
})

export type AgendaClinicaFormData = z.infer<typeof agendaClinicaSchema>
