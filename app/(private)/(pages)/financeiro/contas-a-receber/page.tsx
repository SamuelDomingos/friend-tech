import { financeFlowConfig } from "@/app/(private)/(pages)/financeiro/_shared/_lib/finance"

import { AccountsReceivableView } from "./_components/accounts-receivable-view"

export default function AccountsReceivablePage() {
  const config = financeFlowConfig["to-receive"]

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{config.title}</h1>
        <p className="max-w-2xl text-muted-foreground">{config.description}</p>
      </div>

      <AccountsReceivableView />
    </div>
  )
}
