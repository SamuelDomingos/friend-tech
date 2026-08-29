import { InformacoesGeraisView } from "./_components"

export default function InformacoesGeraisPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Configuração Geral</h1>

        <p className="max-w-2xl text-muted-foreground">
          Configuração dos dados da sua clínica.
        </p>
      </div>

      <InformacoesGeraisView />
    </div>
  )
}
