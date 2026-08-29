import z from "zod"

export const grupoSchema = z.object({
  nome: z.string().min(1, "Informe o nome do grupo"),
})

export type GrupoFormData = z.infer<typeof grupoSchema>
