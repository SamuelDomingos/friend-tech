export interface Convenio {
  id: string
  nome: string
  nomeEstabelecimentoSUS: string
  grupoConvenioId: string
  nomeExibicaoAgenda: string
  cardNumberStartWith: string
  cardNumberLength: string
  showOnlyEventsTied: boolean
  period: string
  allowedUsers: string[]

  ans: string
  contractCode: string
  contractName: string
  cnes: string
  codification: string
  film: string
  coparticipation: string
  customProcedureViaPercentage: string
  customProcedureVia: string
  customProcedureViaPercentage2: string
  customProcedureVia2: string
  customProcedureViaPercentage3: string
  customProcedureVia3: string
  taxes: string
  bankId: string
  autoincrementLastLote: string
  sendIntervalStartConsulta: string
  sendIntervalEndConsulta: string
  sendIntervalStartSadt: string
  sendIntervalEndSadt: string
  sendIntervalStartGhi: string
  sendIntervalEndGhi: string
  deadlineExpectancyConsulta: string
  deadlineExpectancySadt: string
  deadlineExpectancyGhi: string
  autoincrementLastGuiaConsulta: string
  autoincrementLastGuiaSadt: string
  autoincrementLastGuiaGhi: string
  tissVersion: string
  tissMethod: string
  encodingXml: string
  webserviceProviderType: string
  deadlineAttendance: string
  deliveryAddress: string
  deliveryTime: string
  orderGuides: string
  allowXml: boolean
  hideXmlTimezone: boolean
  allowAuthorization: boolean
  allowDelivery: boolean
  billSessionsSplitted: boolean
  billSessionOpen: boolean
  printProceduresAsList: boolean
  hidePrintGuidePrice: boolean
  hideFinances: boolean
  allowRepeatProcedures: boolean
  allowChangeProceduresDate: boolean
  allowChangeMatmedsDate: boolean
  allowChangeProceduresTime: boolean
  billGroupedProcedureTeam: boolean
  techniqueByProcedure: boolean
  allowSequentialItem: boolean
  allowFixedPrice: boolean
  hideExecutantInfo: boolean
  hideMainGuideNumber: boolean
  hideItemBilling: boolean
  requiredGuideAuthorization: boolean
  requiredGuideRequester: boolean
  showPatientCpfLotResume: boolean
  showAuthorizationDataOnGloss: boolean
  allowMatmedCustomRedAcr: boolean
  customProcedureViaOverPort: boolean
  showPercentRedAcr: boolean

  tomadorCnpj: string
  tomadorRazaoSocial: string
  tomadorEnderecoCep: string
  tomadorEnderecoEndereco: string
  tomadorEnderecoNumero: string
  tomadorEnderecoComplemento: string
  tomadorEnderecoUf: string
  tomadorEnderecoIbge: string
  tomadorEnderecoBairro: string

  contatoSector: string
  contatoName: string
  contatoEmail: string
  contatoPhone: string
  contatoSector2: string
  contatoName2: string
  contatoEmail2: string
  contatoPhone2: string
  contatoSector3: string
  contatoName3: string
  contatoEmail3: string
  contatoPhone3: string

  deadlineSendGlosa: string
  deadlineExpectancyGlosa: string
  glosaMethod: string

  ultimaAtualizacao: string
}

export interface GrupoConvenio {
  id: string
  nome: string
  convenios: string[]
}

export interface Associacao {
  id: string
  nome: string
  convenios: string[]
  descricao: string
  avatarUrl?: string
}

export function iniciais(nome: string): string {
  const partes = nome.split(" ").filter(Boolean)

  if (partes.length === 0) {
    return "?"
  }

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase()
  }

  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
}

const booleansFalse = {
  showOnlyEventsTied: false,
  allowXml: false,
  hideXmlTimezone: false,
  allowAuthorization: false,
  allowDelivery: false,
  billSessionsSplitted: false,
  billSessionOpen: false,
  printProceduresAsList: false,
  hidePrintGuidePrice: false,
  hideFinances: false,
  allowRepeatProcedures: false,
  allowChangeProceduresDate: false,
  allowChangeMatmedsDate: false,
  allowChangeProceduresTime: false,
  billGroupedProcedureTeam: false,
  techniqueByProcedure: false,
  allowSequentialItem: false,
  allowFixedPrice: false,
  hideExecutantInfo: false,
  hideMainGuideNumber: false,
  hideItemBilling: false,
  requiredGuideAuthorization: false,
  requiredGuideRequester: false,
  showPatientCpfLotResume: false,
  showAuthorizationDataOnGloss: false,
  allowMatmedCustomRedAcr: false,
  customProcedureViaOverPort: false,
  showPercentRedAcr: false,
}

