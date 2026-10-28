import { CashFlowView } from "./_components/cash-flow-view"

export default function CashFlowPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Fluxo de Caixa</h1>
        <p className="max-w-2xl text-muted-foreground">
          Aqui você visualiza o fluxo de caixa da sua clínica.
        </p>
      </div>

      <CashFlowView />
    </div>
  )
}
