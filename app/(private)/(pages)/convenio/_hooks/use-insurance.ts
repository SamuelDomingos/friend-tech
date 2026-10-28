"use client"

import { useMemo, useState } from "react"

import {
  glossesMock,
  guidesMock,
  insurancesMock,
  monthlySeriesMock,
  responsiblesMock,
} from "../_components/mock-data"

export type InsuranceTab = "billing" | "payments" | "glosses" | "analysis"
export type Period = "year" | "month" | "lastMonth" | "all"

export function useInsurance() {
  const [tab, setTab] = useState<InsuranceTab>("billing")
  const [period, setPeriod] = useState<Period>("year")

  const series = useMemo(() => {
    if (period === "all") {
      return monthlySeriesMock
    }

    if (period === "month") {
      return monthlySeriesMock.slice(-1)
    }

    if (period === "lastMonth") {
      return monthlySeriesMock.slice(-2, -1)
    }

    return monthlySeriesMock.slice(-12)
  }, [period])

  const totalSent = series.reduce((total, item) => total + item.amount, 0)
  const batches = series.reduce((total, item) => total + item.batches, 0)

  const pendingGuides = guidesMock.filter((guide) => guide.status !== "PAID")
  const pendingAmount = pendingGuides.reduce(
    (total, guide) => total + guide.amount,
    0
  )

  const insuranceTotals = {
    batchCount: insurancesMock.reduce(
      (total, item) => total + item.batchCount,
      0
    ),
    amount: insurancesMock.reduce((total, item) => total + item.amount, 0),
  }

  const responsibleTotals = {
    batchCount: responsiblesMock.reduce(
      (total, item) => total + item.batchCount,
      0
    ),
    amount: responsiblesMock.reduce((total, item) => total + item.amount, 0),
  }

  const classificationTotals = {
    procedures: 74200,
    matmeds: 18640,
  }

  const openGlosses = glossesMock.filter((item) => item.status === "OPEN")
  const glossAmount = glossesMock.reduce(
    (total, item) => total + item.amount,
    0
  )

  return {
    tab,
    setTab,
    period,
    setPeriod,
    series,
    totalSent,
    batches,
    pendingGuides,
    pendingAmount,
    insurances: insurancesMock,
    insuranceTotals,
    responsibles: responsiblesMock,
    responsibleTotals,
    classificationTotals,
    guides: guidesMock,
    glosses: glossesMock,
    openGlosses,
    glossAmount,
  }
}
