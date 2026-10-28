export type FrequenciaSessao = "DAILY" | "WEEKLY"

export type SituacaoPagamentoSessao = "PAGO" | "PARCIAL" | "PENDENTE"

export interface Sessao {
  id: string
  criadaEm: string
  frequencia: FrequenciaSessao
  realizado: number
  agendado: number
  convenio: string | null
  formaPagamento: string | null
  senhaGuia: string | null
  numeroGuia: string | null
  valorTotal: number
  situacaoPagamento: SituacaoPagamentoSessao
}

export const ROTULOS_FREQUENCIA: Record<FrequenciaSessao, string> = {
  DAILY: "Diariamente",
  WEEKLY: "Semanalmente",
}

export const ROTULOS_PAGAMENTO: Record<SituacaoPagamentoSessao, string> = {
  PAGO: "Pago",
  PARCIAL: "Parcial",
  PENDENTE: "Pendente",
}

export const sessoesMock: Sessao[] = [
  {
    id: "s1",
    criadaEm: "2026-08-18",
    frequencia: "WEEKLY",
    realizado: 3,
    agendado: 10,
    convenio: null,
    formaPagamento: "Cartão de crédito",
    senhaGuia: null,
    numeroGuia: null,
    valorTotal: 1200,
    situacaoPagamento: "PAGO",
  },
  {
    id: "s2",
    criadaEm: "2026-06-02",
    frequencia: "WEEKLY",
    realizado: 8,
    agendado: 8,
    convenio: "UNIMED",
    formaPagamento: null,
    senhaGuia: "482139",
    numeroGuia: "90011234",
    valorTotal: 2380,
    situacaoPagamento: "PAGO",
  },
  {
    id: "s3",
    criadaEm: "2026-03-14",
    frequencia: "DAILY",
    realizado: 4,
    agendado: 6,
    convenio: null,
    formaPagamento: "Pix",
    senhaGuia: null,
    numeroGuia: null,
    valorTotal: 720,
    situacaoPagamento: "PARCIAL",
  },
  {
    id: "s4",
    criadaEm: "2025-11-27",
    frequencia: "WEEKLY",
    realizado: 0,
    agendado: 12,
    convenio: null,
    formaPagamento: null,
    senhaGuia: null,
    numeroGuia: null,
    valorTotal: 1440,
    situacaoPagamento: "PENDENTE",
  },
]
