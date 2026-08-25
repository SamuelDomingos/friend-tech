export interface DadosClinica {
  codigoAcessoExterno: string
  cnpj: string
  codigoCliente: string
  nomeFantasia: string
  regimeTributario: string
  razaoSocial: string
  inscricaoMunicipal: string
  responsavelClinica: string
  contadorResponsavel: string
  inicioContrato: string
}

export interface EnderecoClinica {
  endereco: string
  complemento: string
  cep: string
  numero: string
  bairro: string
  cidade: string
  estado: string
}

export interface EnderecoFiscal extends EnderecoClinica {
  codigoMunicipio: string
  uf: string
  telefone: string
  email: string
}

export interface ContatoClinica {
  telefone1: string
  email: string
  telefone2: string
  site: string
}

export interface EcacConfig {
  codigoAcesso: string
  senhaEcac: string
}

export interface LucroPresumidoConfig {
  baseCalculo: string
  antecipacaoIrpfCsll: string
}

export interface CertificadoDigitalConfig {
  certificadoEnviado: string
  senhaCertificado: string
}

export interface NotaFiscalConfig {
  senhaWebPrefeitura: string
  cnaePadrao: string
  codigoPadraoServico: string
  discriminacaoPadraoServico: string
}

// Dados fictícios — substituir pelos dados reais quando o módulo existir.
export const dadosClinicaMock: DadosClinica = {
  codigoAcessoExterno: "37548",
  cnpj: "10.592.565/0001-69",
  codigoCliente: "—",
  nomeFantasia: "Infinity Way",
  regimeTributario: "LUCRO PRESUMIDO",
  razaoSocial: "MEDCA SERVICOS MEDICOS LTDA ME",
  inscricaoMunicipal: "241485",
  responsavelClinica: "DR. ANDRE",
  contadorResponsavel: "—",
  inicioContrato: "Sem contrato",
}

export const enderecoClinicaMock: EnderecoClinica = {
  endereco: "Rua Silva Paulet",
  complemento: "—",
  cep: "60120-020",
  numero: "984",
  bairro: "Meireles",
  cidade: "Fortaleza",
  estado: "Ceará",
}

export const enderecoClinica2Mock: EnderecoClinica = {
  endereco: "—",
  complemento: "—",
  cep: "",
  numero: "—",
  bairro: "—",
  cidade: "—",
  estado: "—",
}

export const contatoClinicaMock: ContatoClinica = {
  telefone1: "(85) 99985-4065",
  email: "financeiro@drandreguanabara.com.br",
  telefone2: "(85) 99985-4065",
  site: "—",
}

export const ecacConfigMock: EcacConfig = {
  codigoAcesso: "—",
  senhaEcac: "Não informado",
}

export const lucroPresumidoMock: LucroPresumidoConfig = {
  baseCalculo: "—",
  antecipacaoIrpfCsll: "Não",
}

export const certificadoDigitalMock: CertificadoDigitalConfig = {
  certificadoEnviado: "Não enviado",
  senhaCertificado: "Não informado",
}

export const enderecoFiscalMock: EnderecoFiscal = {
  endereco: "Avenida Santos Dumont",
  complemento: "—",
  cep: "60150-161",
  numero: "2087",
  bairro: "Aldeota",
  cidade: "Fortaleza",
  estado: "Ceará",
  codigoMunicipio: "2304400",
  uf: "CE",
  telefone: "—",
  email: "—",
}

export const notaFiscalMock: NotaFiscalConfig = {
  senhaWebPrefeitura: "Não informado",
  cnaePadrao:
    "Atividades de atendimento hospitalar, exceto pronto-socorro e unidades para atendimento a urgencias",
  codigoPadraoServico:
    "Hospitais, clínicas, laboratórios, sanatórios, manicômios, casas de saúde, prontos-socorros, ambulatórios e congêneres.",
  discriminacaoPadraoServico:
    "1 Consulta medica prestada pelo nutrologo Dr. Andre",
}
