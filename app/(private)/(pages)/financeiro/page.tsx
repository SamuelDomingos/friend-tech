import { FinanceView } from "./_components/finance-view"

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Dashboard financeiro</h1>

        <p className="max-w-2xl text-muted-foreground">
          Tenha uma visão clara do desempenho e dos valores a receber.
        </p>
      </div>

      <FinanceView />
    </div>
  )
}
