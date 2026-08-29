import z from "zod"

export const TIPOS_VIGENCIA = [
  { value: "INDETERMINADO", label: "Indeterminado" },
  { value: "DETERMINADO", label: "Determinado" },
] as const

export const TIPOS_PROFISSIONAL_REPASSE = [
  { value: "EXECUTANT", label: "Executante" },
  { value: "REQUESTER", label: "Solicitante" },
] as const

export const VARIAVEIS_FORMULA = [
  { variavel: "@@procedimento", descricao: "valor do procedimento" },
  { variavel: "@@valorbruto", descricao: "procedimento + acréscimo" },
  { variavel: "@@acrescimo", descricao: "acréscimo concedido" },
  { variavel: "@@desconto", descricao: "desconto concedido" },
  {
    variavel: "@@customatmed",
    descricao: "custo de materiais hospitalares",
  },
  { variavel: "@@glosa", descricao: "valor glosado pelo convênio" },
  {
    variavel: "@@matmed",
    descricao: "valor dos materiais hospitalares",
  },
  { variavel: "@@impostos", descricao: "impostos retidos" },
  { variavel: "@@custoprocedimento", descricao: "custo do procedimento" },
  { variavel: "@@taxacartao", descricao: "taxa da maquineta" },
] as const

export const repasseSchema = z.object({
  nomeExibicao: z.string().min(1, "Informe o nome de exibição"),
  tipoVigencia: z.string(),
  inicioVigencia: z.string().min(1, "Informe o início da vigência"),
  fimVigencia: z.string(),
  tipoProfissional: z.string(),
  formula: z.string().min(1, "Informe a fórmula de cálculo"),
  profissionais: z.array(z.string()),
  procedimentos: z.array(z.string()),
  convenios: z.array(z.string()),
  unidades: z.array(z.string()),
})

export type RepasseFormData = z.infer<typeof repasseSchema>
