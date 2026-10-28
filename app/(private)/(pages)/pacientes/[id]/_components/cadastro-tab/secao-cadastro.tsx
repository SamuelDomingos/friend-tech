import { cn } from "@/lib/utils"

interface SecaoCadastroProps {
  titulo: string
  descricao?: string
  children: React.ReactNode
}

export function SecaoCadastro({
  titulo,
  descricao,
  children,
}: SecaoCadastroProps) {
  return (
    <section className="rounded-lg border bg-card">
      <header className="space-y-1 border-b px-4 py-3">
        <h3 className="text-sm font-semibold">{titulo}</h3>
        {descricao && (
          <p className="text-xs text-muted-foreground">{descricao}</p>
        )}
      </header>

      <div className="grid gap-4 p-4 sm:grid-cols-2">{children}</div>
    </section>
  )
}

interface CampoProps {
  rotulo: string
  erro?: string
  className?: string
  children: React.ReactNode
}

export function Campo({ rotulo, erro, className, children }: CampoProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-xs font-medium text-muted-foreground">
        {rotulo}
      </label>
      {children}
      {erro && <p className="text-xs text-destructive">{erro}</p>}
    </div>
  )
}
