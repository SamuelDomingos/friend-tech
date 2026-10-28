"use client"

import { Controller } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useFinanceFiltersForm } from "../../_hooks/use-finance-filters-form"
import type { FinanceFiltersFormData } from "../../_schemas/finance-filters.schema"
import type { FinanceFlowMode } from "../../_lib/finance"
import {
  financeBankAccountsMock,
  financeCategoriesMock,
  financePaymentMethodsMock,
  financeProfessionalsMock,
  financeTagsMock,
} from "../finance-entry-details"

const TYPE_OPTIONS = [
  { value: "income", label: "Entrada" },
  { value: "expense", label: "Saída" },
]

interface FinanceAdvancedFiltersProps {
  mode: FinanceFlowMode
  initial: FinanceFiltersFormData
  onApply: (filters: FinanceFiltersFormData) => void
  onClose: () => void
}

export function FinanceAdvancedFilters({
  mode,
  initial,
  onApply,
  onClose,
}: FinanceAdvancedFiltersProps) {
  const { form, onSubmit, clear } = useFinanceFiltersForm({ initial, onApply })
  const cashBank = mode === "cash-bank"

  return (
    <Card className="gap-0 py-0">
      <CardContent className="p-4">
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {cashBank && (
              <Field>
                <FieldLabel>Tipo</FieldLabel>
                <Controller
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        {TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            )}

            {cashBank && (
              <Field>
                <FieldLabel>Conta</FieldLabel>
                <Controller
                  name="account"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        {financeBankAccountsMock.map((account) => (
                          <SelectItem key={account} value={account}>
                            {account}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            )}

            <Field>
              <FieldLabel>Profissional</FieldLabel>
              <Controller
                name="professional"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {financeProfessionalsMock.map((professional) => (
                        <SelectItem key={professional} value={professional}>
                          {professional}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel>Forma de pagamento</FieldLabel>
              <Controller
                name="payment"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Forma de Pagto." />
                    </SelectTrigger>
                    <SelectContent>
                      {financePaymentMethodsMock.map((payment) => (
                        <SelectItem key={payment} value={payment}>
                          {payment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel>Tag financeira</FieldLabel>
              <Controller
                name="tag"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tag Financeira" />
                    </SelectTrigger>
                    <SelectContent>
                      {financeTagsMock.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel>Categoria</FieldLabel>
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {financeCategoriesMock.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </FieldGroup>

          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={clear}>
              Limpar
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Fechar
            </Button>
            <Button type="submit" size="sm">
              Aplicar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
