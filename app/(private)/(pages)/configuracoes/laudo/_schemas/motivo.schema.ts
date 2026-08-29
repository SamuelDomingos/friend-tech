import z from "zod"

export const motivoSchema = z.object({
  titulo: z.string().min(1, "Informe o título"),
})

export type MotivoFormData = z.infer<typeof motivoSchema>
