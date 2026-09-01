export const CONSELHOS = [
  "CRAS",
  "CRBM",
  "CREFITO",
  "COREN",
  "CRF",
  "CRFa",
  "CRM",
  "CRMV",
  "CREMAL",
  "CREMAM",
  "CREMEB",
  "CREMEC",
  "CREMEGO",
  "CREMEPA",
  "CREMEPE",
  "CREMEPI",
  "CREMERJ",
  "CREMERN",
  "CREMERO",
  "CREMERS",
  "CREMESC",
  "CREMESE",
  "CREMESP",
  "CRN",
  "CRO",
  "CRP",
  "CRT",
  "CRTR",
  "CONTER",
  "CRBio",
  "CREF",
  "OUTROS",
]

export const ESTADOS_UF = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

export interface Requester {
  id: string
  nome: string
  cpfCnpj: string
  email: string
  telefone: string
  cnsCnes: string
  conselho: string
  numeroConselho: string
  uf: string
  cbo: string
  atualizadoEm: string
}

export function conselhoLabel(requester: Requester): string {
  const partes = [requester.conselho, requester.numeroConselho].filter(
    Boolean
  )
  return partes.length > 0 ? partes.join(" ") : "—"
}

export function formatarDataHora(iso: string): { data: string; hora: string } {
  const date = new Date(iso)
  return {
    data: date.toLocaleDateString("pt-BR"),
    hora: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  }
}

export const requestersMock: Requester[] = [
  {
    id: "req1",
    nome: "COMERCIAL",
    cpfCnpj: "",
    email: "",
    telefone: "",
    cnsCnes: "",
    conselho: "",
    numeroConselho: "0000",
    uf: "",
    cbo: "",
    atualizadoEm: "2021-07-13T08:49:00",
  },
  {
    id: "req2",
    nome: "NAYANA (COMERCIAL)",
    cpfCnpj: "019.233.523-50",
    email: "",
    telefone: "",
    cnsCnes: "",
    conselho: "OUTROS",
    numeroConselho: "123",
    uf: "",
    cbo: "",
    atualizadoEm: "2021-11-01T14:43:00",
  },
  {
    id: "req3",
    nome: "RECEPÇÃO",
    cpfCnpj: "",
    email: "",
    telefone: "",
    cnsCnes: "",
    conselho: "CRM",
    numeroConselho: "0000",
    uf: "",
    cbo: "",
    atualizadoEm: "2020-11-09T17:14:00",
  },
  {
    id: "req4",
    nome: "TABATHA",
    cpfCnpj: "",
    email: "",
    telefone: "",
    cnsCnes: "",
    conselho: "",
    numeroConselho: "0000000",
    uf: "",
    cbo: "",
    atualizadoEm: "2020-11-09T17:13:00",
  },
]

export interface RequesterInsuranceLink {
  convenioId: string
  convenioNome: string
  requesterCode: string
  requesterName: string
}
