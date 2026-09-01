import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import type { ModuleToggle } from "./mock-data"

interface ToggleGridProps {
  toggles: ModuleToggle[]
  enabled: Set<string>
  onToggle: (id: string, valor: boolean) => void
}

export function ToggleGrid({ toggles, enabled, onToggle }: ToggleGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {toggles.map((toggle) => (
        <div
          key={toggle.id}
          className="flex items-center justify-between gap-4 rounded-lg border p-3"
        >
          <Label htmlFor={`toggle-${toggle.id}`} className="text-sm font-normal">
            {toggle.label}
          </Label>
          <Switch
            id={`toggle-${toggle.id}`}
            checked={enabled.has(toggle.id)}
            onCheckedChange={(valor) => onToggle(toggle.id, valor === true)}
          />
        </div>
      ))}
    </div>
  )
}
