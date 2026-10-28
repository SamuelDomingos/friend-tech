import z from "zod"

export const consumoSchema = z.object({
  tipoSaida: z.string(),
  data: z.date({ error: "Informe a data da saída" }),
  origem: z.string().min(1, "Selecione a origem"),
  observacao: z.string(),
  produto: z.string(),
  quantidade: z
    .string()
    .refine((valor) => Number.isInteger(Number(valor)) && Number(valor) >= 1, {
      message: "Quantidade inválida",
    }),
  lote: z.string(),
  validade: z.date().optional(),
})

export type ConsumoFormData = z.infer<typeof consumoSchema>
