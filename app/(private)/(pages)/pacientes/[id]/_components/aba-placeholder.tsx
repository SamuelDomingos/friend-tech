import { Construction } from "lucide-react"

interface AbaPlaceholderProps {
  titulo: string
  descricao: string
}

export function AbaPlaceholder({ titulo, descricao }: AbaPlaceholderProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border bg-card p-8 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted">
        <Construction className="size-5 text-muted-foreground" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-medium">{titulo}</p>
        <p className="text-sm text-muted-foreground">{descricao}</p>
      </div>
    </div>
  )
}
