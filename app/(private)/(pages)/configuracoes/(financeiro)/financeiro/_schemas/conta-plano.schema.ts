import z from "zod"

export const contaPlanoSchema = z.object({
  categoriaId: z.string().min(1, "Selecione a categoria"),
  nome: z.string().min(1, "Informe o nome"),
})

export type ContaPlanoFormData = z.infer<typeof contaPlanoSchema>
