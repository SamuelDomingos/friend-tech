import z from "zod"

export const contaBancariaSchema = z.object({
  codigo: z
    .string()
    .min(1, "Informe o código")
    .max(5, "Máximo de 5 caracteres"),
  banco: z.string().min(1, "Informe o banco"),
  agencia: z
    .string()
    .min(1, "Informe a agência")
    .max(5, "Máximo de 5 caracteres"),
  conta: z.string().min(1, "Informe a conta"),
  digito: z.string().max(1, "Máximo de 1 caractere"),
  saldoInicial: z.string(),
  dataSaldoInicial: z.string(),
  limiteCredito: z.string(),
  principal: z.boolean(),
})

export type ContaBancariaFormData = z.infer<typeof contaBancariaSchema>
