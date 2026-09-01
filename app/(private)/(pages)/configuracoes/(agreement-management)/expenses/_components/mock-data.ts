export const TIPOS_DESPESA = [
  { value: "02", label: "Medicamentos" },
  { value: "03", label: "Material" },
  { value: "05", label: "Diária" },
  { value: "07", label: "Taxas e Aluguéis" },
  { value: "08", label: "OPME" },
  { value: "01", label: "Gases Medicinais" },
] as const

export function tipoDespesaLabel(value: string): string {
  return TIPOS_DESPESA.find((t) => t.value === value)?.label ?? "—"
}

export const UNIDADES_MEDIDA = [
  "Ampola",
  "Bilhões de Unidades Internacionais",
  "Bisnaga",
  "Bolsa",
  "Caixa",
  "Cápsula",
  "Carpule",
  "Comprimido",
  "Dose",
  "Drágea",
  "Envelope",
  "Flaconete",
  "Frasco",
  "Frasco Ampola",
  "Galão",
  "Glóbulo",
  "Gotas",
  "Grama",
  "Litro",
  "Microgramas",
  "Milhões de Unidades Internacionais",
  "Miligrama",
  "Milílitro",
  "Óvulo",
  "Pastilha",
  "Lata",
  "Pérola",
  "Pílula",
  "Pote",
  "Quilograma",
  "Seringa",
  "Supositório",
  "Tablete",
  "Tubete",
  "Tubo",
  "Unidade",
  "Unidade Internacional",
  "Centímetro",
  "Conjunto",
  "Kit",
  "Maço",
  "Metro",
  "Pacote",
  "Peça",
  "Rolo",
  "Gray",
  "Centgray",
  "Par",
  "Adesivo Transdérmico",
  "Comprimido Efervecente",
  "Comprimido Mastigável",
  "Sachê",
]

export interface ExpenseRating {
  id: string
  nome: string
  criadoEm: string
}

export const expenseRatingsMock: ExpenseRating[] = [
  { id: "r1", nome: "Tabela Própria Grupo A", criadoEm: "2025-01-10" },
  { id: "r2", nome: "Tabela Própria Grupo B", criadoEm: "2025-02-14" },
]

export interface ExpenseInsurancePrice {
  convenioId: string
  convenioNome: string
  valor: string
}

export interface Expense {
  id: string
  codigoTuss: string
  codigoSimproTiss: string
  registroAnvisa: string
  nomeFaturamento: string
  nome: string
  tipo: string
  tabelaPropria: boolean
  unidade: string
  classificacaoId: string
  custo: string
  custoAdicional: string
  valorParticular: string
  convenios: ExpenseInsurancePrice[]
  criadoEm: string
}

export const expensesMock: Expense[] = [
  {
    id: "d1",
    codigoTuss: "10101012",
    codigoSimproTiss: "",
    registroAnvisa: "",
    nomeFaturamento: "Dipirona 500mg",
    nome: "Dipirona 500mg",
    tipo: "02",
    tabelaPropria: false,
    unidade: "Comprimido",
    classificacaoId: "",
    custo: "0,50",
    custoAdicional: "",
    valorParticular: "2,00",
    convenios: [],
    criadoEm: "2025-03-01",
  },
  {
    id: "d2",
    codigoTuss: "30101015",
    codigoSimproTiss: "",
    registroAnvisa: "",
    nomeFaturamento: "Luva cirúrgica estéril",
    nome: "Luva cirúrgica estéril",
    tipo: "03",
    tabelaPropria: false,
    unidade: "Par",
    classificacaoId: "r1",
    custo: "1,20",
    custoAdicional: "0,10",
    valorParticular: "4,50",
    convenios: [
      { convenioId: "c1", convenioNome: "Amil", valor: "3,90" },
    ],
    criadoEm: "2025-02-18",
  },
]
