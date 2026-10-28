export interface FinanceEntryDetail {
  professional: string
  paymentMethod: string
  bankAccount: string
  tag: string
  category: string
}

export const financeEntryDetailsMock: Record<string, FinanceEntryDetail> = {
  f1: {
    professional: "Dra. Thaís Alves",
    paymentMethod: "Boleto",
    bankAccount: "Banco do Brasil",
    tag: "Despesas fixas",
    category: "Despesas",
  },
  f2: {
    professional: "Dr. Alan Robson de Oliveira",
    paymentMethod: "Débito em conta",
    bankAccount: "Banco do Brasil",
    tag: "Despesas fixas",
    category: "Despesas",
  },
  f3: {
    professional: "Dra. Luciana Eloio Quintino da Silva",
    paymentMethod: "TED",
    bankAccount: "Itaú",
    tag: "Marketing",
    category: "Despesas",
  },
  f4: {
    professional: "Dr. Aaron Guilherme Oliveira Sampaio",
    paymentMethod: "Pix",
    bankAccount: "Itaú",
    tag: "Marketing",
    category: "Despesas",
  },
  f5: {
    professional: "Dra. Thaís Alves",
    paymentMethod: "Convênio",
    bankAccount: "Caixa",
    tag: "Receitas",
    category: "Receitas",
  },
  f6: {
    professional: "Dr. Alan Robson de Oliveira",
    paymentMethod: "Pix",
    bankAccount: "Caixa",
    tag: "Receitas",
    category: "Receitas",
  },
  f7: {
    professional: "Dra. Luciana Eloio Quintino da Silva",
    paymentMethod: "Cartão",
    bankAccount: "Itaú",
    tag: "Receitas",
    category: "Receitas",
  },
  f8: {
    professional: "Dr. Aaron Guilherme Oliveira Sampaio",
    paymentMethod: "Dinheiro",
    bankAccount: "Caixa",
    tag: "Receitas",
    category: "Receitas",
  },
  f9: {
    professional: "Dr. Alan Robson de Oliveira",
    paymentMethod: "Transferência",
    bankAccount: "Banco do Brasil",
    tag: "Impostos",
    category: "Despesas",
  },
  f10: {
    professional: "Dra. Thaís Alves",
    paymentMethod: "Crédito em conta",
    bankAccount: "Itaú",
    tag: "Receitas",
    category: "Receitas",
  },
}

export const financeProfessionalsMock = [
  "Dr. Aaron Guilherme Oliveira Sampaio",
  "Dra. Thaís Alves",
  "Dra. Luciana Eloio Quintino da Silva",
  "Dr. Alan Robson de Oliveira",
]

export const financeBankAccountsMock = ["Banco do Brasil", "Itaú", "Caixa"]

export const financePaymentMethodsMock = [
  "Cheque",
  "Cartão",
  "Dinheiro",
  "Pix",
  "TED",
  "Transferência",
  "Convênio",
  "Crédito em conta",
  "Débito em conta",
  "Boleto",
  "Nota Promissória",
]

export const financeTagsMock = [
  "Despesas fixas",
  "Marketing",
  "Impostos",
  "Receitas",
]

export const financeCategoriesMock = ["Despesas", "Receitas", "Transferências"]

export const financeIncomeCategoriesMock = [
  "RECEITA BRUTA",
  "RECEITA FINANCEIRA",
  "OUTRAS RECEITAS",
  "RECEITA NAO OPERACIONAL",
  "RESGATE DE INVESTIMENTOS",
  "EMPRÉSTIMOS RECEBIDOS",
]

export const financeExpenseCategoriesMock = [
  "DESPESAS GERAIS",
  "DESPESAS ADMINISTRATIVAS",
  "DESPESAS COM PESSOAL",
  "DESPESAS FINANCEIRAS",
  "DESPESAS TRIBUTÁRIAS",
  "TARIFAS BANCARIAS",
  "MATERIAIS E MEDICAMENTOS",
  "MARKETING",
  "MANUTENÇÃO E LIMPEZA",
]

export const financeUnitsMock = [
  "BELONG",
  "CATARINA",
  "CONVÊNIO",
  "EXAMES",
  "FARMÁCIA",
  "INFINITY MEDICOS",
  "Infinity Fortaleza",
  "PRO LABORE",
  "Recorrentes",
  "UNNICA",
]

export const financeAccountsMock = [
  "Caixa",
  "SANTANDER - INFINITY MEDCA",
  "SANTANDER - MEDCA",
  "Itaú",
  "Bradesco",
  "Nubank Farmácia",
  "INFINITY WAY TECH",
]

export const financeCostCenterModelsMock = ["Padrão", "Por unidade"]
export const financeCostCentersMock = [
  "Administrativo",
  "Comercial",
  "Operacional",
  "Marketing",
]

export const financeIncomePaymentsMock = [
  "Cartão",
  "Cheque",
  "Boleto",
  "Dinheiro",
  "Pix",
  "TED",
  "Crédito em conta",
]

export const financeExpensePaymentsMock = [
  "Cheque",
  "Boleto",
  "Dinheiro",
  "Pix",
  "TED",
  "Transferência",
  "Débito em conta",
]

export const financeCardMachinesMock = [
  "Dr André Guanabara (Cielo) - Amex/Hiper",
  "Dr André Guanabara (Cielo / Conversor) - Master/Visa",
  "Dr André Guanabara (Cielo) - Elo",
  "Dr André Guanabara (Cielo) - Master/Visa",
  "Dr André Guanabara (Cielo Online) - Visa / Mastercard",
  "Medicos Parceiros (Cielo)",
  "Medicos Parceiros (Cielo) - Master/Visa",
]

export const financeCardBrandsMock = [
  "Visa",
  "Mastercard",
  "Elo",
  "Amex",
  "Hipercard",
  "Diners",
  "Banescard",
]

export const financeInstallmentsMock = [
  "À vista",
  "2x",
  "3x",
  "4x",
  "5x",
  "6x",
  "7x",
  "8x",
  "9x",
  "10x",
  "11x",
  "12x",
]

export const financeClassificationsMock: Record<string, string[]> = {
  "DESPESAS GERAIS": [
    "4.1.01 - Despesas administrativas",
    "4.1.02 - Despesas operacionais",
  ],
  "DESPESAS ADMINISTRATIVAS": [
    "4.2.01 - Materiais de escritório",
    "4.2.02 - Serviços de terceiros",
  ],
  "DESPESAS COM PESSOAL": [
    "4.3.01 - Salários",
    "4.3.02 - Encargos sociais",
  ],
  "TARIFAS BANCARIAS": ["4.4.01 - Tarifas e taxas"],
  MARKETING: ["4.5.01 - Publicidade", "4.5.02 - Eventos"],
  "RECEITA BRUTA": ["3.1.01 - Consultas", "3.1.02 - Procedimentos"],
  "RECEITA FINANCEIRA": ["3.2.01 - Rendimentos"],
  "OUTRAS RECEITAS": ["3.3.01 - Receitas diversas"],
}
