export interface Paciente {
  id: string
  nome: string
  avatar?: string
  telefone: string
  cidade: string
  estado: string
  vip: boolean
  dataNascimento: string
  dataCriacao: string
  convenios: string[]
  ultimoAtendimento: string
  proximoAtendimento: string
}

export const CONVENIOS_FILTRO: string[] = [
  "AMIL",
  "BRADESCO",
  "CAMED",
  "SUL AMÉRICA",
  "UNIMED",
  "Particular",
]

export const pacientesMock: Paciente[] = [
  {
    id: "1",
    nome: "Maria Silva",
    telefone: "(85) 98888-1122",
    cidade: "Fortaleza",
    estado: "CE",
    vip: true,
    dataNascimento: "1985-03-12",
    dataCriacao: "2024-01-10",
    convenios: ["AMIL", "UNIMED"],
    ultimoAtendimento: "2026-08-20",
    proximoAtendimento: "2026-09-10",
  },
  {
    id: "2",
    nome: "João Pereira",
    telefone: "(85) 98765-4321",
    cidade: "Fortaleza",
    estado: "CE",
    vip: false,
    dataNascimento: "1978-07-25",
    dataCriacao: "2023-05-02",
    convenios: ["BRADESCO"],
    ultimoAtendimento: "2026-08-25",
    proximoAtendimento: "",
  },
  {
    id: "3",
    nome: "Ana Souza",
    telefone: "(85) 99911-2233",
    cidade: "Caucaia",
    estado: "CE",
    vip: false,
    dataNascimento: "1992-11-03",
    dataCriacao: "2024-09-15",
    convenios: ["SUL AMÉRICA"],
    ultimoAtendimento: "2026-07-30",
    proximoAtendimento: "2026-09-02",
  },
  {
    id: "4",
    nome: "Carlos Oliveira",
    telefone: "(85) 98822-3344",
    cidade: "Maracanaú",
    estado: "CE",
    vip: true,
    dataNascimento: "1965-01-30",
    dataCriacao: "2025-02-20",
    convenios: ["CAMED"],
    ultimoAtendimento: "",
    proximoAtendimento: "2026-09-05",
  },
  {
    id: "5",
    nome: "Fernanda Lima",
    telefone: "(85) 99933-4455",
    cidade: "Eusébio",
    estado: "CE",
    vip: false,
    dataNascimento: "2001-09-05",
    dataCriacao: "2025-03-08",
    convenios: ["Particular"],
    ultimoAtendimento: "2026-08-28",
    proximoAtendimento: "",
  },
  {
    id: "6",
    nome: "Rafael Costa",
    telefone: "(85) 98666-7788",
    cidade: "Aquiraz",
    estado: "CE",
    vip: false,
    dataNascimento: "1988-09-08",
    dataCriacao: "2023-11-01",
    convenios: ["UNIMED"],
    ultimoAtendimento: "2026-08-15",
    proximoAtendimento: "2026-09-12",
  },
  {
    id: "7",
    nome: "Daniella Soudine",
    telefone: "(85) 98999-8899",
    cidade: "Fortaleza",
    estado: "CE",
    vip: false,
    dataNascimento: "2006-10-08",
    dataCriacao: "2024-06-12",
    convenios: ["AMIL"],
    ultimoAtendimento: "2026-09-01",
    proximoAtendimento: "2026-09-20",
  },
]
