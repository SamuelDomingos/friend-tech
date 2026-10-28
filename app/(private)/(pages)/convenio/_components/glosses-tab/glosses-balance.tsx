"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"

import type { GlossBalance } from "../mock-data"

interface GlossesBalanceProps {
  items: GlossBalance[]
  total: number
  resubmitted: number
  percentage: (part: number, total: number) => string
}

export function GlossesBalance({
  items,
  total,
  resubmitted,
  percentage,
}: GlossesBalanceProps) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-sm font-semibold">
          Balanço geral de glosas
        </CardTitle>
        <Separator />
      </CardHeader>

      <CardContent className="space-y-4 px-4 py-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{item.label}</span>
              <span className="whitespace-nowrap">
                {formatCurrency(item.amount)}
                <span className="ml-1 text-[11px] text-muted-foreground">
                  ({percentage(item.amount, total)})
                </span>
              </span>
            </div>

            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{
                  width: `${total > 0 ? (item.amount / total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))}

        <div className="pt-2 text-right">
          <p className="text-sm font-medium">{formatCurrency(resubmitted)}</p>
          <p className="text-[11px] text-muted-foreground">
            Valor Reapresentado
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