export const conveniosMock: Convenio[] = [
  {
    id: "c1",
    nome: "Amil",
    nomeEstabelecimentoSUS: "",
    grupoConvenioId: "gc1",
    nomeExibicaoAgenda: "AMIL",
    cardNumberStartWith: "AMI",
    cardNumberLength: "12",
    period: "0",
    allowedUsers: ["Ana Karoline Franco Batista", "Alan Robson de Oliveira"],
    ans: "314602",
    contractCode: "AMI-0001",
    contractName: "Amil Assistência Médica Internacional S.A.",
    cnes: "1234567",
    codification: "TUSS",
    film: "",
    coparticipation: "10",
    customProcedureViaPercentage: "",
    customProcedureVia: "3",
    customProcedureViaPercentage2: "",
    customProcedureVia2: "3",
    customProcedureViaPercentage3: "",
    customProcedureVia3: "3",
    taxes: "0",
    bankId: "b1",
    autoincrementLastLote: "42",
    sendIntervalStartConsulta: "1",
    sendIntervalEndConsulta: "10",
    sendIntervalStartSadt: "1",
    sendIntervalEndSadt: "10",
    sendIntervalStartGhi: "1",
    sendIntervalEndGhi: "15",
    deadlineExpectancyConsulta: "30",
    deadlineExpectancySadt: "30",
    deadlineExpectancyGhi: "45",
    autoincrementLastGuiaConsulta: "1024",
    autoincrementLastGuiaSadt: "512",
    autoincrementLastGuiaGhi: "256",
    tissVersion: "04.03.00",
    tissMethod: "SITE",
    encodingXml: "utf8",
    webserviceProviderType: "",
    deadlineAttendance: "60",
    deliveryAddress: "Av. Brigadeiro Faria Lima, 3477",
    deliveryTime: "14:00",
    orderGuides: "NAME",
    ...booleansFalse,
    tomadorCnpj: "60.358.800/0001-52",
    tomadorRazaoSocial: "Amil Assistência Médica Internacional S.A.",
    tomadorEnderecoCep: "04538-133",
    tomadorEnderecoEndereco: "Av. Brigadeiro Faria Lima",
    tomadorEnderecoNumero: "3477",
    tomadorEnderecoComplemento: "Andar 14",
    tomadorEnderecoUf: "SP",
    tomadorEnderecoIbge: "3550308",
    tomadorEnderecoBairro: "Itaim Bibi",
    contatoSector: "Financeiro",
    contatoName: "Maria Silva",
    contatoEmail: "maria.silva@amil.com.br",
    contatoPhone: "(11) 3030-1000",
    contatoSector2: "Técnico",
    contatoName2: "João Santos",
    contatoEmail2: "joao.santos@amil.com.br",
    contatoPhone2: "(11) 3030-2000",
    contatoSector3: "",
    contatoName3: "",
    contatoEmail3: "",
    contatoPhone3: "",
    deadlineSendGlosa: "30",
    deadlineExpectancyGlosa: "30",
    glosaMethod: "SITE",
    ultimaAtualizacao: "2025-03-15",
  },
  {
    id: "c2",
    nome: "Unimed",
    nomeEstabelecimentoSUS: "",
    grupoConvenioId: "gc1",
    nomeExibicaoAgenda: "UNIMED",
    cardNumberStartWith: "UNI",
    cardNumberLength: "10",
    period: "30",
    allowedUsers: ["Catarina Ribeiro Moreno", "Gabriela Pinheiro Rebouças Martins"],
    ans: "353165",
    contractCode: "UNI-001",
    contractName: "Unimed do Brasil",
    cnes: "7654321",
    codification: "AMB",
    film: "12.5",
    coparticipation: "20",
    customProcedureViaPercentage: "15",
    customProcedureVia: "2",
    customProcedureViaPercentage2: "",
    customProcedureVia2: "3",
    customProcedureViaPercentage3: "",
    customProcedureVia3: "3",
    taxes: "5",
    bankId: "b2",
    autoincrementLastLote: "120",
    sendIntervalStartConsulta: "1",
    sendIntervalEndConsulta: "5",
    sendIntervalStartSadt: "1",
    sendIntervalEndSadt: "5",
    sendIntervalStartGhi: "1",
    sendIntervalEndGhi: "20",
    deadlineExpectancyConsulta: "45",
    deadlineExpectancySadt: "45",
    deadlineExpectancyGhi: "60",
    autoincrementLastGuiaConsulta: "2048",
    autoincrementLastGuiaSadt: "1024",
    autoincrementLastGuiaGhi: "512",
    tissVersion: "04.02.00",
    tissMethod: "ORIZON",
    encodingXml: "ISO-8859-1",
    webserviceProviderType: "",
    deadlineAttendance: "90",
    deliveryAddress: "SGAN 601 Modulo B",
    deliveryTime: "09:00",
    orderGuides: "GUIDE_NUMBER",
    ...booleansFalse,
    tomadorCnpj: "33.000.167/0001-01",
    tomadorRazaoSocial: "Unimed do Brasil",
    tomadorEnderecoCep: "70830-010",
    tomadorEnderecoEndereco: "SGAN 601 Modulo B",
    tomadorEnderecoNumero: "2100",
    tomadorEnderecoComplemento: "",
    tomadorEnderecoUf: "DF",
    tomadorEnderecoIbge: "5300108",
    tomadorEnderecoBairro: "Asa Norte",
    contatoSector: "Financeiro",
    contatoName: "Ana Oliveira",
    contatoEmail: "ana.oliveira@unimed.com.br",
    contatoPhone: "(61) 3333-4444",
    contatoSector2: "",
    contatoName2: "",
    contatoEmail2: "",
    contatoPhone2: "",
    contatoSector3: "",
    contatoName3: "",
    contatoEmail3: "",
    contatoPhone3: "",
    deadlineSendGlosa: "45",
    deadlineExpectancyGlosa: "45",
    glosaMethod: "FORM",
    ultimaAtualizacao: "2025-02-20",
  },
  {
    id: "c3",
    nome: "Bradesco Saúde",
    nomeEstabelecimentoSUS: "",
    grupoConvenioId: "gc2",
    nomeExibicaoAgenda: "BRADESCO",
    cardNumberStartWith: "BRA",
    cardNumberLength: "14",
    period: "0",
    allowedUsers: ["Débora Matos"],
    ans: "306884",
    contractCode: "BRA-01",
    contractName: "Bradesco Saúde S.A.",
    cnes: "1122334",
    codification: "TUSS",
    film: "",
    coparticipation: "0",
    customProcedureViaPercentage: "",
    customProcedureVia: "3",
    customProcedureViaPercentage2: "",
    customProcedureVia2: "3",
    customProcedureViaPercentage3: "",
    customProcedureVia3: "3",
    taxes: "0",
    bankId: "b3",
    autoincrementLastLote: "80",
    sendIntervalStartConsulta: "1",
    sendIntervalEndConsulta: "10",
    sendIntervalStartSadt: "1",
    sendIntervalEndSadt: "10",
    sendIntervalStartGhi: "1",
    sendIntervalEndGhi: "10",
    deadlineExpectancyConsulta: "30",
    deadlineExpectancySadt: "30",
    deadlineExpectancyGhi: "30",
    autoincrementLastGuiaConsulta: "4096",
    autoincrementLastGuiaSadt: "2048",
    autoincrementLastGuiaGhi: "1024",
    tissVersion: "04.01.00",
    tissMethod: "SITE",
    encodingXml: "utf8",
    webserviceProviderType: "",
    deadlineAttendance: "60",
    deliveryAddress: "Rua XV de Novembro, 491",
    deliveryTime: "10:30",
    orderGuides: "CREATED_AT",
    ...booleansFalse,
    tomadorCnpj: "04.361.311/0001-91",
    tomadorRazaoSocial: "Bradesco Saúde S.A.",
    tomadorEnderecoCep: "01013-000",
    tomadorEnderecoEndereco: "Rua XV de Novembro",
    tomadorEnderecoNumero: "491",
    tomadorEnderecoComplemento: "10º andar",
    tomadorEnderecoUf: "SP",
    tomadorEnderecoIbge: "3550308",
    tomadorEnderecoBairro: "Centro",
    contatoSector: "Atendimento",
    contatoName: "Carlos Ferreira",
    contatoEmail: "carlos.ferreira@bradesco.com.br",
    contatoPhone: "(11) 4002-8922",
    contatoSector2: "Financeiro",
    contatoName2: "Lucia Costa",
    contatoEmail2: "lucia.costa@bradesco.com.br",
    contatoPhone2: "(11) 4002-8923",
    contatoSector3: "",
    contatoName3: "",
    contatoEmail3: "",
    contatoPhone3: "",
    deadlineSendGlosa: "15",
    deadlineExpectancyGlosa: "30",
    glosaMethod: "SITE",
    ultimaAtualizacao: "2025-01-10",
  },
  {
    id: "c4",
    nome: "SUS - Sistema Único de Saúde",
    nomeEstabelecimentoSUS: "UBS Vila Nova",
    grupoConvenioId: "gc2",
    nomeExibicaoAgenda: "SUS",
    cardNumberStartWith: "SUS",
    cardNumberLength: "15",
    period: "0",
    allowedUsers: [],
    ans: "",
    contractCode: "",
    contractName: "SUS - Sistema Único de Saúde",
    cnes: "5566778",
    codification: "",
    film: "",
    coparticipation: "",
    customProcedureViaPercentage: "",
    customProcedureVia: "3",
    customProcedureViaPercentage2: "",
    customProcedureVia2: "3",
    customProcedureViaPercentage3: "",
    customProcedureVia3: "3",
    taxes: "",
    bankId: "",
    autoincrementLastLote: "15",
    sendIntervalStartConsulta: "",
    sendIntervalEndConsulta: "",
    sendIntervalStartSadt: "",
    sendIntervalEndSadt: "",
    sendIntervalStartGhi: "",
    sendIntervalEndGhi: "",
    deadlineExpectancyConsulta: "60",
    deadlineExpectancySadt: "60",
    deadlineExpectancyGhi: "60",
    autoincrementLastGuiaConsulta: "300",
    autoincrementLastGuiaSadt: "150",
    autoincrementLastGuiaGhi: "75",
    tissVersion: "03.03.01",
    tissMethod: "",
    encodingXml: "utf8",
    webserviceProviderType: "",
    deadlineAttendance: "30",
    deliveryAddress: "",
    deliveryTime: "",
    orderGuides: "",
    ...booleansFalse,
    tomadorCnpj: "00.394.411/0001-09",
    tomadorRazaoSocial: "SUS - Sistema Único de Saúde",
    tomadorEnderecoCep: "70054-905",
    tomadorEnderecoEndereco: "Esplanada dos Ministérios",
    tomadorEnderecoNumero: "Bloco F",
    tomadorEnderecoComplemento: "",
    tomadorEnderecoUf: "DF",
    tomadorEnderecoIbge: "5300108",
    tomadorEnderecoBairro: "Zona Cívico-Administrativa",
    contatoSector: "TISS",
    contatoName: "Paulo Mendes",
    contatoEmail: "paulo.mendes@saude.gov.br",
    contatoPhone: "(61) 3315-8000",
    contatoSector2: "",
    contatoName2: "",
    contatoEmail2: "",
    contatoPhone2: "",
    contatoSector3: "",
    contatoName3: "",
    contatoEmail3: "",
    contatoPhone3: "",
    deadlineSendGlosa: "60",
    deadlineExpectancyGlosa: "60",
    glosaMethod: "FORM",
    ultimaAtualizacao: "2025-04-01",
  },
]

