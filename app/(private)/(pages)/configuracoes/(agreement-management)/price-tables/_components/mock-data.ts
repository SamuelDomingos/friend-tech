export type TablePriceStatus = "PROCESSING" | "ACTIVE" | "ERROR"

export function statusLabel(status: TablePriceStatus): string {
  if (status === "ACTIVE") return "Ativa"
  if (status === "PROCESSING") return "Processando"
  return "Erro"
}

export const BRASINDICE_SUBTYPES = [
  { value: "BRASINDICE_SUPPLIES", label: "BrasIndice - Materiais Hospitalares" },
  { value: "BRASINDICE_MEDICAMENT", label: "BrasIndice - Medicamentos" },
  { value: "BRASINDICE_PARENTING", label: "BrasIndice - Soluções Parenterais" },
] as const

export function brasindiceSubtypeLabel(value: string): string {
  return BRASINDICE_SUBTYPES.find((s) => s.value === value)?.label ?? "—"
}

export const PROCEDURE_TYPES = [
  { value: "CBHPM", label: "CBHPM" },
  { value: "AMB", label: "AMB" },
  { value: "DEFAULT_PROCEDURE", label: "Própria" },
] as const

export function procedureTypeLabel(value: string): string {
  return PROCEDURE_TYPES.find((t) => t.value === value)?.label ?? "—"
}

export const CBHPM_IMPORT_TABLES = [
  "2003-2008",
  "2008-2009",
  "2009-2010",
  "2010-2011",
  "2011-2012",
  "2012-2013",
  "2013-2014",
  "2014-2015",
  "2015-2016",
  "2016-2017",
  "2017-2018",
  "2018-2019",
  "2019-2020",
  "2020-2021",
  "2021-2022",
  "2022-2023",
  "2023-2024",
  "2024-2025",
]

export const CBHPM_PORT_CODES = Array.from({ length: 14 }, (_, i) => i + 1).flatMap(
  (n) => ["A", "B", "C"].map((letra) => `${n}${letra}`)
)

export interface CbhpmParticipationDegrees {
  cirurgiao: string
  auxiliar1: string
  auxiliar2: string
  auxiliar3: string
  auxiliar4: string
}

export interface AmbSpecialRule {
  codigo: string
  valor: string
}

export interface ProcedureItem {
  codigo: string
  descricao: string
  porte: string
  uco: string
  filme: string
  total: string
}

export const procedureItemsMock: ProcedureItem[] = [
  { codigo: "30602017", descricao: "Colecistectomia videolaparoscópica", porte: "9C", uco: "9,25", filme: "", total: "1.850,00" },
  { codigo: "31009018", descricao: "Apendicectomia", porte: "7B", uco: "6,50", filme: "", total: "1.120,00" },
  { codigo: "30716018", descricao: "Herniorrafia inguinal unilateral", porte: "6A", uco: "5,00", filme: "", total: "890,00" },
  { codigo: "31601013", descricao: "Mastectomia simples", porte: "8B", uco: "8,00", filme: "", total: "1.540,00" },
  { codigo: "30912015", descricao: "Tireoidectomia total", porte: "10A", uco: "10,50", filme: "", total: "2.100,00" },
  { codigo: "40901447", descricao: "Endoscopia digestiva alta", porte: "3A", uco: "1,80", filme: "12,00", total: "310,00" },
  { codigo: "40801019", descricao: "Colonoscopia", porte: "4B", uco: "2,50", filme: "", total: "420,00" },
  { codigo: "20101015", descricao: "Consulta em consultório", porte: "1A", uco: "0,00", filme: "", total: "95,00" },
]

export interface CbhpmConfig {
  importTable: string
  redAcr: string
  ucoAmount: string
  participationDegrees: CbhpmParticipationDegrees
  portConfig: Record<string, string>
}

export interface AmbConfig {
  chValue: string
  specialRules: AmbSpecialRule[]
}

export interface TablePriceBase {
  id: string
  importadoPor: string
  importadoEm: string
  startDate: string
  endDate: string
  status: TablePriceStatus
}

export interface BrasIndiceTable extends TablePriceBase {
  subtype: string
}

export interface ProcedureTable extends TablePriceBase {
  type: string
  nome: string
  observacao: string
  convenios: string[]
  ativa: boolean
  cbhpm?: CbhpmConfig
  amb?: AmbConfig
  ownProcedures?: ProcedureItem[]
}

export interface MatmedTable extends TablePriceBase {
  nome: string
  observacao: string
  classificacaoIds: string[]
}

export const brasindiceTablesMock: BrasIndiceTable[] = [
  {
    id: "bi1",
    subtype: "BRASINDICE_MEDICAMENT",
    importadoPor: "Ana Karoline Franco Batista",
    importadoEm: "2025-01-05",
    startDate: "2025-01-06",
    endDate: "",
    status: "ACTIVE",
  },
]

export const procedureTablesMock: ProcedureTable[] = [
  {
    id: "pt1",
    type: "CBHPM",
    nome: "CBHPM Porte 2023 - 2024",
    observacao: "",
    startDate: "2024-01-01",
    endDate: "",
    convenios: ["c1", "c2"],
    importadoPor: "Alan Robson de Oliveira",
    importadoEm: "2023-12-20",
    status: "ACTIVE",
    ativa: true,
    cbhpm: {
      importTable: "2023-2024",
      redAcr: "0,00",
      ucoAmount: "32,50",
      participationDegrees: {
        cirurgiao: "100,00",
        auxiliar1: "30,00",
        auxiliar2: "20,00",
        auxiliar3: "10,00",
        auxiliar4: "10,00",
      },
      portConfig: {},
    },
  },
]

export const matmedTablesMock: MatmedTable[] = [
  {
    id: "mt1",
    nome: "Tabela Própria de Materiais",
    observacao: "",
    startDate: "2024-06-01",
    endDate: "",
    classificacaoIds: [],
    importadoPor: "Catarina Ribeiro Moreno",
    importadoEm: "2024-05-28",
    status: "ACTIVE",
  },
]
