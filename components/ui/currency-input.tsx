"use client"

import { Input } from "@/components/ui/input"

interface CurrencyInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value: string
  onChange: (value: string) => void
}

function formatCurrencyValue(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 12)

  if (!digits) {
    return ""
  }

  return (Number(digits) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function CurrencyInput({
  value,
  onChange,
  ...props
}: CurrencyInputProps) {
  return (
    <Input
      inputMode="decimal"
      placeholder="R$ 0,00"
      {...props}
      value={formatCurrencyValue(value)}
      onChange={(event) => onChange(formatCurrencyValue(event.target.value))}
    />
  )
}