export const gruposConvenioMock: GrupoConvenio[] = [
  { id: "gc1", nome: "Grupo Comercial", convenios: ["Amil", "Unimed"] },
  { id: "gc2", nome: "Grupo Hospitalar", convenios: ["Bradesco Saúde", "SUS - Sistema Único de Saúde"] },
  { id: "gc3", nome: "Grupo Odontológico", convenios: [] },
  { id: "gc4", nome: "Grupo Laboratorial", convenios: [] },
]

export const associacoesMock: Associacao[] = [
  { id: "a1", nome: "Associação Médica do Ceará", convenios: ["Amil", "Unimed"], descricao: "Convênios aceitos pela associação médica local." },
  { id: "a2", nome: "Rede de Hospitais Nordeste", convenios: ["Bradesco Saúde", "SUS - Sistema Único de Saúde"], descricao: "Hospitais credenciados na região nordeste." },
]

export const bancosMock = [
  { id: "b1", nome: "INFINITY WAY TEC INF - SANTANDER" },
  { id: "b2", nome: "AK WELLNESS - SANTANDER" },
  { id: "b3", nome: "AG PARTICIPAÇÕES - SANTANDER" },
  { id: "b4", nome: "SANTANDER - INFINITY MEDCA" },
  { id: "b5", nome: "BRADESCO" },
] as const

export const ibgeMock = [
  { code: "3550308", name: "São Paulo" },
  { code: "5300108", name: "Brasília" },
  { code: "3304557", name: "Rio de Janeiro" },
  { code: "2304400", name: "Fortaleza" },
  { code: "4106902", name: "Curitiba" },
  { code: "4314902", name: "Porto Alegre" },
  { code: "3106200", name: "Belo Horizonte" },
] as const
