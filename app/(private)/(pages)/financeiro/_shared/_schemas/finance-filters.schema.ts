import z from "zod"

export const financeFiltersSchema = z.object({
  type: z.string(),
  account: z.string(),
  professional: z.string(),
  payment: z.string(),
  tag: z.string(),
  category: z.string(),
})

export type FinanceFiltersFormData = z.infer<typeof financeFiltersSchema>

export const FINANCE_FILTERS_INITIAL: FinanceFiltersFormData = {
  type: "",
  account: "",
  professional: "",
  payment: "",
  tag: "",
  category: "",
}
