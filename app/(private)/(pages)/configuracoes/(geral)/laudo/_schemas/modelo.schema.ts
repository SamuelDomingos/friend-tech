import z from "zod"

export const modeloSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  grupoId: z.string(),
  titulo: z.string(),
  ocultarTitulo: z.boolean(),
  conteudo: z.string(),
})

export type ModeloFormData = z.infer<typeof modeloSchema>
