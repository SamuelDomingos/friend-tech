import { InsuranceView } from "./_components/insurance-view"

export default function InsurancePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Convênio</h1>

        <p className="max-w-2xl text-muted-foreground">
          Acompanhe o faturamento, as baixas, as glosas e a análise geral dos
          convênios.
        </p>
      </div>

      <InsuranceView />
    </div>
  )
}
