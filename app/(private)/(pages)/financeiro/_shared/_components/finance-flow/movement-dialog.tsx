"use client"

import { Controller } from "react-hook-form"
import { FileText, Paperclip, X } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CurrencyInput } from "@/components/ui/currency-input"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { MonthPicker } from "@/components/ui/month-picker"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { FinanceEntry } from "../finance-flow-mock"
import { useAttachmentFile } from "../../_hooks/use-attachment-file"
import { useFinanceMovementForm } from "../../_hooks/use-finance-movement-form"
import type { MovementKind } from "../../_schemas/finance-movement.schema"
import {
  financeAccountsMock,
  financeCardBrandsMock,
  financeCardMachinesMock,
  financeClassificationsMock,
  financeCostCenterModelsMock,
  financeCostCentersMock,
  financeExpenseCategoriesMock,
  financeExpensePaymentsMock,
  financeIncomeCategoriesMock,
  financeIncomePaymentsMock,
  financeInstallmentsMock,
  financeTagsMock,
  financeUnitsMock,
} from "../finance-entry-details"

const TITLES: Record<MovementKind, string> = {
  income: "Entrada de caixa",
  expense: "Saída de caixa",
  transfer: "Transferência entre contas",
}

function toDate(iso: string) {
  return iso ? new Date(`${iso}T00:00:00`) : undefined
}

function toIsoDate(date?: Date) {
  if (!date) {
    return ""
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function competenceToPicker(value: string) {
  return value ? `${value.slice(3)}-${value.slice(0, 2)}` : ""
}

function pickerToCompetence(value: string) {
  return value ? `${value.slice(5, 7)}/${value.slice(0, 4)}` : ""
}

interface MovementDialogProps {
  kind: MovementKind
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (entry: Omit<FinanceEntry, "id" | "status" | "hasNfse">) => void
}

interface SelectFieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  options: string[]
  disabled?: boolean
}

function SelectField({
  label,
  placeholder,
  value,
  onChange,
  options,
  disabled,
}: SelectFieldProps) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}

