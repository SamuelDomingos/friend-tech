import { financeFlowConfig } from "@/app/(private)/(pages)/financeiro/_shared/_lib/finance"

import { AccountsPayableView } from "./_components/accounts-payable-view"

export default function AccountsPayablePage() {
  const config = financeFlowConfig["to-pay"]

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{config.title}</h1>
        <p className="max-w-2xl text-muted-foreground">{config.description}</p>
      </div>

      <AccountsPayableView />
    </div>
  )
}
