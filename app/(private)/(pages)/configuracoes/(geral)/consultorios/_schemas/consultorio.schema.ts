import z from "zod"

export const TIPOS_CONSULTORIO = ["consultorio", "sala_cirurgia"] as const

export const consultorioSchema = z.object({
  tipo: z.enum(TIPOS_CONSULTORIO, "Selecione o tipo"),
  nome: z.string().min(1, "Informe o nome"),
  nomeExibicao: z
    .string()
    .min(1, "Informe o nome de exibição")
    .max(15, "Máximo de 15 caracteres"),
})

export type ConsultorioFormData = z.infer<typeof consultorioSchema>
