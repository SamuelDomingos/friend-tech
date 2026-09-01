"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { formatarMoeda } from "@/lib/masks"

import { conveniosMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"

import {
  TIPOS_DESPESA,
  UNIDADES_MEDIDA,
  type Expense,
  type ExpenseInsurancePrice,
  type ExpenseRating,
} from "../mock-data"

interface ExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense: Expense | null
  ratings: ExpenseRating[]
  onSave: (expense: Expense) => void
}

function montarConveniosPreco(expense: Expense | null): ExpenseInsurancePrice[] {
  return conveniosMock.map((convenio) => {
    const existente = expense?.convenios.find(
      (c) => c.convenioId === convenio.id
    )

    return {
      convenioId: convenio.id,
      convenioNome: convenio.nome,
      valor: existente?.valor ?? "",
    }
  })
}

type ExpenseFormValues = Omit<Expense, "id" | "convenios" | "criadoEm">

const vazio: ExpenseFormValues = {
  codigoTuss: "",
  codigoSimproTiss: "",
  registroAnvisa: "",
  nomeFaturamento: "",
  nome: "",
  tipo: "",
  tabelaPropria: false,
  unidade: "",
  classificacaoId: "",
  custo: "",
  custoAdicional: "",
  valorParticular: "",
}

function valoresIniciais(expense: Expense | null): ExpenseFormValues {
  if (!expense) return vazio

  return {
    codigoTuss: expense.codigoTuss,
    codigoSimproTiss: expense.codigoSimproTiss,
    registroAnvisa: expense.registroAnvisa,
    nomeFaturamento: expense.nomeFaturamento,
    nome: expense.nome,
    tipo: expense.tipo,
    tabelaPropria: expense.tabelaPropria,
    unidade: expense.unidade,
    classificacaoId: expense.classificacaoId,
    custo: expense.custo,
    custoAdicional: expense.custoAdicional,
    valorParticular: expense.valorParticular,
  }
}

