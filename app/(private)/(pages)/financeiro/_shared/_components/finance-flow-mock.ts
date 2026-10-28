export type FinanceEntryType = "PAY" | "RECEIVE"

export type FinanceEntryStatus = "PENDING" | "APPROVED" | "PAID" | "RECEIVED"

export interface FinanceEntry {
  id: string
  type: FinanceEntryType
  date: string
  documentNumber: string
  competence: string
  party: string
  paidTo?: string
  description: string
  observation?: string
  amount: number
  status: FinanceEntryStatus
  hasNfse: boolean
  conciliated?: boolean
  recurrent?: boolean
  installment?: string
}

export const financeEntriesMock: FinanceEntry[] = [
  {
    id: "f1",
    type: "PAY",
    date: "2026-10-02",
    documentNumber: "1001",
    competence: "09/2026",
    party: "Fornecedor Alfa",
    description: "Compra de materiais",
    observation: "Nota fiscal 1187",
    amount: 1240.5,
    status: "PENDING",
    hasNfse: true,
    recurrent: false,
    installment: "1/1",
  },
  {
    id: "f2",
    type: "PAY",
    date: "2026-10-08",
    documentNumber: "1002",
    competence: "10/2026",
    party: "Energia Elétrica CE",
    description: "Conta de energia",
    amount: 890.32,
    status: "PENDING",
    hasNfse: false,
    recurrent: true,
  },
  {
    id: "f3",
    type: "PAY",
    date: "2026-10-12",
    documentNumber: "1003",
    competence: "10/2026",
    party: "Aluguel Consultório",
    paidTo: "Imobiliária Central",
    description: "Aluguel mensal",
    amount: 4200,
    status: "APPROVED",
    hasNfse: true,
  },
  {
    id: "f4",
    type: "PAY",
    date: "2026-10-20",
    documentNumber: "1004",
    competence: "10/2026",
    party: "Fornecedor Beta",
    description: "Manutenção de equipamentos",
    amount: 760,
    status: "PAID",
    hasNfse: false,
    conciliated: true,
  },
  {
    id: "f5",
    type: "RECEIVE",
    date: "2026-10-03",
    documentNumber: "2001",
    competence: "09/2026",
    party: "Maria Silva",
    description: "Procedimento ambulatorial",
    amount: 2380,
    status: "PENDING",
    hasNfse: true,
  },
  {
    id: "f6",
    type: "RECEIVE",
    date: "2026-10-09",
    documentNumber: "2002",
    competence: "10/2026",
    party: "João Pereira",
    description: "Consulta",
    amount: 890,
    status: "RECEIVED",
    hasNfse: false,
    conciliated: true,
  },
  {
    id: "f7",
    type: "RECEIVE",
    date: "2026-10-15",
    documentNumber: "2003",
    competence: "10/2026",
    party: "Ana Souza",
    description: "Atendimento unificado",
    observation: "Pacote de sessões",
    amount: 1240,
    status: "PENDING",
    hasNfse: true,
    installment: "2/4",
  },
  {
    id: "f8",
    type: "RECEIVE",
    date: "2026-10-22",
    documentNumber: "2004",
    competence: "10/2026",
    party: "Rafael Costa",
    description: "Exames",
    amount: 560,
    status: "RECEIVED",
    hasNfse: false,
    conciliated: false,
  },
  {
    id: "f9",
    type: "PAY",
    date: "2026-10-05",
    documentNumber: "3001",
    competence: "10/2026",
    party: "Laboratório Central",
    description: "Repasse de exames",
    amount: 1980,
    status: "PAID",
    hasNfse: true,
    conciliated: true,
  },
  {
    id: "f10",
    type: "RECEIVE",
    date: "2026-10-05",
    documentNumber: "4001",
    competence: "10/2026",
    party: "UNIMED",
    description: "Repasse de convênio",
    amount: 7450,
    status: "RECEIVED",
    hasNfse: true,
    conciliated: true,
  },
]
