export interface Paciente {
  id: string
  nome: string
  cpf: string
  dataNascimento: string
  rg?: string
  telefone?: string
  email?: string
  convenioId?: string
  matricula?: string
  validade?: string
  nomeSocial?: string
  outroDocumentoTipo?: string
  outroDocumentoNumero?: string
  sexo?: string
  raca?: string
  etnia?: string
  naturalidade?: string
  nacionalidade?: string
  estadoCivil?: string
  plano?: string
  utilizarRnGuia?: string
  telefone2?: string
  comoConheceu?: string
  profissao?: string
  cep?: string
  tipoLogradouro?: string
  endereco?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
  alergias?: string
  tipoSanguineo?: string
  nomeResponsavel?: string
  cpfResponsavel?: string
  nomeMae?: string
  observacoesResponsavel?: string
  etiquetas?: string[]
}

// Dados fictícios — substituir pela busca real quando o módulo de pacientes existir.
// Apenas Daniella e João têm cadastro completo, para demonstrar o preenchimento automático.
export const pacientesMock: Paciente[] = [
  {
    id: "1",
    nome: "Maria Silva",
    cpf: "12345678901",
    dataNascimento: "1985-03-12",
  },
  {
    id: "2",
    nome: "João Pereira",
    cpf: "98765432100",
    dataNascimento: "1978-07-25",
    rg: "1234567",
    telefone: "(85) 98888-2211",
    email: "joao.pereira@email.com",
    convenioId: "c2",
    matricula: "445566778",
    validade: "2027-12-31",
    sexo: "Masculino",
    raca: "Parda",
    etnia: "Não se aplica",
    naturalidade: "Fortaleza",
    nacionalidade: "Brasileira",
    estadoCivil: "Casado(a)",
    utilizarRnGuia: "Não",
    comoConheceu: "Indicação de amigo",
    profissao: "Engenheiro civil",
    cep: "60175-047",
    tipoLogradouro: "Avenida",
    endereco: "Santos Dumont",
    numero: "1500",
    bairro: "Aldeota",
    cidade: "Fortaleza",
    estado: "CE",
    tipoSanguineo: "A+",
    etiquetas: ["Convênio especial"],
  },
  {
    id: "3",
    nome: "Ana Souza",
    cpf: "45678912345",
    dataNascimento: "1992-11-03",
  },
  {
    id: "4",
    nome: "Carlos Oliveira",
    cpf: "32165498712",
    dataNascimento: "1965-01-30",
  },
  {
    id: "5",
    nome: "Fernanda Lima",
    cpf: "78912345678",
    dataNascimento: "2001-05-19",
  },
  {
    id: "6",
    nome: "Rafael Costa",
    cpf: "15975348620",
    dataNascimento: "1988-09-08",
  },
  {
    id: "7",
    nome: "Daniella Soudine",
    cpf: "70519883284",
    dataNascimento: "2006-10-08",
    telefone: "(85) 99999-1234",
    email: "daniellasoudine02@gmail.com",
    sexo: "Feminino",
    raca: "Parda",
    etnia: "Não se aplica",
    naturalidade: "Fortaleza",
    nacionalidade: "Brasileira",
    estadoCivil: "Solteiro(a)",
    utilizarRnGuia: "Não",
    comoConheceu: "Indicação de amigo",
    profissao: "Estudante",
    cep: "61620-030",
    tipoLogradouro: "Rua",
    endereco: "George Correia Nunes",
    numero: "221",
    bairro: "Icaraí",
    cidade: "Caucaia",
    estado: "CE",
    tipoSanguineo: "O+",
    etiquetas: [],
  },
]

export type { Procedure } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/procedures/_components/mock-data"
export { proceduresMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/procedures/_components/mock-data"

export type { Convenio } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"
export { conveniosMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"

import type { Procedure } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/procedures/_components/mock-data"

export interface ProcedimentoItem {
  procedure: Procedure
  quantidade: number
  precoUnitario: number
}

export const metodosPagamentoMock = [
  "Convênio",
  "Cartão",
  "Cheque",
  "Dinheiro",
  "Pix",
  "TED",
  "Crédito em conta",
  "Boleto",
  "Nota Promissória",
  "Crédito Pré-Pago",
] as const

export interface PagamentoItem {
  id: string
  metodo: string
  valor: number
  data: Date
  parcela?: { numero: number; total: number }
  documento?: string
  maquina?: string
  bandeira?: string
  nsu?: string
}

export const METODOS_COM_PARCELAS = ["Boleto", "Crédito em conta", "Cheque"] as const
