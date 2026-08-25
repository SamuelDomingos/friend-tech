import { TipoAtendimentoForm } from "../../_components/tipo-atendimento/form"

export default function NovoTipoAtendimentoPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Novo tipo de atendimento</h1>

        <p className="text-sm text-muted-foreground">
          Cadastre um novo tipo de atendimento da clínica.
        </p>
      </div>

      <TipoAtendimentoForm />
    </div>
  )
}
