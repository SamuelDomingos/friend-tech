"use client"

import { useState } from "react"

import { shiftMonth } from "../_lib/period"

export type AnalysisSubTab = "SYNTHETIC" | "ANALYTIC"

export interface AnalysisFilters {
  insurances: string[]
  billingTypes: string[]
  units: string[]
  startMonth: string
  endMonth: string
  paidUntil: string
  referenceMonth: string
}

const initialFilters: AnalysisFilters = {
  insurances: [],
  billingTypes: [],
  units: [],
  startMonth: "2026-10",
  endMonth: "2026-10",
  paidUntil: "",
  referenceMonth: "2026-10",
}

export function useAnalysisFilters() {
  const [subTab, setSubTab] = useState<AnalysisSubTab>("SYNTHETIC")
  const [filters, setFilters] = useState<AnalysisFilters>(initialFilters)

  function updateFilters(partial: Partial<AnalysisFilters>) {
    setFilters((current) => ({ ...current, ...partial }))
  }

  function moveMonth(delta: number) {
    setFilters((current) => ({
      ...current,
      referenceMonth: shiftMonth(current.referenceMonth, delta),
    }))
  }

  return { subTab, setSubTab, filters, updateFilters, moveMonth }
}
