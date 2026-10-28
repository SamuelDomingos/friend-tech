import z from "zod"

export type MovementKind = "income" | "expense" | "transfer"

function isValidAmount(value: string) {
  const amount = Number(value.replace(/\./g, "").replace(",", "."))
  return Number.isFinite(amount) && amount > 0
}

const baseFields = {
  party: z.string(),
  amount: z.string(),
  dueDate: z.string(),
  documentNumber: z.string(),
  competence: z.string(),
  category: z.string(),
  classification: z.string(),
  unit: z.string(),
  tag: z.string(),
  costCenter: z.string(),
  description: z.string(),
  receiptValue: z.string(),
  receiptDate: z.string(),
  account: z.string(),
  paymentMethod: z.string(),
  machine: z.string(),
  brand: z.string(),
  installments: z.string(),
  keepOpen: z.boolean(),
  origin: z.string(),
  destination: z.string(),
}

export interface FinanceMovementFormData {
  party: string
  amount: string
  dueDate: string
  documentNumber: string
  competence: string
  category: string
  classification: string
  unit: string
  tag: string
  costCenter: string
  description: string
  receiptValue: string
  receiptDate: string
  account: string
  paymentMethod: string
  machine: string
  brand: string
  installments: string
  keepOpen: boolean
  origin: string
  destination: string
}

export function createMovementSchema(kind: MovementKind) {
  return z.object(baseFields).superRefine((values, ctx) => {
    if (!isValidAmount(values.amount)) {
      ctx.addIssue({
        code: "custom",
        path: ["amount"],
        message: "Informe um valor válido",
      })
    }

    if (kind === "transfer") {
      if (!values.origin) {
        ctx.addIssue({
          code: "custom",
          path: ["origin"],
          message: "Selecione a origem",
        })
      }
      if (!values.destination) {
        ctx.addIssue({
          code: "custom",
          path: ["destination"],
          message: "Selecione o destino",
        })
      }
      if (!values.dueDate) {
        ctx.addIssue({
          code: "custom",
          path: ["dueDate"],
          message: "Informe a data",
        })
      }
      return
    }

    if (!values.party) {
      ctx.addIssue({
        code: "custom",
        path: ["party"],
        message:
          kind === "income" ? "Informe quem recebeu" : "Informe quem pagou",
      })
    }
    if (!values.dueDate) {
      ctx.addIssue({
        code: "custom",
        path: ["dueDate"],
        message: "Informe o vencimento",
      })
    }
  })
}
