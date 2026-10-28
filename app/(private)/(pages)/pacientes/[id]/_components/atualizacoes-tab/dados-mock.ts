export type CategoriaLog = "patient" | "schedule" | "finance"

export interface AlteracaoLog {
  campo: string
  de?: string
  para?: string
}

export interface LogPaciente {
  id: string
  categoria: CategoriaLog
  titulo: string
  descricao?: string
  autorNome: string
  criadoEm: string
  alteracoes: AlteracaoLog[]
}

export const ROTULOS_CATEGORIA: Record<CategoriaLog, string> = {
  patient: "Paciente",
  schedule: "Agendamentos",
  finance: "Financeiro",
}

export const logsMock: LogPaciente[] = [
  {
    id: "l1",
    categoria: "patient",
    titulo: "Dados cadastrais atualizados",
    descricao: "Telefone celular e e-mail alterados pela recepção.",
    autorNome: "Thaís Alves",
    criadoEm: "2026-09-12T09:42:00",
    alteracoes: [
      { campo: "Telefone", de: "(85) 98888-1122", para: "(85) 99911-2233" },
      { campo: "E-mail", de: "maria@email.com", para: "maria.silva@email.com" },
    ],
  },
  {
    id: "l2",
    categoria: "schedule",
    titulo: "Atendimento remarcado",
    descricao: "Consulta de retorno movida para o período da tarde.",
    autorNome: "Aaron Guilherme Oliveira Sampaio",
    criadoEm: "2026-09-10T15:18:00",
    alteracoes: [
      { campo: "Data", de: "10/09/2026 08:00", para: "10/09/2026 14:30" },
      { campo: "Profissional", de: "Thaís Alves", para: "Alan Robson de Oliveira" },
    ],
  },
  {
    id: "l3",
    categoria: "finance",
    titulo: "Pagamento registrado",
    descricao: "Parcela do orçamento #4821 quitada via Pix.",
    autorNome: "Suporte T.I.",
    criadoEm: "2026-09-05T11:03:00",
    alteracoes: [{ campo: "Situação", de: "Pendente", para: "Pago" }],
  },
  {
    id: "l4",
    categoria: "patient",
    titulo: "Etiqueta adicionada",
    autorNome: "Luciana Eloia Quintino da Silva",
    criadoEm: "2026-08-29T08:27:00",
    alteracoes: [{ campo: "Etiqueta", para: "Retorno em 30 dias" }],
  },
  {
    id: "l5",
    categoria: "schedule",
    titulo: "Atendimento cancelado",
    descricao: "Paciente solicitou cancelamento por telefone.",
    autorNome: "Thaís Alves",
    criadoEm: "2026-08-21T17:55:00",
    alteracoes: [{ campo: "Situação", de: "Agendado", para: "Cancelado" }],
  },
]