export function ExpenseDialog({
  open,
  onOpenChange,
  expense,
  ratings,
  onSave,
}: ExpenseDialogProps) {
  const isEdit = !!expense

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar despesa" : "Adicionar despesa"}
          </DialogTitle>
          <DialogDescription>
            Configure os dados da despesa e os valores por convênio.
          </DialogDescription>
        </DialogHeader>

        <ExpenseForm
          key={expense?.id ?? "new"}
          expense={expense}
          ratings={ratings}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface ExpenseFormProps {
  expense: Expense | null
  ratings: ExpenseRating[]
  onSave: (expense: Expense) => void
  onCancel: () => void
}

function ExpenseForm({ expense, ratings, onSave, onCancel }: ExpenseFormProps) {
  const isEdit = !!expense
  const [form, setForm] = useState<ExpenseFormValues>(() =>
    valoresIniciais(expense)
  )
  const [convenios, setConvenios] = useState<ExpenseInsurancePrice[]>(() =>
    montarConveniosPreco(expense)
  )

  const atualizarConvenioValor = (convenioId: string, valor: string) => {
    setConvenios((atual) =>
      atual.map((c) =>
        c.convenioId === convenioId ? { ...c, valor } : c
      )
    )
  }

  const salvar = () => {
    if (
      !form.codigoTuss.trim() ||
      !form.nomeFaturamento.trim() ||
      !form.nome.trim() ||
      !form.valorParticular.trim()
    ) {
      return
    }

    onSave({
      id: expense?.id ?? `d-${Date.now()}`,
      ...form,
      convenios,
      criadoEm: expense?.criadoEm ?? new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <>
      <ScrollArea className="min-h-0">
        <div className="space-y-6 pr-4 pb-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="despesa-codigo-tuss">
                Código TUSS <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="despesa-codigo-tuss"
                value={form.codigoTuss}
                onChange={(e) =>
                  setForm((f) => ({ ...f, codigoTuss: e.target.value }))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="despesa-codigo-simpro">
                Código SIMPRO TISS
              </FieldLabel>
              <Input
                id="despesa-codigo-simpro"
                maxLength={10}
                value={form.codigoSimproTiss}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    codigoSimproTiss: e.target.value,
                  }))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="despesa-anvisa">
                Registro ANVISA
              </FieldLabel>
              <Input
                id="despesa-anvisa"
                inputMode="numeric"
                maxLength={15}
                value={form.registroAnvisa}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    registroAnvisa: e.target.value.replace(/\D/g, ""),
                  }))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="despesa-nome-faturamento">
                Nome de Faturamento{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="despesa-nome-faturamento"
                value={form.nomeFaturamento}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    nomeFaturamento: e.target.value,
                  }))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="despesa-nome">
                Nome de exibição <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="despesa-nome"
                value={form.nome}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nome: e.target.value }))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="despesa-unidade">
                Unidade de Medida
              </FieldLabel>
              <Select
                value={form.unidade}
                onValueChange={(v) => setForm((f) => ({ ...f, unidade: v }))}
              >
                <SelectTrigger id="despesa-unidade">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {UNIDADES_MEDIDA.map((unidade) => (
                      <SelectItem key={unidade} value={unidade}>
                        {unidade}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field>
            <FieldLabel>Tipo</FieldLabel>
            <ToggleGroup
              type="single"
              variant="outline"
              value={form.tipo}
              onValueChange={(v) => v && setForm((f) => ({ ...f, tipo: v }))}
              className="flex-wrap"
            >
              {TIPOS_DESPESA.map((tipo) => (
                <ToggleGroupItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Field>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <FieldLabel htmlFor="despesa-tabela-propria" className="text-sm">
              Tabela própria
            </FieldLabel>
            <Switch
              id="despesa-tabela-propria"
              checked={form.tabelaPropria}
              onCheckedChange={(checked) =>
                setForm((f) => ({ ...f, tabelaPropria: checked }))
              }
            />
          </div>

          <Field>
            <FieldLabel htmlFor="despesa-classificacao">
              Classificação do Procedimento
            </FieldLabel>
            <Select
              value={form.classificacaoId || "none"}
              onValueChange={(v) =>
                setForm((f) => ({
                  ...f,
                  classificacaoId: v === "none" ? "" : v,
                }))
              }
            >
              <SelectTrigger id="despesa-classificacao">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">Nenhuma</SelectItem>
                  {ratings.map((rating) => (
                    <SelectItem key={rating.id} value={rating.id}>
                      {rating.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="despesa-custo">Custo</FieldLabel>
              <InputGroup>
                <InputGroupAddon>R$</InputGroupAddon>
                <InputGroupInput
                  id="despesa-custo"
                  placeholder="0,00"
                  className="text-right"
                  value={form.custo}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      custo: formatarMoeda(e.target.value),
                    }))
                  }
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="despesa-custo-adicional">
                Custo Adicional
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>R$</InputGroupAddon>
                <InputGroupInput
                  id="despesa-custo-adicional"
                  placeholder="0,00"
                  className="text-right"
                  value={form.custoAdicional}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      custoAdicional: formatarMoeda(e.target.value),
                    }))
                  }
                />
              </InputGroup>
            </Field>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="despesa-particular">
              Particular <span className="text-destructive">*</span>
            </FieldLabel>
            <InputGroup>
              <InputGroupAddon>Particular</InputGroupAddon>
              <InputGroupInput
                id="despesa-particular"
                placeholder="0,00"
                className="text-right"
                value={form.valorParticular}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    valorParticular: formatarMoeda(e.target.value),
                  }))
                }
              />
            </InputGroup>

            {convenios.map((convenio) => (
              <InputGroup key={convenio.convenioId}>
                <InputGroupAddon>{convenio.convenioNome}</InputGroupAddon>
                <InputGroupInput
                  placeholder="0,00"
                  className="text-right"
                  value={convenio.valor}
                  onChange={(e) =>
                    atualizarConvenioValor(
                      convenio.convenioId,
                      formatarMoeda(e.target.value)
                    )
                  }
                />
              </InputGroup>
            ))}
          </div>
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={salvar}>
          {isEdit ? "Salvar alterações" : "Adicionar"}
        </Button>
      </DialogFooter>
    </>
  )
}
