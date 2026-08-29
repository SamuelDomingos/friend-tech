import { usuariosMock } from "../../../(geral)/usuarios/_components/dados-mock"


export type StatusRegra =
  "EM_VIGENCIA" | "AGUARDANDO" | "DESATIVADO" | "EXPIRADO"

export interface RegraRepasse {
  id: string
  nome: string
  tipoRepasse: string
  tipoProfissional: string
  inicioVigencia: string
  fimVigencia: string | null
  status: StatusRegra
  formula: string
  unidades: string[]
  convenios: string[]
}

export interface Profissional {
  id: string
  nome: string
}

export const STATUS_LABELS: Record<StatusRegra, string> = {
  EM_VIGENCIA: "Em vigência",
  AGUARDANDO: "Aguardando",
  DESATIVADO: "Desativado",
  EXPIRADO: "Expirado",
}

export const profissionaisMock: Profissional[] = usuariosMock
  .filter((usuario) => usuario.tipo === "doctor")
  .map((usuario) => ({ id: usuario.id, nome: usuario.nome }))

export const regrasMock: RegraRepasse[] = [
  {
    id: "r1",
    nome: "REGRA CONSULTA",
    tipoRepasse: "Procedimento",
    tipoProfissional: "Executante",
    inicioVigencia: "02/10/2020",
    fimVigencia: null,
    status: "EM_VIGENCIA",
    formula: "(@@valorbruto - @@desconto) * 0.8",
    unidades: ["Infinity Fortaleza", "IAG"],
    convenios: ["Particular"],
  },
  {
    id: "r2",
    nome: "REGRA PROTOCOLO",
    tipoRepasse: "Procedimento",
    tipoProfissional: "Executante",
    inicioVigencia: "02/10/2020",
    fimVigencia: null,
    status: "EM_VIGENCIA",
    formula: "(@@valorbruto - @@desconto) * 0.2",
    unidades: ["Ladore SPA"],
    convenios: ["Particular"],
  },
  {
    id: "r3",
    nome: "REGRA ESTETICA",
    tipoRepasse: "Mat/Med",
    tipoProfissional: "Executante",
    inicioVigencia: "01/10/2020",
    fimVigencia: null,
    status: "AGUARDANDO",
    formula: "@@procedimento * 0.3",
    unidades: ["Infinity Fortaleza"],
    convenios: ["UNIMED"],
  },
  {
    id: "r4",
    nome: "REGRA CONSULTA",
    tipoRepasse: "Procedimento",
    tipoProfissional: "Executante",
    inicioVigencia: "01/10/2020",
    fimVigencia: "01/10/2020",
    status: "DESATIVADO",
    formula: "(@@valorbruto - @@desconto) * 0.8",
    unidades: ["IAG", "WAKE = ClimeoPlus"],
    convenios: ["AMIL"],
  },
  {
    id: "r5",
    nome: "REGRA PROTOCOLO",
    tipoRepasse: "Mat/Med",
    tipoProfissional: "Solicitante",
    inicioVigencia: "01/10/2020",
    fimVigencia: "01/10/2020",
    status: "DESATIVADO",
    formula: "(@@valorbruto - @@desconto) * 0.2",
    unidades: ["Guanabara MKT"],
    convenios: ["BRADESCO"],
  },
  {
    id: "r6",
    nome: "REGRA CONSULTA",
    tipoRepasse: "Procedimento",
    tipoProfissional: "Executante",
    inicioVigencia: "01/10/2020",
    fimVigencia: "01/10/2020",
    status: "EXPIRADO",
    formula: "(@@valorbruto - @@desconto) * 0.8",
    unidades: ["Infinity Fortaleza"],
    convenios: ["Particular"],
  },
]

export const PROFISSIONAIS_LISTA = profissionaisMock.map((p) => p.nome)

export const PROCEDIMENTOS_LISTA = [
  "CONSULTA 450",
  "CONSULTA 500",
  "CONSULTA ONLINE",
  "Slim Infinity",
  "Mounjaro",
  "Consulta Nutri",
  "Drenagem Linfática",
  "BodyShape",
  "InfraShape",
]

export const MATMEDS_LISTA = ["Agulha 30G", "Seringa 1ml", "Algodão", "Luvas"]

export const CONVENIOS_LISTA = [
  "Particular",
  "UNIMED",
  "AMIL",
  "BRADESCO",
  "CAMED",
  "SUL AMÉRICA",
]

export const UNIDADES_LISTA = [
  "Infinity Fortaleza",
  "IAG",
  "Ladore SPA",
  "WAKE = ClimeoPlus",
  "Guanabara MKT",
]

export const PROCEDIMENTOS_REGRA = [
  { id: "pr1", codigo: "1", nome: "CONSULTA 450", preco: "R$ 450,00" },
  { id: "pr2", codigo: "10101012", nome: "CONSULTA 500", preco: "R$ 550,00" },
  {
    id: "pr3",
    codigo: "10101012",
    nome: "CONSULTA ONLINE",
    preco: "R$ 650,00",
  },
]
