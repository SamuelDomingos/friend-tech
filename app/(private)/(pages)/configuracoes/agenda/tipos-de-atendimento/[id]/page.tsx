import { TipoAtendimentoForm } from "../../_components/tipo-atendimento/form"

export default async function EditarTipoAtendimentoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Editar tipo de atendimento</h1>

        <p className="text-sm text-muted-foreground">
          Edite o tipo de atendimento #{id}.
        </p>
      </div>

      <TipoAtendimentoForm />
    </div>
  )
}
