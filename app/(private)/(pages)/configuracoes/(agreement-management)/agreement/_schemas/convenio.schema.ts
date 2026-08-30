import z from "zod"

export const GRUPOS_CONVENIO_MOCK = [
  { id: "gc1", nome: "Grupo Comercial" },
  { id: "gc2", nome: "Grupo Hospitalar" },
  { id: "gc3", nome: "Grupo Odontológico" },
  { id: "gc4", nome: "Grupo Laboratorial" },
] as const

export const ESTADOS_BRASIL = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA",
  "PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
] as const

export const TISS_VERSIONS = [
  "04.03.00","04.02.00","04.01.00","04.00.01","04.00.00","03.05.00",
  "03.04.01","03.04.00","03.03.03","03.03.02","03.03.01","03.03.00",
  "03.02.01","03.02.00","02.02.03","02.02.01",
] as const

export const VIA_OPTIONS = ["3", "2", "1"] as const

export const TIPOS_GUIA = [
  { value: "consulta", label: "Consulta" },
  { value: "sadt", label: "SADT" },
  { value: "sp-sadt", label: "SP/SADT" },
  { value: "retencao", label: "Retenção" },
  { value: "honorarios", label: "Honorários" },
  { value: "resumoInternacao", label: "Resumo de Internação" },
  { value: "rqe", label: "RQE" },
] as const

export const TISS_METHODS = [
  { value: "SITE", label: "Direto pelo portal da operadora" },
  { value: "ORIZON", label: "Através da Orizon" },
] as const

export const ENCODING_XML = [
  { value: "utf8", label: "UTF-8" },
  { value: "ISO-8859-1", label: "ISO-8859-1" },
] as const

export const ORDER_GUIDES = [
  { value: "NAME", label: "Nome (alfabética)" },
  { value: "CREATED_AT", label: "Data de inserção" },
  { value: "GUIDE_NUMBER", label: "Número da guia" },
] as const

export const GLOSA_METHODS = [
  { value: "FORM", label: "Possui Formulário Próprio" },
  { value: "SITE", label: "Direto pelo site da operadora" },
] as const

export const MEDICOS_DISPONIVEIS = [
  "Ladore Spa",
  "Ana Karoline Franco Batista",
  "Ilzilane Victor Barbosa",
  "Atila augusto Sobral Barbosa oliveira",
  "Thaís Alves",
  "Antonio Ricardo Torres Quental Filho",
  "Camila Maria Araujo",
  "Medico Externo",
  "Laboratório",
  "Luana Cajado Lima de Oliveira",
  "Calorimetria",
  "Vanessa Santana de Oliveira Sousa",
  "Ingryd Victor Girão",
  "SERVIÇOS",
  "Rayana Líbia Vieira Lima",
  "Karen Ladislau Cavalcante",
  "Camila Nunes Martins",
  "André Vyann Ramalho Guanabara Araujo",
  "Alan Robson de Oliveira",
  "Catarina Ribeiro Moreno",
  "Locação de Sala",
  "AK Wellness",
  "Caio Vinícius Sousa Chaves Galdino",
  "Marcos Antonio Batista Medeiros",
  "Soroterapia",
  "Ciclo da Vida",
  "Maria Thais Saraiva Silva",
  "Armando Gabriel Machado Arruda",
  "Protocolos",
  "Biopedância",
  "Lúcio Gonçalo de Alcântara Neto",
  "José Barbosa de Lucena neto",
  "Gabriela Pinheiro Rebouças Martins",
  "Luciana Eloia Quintino da Silva",
  "Exames",
  "Débora Matos",
  "BARBARA MARIA VIDAL FREIRE",
  "Melissa Ciríaco Ribeiro",
  "Victor Barbosa de Paula",
  "LEANDRO FRANCA",
] as const

const contatoSchema = z.object({
  setor: z.string(),
  nome: z.string(),
  email: z.string(),
  telefone: z.string(),
})

