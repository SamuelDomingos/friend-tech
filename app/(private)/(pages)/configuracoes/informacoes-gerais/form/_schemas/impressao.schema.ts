import z from "zod"

export const ESTADOS = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
] as const

export const POSICOES_QR_CODE = [
  "Superior direito",
  "Superior esquerdo",
  "Inferior direito",
  "Inferior esquerdo",
] as const

export const POSICOES_LOGO = [
  "Superior esquerdo",
  "Superior direito",
  "Inferior esquerdo",
  "Inferior direito",
] as const

export const enderecoAlternativoSchema = z.object({
  id: z.string(),
  endereco: z.string().min(1, "Informe o endereço"),
  complemento: z.string(),
  cep: z.string(),
  numero: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string().min(1, "Selecione o estado"),
})

export const impressaoSchema = z.object({
  termoConsentimento: z.string(),
  nomeClinica: z.string(),
  remetenteSms: z.string(),
  cep: z.string(),
  endereco: z.string(),
  numero: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  telefone1: z.string(),
  telefone2: z.string(),
  email: z.string(),
  site: z.string(),
  posicaoQrCode: z.string(),
  margemEsquerda: z.string(),
  posicaoLogo: z.string(),
  logoPadrao: z.string(),
  esconderCabecalho: z.boolean(),
  esconderRodape: z.boolean(),
  esconderCabecalhoPaciente: z.boolean(),
  margemSuperiorPersonalizada: z.boolean(),
  personalizarTamanhoFonte: z.boolean(),
  enderecosAlternativos: z.array(enderecoAlternativoSchema),
})

export type ImpressaoFormData = z.infer<typeof impressaoSchema>
export type EnderecoAlternativoFormData = z.infer<
  typeof enderecoAlternativoSchema
>
