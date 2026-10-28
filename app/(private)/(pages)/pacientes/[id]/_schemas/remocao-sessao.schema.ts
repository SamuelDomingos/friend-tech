import z from "zod"

export const remocaoSessaoSchema = z.object({
  escopo: z.enum(["CURRENT", "CURRENT_AND_NEXT"], {
    error: "Selecione uma opção",
  }),
})

export type RemocaoSessaoFormData = z.infer<typeof remocaoSessaoSchema>
