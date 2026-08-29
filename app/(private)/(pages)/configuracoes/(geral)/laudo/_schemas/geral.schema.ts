import z from "zod"

export const INTEGRACOES_PACS = [
  { value: "LAB_PACS", label: "Lab PACS" },
  { value: "IMAGE_RIS", label: "Imagi RIS" },
] as const

export const OPCOES_LOGO = [
  { value: "DEFAULT", label: "Utilizar logo padrão" },
  { value: "HIDE_LOGO", label: "Não exibir logo" },
  { value: "LOGO_CUSTOM", label: "Exibir logo específica" },
] as const

export const geralSchema = z.object({
  integracaoPacs: z.string(),
  urlResultado: z.string(),
  risLogin: z.string(),
  risSenha: z.string(),
  logoImpressao: z.string(),
  cabecalhoPaciente: z.boolean(),
})

export type GeralFormData = z.infer<typeof geralSchema>
