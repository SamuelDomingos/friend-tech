"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  FINANCE_FILTERS_INITIAL,
  financeFiltersSchema,
  type FinanceFiltersFormData,
} from "../_schemas/finance-filters.schema"

interface UseFinanceFiltersFormArgs {
  initial: FinanceFiltersFormData
  onApply: (filters: FinanceFiltersFormData) => void
}

export function useFinanceFiltersForm({
  initial,
  onApply,
}: UseFinanceFiltersFormArgs) {
  const form = useForm<FinanceFiltersFormData>({
    resolver: zodResolver(financeFiltersSchema),
    defaultValues: initial,
  })

  function onSubmit(filters: FinanceFiltersFormData) {
    onApply(filters)
  }

  function clear() {
    const empty = { ...FINANCE_FILTERS_INITIAL }
    form.reset(empty)
    onApply(empty)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    clear,
  }
}
