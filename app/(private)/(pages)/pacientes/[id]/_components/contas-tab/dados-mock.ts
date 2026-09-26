export type StatusAtendimento = "FINALIZADO" | "EM_ABERTO" | "CANCELADO"

export interface ProfissionalResumo {
  nome: string
  avatar?: string
}

export interface AtendimentoFinanceiro {
  id: string
  criadoEm: string
  descricao: string
  procedimentos: string[]
  status: StatusAtendimento
  profissional: ProfissionalResumo
  numero: string
  formaPagamento?: string
  emAberto?: boolean
  valor: number
  baixa: number | null
}

export type TipoLancamento = "RECEBIMENTO" | "PAGAMENTO"

export interface LancamentoExtrato {
  id: string
  criadoEm: string
  mostrarData?: boolean
  descricao: string
  procedimentos?: string[]
  atendimento?: ProfissionalResumo & { numero: string }
  lancamento?: { autor: string; observacao?: string }
  tipo: TipoLancamento
  valor: number | null
}

export interface TotaisFinanceiro {
  atendimentosDebt: number
  atendimentosCredit: number
  saldoAtendimentos: number
  creditos: number
  orcamentos: number
  saldo: number
  notaPromissoria: number
}

export const totaisContasMock: TotaisFinanceiro = {
  atendimentosDebt: -915,
  atendimentosCredit: 915,
  saldoAtendimentos: 0,
  creditos: 0,
  orcamentos: 0,
  saldo: 0,
  notaPromissoria: 915,
}

const AK_WELLNESS: ProfissionalResumo = { nome: "AK Wellness" }
const LADORE_SPA: ProfissionalResumo = { nome: "Ladore Spa" }
const LUCIANA: ProfissionalResumo = {
  nome: "Luciana Eloia Quintino da Silva",
}
const ALAN: ProfissionalResumo = { nome: "Alan Robson de Oliveira" }

export const atendimentosContasMock: AtendimentoFinanceiro[] = [
  {
    id: "a1",
    criadoEm: "2026-06-26T08:00:00",
    descricao: "BodyShape Cortesia",
    procedimentos: ["BodyShape Cortesia"],
    status: "FINALIZADO",
    profissional: AK_WELLNESS,
    numero: "220129861",
    formaPagamento: "Particular",
    emAberto: true,
    valor: 0,
    baixa: null,
  },
  {
    id: "a2",
    criadoEm: "2025-09-10T18:00:00",
    descricao: "Massagem com Ventosas",
    procedimentos: ["Massagem com Ventosas"],
    status: "FINALIZADO",
    profissional: LADORE_SPA,
    numero: "176813016",
    formaPagamento: "Particular",
    valor: 60,
    baixa: null,
  },
  {
    id: "a3",
    criadoEm: "2025-09-05T12:00:00",
    descricao: "CONSULTA NUTRI BASE",
    procedimentos: ["CONSULTA NUTRI BASE ATÉ MAR/2024"],
    status: "FINALIZADO",
    profissional: LUCIANA,
    numero: "175744915",
    formaPagamento: "Particular",
    valor: 100,
    baixa: null,
  },
  {
    id: "a4",
    criadoEm: "2024-11-29T17:00:00",
    descricao: "Massagem Relaxante, escalda pés",
    procedimentos: ["Massagem Relaxante Escalda Pés"],
    status: "FINALIZADO",
    profissional: LADORE_SPA,
    numero: "133491800",
    formaPagamento: "Particular",
    valor: 150,
    baixa: null,
  },
  {
    id: "a5",
    criadoEm: "2024-11-13T18:00:00",
    descricao: "Massagem Relaxante, escalda pés",
    procedimentos: ["Massagem Relaxante Escalda Pés"],
    status: "FINALIZADO",
    profissional: LADORE_SPA,
    numero: "132208369",
    formaPagamento: "Particular",
    valor: 150,
    baixa: null,
  },
  {
    id: "a6",
    criadoEm: "2024-11-08T18:00:00",
    descricao: "Massagem Relaxante, escalda pés",
    procedimentos: ["Massagem Relaxante Escalda Pés"],
    status: "CANCELADO",
    profissional: LADORE_SPA,
    numero: "132208095",
    valor: 0,
    baixa: null,
  },
  {
    id: "a7",
    criadoEm: "2024-10-18T17:00:00",
    descricao: "Massagem com Ventosas",
    procedimentos: ["Massagem com Ventosas"],
    status: "FINALIZADO",
    profissional: LADORE_SPA,
    numero: "128771701",
    formaPagamento: "Particular",
    valor: 60,
    baixa: null,
  },
  {
    id: "a8",
    criadoEm: "2024-09-23T18:00:00",
    descricao: "Limpeza de pele C/Peeling Diamante",
    procedimentos: ["LImpeza de Pele C/Peeling Diamante"],
    status: "FINALIZADO",
    profissional: LADORE_SPA,
    numero: "125265577",
    formaPagamento: "Particular",
    valor: 85,
    baixa: null,
  },
  {
    id: "a9",
    criadoEm: "2024-08-28T18:00:00",
    descricao: "Massagem com Ventosas",
    procedimentos: ["Massagem com Ventosas"],
    status: "FINALIZADO",
    profissional: LADORE_SPA,
    numero: "121118568",
    formaPagamento: "Particular",
    valor: 60,
    baixa: null,
  },
  {
    id: "a10",
    criadoEm: "2024-07-18T18:00:00",
    descricao: "Massagem com Ventosas",
    procedimentos: ["Massagem com Ventosas"],
    status: "FINALIZADO",
    profissional: LADORE_SPA,
    numero: "115788096",
    formaPagamento: "Particular",
    valor: 60,
    baixa: null,
  },
  {
    id: "a11",
    criadoEm: "2024-03-05T17:00:00",
    descricao: "CONSULTA NUTRI BASE",
    procedimentos: ["CONSULTA NUTRI BASE ATÉ MAR/2024"],
    status: "FINALIZADO",
    profissional: ALAN,
    numero: "97041624",
    formaPagamento: "Particular",
    valor: 100,
    baixa: null,
  },
  {
    id: "a12",
    criadoEm: "2024-02-23T17:00:00",
    descricao: "Massagem Relaxante",
    procedimentos: ["Massagem Relaxante"],
    status: "CANCELADO",
    profissional: LADORE_SPA,
    numero: "95925330",
    valor: 0,
    baixa: null,
  },
  {
    id: "a13",
    criadoEm: "2023-12-01T17:00:00",
    descricao: "Massagem com Ventosas",
    procedimentos: ["Massagem com Ventosas"],
    status: "FINALIZADO",
    profissional: LADORE_SPA,
    numero: "89556332",
    formaPagamento: "Particular",
    valor: 90,
    baixa: null,
  },
]

