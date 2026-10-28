"use client"

import { useMemo } from "react"

import {
  glossBalanceMock,
  glossByClassificationMock,
  glossByInsuranceMock,
  glossByResponsibleMock,
  glossSummaryMock,
} from "../_components/mock-data"

export function useGlosses() {
  const balance = useMemo(() => {
    const total = glossBalanceMock.reduce(
      (sum, item) => sum + item.amount,
      0
    )

    return {
      items: glossBalanceMock,
      total,
      resubmitted: 12400,
    }
  }, [])

  const byInsurance = useMemo(() => {
    const totalBilled = glossByInsuranceMock.reduce(
      (sum, item) => sum + item.billed,
      0
    )
    const totalGlossed = glossByInsuranceMock.reduce(
      (sum, item) => sum + item.glossed,
      0
    )

    return {
      items: glossByInsuranceMock,
      totalBilled,
      totalGlossed,
    }
  }, [])

  const classificationTotal = glossByClassificationMock.reduce(
    (total, group) => total + group.total,
    0
  )

  function percentage(part: number, total: number) {
    if (total <= 0) {
      return "0,0%"
    }

    return `${((part / total) * 100).toFixed(1).replace(".", ",")}%`
  }

  return {
    summary: glossSummaryMock,
    balance,
    byResponsible: glossByResponsibleMock,
    byInsurance,
    byClassification: glossByClassificationMock,
    classificationTotal,
    percentage,
  }
}
