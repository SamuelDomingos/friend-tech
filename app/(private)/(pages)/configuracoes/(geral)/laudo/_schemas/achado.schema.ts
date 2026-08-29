import z from "zod"

export const achadoSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  grupoId: z.string(),
  conteudo: z.string(),
})

export type AchadoFormData = z.infer<typeof achadoSchema>
