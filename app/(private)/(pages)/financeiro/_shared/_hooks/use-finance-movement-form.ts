"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { FinanceEntry } from "../_components/finance-flow-mock"
import {
  createMovementSchema,
  type FinanceMovementFormData,
  type MovementKind,
} from "../_schemas/finance-movement.schema"

function today() {
  return new Date().toISOString().slice(0, 10)
}

function currentCompetence() {
  const now = new Date()
  return `${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`
}

function initialValues(kind: MovementKind): FinanceMovementFormData {
  return {
    party: "",
    amount: "",
    dueDate: today(),
    documentNumber: "",
    competence: kind === "expense" ? currentCompetence() : "",
    category: "",
    classification: "",
    unit: "",
    tag: "",
    costCenter: "",
    description: kind === "transfer" ? "Transferência entre contas" : "",
    receiptValue: "",
    receiptDate: today(),
    account: "SANTANDER - MEDCA",
    paymentMethod: "",
    machine: "",
    brand: "",
    installments: "",
    keepOpen: false,
    origin: "",
    destination: "",
  }
}

function parseAmount(value: string) {
  return Number(value.replace(/\./g, "").replace(",", "."))
}

interface UseFinanceMovementFormParams {
  kind: MovementKind
  onCreate: (entry: Omit<FinanceEntry, "id" | "status" | "hasNfse">) => void
  onDone: () => void
}

export function useFinanceMovementForm({
  kind,
  onCreate,
  onDone,
}: UseFinanceMovementFormParams) {
  const form = useForm<FinanceMovementFormData>({
    resolver: zodResolver(createMovementSchema(kind)),
    defaultValues: initialValues(kind),
  })

  const onSubmit = form.handleSubmit((values) => {
    const competence =
      values.competence || values.dueDate.slice(5, 7) + "/" + values.dueDate.slice(0, 4)

    if (kind === "transfer") {
      onCreate({
        type: "PAY",
        date: values.dueDate,
        documentNumber: "-",
        competence,
        party: `Origem: ${values.origin}`,
        paidTo: values.destination,
        description: values.description,
        amount: parseAmount(values.amount),
        conciliated: false,
      })
    } else {
      const description = values.description || values.category || "-"
      onCreate({
        type: kind === "income" ? "RECEIVE" : "PAY",
        date: values.dueDate,
        documentNumber: values.documentNumber || "-",
        competence,
        party: values.party,
        paidTo: values.party,
        description,
        amount: parseAmount(values.amount),
        conciliated: false,
      })
    }

    if (values.keepOpen) {
      form.reset(initialValues(kind))
      return
    }

    form.reset(initialValues(kind))
    onDone()
  })

  function cancel() {
    form.reset(initialValues(kind))
    onDone()
  }

  return { form, onSubmit, cancel }
}
