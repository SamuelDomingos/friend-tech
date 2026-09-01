import { ActionLogPanel } from "./_components/action-log-panel"
import { SpecialActionForm } from "./_components/special-action-form"

export default function SpecialActionsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Ações Especiais</h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode realizar ações especiais nos registros da sua
          clínica.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SpecialActionForm />
        <ActionLogPanel />
      </div>
    </div>
  )
}
