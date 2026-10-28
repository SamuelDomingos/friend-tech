import z from "zod"

export const enviarImpressoSchema = z.object({
  documentos: z
    .array(z.string())
    .min(1, "Selecione ao menos um impresso para enviar"),
})

export type EnviarImpressoFormData = z.infer<typeof enviarImpressoSchema>
