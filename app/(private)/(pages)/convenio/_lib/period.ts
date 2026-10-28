export const SHORT_MONTHS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
]

export const WINDOW_MONTHS = 3

export const SERIES_FIRST_MONTH = { year: 2025, month: 11 }

export function shiftMonth(month: string, delta: number) {
  const [year, number] = month.split("-").map(Number)
  const date = new Date(year, number - 1 + delta, 1)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

export function shortMonthLabel(month: string) {
  const [year, number] = month.split("-").map(Number)
  return `${SHORT_MONTHS[number - 1]}/${String(year).slice(2)}`
}

export function seriesIndex(month: string) {
  const [year, number] = month.split("-").map(Number)
  const index =
    year * 12 + number - (SERIES_FIRST_MONTH.year * 12 + SERIES_FIRST_MONTH.month)

  return Math.min(Math.max(index, 0), 11)
}

export function windowMonths(referenceMonth: string) {
  return Array.from({ length: WINDOW_MONTHS }, (_, position) =>
    shiftMonth(referenceMonth, position - (WINDOW_MONTHS - 1))
  )
}
