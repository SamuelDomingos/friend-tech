export type FinanceFlowMode = "to-pay" | "to-receive" | "cash-bank"

export interface FinanceColumn {
  key:
    | "date"
    | "documentNumber"
    | "competence"
    | "party"
    | "paidTo"
    | "description"
    | "observation"
    | "amount"
    | "nfse"
    | "settle"
    | "receipt"
    | "download"
    | "conciliated"
  label: string
  align?: "left" | "center" | "right"
  width?: string
}

export const financeFlowConfig: Record<
  FinanceFlowMode,
  { title: string; description: string; totalLabel: string }
> = {
  "to-pay": {
    title: "Contas a pagar",
    description: "Aqui você visualiza todas as despesas da sua clínica",
    totalLabel: "Total a pagar",
  },
  "to-receive": {
    title: "Contas a receber",
    description: "Aqui você visualizar todas as receitas da sua clínica",
    totalLabel: "Total a receber",
  },
  "cash-bank": {
    title: "Caixa / Banco",
    description: "Aqui você visualiza o extrato financeiro da sua clínica",
    totalLabel: "Saldo do período",
  },
}

export const financeColumns: Record<FinanceFlowMode, FinanceColumn[]> = {
  "to-pay": [
    { key: "date", label: "Data", width: "110px" },
    { key: "documentNumber", label: "Nº Doc.", align: "center", width: "90px" },
    { key: "competence", label: "Competência", align: "center", width: "110px" },
    { key: "party", label: "Pagar a" },
    { key: "description", label: "Descrição" },
    { key: "amount", label: "Valor R$", align: "right", width: "140px" },
    { key: "settle", label: "Baixa", align: "center", width: "90px" },
    { key: "download", label: "Download", align: "center", width: "90px" },
  ],
  "to-receive": [
    { key: "date", label: "Data", width: "110px" },
    { key: "competence", label: "Competência", align: "center", width: "110px" },
    { key: "party", label: "Receber de" },
    { key: "description", label: "Descrição" },
    { key: "observation", label: "Observação" },
    { key: "amount", label: "Valor R$", align: "right", width: "140px" },
    { key: "receipt", label: "Recibo", align: "center", width: "90px" },
    { key: "download", label: "Download", align: "center", width: "90px" },
  ],
  "cash-bank": [
    { key: "date", label: "Data", width: "110px" },
    { key: "competence", label: "Competência", align: "center", width: "110px" },
    { key: "paidTo", label: "Pago a / Recebido de" },
    { key: "description", label: "Descrição" },
    { key: "amount", label: "Valor R$", align: "right", width: "140px" },
    { key: "receipt", label: "Recibo", align: "center", width: "90px" },
    { key: "nfse", label: "NFSe", align: "center", width: "70px" },
    { key: "download", label: "Download", align: "center", width: "90px" },
  ],
}

function toIso(date: Date) {
  return date.toISOString().slice(0, 10)
}

export function monthRange() {
  const now = new Date()
  return {
    from: toIso(new Date(now.getFullYear(), now.getMonth(), 1)),
    to: toIso(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
  }
}

export function todayRange() {
  const today = toIso(new Date())
  return { from: today, to: today }
}

export function weekRange() {
  const now = new Date()
  const first = new Date(now)
  first.setDate(now.getDate() - now.getDay())
  const last = new Date(first)
  last.setDate(first.getDate() + 6)
  return { from: toIso(first), to: toIso(last) }
}

export function isWithinRange(date: string, from: string, to: string) {
  return date >= from && date <= to
}
