"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { formatCurrency } from "@/lib/utils"

import {
  seriesIndex,
  windowMonths,
  shortMonthLabel,
} from "../../_lib/period"
import { cashFlowAccountsMock } from "../mock-data"

const GRID =
  "grid grid-cols-[minmax(180px,220px)_repeat(3,minmax(0,1fr))_120px] items-center gap-2"

interface SyntheticTableProps {
  referenceMonth: string
}

export function SyntheticTable({ referenceMonth }: SyntheticTableProps) {
  const months = windowMonths(referenceMonth)

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div
        className={`${GRID} border-b bg-muted/40 px-4 py-2 text-xs font-medium`}
      >
        <span />
        {months.map((month) => (
          <span key={month} className="text-right">
            {shortMonthLabel(month)}
          </span>
        ))}
        <span className="text-right">Total</span>
      </div>

      <Accordion
        type="multiple"
        defaultValue={cashFlowAccountsMock.map((account) => account.title)}
      >
        {cashFlowAccountsMock.map((account) => {
          const accountTotals = months.map((month) =>
            account.categories.reduce(
              (total, category) =>
                total + category.values[seriesIndex(month)],
              0
            )
          )
          const accountTotal = accountTotals.reduce(
            (total, value) => total + value,
            0
          )

          return (
            <AccordionItem key={account.title} value={account.title}>
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className={`${GRID} w-full text-sm`}>
                  <span className="text-left font-medium">{account.title}</span>
                  {accountTotals.map((value, index) => (
                    <span
                      key={`${account.title}-${months[index]}`}
                      className="text-right font-medium"
                    >
                      {formatCurrency(value)}
                    </span>
                  ))}
                  <span className="text-right font-medium">
                    {formatCurrency(accountTotal)}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-3">
                <div className="space-y-1">
                  {account.categories.map((category) => {
                    const values = months.map(
                      (month) => category.values[seriesIndex(month)]
                    )
                    const categoryTotal = values.reduce(
                      (total, value) => total + value,
                      0
                    )

                    return (
                      <div
                        key={category.title}
                        className={`${GRID} rounded-md px-2 py-1 text-sm hover:bg-accent/40`}
                      >
                        <span className="pl-4 text-left">
                          {category.title}
                        </span>
                        {values.map((value, index) => (
                          <span
                            key={`${category.title}-${months[index]}`}
                            className="text-right"
                          >
                            {formatCurrency(value)}
                          </span>
                        ))}
                        <span className="text-right">
                          {formatCurrency(categoryTotal)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
