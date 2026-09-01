export const GRAUS_PARTICIPACAO = ["11", "12"]

export interface ExternalDoctorInsuranceLink {
  convenioId: string
  convenioNome: string
  doctorCode: string
  doctorName: string
}

export interface ExternalDoctor {
  id: string
  nome: string
  cpfCnpj: string
  conselho: string
  numeroConselho: string
  grauParticipacao: string
  uf: string
  cbo: string
  avatarUrl?: string
  convenios: ExternalDoctorInsuranceLink[]
}

export const externalDoctorsMock: ExternalDoctor[] = [
  {
    id: "ed1",
    nome: "Dr. Ricardo Almeida",
    cpfCnpj: "123.456.789-00",
    conselho: "CRM",
    numeroConselho: "45210",
    grauParticipacao: "11",
    uf: "SP",
    cbo: "225125",
    convenios: [],
  },
  {
    id: "ed2",
    nome: "Dra. Fernanda Souza",
    cpfCnpj: "987.654.321-00",
    conselho: "CRM",
    numeroConselho: "78453",
    grauParticipacao: "12",
    uf: "RJ",
    cbo: "225124",
    convenios: [],
  },
]
