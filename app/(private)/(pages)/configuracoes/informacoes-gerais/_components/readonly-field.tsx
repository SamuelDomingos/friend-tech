import { cn } from "@/lib/utils"

interface ReadonlyFieldProps {
  label: string
  value: string
  className?: string
}

export function ReadonlyField({ label, value, className }: ReadonlyFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  )
}
