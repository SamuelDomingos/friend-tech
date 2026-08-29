import z from "zod"

export const grupoSchema = z.object({
  nome: z.string().min(1, "Informe o nome do grupo"),
  unidades: z.array(z.string()),
})

export type GrupoFormData = z.infer<typeof grupoSchema>
