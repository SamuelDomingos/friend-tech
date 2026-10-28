"use client"

import { FinanceFlow } from "@/app/(private)/(pages)/financeiro/_shared/_components/finance-flow"

export function AccountsPayableView() {
  return <FinanceFlow mode="to-pay" />
}
