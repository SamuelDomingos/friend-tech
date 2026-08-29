import z from "zod"

export const fluxoSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  sigla: z.string(),
  ordem: z.string(),
  cor: z.string(),
})

export type FluxoFormData = z.infer<typeof fluxoSchema>
