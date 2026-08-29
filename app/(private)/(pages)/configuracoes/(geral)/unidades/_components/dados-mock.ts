export interface Unidade {
  id: string
  nome: string
  prefixo: string
  telefone: string
  cep: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  cnes: string
  grupoId: string
}

export interface Grupo {
  id: string
  nome: string
  unidades: string[]
}

export const unidadesMock: Unidade[] = [
  {
    id: "u1",
    nome: "Unidade Central",
    prefixo: "001",
    telefone: "(85) 98876-0001",
    cep: "60120-020",
    endereco: "Rua Silva Paulet",
    numero: "984",
    complemento: "",
    bairro: "Meireles",
    cidade: "Fortaleza",
    estado: "Ceará",
    cnes: "1234567",
    grupoId: "g1",
  },
  {
    id: "u2",
    nome: "Unidade Norte",
    prefixo: "002",
    telefone: "(85) 98876-0002",
    cep: "60325-110",
    endereco: "Av. Bezerra de Menezes",
    numero: "1200",
    complemento: "Sala 5",
    bairro: "São Gerardo",
    cidade: "Fortaleza",
    estado: "Ceará",
    cnes: "2234567",
    grupoId: "g1",
  },
  {
    id: "u3",
    nome: "Unidade Sul",
    prefixo: "003",
    telefone: "(85) 98876-0003",
    cep: "60810-180",
    endereco: "Av. Washington Soares",
    numero: "3100",
    complemento: "",
    bairro: "Edson Queiroz",
    cidade: "Fortaleza",
    estado: "Ceará",
    cnes: "3234567",
    grupoId: "g2",
  },
  {
    id: "u4",
    nome: "Unidade Leste",
    prefixo: "004",
    telefone: "(85) 98876-0004",
    cep: "60831-000",
    endereco: "Rua dos Palmeiras",
    numero: "500",
    complemento: "Térreo",
    bairro: "Messejana",
    cidade: "Fortaleza",
    estado: "Ceará",
    cnes: "4234567",
    grupoId: "g2",
  },
  {
    id: "u5",
    nome: "Unidade Oeste",
    prefixo: "005",
    telefone: "(85) 98876-0005",
    cep: "60340-250",
    endereco: "Av. José Jatahy",
    numero: "800",
    complemento: "",
    bairro: "Farias Brito",
    cidade: "Fortaleza",
    estado: "Ceará",
    cnes: "5234567",
    grupoId: "",
  },
]

export const gruposMock: Grupo[] = [
  {
    id: "g1",
    nome: "Grupo Central",
    unidades: ["Unidade Central", "Unidade Norte"],
  },
  {
    id: "g2",
    nome: "Grupo Periferia",
    unidades: ["Unidade Sul", "Unidade Leste"],
  },
]
