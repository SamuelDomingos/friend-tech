import { AccessControlTabs } from "./_components/access-control-tabs"

export default function AccessControlPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Controle de Acessos</h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode gerenciar os módulos da sua clínica.
        </p>
      </div>

      <AccessControlTabs />
    </div>
  )
}
