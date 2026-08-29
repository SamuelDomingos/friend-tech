import z from "zod"

export const GRUPOS_PLANO = [
  {
    value: "INCOME_OPERATING_CASH",
    label: "Entradas operacionais de caixa",
  },
  { value: "FINANCING_ACTIVITIES", label: "Atividades de financiamento" },
  { value: "INVESTING_ACTIVITIES", label: "Atividades de investimento" },
] as const

export type GrupoPlano = (typeof GRUPOS_PLANO)[number]["value"]

export const categoriaSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  grupo: z.string().min(1, "Selecione o grupo"),
})

export type CategoriaFormData = z.infer<typeof categoriaSchema>
