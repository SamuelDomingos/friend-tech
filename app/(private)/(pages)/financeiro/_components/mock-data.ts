export interface MonthAmount {
  month: string
  amount: number
}

export interface DashboardSeries {
  series: MonthAmount[]
  monthValue: number
  yearValue: number
  referenceMonth: string
  periodLabel: string
}

export const productionDashboardMock: DashboardSeries = {
  referenceMonth: "out/26",
  periodLabel: "jan/26 à nov/26",
  monthValue: 492953.96,
  yearValue: 5761505.44,
  series: [
    { month: "jan/26", amount: 402000 },
    { month: "fev/26", amount: 438500 },
    { month: "mar/26", amount: 465200 },
    { month: "abr/26", amount: 448900 },
    { month: "mai/26", amount: 512300 },
    { month: "jun/26", amount: 498700 },
    { month: "jul/26", amount: 531400 },
    { month: "ago/26", amount: 552800 },
    { month: "set/26", amount: 578900 },
    { month: "out/26", amount: 492953.96 },
    { month: "nov/26", amount: 341346.48 },
  ],
}

export const receiptsDashboardMock: DashboardSeries = {
  referenceMonth: "out/26",
  periodLabel: "jan/26 à out/26",
  monthValue: 19285,
  yearValue: 1537555.25,
  series: [
    { month: "jan/26", amount: 148200 },
    { month: "fev/26", amount: 162400 },
    { month: "mar/26", amount: 155800 },
    { month: "abr/26", amount: 171300 },
    { month: "mai/26", amount: 189600 },
    { month: "jun/26", amount: 176400 },
    { month: "jul/26", amount: 198200 },
    { month: "ago/26", amount: 204500 },
    { month: "set/26", amount: 196700 },
    { month: "out/26", amount: 19285 },
  ],
}

export const professionalsMock = [
  "Dr. Aaron Guilherme Oliveira Sampaio",
  "Dra. Thaís Alves",
  "Dra. Luciana Eloio Quintino da Silva",
  "Dr. Alan Robson de Oliveira",
]

export interface PaymentMethodTotal {
  method: string
  amount: number
}

export const paymentMethodTotalsMock: PaymentMethodTotal[] = [
  { method: "Pix", amount: 18400 },
  { method: "Cartão", amount: 12600 },
  { method: "Boleto", amount: 8600 },
  { method: "Convênio", amount: 24800 },
]

export interface ReceivableDateTotal {
  label: string
  amount: number
}

export const receivableDateTotalsMock: ReceivableDateTotal[] = [
  { label: "A vencer", amount: 31200 },
  { label: "Vencido", amount: 9400 },
]

export const receivableSummaryMock = {
  overdue: 9400,
  next30: 12600,
  after30: 31200,
}

export interface ReceivableRow {
  date: string
  patient: string
  description: string
  status: string
  payment: string
  amount: number
}

export const receivableRowsMock: ReceivableRow[] = [
  {
    date: "2026-10-05",
    patient: "Maria Silva",
    description: "Procedimento ambulatorial",
    status: "Pendente",
    payment: "Convênio",
    amount: 2380,
  },
  {
    date: "2026-10-12",
    patient: "João Pereira",
    description: "Consulta",
    status: "Pendente",
    payment: "Pix",
    amount: 890,
  },
  {
    date: "2026-10-18",
    patient: "Ana Souza",
    description: "Atendimento unificado",
    status: "Vencido",
    payment: "Boleto",
    amount: 1240,
  },
  {
    date: "2026-10-24",
    patient: "Rafael Costa",
    description: "Exames",
    status: "Pendente",
    payment: "Cartão",
    amount: 560,
  },
]
