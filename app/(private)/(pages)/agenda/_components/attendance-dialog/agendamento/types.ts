import type { Paciente } from "../mock-data"

export interface AgendamentoFormValues {
  // Informações do paciente
  pacienteNome: string
  pacienteSelecionado: Paciente | null
  cpf: string
  rg: string
  dataNascimento: Date | undefined
  telefone: string
  email: string
  convenioId: string
  matricula: string
  validade: string
  nomeSocial: string
  outroDocumentoTipo: string
  outroDocumentoNumero: string
  sexo: string
  raca: string
  etnia: string
  naturalidade: string
  nacionalidade: string
  estadoCivil: string
  plano: string
  utilizarRnGuia: string
  telefone2: string
  comoConheceu: string
  profissao: string
  cep: string
  tipoLogradouro: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  alergias: string
  tipoSanguineo: string
  nomeResponsavel: string
  cpfResponsavel: string
  nomeMae: string
  observacoesResponsavel: string
  documentos: { id: string; nome: string }[]
  etiquetas: string[]

  // Informações do atendimento
  preferencial: string
  profissionalId: string
  unidadeId: string
  tipoAtendimento: string
  pagamentoViaReembolso: boolean
  data: Date | undefined
  horaInicio: string
  horaFim: string
  profissionalSolicitanteId: string
  observacoes: string
  imprimirEtiqueta: boolean
}
