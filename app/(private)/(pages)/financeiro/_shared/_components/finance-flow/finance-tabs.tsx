"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { FinanceTab } from "../../_hooks/use-finance-flow"

interface FinanceTabsProps {
  tab: FinanceTab
  onTab: (tab: FinanceTab) => void
  counts: { pending: number; approved: number }
}

export function FinanceTabs({ tab, onTab, counts }: FinanceTabsProps) {
  return (
    <Tabs value={tab} onValueChange={(value) => onTab(value as FinanceTab)}>
      <TabsList variant="line">
        <TabsTrigger value="pending" className="gap-2">
          Contas a pagar
          <span className="rounded-full bg-muted px-1.5 text-[11px] text-muted-foreground">
            {counts.pending}
          </span>
        </TabsTrigger>
        <TabsTrigger value="approved" className="gap-2">
          Contas aprovadas
          <span className="rounded-full bg-muted px-1.5 text-[11px] text-muted-foreground">
            {counts.approved}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