export const extratoContasMock: LancamentoExtrato[] = [
  {
    id: "e1",
    criadoEm: "2026-06-26T08:00:00",
    mostrarData: true,
    descricao: "BodyShape Cortesia",
    procedimentos: ["BodyShape Cortesia"],
    atendimento: { nome: AK_WELLNESS.nome, numero: "220129861" },
    tipo: "RECEBIMENTO",
    valor: null,
  },
  {
    id: "e2",
    criadoEm: "2025-09-10T18:00:00",
    mostrarData: true,
    descricao: "Pagamento particular",
    atendimento: { nome: LUCIANA.nome, numero: "176813016" },
    tipo: "RECEBIMENTO",
    valor: 60,
  },
  {
    id: "e3",
    criadoEm: "2025-09-10T18:00:00",
    descricao: "Massagem com Ventosas",
    procedimentos: ["Massagem com Ventosas"],
    atendimento: { nome: LADORE_SPA.nome, numero: "176813016" },
    lancamento: {
      autor: "Aaron Guilherme Oliveira Sampaio",
      observacao:
        "valor de 120,00, porém devido a condição de colaborador de 50%, o valor atualizado será de 60,00. Autorização anexada.",
    },
    tipo: "PAGAMENTO",
    valor: 60,
  },
  {
    id: "e4",
    criadoEm: "2025-09-05T12:00:00",
    mostrarData: true,
    descricao: "Pagamento particular",
    atendimento: { nome: LUCIANA.nome, numero: "175744915" },
    tipo: "RECEBIMENTO",
    valor: 100,
  },
  {
    id: "e5",
    criadoEm: "2025-09-05T12:00:00",
    descricao: "CONSULTA NUTRI BASE",
    procedimentos: ["CONSULTA NUTRI BASE"],
    atendimento: { nome: LUCIANA.nome, numero: "175744915" },
    lancamento: {
      autor: "Franklin Lucas de Sousa Neves",
    },
    tipo: "PAGAMENTO",
    valor: 100,
  },
  {
    id: "e6",
    criadoEm: "2024-11-29T17:00:00",
    mostrarData: true,
    descricao: "Pagamento particular",
    atendimento: { nome: LADORE_SPA.nome, numero: "133491800" },
    tipo: "RECEBIMENTO",
    valor: 150,
  },
  {
    id: "e7",
    criadoEm: "2024-11-29T17:00:00",
    descricao: "Massagem Relaxante, escalda pés",
    procedimentos: ["Massagem Relaxante Escalda Pés"],
    atendimento: { nome: LADORE_SPA.nome, numero: "133491800" },
    lancamento: {
      autor: "Déborah Rodrigues da Silva Macedo",
    },
    tipo: "PAGAMENTO",
    valor: 150,
  },
  {
    id: "e8",
    criadoEm: "2024-10-18T17:00:00",
    mostrarData: true,
    descricao: "Pagamento particular",
    atendimento: { nome: LADORE_SPA.nome, numero: "128771701" },
    tipo: "RECEBIMENTO",
    valor: 60,
  },
  {
    id: "e9",
    criadoEm: "2024-10-18T17:00:00",
    descricao: "Massagem com Ventosas",
    procedimentos: ["Massagem com Ventosas"],
    atendimento: { nome: LADORE_SPA.nome, numero: "128771701" },
    lancamento: {
      autor: "Andreza Kelly Lima de Sousa",
    },
    tipo: "PAGAMENTO",
    valor: 60,
  },
  {
    id: "e10",
    criadoEm: "2024-09-23T18:00:00",
    mostrarData: true,
    descricao: "Pagamento particular",
    atendimento: { nome: LADORE_SPA.nome, numero: "125265577" },
    tipo: "RECEBIMENTO",
    valor: 85,
  },
  {
    id: "e11",
    criadoEm: "2024-09-23T18:00:00",
    descricao: "Limpeza de pele C/Peeling Diamante",
    procedimentos: ["LImpeza de Pele C/Peeling Diamante"],
    atendimento: { nome: LADORE_SPA.nome, numero: "125265577" },
    lancamento: {
      autor: "Brenda Vitoria de Souza de Oliveira",
    },
    tipo: "PAGAMENTO",
    valor: 85,
  },
]