export const convenioSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  nomeEstabelecimentoSUS: z.string(),
  grupoConvenioId: z.string(),
  nomeExibicaoAgenda: z.string(),
  cardNumberStartWith: z.string(),
  cardNumberLength: z.string(),
  showOnlyEventsTied: z.boolean(),
  period: z.string(),
  allowedUsers: z.array(z.string()),

  ans: z.string(),
  contractCode: z.string(),
  contractName: z.string(),
  cnes: z.string(),
  codification: z.string(),
  film: z.string(),
  coparticipation: z.string(),
  customProcedureViaPercentage: z.string(),
  customProcedureVia: z.string(),
  customProcedureViaPercentage2: z.string(),
  customProcedureVia2: z.string(),
  customProcedureViaPercentage3: z.string(),
  customProcedureVia3: z.string(),
  taxes: z.string(),
  bankId: z.string(),
  autoincrementLastLote: z.string(),
  sendIntervalStartConsulta: z.string(),
  sendIntervalEndConsulta: z.string(),
  sendIntervalStartSadt: z.string(),
  sendIntervalEndSadt: z.string(),
  sendIntervalStartGhi: z.string(),
  sendIntervalEndGhi: z.string(),
  deadlineExpectancyConsulta: z.string(),
  deadlineExpectancySadt: z.string(),
  deadlineExpectancyGhi: z.string(),
  autoincrementLastGuiaConsulta: z.string(),
  autoincrementLastGuiaSadt: z.string(),
  autoincrementLastGuiaGhi: z.string(),
  tissVersion: z.string(),
  tissMethod: z.string(),
  encodingXml: z.string(),
  webserviceProviderType: z.string(),
  deadlineAttendance: z.string(),
  deliveryAddress: z.string(),
  deliveryTime: z.string(),
  orderGuides: z.string(),
  allowXml: z.boolean(),
  hideXmlTimezone: z.boolean(),
  allowAuthorization: z.boolean(),
  allowDelivery: z.boolean(),
  billSessionsSplitted: z.boolean(),
  billSessionOpen: z.boolean(),
  printProceduresAsList: z.boolean(),
  hidePrintGuidePrice: z.boolean(),
  hideFinances: z.boolean(),
  allowRepeatProcedures: z.boolean(),
  allowChangeProceduresDate: z.boolean(),
  allowChangeMatmedsDate: z.boolean(),
  allowChangeProceduresTime: z.boolean(),
  billGroupedProcedureTeam: z.boolean(),
  techniqueByProcedure: z.boolean(),
  allowSequentialItem: z.boolean(),
  allowFixedPrice: z.boolean(),
  hideExecutantInfo: z.boolean(),
  hideMainGuideNumber: z.boolean(),
  hideItemBilling: z.boolean(),
  requiredGuideAuthorization: z.boolean(),
  requiredGuideRequester: z.boolean(),
  showPatientCpfLotResume: z.boolean(),
  showAuthorizationDataOnGloss: z.boolean(),
  allowMatmedCustomRedAcr: z.boolean(),
  customProcedureViaOverPort: z.boolean(),
  showPercentRedAcr: z.boolean(),

  tomadorCnpj: z.string(),
  tomadorRazaoSocial: z.string(),
  tomadorEnderecoCep: z.string(),
  tomadorEnderecoEndereco: z.string(),
  tomadorEnderecoNumero: z.string(),
  tomadorEnderecoComplemento: z.string(),
  tomadorEnderecoUf: z.string(),
  tomadorEnderecoIbge: z.string(),
  tomadorEnderecoBairro: z.string(),

  contatoSector: z.string(),
  contatoName: z.string(),
  contatoEmail: z.string(),
  contatoPhone: z.string(),
  contatoSector2: z.string(),
  contatoName2: z.string(),
  contatoEmail2: z.string(),
  contatoPhone2: z.string(),
  contatoSector3: z.string(),
  contatoName3: z.string(),
  contatoEmail3: z.string(),
  contatoPhone3: z.string(),

  deadlineSendGlosa: z.string(),
  deadlineExpectancyGlosa: z.string(),
  glosaMethod: z.string(),
})

export type ContatoFormData = z.infer<typeof contatoSchema>
export type ConvenioFormData = z.infer<typeof convenioSchema>
