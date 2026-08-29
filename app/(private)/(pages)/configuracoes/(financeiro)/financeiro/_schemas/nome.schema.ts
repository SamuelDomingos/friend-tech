import z from "zod"

export const nomeSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
})

export type NomeFormData = z.infer<typeof nomeSchema>
