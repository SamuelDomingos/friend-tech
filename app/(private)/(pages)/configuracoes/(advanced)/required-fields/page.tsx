import { RequiredFieldsForm } from "./_components/required-fields-form"

export default function RequiredFieldsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Campos obrigatórios</h1>

        <p className="max-w-2xl text-muted-foreground">
          Exigir resposta para os campos selecionados no agendamento ou
          cadastro de um paciente.
        </p>
      </div>

      <RequiredFieldsForm />
    </div>
  )
}