export interface ItemCatalogo {
  id: string
  nome: string
  preco: number
}

export const unidadesContasMock: string[] = [
  "Unidade Centro",
  "Unidade Aldeota",
  "Unidade Sul",
]

export const solicitantesContasMock: string[] = [
  "Aaron Guilherme Oliveira Sampaio",
  "Thaís Alves",
  "Luciana Eloia Quintino da Silva",
  "Alan Robson de Oliveira",
]

export const formasPagamentoContasMock: string[] = [
  "Cartão",
  "Cheque",
  "Dinheiro",
  "Pix",
  "TED",
  "Crédito em conta",
  "Boleto",
  "Crédito Pré-Pago",
  "Nota Promissória",
]

export const FORMAS_COM_PARCELAS = ["Cheque", "Boleto", "Crédito em conta"]

export const procedimentosCatalogoMock: ItemCatalogo[] = [
  { id: "p1", nome: "CONSULTA NUTRI BASE", preco: 100 },
  { id: "p2", nome: "Massagem Relaxante", preco: 120 },
  { id: "p3", nome: "Massagem com Ventosas", preco: 60 },
  { id: "p4", nome: "Limpeza de pele C/Peeling Diamante", preco: 85 },
  { id: "p5", nome: "BodyShape Cortesia", preco: 0 },
  { id: "p6", nome: "Avaliação Física", preco: 150 },
  { id: "p7", nome: "Drenagem Linfática", preco: 110 },
  { id: "p8", nome: "Escalda Pés", preco: 45 },
]

export const matmedsCatalogoMock: ItemCatalogo[] = [
  { id: "m1", nome: "Soro Fisiológico 500ml", preco: 18 },
  { id: "m2", nome: "Gaze Estéril", preco: 6 },
  { id: "m3", nome: "Creme Anestésico", preco: 42 },
  { id: "m4", nome: "Ácido Hialurônico", preco: 320 },
  { id: "m5", nome: "Vitamina C Injetável", preco: 55 },
  { id: "m6", nome: "Luvas de Procedimento", preco: 12 },
]
