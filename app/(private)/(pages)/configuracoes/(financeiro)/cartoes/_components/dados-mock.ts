export interface Maquineta {
  id: string
  nome: string
  contaBancaria: string
  primeiraParcela: string
  demaisParcelas: string
  debito: string
  antecipacaoAutomatica: boolean
  tipo: "PF" | "PJ"
  favorecido: string
  grupo: string
  imprimirRecibo: boolean
  prazoDebito: string
  prazoPrimeiraParcela: string
  prazoDemaisParcelas: string
  qtdMaxParcelas: number
  taxaAntecipacao: string
  prazoAntecipacao: string
  anteciparAutomaticamente: boolean
  bandeiras: string[]
  taxas: {
    debito: string
    credito: string[]
    pix: string
  }
}

export interface GrupoMaquineta {
  id: string
  nome: string
  maquinetas: string[]
}

export const BANDEIRAS = [
  "VISA",
  "MASTERCARD",
  "ELO",
  "AMEX",
  "HIPERCARD",
  "DINERS",
  "CABAL",
  "AGIPLAN",
  "BANESCARD",
  "CREDSYSTEM",
  "CREDZ",
  "SOROCRED",
  "SICREDI",
  "MAESTRO",
  "JCB",
  "CUP",
  "BANRICOMPRAS",
]

export const CONTAS_BANCARIAS = [
  "CARTAO DE CREDITO/INVESTIMENTO",
  "Banco do Brasil",
  "Itaú Unibanco",
  "Bradesco",
  "Caixa Econômica Federal",
  "Santander",
  "Nubank",
  "Inter",
]

export const FAVORECIDOS = [
  "Dr André Guanabara",
  "Dra Maria Silva",
  "Dr João Santos",
  "Dra Ana Costa",
]

export const GRUPOS_DISPONIVEIS = [
  "Cielo",
  "Cielo Online",
  "Rede",
  "Getnet",
  "Stone",
  "PagSeguro",
]

export const maquinetasMock: Maquineta[] = [
  {
    id: "1",
    nome: "Dr André Guanabara (Cielo) - Master/Visa",
    contaBancaria: "CARTAO DE CREDITO/INVESTIMENTO",
    primeiraParcela: "30",
    demaisParcelas: "30",
    debito: "1",
    antecipacaoAutomatica: true,
    tipo: "PJ",
    favorecido: "",
    grupo: "Cielo",
    imprimirRecibo: true,
    prazoDebito: "1",
    prazoPrimeiraParcela: "30",
    prazoDemaisParcelas: "30",
    qtdMaxParcelas: 12,
    taxaAntecipacao: "1.99",
    prazoAntecipacao: "1",
    anteciparAutomaticamente: true,
    bandeiras: ["VISA", "MASTERCARD"],
    taxas: {
      debito: "1.99",
      credito: [
        "3.49", "4.49", "5.49", "6.49", "7.49", "8.49",
        "9.49", "10.49", "11.49", "12.49", "13.49", "14.49",
        "15.49", "16.49", "17.49", "18.49", "19.49", "20.49",
        "21.49", "22.49", "23.49", "24.49", "25.49", "26.49",
      ],
      pix: "0.99",
    },
  },
  {
    id: "2",
    nome: "Dr André Guanabara (Cielo) - Elo",
    contaBancaria: "CARTAO DE CREDITO/INVESTIMENTO",
    primeiraParcela: "30",
    demaisParcelas: "30",
    debito: "1",
    antecipacaoAutomatica: false,
    tipo: "PJ",
    favorecido: "",
    grupo: "Cielo",
    imprimirRecibo: false,
    prazoDebito: "1",
    prazoPrimeiraParcela: "30",
    prazoDemaisParcelas: "30",
    qtdMaxParcelas: 12,
    taxaAntecipacao: "2.50",
    prazoAntecipacao: "2",
    anteciparAutomaticamente: false,
    bandeiras: ["ELO"],
    taxas: {
      debito: "2.50",
      credito: [
        "3.99", "4.99", "5.99", "6.99", "7.99", "8.99",
        "9.99", "10.99", "11.99", "12.99", "13.99", "14.99",
        "15.99", "16.99", "17.99", "18.99", "19.99", "20.99",
        "21.99", "22.99", "23.99", "24.99", "25.99", "26.99",
      ],
      pix: "1.50",
    },
  },
  {
    id: "3",
    nome: "Dr André Guanabara (Cielo) - Amex/Hiper",
    contaBancaria: "CARTAO DE CREDITO/INVESTIMENTO",
    primeiraParcela: "30",
    demaisParcelas: "30",
    debito: "1",
    antecipacaoAutomatica: true,
    tipo: "PJ",
    favorecido: "",
    grupo: "Cielo",
    imprimirRecibo: false,
    prazoDebito: "1",
    prazoPrimeiraParcela: "30",
    prazoDemaisParcelas: "30",
    qtdMaxParcelas: 12,
    taxaAntecipacao: "2.99",
    prazoAntecipacao: "1",
    anteciparAutomaticamente: true,
    bandeiras: ["AMEX", "HIPERCARD"],
    taxas: {
      debito: "3.50",
      credito: [
        "4.99", "5.99", "6.99", "7.99", "8.99", "9.99",
        "10.99", "11.99", "12.99", "13.99", "14.99", "15.99",
        "16.99", "17.99", "18.99", "19.99", "20.99", "21.99",
        "22.99", "23.99", "24.99", "25.99", "26.99", "27.99",
      ],
      pix: "1.99",
    },
  },
  {
    id: "4",
    nome: "Dr André Guanabara (Cielo Online) - Visa / Mastercard",
    contaBancaria: "CARTAO DE CREDITO/INVESTIMENTO",
    primeiraParcela: "30",
    demaisParcelas: "30",
    debito: "1",
    antecipacaoAutomatica: true,
    tipo: "PJ",
    favorecido: "",
    grupo: "Cielo Online",
    imprimirRecibo: false,
    prazoDebito: "1",
    prazoPrimeiraParcela: "30",
    prazoDemaisParcelas: "30",
    qtdMaxParcelas: 12,
    taxaAntecipacao: "1.99",
    prazoAntecipacao: "1",
    anteciparAutomaticamente: true,
    bandeiras: ["VISA", "MASTERCARD"],
    taxas: {
      debito: "1.99",
      credito: [
        "3.49", "4.49", "5.49", "6.49", "7.49", "8.49",
        "9.49", "10.49", "11.49", "12.49", "13.49", "14.49",
        "15.49", "16.49", "17.49", "18.49", "19.49", "20.49",
        "21.49", "22.49", "23.49", "24.49", "25.49", "26.49",
      ],
      pix: "0.99",
    },
  },
]

export const gruposMock: GrupoMaquineta[] = [
  {
    id: "1",
    nome: "Cielo",
    maquinetas: ["1", "2", "3"],
  },
  {
    id: "2",
    nome: "Cielo Online",
    maquinetas: ["4"],
  },
]