export function MovementDialog({
  kind,
  open,
  onOpenChange,
  onCreate,
}: MovementDialogProps) {
  const { file, fileSize, inputRef, select, clear } = useAttachmentFile()
  const { form, onSubmit, cancel } = useFinanceMovementForm({
    kind,
    onCreate,
    onDone: () => onOpenChange(false),
  })

  function handleCancel() {
    clear()
    cancel()
  }

  const errors = form.formState.errors
  const category = form.watch("category")
  const paymentMethod = form.watch("paymentMethod")
  const income = kind === "income"
  const transfer = kind === "transfer"
  const categories = income
    ? financeIncomeCategoriesMock
    : financeExpenseCategoriesMock
  const payments = income
    ? financeIncomePaymentsMock
    : financeExpensePaymentsMock

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          clear()
          cancel()
        }
        onOpenChange(value)
      }}
    >
      <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>{TITLES[kind]}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col gap-4">
          <ScrollArea className="min-h-0 flex-1 pr-3">
            <div className="space-y-4">
              {transfer ? (
                <>
                  <Field data-invalid={!!errors.description}>
                    <FieldLabel htmlFor="movement-description">
                      Descrição
                    </FieldLabel>
                    <Input
                      id="movement-description"
                      {...form.register("description")}
                    />
                    <FieldError errors={[errors.description]} />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Controller
                      name="dueDate"
                      control={form.control}
                      render={({ field }) => (
                        <Field data-invalid={!!errors.dueDate}>
                          <FieldLabel>Data</FieldLabel>
                          <DatePicker
                            value={toDate(field.value)}
                            onChange={(date) => field.onChange(toIsoDate(date))}
                            placeholder="00/00/0000"
                          />
                          <FieldError errors={[errors.dueDate]} />
                        </Field>
                      )}
                    />

                    <Controller
                      name="amount"
                      control={form.control}
                      render={({ field }) => (
                        <Field data-invalid={!!errors.amount}>
                          <FieldLabel htmlFor="movement-amount">
                            Valor
                          </FieldLabel>
                          <CurrencyInput
                            id="movement-amount"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <FieldError errors={[errors.amount]} />
                        </Field>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Controller
                      name="origin"
                      control={form.control}
                      render={({ field }) => (
                        <SelectField
                          label="Origem"
                          placeholder="Selecione"
                          value={field.value}
                          onChange={field.onChange}
                          options={financeAccountsMock}
                        />
                      )}
                    />
                    <Controller
                      name="destination"
                      control={form.control}
                      render={({ field }) => (
                        <SelectField
                          label="Destino"
                          placeholder="Selecione"
                          value={field.value}
                          onChange={field.onChange}
                          options={financeAccountsMock}
                        />
                      )}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Field data-invalid={!!errors.party}>
                    <FieldLabel htmlFor="movement-party">
                      {income ? "Recebido de" : "Pago a"}
                    </FieldLabel>
                    <Input id="movement-party" {...form.register("party")} />
                    <FieldError errors={[errors.party]} />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Controller
                      name="amount"
                      control={form.control}
                      render={({ field }) => (
                        <Field data-invalid={!!errors.amount}>
                          <FieldLabel htmlFor="movement-amount">
                            Valor
                          </FieldLabel>
                          <CurrencyInput
                            id="movement-amount"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <FieldError errors={[errors.amount]} />
                        </Field>
                      )}
                    />

                    <Controller
                      name="dueDate"
                      control={form.control}
                      render={({ field }) => (
                        <Field data-invalid={!!errors.dueDate}>
                          <FieldLabel>Vencimento</FieldLabel>
                          <DatePicker
                            value={toDate(field.value)}
                            onChange={(date) => field.onChange(toIsoDate(date))}
                            placeholder="00/00/0000"
                          />
                          <FieldError errors={[errors.dueDate]} />
                        </Field>
                      )}
                    />

                    <Field>
                      <FieldLabel htmlFor="movement-document">
                        Número do documento
                      </FieldLabel>
                      <Input
                        id="movement-document"
                        {...form.register("documentNumber")}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Controller
                      name="competence"
                      control={form.control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Competência</FieldLabel>
                          <MonthPicker
                            value={competenceToPicker(field.value)}
                            onChange={(value) =>
                              field.onChange(pickerToCompetence(value))
                            }
                            placeholder="mm/aaaa"
                          />
                        </Field>
                      )}
                    />

                    <Controller
                      name="category"
                      control={form.control}
                      render={({ field }) => (
                        <SelectField
                          label="Categoria"
                          placeholder="Selecione"
                          value={field.value}
                          onChange={field.onChange}
                          options={categories}
                        />
                      )}
                    />

                    <Controller
                      name="classification"
                      control={form.control}
                      render={({ field }) => (
                        <SelectField
                          label="Classificação no Plano de Contas"
                          placeholder="Selecione"
                          value={field.value}
                          onChange={field.onChange}
                          options={financeClassificationsMock[category] ?? []}
                          disabled={!category}
                        />
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Controller
                      name="unit"
                      control={form.control}
                      render={({ field }) => (
                        <SelectField
                          label="Unidade"
                          placeholder="Selecione"
                          value={field.value}
                          onChange={field.onChange}
                          options={financeUnitsMock}
                        />
                      )}
                    />
                    <Controller
                      name="tag"
                      control={form.control}
                      render={({ field }) => (
                        <SelectField
                          label="TAG/Marcador"
                          placeholder="Selecione"
                          value={field.value}
                          onChange={field.onChange}
                          options={financeTagsMock}
                        />
                      )}
                    />
                    <Controller
                      name="costCenter"
                      control={form.control}
                      render={({ field }) => (
                        <SelectField
                          label="Modelo de Centro de custo"
                          placeholder="Selecione"
                          value={field.value}
                          onChange={field.onChange}
                          options={financeCostCenterModelsMock}
                        />
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField
                      label="Centro de custo"
                      placeholder="Selecione"
                      value=""
                      onChange={() => undefined}
                      options={financeCostCentersMock}
                    />
                    <Field>
                      <FieldLabel htmlFor="movement-description">
                        Descrição
                      </FieldLabel>
                      <Input
                        id="movement-description"
                        {...form.register("description")}
                      />
                    </Field>
                  </div>

                  {!income && (
                    <Field>
                      <FieldLabel htmlFor="movement-boleto">
                        Código do Boleto
                      </FieldLabel>
                      <Input
                        id="movement-boleto"
                        {...form.register("classification")}
                      />
                    </Field>
                  )}

                  <Field>
                    <FieldLabel>
                      {income
                        ? "Anexe aqui o arquivo"
                        : "Anexe aqui o boleto deste pagamento"}
                    </FieldLabel>
                    <Attachment state={file ? "done" : "idle"} className="w-full">
                      <AttachmentMedia>
                        {file ? <FileText /> : <Paperclip />}
                      </AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>
                          {file ? file.name : "Selecionar arquivo"}
                        </AttachmentTitle>
                        <AttachmentDescription>
                          {file
                            ? fileSize
                            : "PDF, PNG ou JPG até 5 MB"}
                        </AttachmentDescription>
                      </AttachmentContent>
                      {file ? (
                        <AttachmentActions>
                          <AttachmentAction
                            type="button"
                            aria-label="Remover arquivo"
                            onClick={clear}
                          >
                            <X />
                          </AttachmentAction>
                        </AttachmentActions>
                      ) : (
                        <AttachmentTrigger asChild>
                          <label>
                            <input
                              ref={inputRef}
                              type="file"
                              className="sr-only"
                              onChange={select}
                            />
                          </label>
                        </AttachmentTrigger>
                      )}
                    </Attachment>
                  </Field>

                  <Separator />

                  <div className="space-y-4">
                    <p className="text-sm font-medium">Dados da baixa</p>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <Controller
                        name="receiptValue"
                        control={form.control}
                        render={({ field }) => (
                          <Field>
                            <FieldLabel htmlFor="movement-receipt-value">
                              {income ? "Valor recebido" : "Valor pago"}
                            </FieldLabel>
                            <CurrencyInput
                              id="movement-receipt-value"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="receiptDate"
                        control={form.control}
                        render={({ field }) => (
                          <Field>
                            <FieldLabel>
                              {income ? "Recebido em" : "Pago em"}
                            </FieldLabel>
                            <DatePicker
                              value={toDate(field.value)}
                              disabled
                              placeholder="00/00/0000"
                            />
                          </Field>
                        )}
                      />

                      <Controller
                        name="account"
                        control={form.control}
                        render={({ field }) => (
                          <SelectField
                            label={income ? "Recebido via" : "Pago via"}
                            placeholder="Selecione"
                            value={field.value}
                            onChange={field.onChange}
                            options={financeAccountsMock}
                          />
                        )}
                      />
                    </div>

                    <Controller
                      name="paymentMethod"
                      control={form.control}
                      render={({ field }) => (
                        <SelectField
                          label="Forma de Pagamento"
                          placeholder="Selecione"
                          value={field.value}
                          onChange={field.onChange}
                          options={payments}
                        />
                      )}
                    />

                    {paymentMethod === "Cartão" && (
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Controller
                          name="machine"
                          control={form.control}
                          render={({ field }) => (
                            <SelectField
                              label="Máquina"
                              placeholder="Selecione"
                              value={field.value}
                              onChange={field.onChange}
                              options={financeCardMachinesMock}
                            />
                          )}
                        />
                        <Controller
                          name="brand"
                          control={form.control}
                          render={({ field }) => (
                            <SelectField
                              label="Bandeira"
                              placeholder="Selecione"
                              value={field.value}
                              onChange={field.onChange}
                              options={financeCardBrandsMock}
                            />
                          )}
                        />
                        <Controller
                          name="installments"
                          control={form.control}
                          render={({ field }) => (
                            <SelectField
                              label="Parcelamento"
                              placeholder="Selecione"
                              value={field.value}
                              onChange={field.onChange}
                              options={financeInstallmentsMock}
                            />
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <Controller
                    name="keepOpen"
                    control={form.control}
                    render={({ field }) => (
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                        />
                        Salvar e continuar inserindo
                      </label>
                    )}
                  />
                </>
              )}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
