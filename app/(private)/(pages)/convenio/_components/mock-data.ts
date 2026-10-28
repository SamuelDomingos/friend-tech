export interface InsuranceBillingSummary {
  insurer: string
  batchCount: number
  amount: number
}

export interface ResponsibleSummary {
  responsible: string
  batchCount: number
  amount: number
}

export interface MonthlySeries {
  month: string
  amount: number
  batches: number
}

export type GuideStatus = "PAID" | "PENDING" | "GLOSSED"

export interface Guide {
  id: string
  patient: string
  insurer: string
  date: string
  amount: number
  status: GuideStatus
}

export type GlossStatus = "OPEN" | "UNDER_REVIEW" | "ACCEPTED"

export interface Gloss {
  id: string
  guide: string
  insurer: string
  reason: string
  date: string
  amount: number
  status: GlossStatus
}

export const monthlySeriesMock: MonthlySeries[] = [
  { month: "Nov/25", amount: 18200, batches: 4 },
  { month: "Dez/25", amount: 22400, batches: 5 },
  { month: "Jan/26", amount: 19800, batches: 4 },
  { month: "Fev/26", amount: 24600, batches: 6 },
  { month: "Mar/26", amount: 31200, batches: 7 },
  { month: "Abr/26", amount: 27400, batches: 6 },
  { month: "Mai/26", amount: 33800, batches: 8 },
  { month: "Jun/26", amount: 30100, batches: 7 },
  { month: "Jul/26", amount: 35600, batches: 8 },
  { month: "Ago/26", amount: 38900, batches: 9 },
  { month: "Set/26", amount: 41200, batches: 9 },
  { month: "Out/26", amount: 28750, batches: 6 },
]

export const insurancesMock: InsuranceBillingSummary[] = [
  { insurer: "UNIMED", batchCount: 12, amount: 148900 },
  { insurer: "BRADESCO", batchCount: 9, amount: 96400 },
  { insurer: "AMIL", batchCount: 7, amount: 74150 },
  { insurer: "SUL AMÉRICA", batchCount: 4, amount: 32800 },
]

export const responsiblesMock: ResponsibleSummary[] = [
  { responsible: "Suporte T.I.", batchCount: 14, amount: 156300 },
  { responsible: "Thaís Alves", batchCount: 11, amount: 124500 },
  { responsible: "Alan Robson de Oliveira", batchCount: 7, amount: 71450 },
]

export const guidesMock: Guide[] = [
  {
    id: "90011234",
    patient: "Maria Silva",
    insurer: "UNIMED",
    date: "2026-10-24",
    amount: 2380,
    status: "PAID",
  },
  {
    id: "90011240",
    patient: "João Pereira",
    insurer: "BRADESCO",
    date: "2026-10-23",
    amount: 890,
    status: "PENDING",
  },
  {
    id: "90011251",
    patient: "Ana Souza",
    insurer: "AMIL",
    date: "2026-10-21",
    amount: 1240,
    status: "GLOSSED",
  },
  {
    id: "90011266",
    patient: "Rafael Costa",
    insurer: "SUL AMÉRICA",
    date: "2026-10-18",
    amount: 560,
    status: "PAID",
  },
]

export const glossesMock: Gloss[] = [
  {
    id: "g1",
    guide: "90011251",
    insurer: "AMIL",
    reason: "Código de procedimento divergente",
    date: "2026-10-22",
    amount: 320,
    status: "OPEN",
  },
  {
    id: "g2",
    guide: "90011238",
    insurer: "BRADESCO",
    reason: "Autorização não informada",
    date: "2026-10-19",
    amount: 410,
    status: "UNDER_REVIEW",
  },
  {
    id: "g3",
    guide: "90011202",
    insurer: "UNIMED",
    reason: "Documentação incompleta",
    date: "2026-10-11",
    amount: 180,
    status: "ACCEPTED",
  },
]

export const GUIDE_STATUS_LABELS: Record<GuideStatus, string> = {
  PAID: "Pago",
  PENDING: "Pendente",
  GLOSSED: "Glosado",
}

export const GLOSS_STATUS_LABELS: Record<GlossStatus, string> = {
  OPEN: "Aberta",
  UNDER_REVIEW: "Recursada",
  ACCEPTED: "Aceita",
}

export const BILLING_TYPES = ["Convênio", "Particular", "Reembolso"]

export const INSURANCE_UNITS = ["Unidade Centro", "Unidade Aldeota"]

export interface CashFlowCategory {
  title: string
  values: number[]
}

export interface CashFlowAccount {
  title: string
  categories: CashFlowCategory[]
}

