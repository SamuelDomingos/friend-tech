import { LaudoView } from "./_components/laudo-view"

export default function LaudoPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Gerenciamento de Laudo</h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode gerenciar todos os laudos gerados através da
          integração.
        </p>
      </div>

      <LaudoView />
    </div>
  )
}
