import { financeFlowConfig } from "@/app/(private)/(pages)/financeiro/_shared/_lib/finance"

import { CashBankView } from "./_components/cash-bank-view"

export default function CashBankPage() {
  const config = financeFlowConfig["cash-bank"]

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{config.title}</h1>
        <p className="max-w-2xl text-muted-foreground">{config.description}</p>
      </div>

      <CashBankView />
    </div>
  )
}