export const cashFlowAccountsMock: CashFlowAccount[] = [
  {
    title: "Recebimentos",
    categories: [
      {
        title: "Convênios",
        values: [
          14800, 17600, 15200, 19800, 24500, 21000, 26200, 23800, 28100, 30400,
          32600, 22400,
        ],
      },
      {
        title: "Particulares",
        values: [
          3400, 4800, 4600, 4800, 6700, 6400, 7200, 6300, 7500, 8500, 8600, 6350,
        ],
      },
    ],
  },
  {
    title: "Glosas",
    categories: [
      {
        title: "Glosas recebidas",
        values: [
          720, 860, 610, 940, 1180, 1020, 1260, 980, 1340, 1520, 1610, 940,
        ],
      },
      {
        title: "Glosas a recuperar",
        values: [260, 320, 240, 380, 460, 390, 510, 420, 560, 640, 680, 380],
      },
    ],
  },
]

export interface AnalysisBatch {
  sentAt: string
  competence: string
  batch: string
  guideType: string
  writeOff: number
}

export const analysisBatchesMock: Record<string, AnalysisBatch[]> = {
  UNIMED: [
    {
      sentAt: "2026-10-05",
      competence: "09/2026",
      batch: "L-4821",
      guideType: "Consulta",
      writeOff: 12800,
    },
    {
      sentAt: "2026-10-18",
      competence: "10/2026",
      batch: "L-4836",
      guideType: "SP/SADT",
      writeOff: 9400,
    },
  ],
  BRADESCO: [
    {
      sentAt: "2026-10-07",
      competence: "09/2026",
      batch: "L-3110",
      guideType: "Consulta",
      writeOff: 7600,
    },
  ],
  AMIL: [
    {
      sentAt: "2026-10-12",
      competence: "10/2026",
      batch: "L-2204",
      guideType: "SP/SADT",
      writeOff: 5400,
    },
  ],
  "SUL AMÉRICA": [
    {
      sentAt: "2026-10-20",
      competence: "10/2026",
      batch: "L-1902",
      guideType: "Consulta",
      writeOff: 3100,
    },
  ],
}

export interface GlossBalance {
  label: string
  amount: number
}

export interface GlossByResponsible {
  name: string
  total: number
  glossed: number
}

export interface GlossByInsurance {
  insurer: string
  billed: number
  glossed: number
}

export interface GlossClassificationItem {
  name: string
  total: number
}

export interface GlossByClassification {
  group: "Procedimentos" | "Matmeds"
  total: number
  items: GlossClassificationItem[]
}

export const glossBalanceMock: GlossBalance[] = [
  { label: "Glosas recuperadas", amount: 12400 },
  { label: "Glosas a recuperar", amount: 8600 },
  { label: "Glosas aceitas", amount: 5200 },
]

export const glossByResponsibleMock: GlossByResponsible[] = [
  { name: "Suporte T.I.", total: 62000, glossed: 3100 },
  { name: "Thaís Alves", total: 54000, glossed: 2500 },
  { name: "Alan Robson de Oliveira", total: 38000, glossed: 1700 },
]

export const glossByInsuranceMock: GlossByInsurance[] = [
  { insurer: "UNIMED", billed: 148900, glossed: 7445 },
  { insurer: "BRADESCO", billed: 96400, glossed: 3856 },
  { insurer: "AMIL", billed: 74150, glossed: 2966 },
  { insurer: "SUL AMÉRICA", billed: 32800, glossed: 1312 },
]

export const glossByClassificationMock: GlossByClassification[] = [
  {
    group: "Procedimentos",
    total: 12400,
    items: [
      { name: "Consulta inicial", total: 4200 },
      { name: "Retorno", total: 3100 },
      { name: "SP/SADT", total: 5100 },
    ],
  },
  {
    group: "Matmeds",
    total: 5100,
    items: [
      { name: "Dipirona 500mg", total: 2100 },
      { name: "Luva de procedimento", total: 1800 },
      { name: "Soro fisiológico", total: 1200 },
    ],
  },
]

export const glossSummaryMock = {
  toRecover: 8600,
  recoveredPercentage: 61.2,
  averagePercentage: 4.8,
  series: [
    { month: "Nov/25", amount: 620 },
    { month: "Dez/25", amount: 840 },
    { month: "Jan/26", amount: 710 },
    { month: "Fev/26", amount: 930 },
    { month: "Mar/26", amount: 1180 },
    { month: "Abr/26", amount: 1020 },
    { month: "Mai/26", amount: 1260 },
    { month: "Jun/26", amount: 980 },
    { month: "Jul/26", amount: 1340 },
    { month: "Ago/26", amount: 1520 },
    { month: "Set/26", amount: 1610 },
    { month: "Out/26", amount: 940 },
  ],
}
