export type StatusOrcamento =
  | "EM_ABERTO"
  | "PERDIDO"
  | "FECHADO"
  | "CREDITO_DISPONIVEL"

export interface Orcamento {
  id: string
  numero: string
  criadoEm: string
  descricao: string
  procedimentos: string[]
  pagamento: string
  valor: number
  status: StatusOrcamento
}

export interface ResumoOrcamentos {
  total: number
  totalQtd: number
  emAberto: number
  emAbertoQtd: number
  perdido: number
  perdidoQtd: number
  fechado: number
  fechadoQtd: number
  creditoDisponivel: number
  creditoPercentual: number
}

export const orcamentosMock: Orcamento[] = [
  {
    id: "o1",
    numero: "3541",
    criadoEm: "2026-06-26T10:00:00",
    descricao: "Protocolo emagrecimento 3 meses",
    procedimentos: ["CONSULTA NUTRI BASE", "Avaliação Física"],
    pagamento: "Pix",
    valor: 480,
    status: "EM_ABERTO",
  },
  {
    id: "o2",
    numero: "3538",
    criadoEm: "2026-06-18T14:30:00",
    descricao: "Massagens relaxantes (pacote 5)",
    procedimentos: ["Massagem Relaxante"],
    pagamento: "Cartão",
    valor: 500,
    status: "FECHADO",
  },
  {
    id: "o3",
    numero: "3520",
    criadoEm: "2026-05-30T09:15:00",
    descricao: "Limpeza de pele + peeling",
    procedimentos: ["Limpeza de pele C/Peeling Diamante"],
    pagamento: "Dinheiro",
    valor: 85,
    status: "PERDIDO",
  },
  {
    id: "o4",
    numero: "3512",
    criadoEm: "2026-05-12T16:45:00",
    descricao: "Drenagem linfática (pacote 10)",
    procedimentos: ["Drenagem Linfática"],
    pagamento: "Crédito em conta",
    valor: 1100,
    status: "EM_ABERTO",
  },
]

export function resumirOrcamentos(lista: Orcamento[]): ResumoOrcamentos {
  const somar = (status: StatusOrcamento) =>
    lista
      .filter((item) => item.status === status)
      .reduce((soma, item) => soma + item.valor, 0)

  const contar = (status: StatusOrcamento) =>
    lista.filter((item) => item.status === status).length

  const total = lista.reduce((soma, item) => soma + item.valor, 0)

  return {
    total,
    totalQtd: lista.length,
    emAberto: somar("EM_ABERTO"),
    emAbertoQtd: contar("EM_ABERTO"),
    perdido: somar("PERDIDO"),
    perdidoQtd: contar("PERDIDO"),
    fechado: somar("FECHADO"),
    fechadoQtd: contar("FECHADO"),
    creditoDisponivel: 0,
    creditoPercentual: 0,
  }
}
