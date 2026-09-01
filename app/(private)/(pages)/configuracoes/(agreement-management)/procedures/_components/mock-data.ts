export const TIPOS_GUIA = [
  { value: "SADT", label: "SADT" },
  { value: "CONSULTA", label: "Consulta" },
  { value: "GHI", label: "GHI" },
] as const

export function tipoGuiaLabel(value: string): string {
  return TIPOS_GUIA.find((t) => t.value === value)?.label ?? "—"
}

export interface ProcedureInsurancePrice {
  convenioId: string
  convenioNome: string
  price: string
  naoSeAplica: boolean
}

export interface Procedure {
  id: string
  codigoTuss: string
  codigoAmb: string
  nome: string
  tipoGuia: string
  temAutorizacao: boolean
  temPorte: boolean
  porte: string
  custosOperacionais: string[]
  temCh: boolean
  quantidadeCh: string
  filme: string
  tempoXmlGuia: string
  quantidadeProfissionais: string
  classificacaoId: string
  custo: string
  custoAdicional: string
  precoParticular: string
  convenios: ProcedureInsurancePrice[]
  criadoEm: string
}

export interface ProcedureGroup {
  id: string
  nome: string
  procedimentoIds: string[]
}

export const procedureGroupsMock: ProcedureGroup[] = [
  { id: "g1", nome: "Consultas", procedimentoIds: ["proc1"] },
  { id: "g2", nome: "Exames", procedimentoIds: ["proc2"] },
]

export interface ProcedureSubgroup {
  id: string
  nome: string
  grupoId: string
  procedimentoIds: string[]
}

export const procedureSubgroupsMock: ProcedureSubgroup[] = [
  { id: "sg1", nome: "Consulta Base", grupoId: "g1", procedimentoIds: ["proc1"] },
  { id: "sg2", nome: "Imagem", grupoId: "g2", procedimentoIds: [] },
]

export const proceduresMock: Procedure[] = [
  {
    id: "proc1",
    codigoTuss: "20101015",
    codigoAmb: "",
    nome: "Consulta Base",
    tipoGuia: "CONSULTA",
    temAutorizacao: false,
    temPorte: false,
    porte: "",
    custosOperacionais: [],
    temCh: false,
    quantidadeCh: "",
    filme: "",
    tempoXmlGuia: "",
    quantidadeProfissionais: "",
    classificacaoId: "",
    custo: "",
    custoAdicional: "",
    precoParticular: "150,00",
    convenios: [],
    criadoEm: "2024-11-05",
  },
  {
    id: "proc2",
    codigoTuss: "40901447",
    codigoAmb: "",
    nome: "Endoscopia digestiva alta",
    tipoGuia: "SADT",
    temAutorizacao: true,
    temPorte: false,
    porte: "",
    custosOperacionais: [],
    temCh: false,
    quantidadeCh: "",
    filme: "12,00",
    tempoXmlGuia: "30",
    quantidadeProfissionais: "1",
    classificacaoId: "",
    custo: "",
    custoAdicional: "",
    precoParticular: "310,00",
    convenios: [],
    criadoEm: "2024-09-18",
  },
]
