export const TISS_TYPES = [
  { value: "SADT", label: "SADT" },
  { value: "GHI", label: "GHI" },
  { value: "CONSULTA", label: "Consulta" },
] as const

export function tissTypeLabel(value: string): string {
  return TISS_TYPES.find((t) => t.value === value)?.label ?? "—"
}

export const FIELDS_TYPES = [
  { value: "EXECUTANT", label: "Dados do executante" },
  { value: "CONTRACT_EXECUTANT", label: "Dados do contratado executante" },
  { value: "REQUESTER", label: "Dados do solicitante" },
] as const

export function fieldsTypeLabel(value: string): string {
  return FIELDS_TYPES.find((t) => t.value === value)?.label ?? "—"
}

export const APLICACAO_INFORMACOES = [
  { value: "XML_GUIDE", label: "XML e guia" },
  { value: "XML", label: "Somente XML" },
  { value: "GUIDE", label: "Somente Guia" },
] as const

export function aplicacaoLabel(value: string): string {
  return APLICACAO_INFORMACOES.find((a) => a.value === value)?.label ?? "—"
}

export const unidadesMock = [
  { id: "u1", nome: "Unidade Central" },
  { id: "u2", nome: "Unidade Norte" },
  { id: "u3", nome: "Unidade Sul" },
]

export interface BillingRule {
  id: string
  nome: string
  tissType: string
  fieldsType: string
  applier: string
  contractCode: string
  contractName: string
  replacementName: string
  unidadeIds: string[]
  convenioIds: string[]
  procedimentoIds: string[]
  usuarioInternoIds: string[]
  usuarioExternoIds: string[]
  ativa: boolean
  criadoEm: string
}

export const billingRulesMock: BillingRule[] = [
  {
    id: "br1",
    nome: "Faturar como Hospital São Lucas",
    tissType: "SADT",
    fieldsType: "CONTRACT_EXECUTANT",
    applier: "XML_GUIDE",
    contractCode: "AMI-SL01",
    contractName: "Hospital São Lucas LTDA",
    replacementName: "",
    unidadeIds: ["u1"],
    convenioIds: ["c1"],
    procedimentoIds: [],
    usuarioInternoIds: [],
    usuarioExternoIds: [],
    ativa: true,
    criadoEm: "2025-02-10",
  },
]
