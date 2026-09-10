import { PacientesView } from "./_components/pacientes-view"

export default function PacientesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Pacientes</h1>

        <p className="max-w-2xl text-muted-foreground">
          Busque, filtre e gerencie os pacientes da sua clínica.
        </p>
      </div>

      <PacientesView />
    </div>
  )
}
