import z from "zod"

export const laudoFiltrosSchema = z.object({
  convenio: z.string(),
  classificacao: z.string(),
  solicitante: z.string(),
  medico: z.string(),
})

export type LaudoFiltrosFormData = z.infer<typeof laudoFiltrosSchema>

export const LAUDO_FILTROS_INICIAIS: LaudoFiltrosFormData = {
  convenio: "",
  classificacao: "",
  solicitante: "",
  medico: "",
}
