export interface ConsumoItem {
  id: string
  data: string
  item: string
  quantidade: number
  lote: string | null
  validade: string | null
  origem: string | null
  exportadoEm: string | null
  matmeds: string[]
}

export const CATALOGO_CONSUMO: { item: string; unidade: string }[] = [
  { item: "Luva de procedimento", unidade: "un" },
  { item: "Seringa 5ml", unidade: "un" },
  { item: "Gaze estéril", unidade: "pct" },
  { item: "Álcool 70%", unidade: "frasco" },
  { item: "Dipirona 500mg", unidade: "comprimido" },
  { item: "Soro fisiológico 0,9%", unidade: "frasco" },
]

export const consumoMock: ConsumoItem[] = [
  {
    id: "c1",
    data: "2026-09-01",
    item: "Luva de procedimento",
    quantidade: 2,
    lote: "L-4821",
    validade: "2027-04-30",
    origem: "Almoxarifado central",
    exportadoEm: null,
    matmeds: ["Luva látex M"],
  },
  {
    id: "c2",
    data: "2026-08-28",
    item: "Seringa 5ml",
    quantidade: 1,
    lote: "L-3390",
    validade: "2027-01-15",
    origem: "Almoxarifado central",
    exportadoEm: "2026-08-29",
    matmeds: [],
  },
  {
    id: "c3",
    data: "2026-08-20",
    item: "Gaze estéril",
    quantidade: 4,
    lote: null,
    validade: null,
    origem: "Sala 2",
    exportadoEm: null,
    matmeds: [],
  },
  {
    id: "c4",
    data: "2026-08-11",
    item: "Dipirona 500mg",
    quantidade: 6,
    lote: "L-1187",
    validade: "2026-12-31",
    origem: "Farmácia",
    exportadoEm: null,
    matmeds: ["Dipirona sódica"],
  },
]

export const ORIGENS_CONSUMO = [
  "Almoxarifado central",
  "Farmácia",
  "Sala 2",
] as const

export interface ProdutoEstoque {
  id: string
  nome: string
  estoque: number
  quantidadeModelo: number
  lote: string
  validade: string
}

export const PRODUTOS_ESTOQUE: ProdutoEstoque[] = [
  {
    id: "p1",
    nome: "Luva de procedimento (M)",
    estoque: 240,
    quantidadeModelo: 2,
    lote: "L-4821",
    validade: "2027-04-30",
  },
  {
    id: "p2",
    nome: "Seringa 5ml",
    estoque: 120,
    quantidadeModelo: 1,
    lote: "L-3390",
    validade: "2027-01-15",
  },
  {
    id: "p3",
    nome: "Gaze estéril",
    estoque: 0,
    quantidadeModelo: 4,
    lote: "",
    validade: "",
  },
  {
    id: "p4",
    nome: "Dipirona 500mg",
    estoque: 600,
    quantidadeModelo: 6,
    lote: "L-1187",
    validade: "2026-12-31",
  },
  {
    id: "p5",
    nome: "Álcool 70%",
    estoque: 18,
    quantidadeModelo: 1,
    lote: "L-2210",
    validade: "2028-02-28",
  },
]
