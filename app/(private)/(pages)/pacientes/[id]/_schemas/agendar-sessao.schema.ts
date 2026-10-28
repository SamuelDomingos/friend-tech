import z from "zod"

export const agendarSessaoSchema = z.object({
  frequencia: z.enum(["DAILY", "WEEKLY"]),
  quantidade: z
    .string()
    .min(1, "Informe o número de sessões")
    .refine(
      (valor) =>
        Number.isInteger(Number(valor)) &&
        Number(valor) >= 1 &&
        Number(valor) <= 52,
      "Informe entre 1 e 52 sessões"
    ),
  inicio: z.date({ error: "Informe o início das sessões" }),
  hora: z.string().min(1, "Informe o horário"),
  dias: z.array(z.string()),
  reembolso: z.boolean(),
  faturamentoConvenio: z.boolean(),
  autorizacao: z.string(),
})

export type AgendarSessaoFormData = z.infer<typeof agendarSessaoSchema>
