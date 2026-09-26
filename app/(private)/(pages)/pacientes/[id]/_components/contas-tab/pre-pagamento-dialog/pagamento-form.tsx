"use client"

import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { formatarMoeda } from "../../formatadores"
import {
  FORMAS_COM_PARCELAS,
  formasPagamentoContasMock,
  unidadesContasMock,
} from "../dados-mock"

const PARCELAS = Array.from({ length: 12 }, (_, indice) => indice + 1)

interface PagamentoFormProps {
  unidade: string
  onUnidade: (valor: string) => void
  formaPagamento: string
  onFormaPagamento: (valor: string) => void
  valor: string
  onValor: (valor: string) => void
  dataTransacao?: Date
  onDataTransacao: (valor: Date | undefined) => void
  pessoa: "PF" | "PJ"
  onPessoa: (valor: "PF" | "PJ") => void
  parcelas: string
  onParcelas: (valor: string) => void
  observacao: string
  onObservacao: (valor: string) => void
  total: number
}

export function PagamentoForm({
  unidade,
  onUnidade,
  formaPagamento,
  onFormaPagamento,
  valor,
  onValor,
  dataTransacao,
  onDataTransacao,
  pessoa,
  onPessoa,
  parcelas,
  onParcelas,
  observacao,
  onObservacao,
  total,
}: PagamentoFormProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label className="mb-1.5 block">Unidade</Label>
          <Select value={unidade} onValueChange={onUnidade}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {unidadesContasMock.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1.5 block">Forma de Pagamento</Label>
          <Select value={formaPagamento} onValueChange={onFormaPagamento}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {formasPagamentoContasMock.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1.5 block">Valor</Label>
          <Input
            inputMode="decimal"
            placeholder="R$ 0,00"
            className="text-right"
            value={valor}
            onChange={(event) => onValor(event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label className="mb-1.5 block">Data da transação</Label>
          <DatePicker value={dataTransacao} onChange={onDataTransacao} />
        </div>

        <RadioGroup
          value={pessoa}
          onValueChange={(v) => onPessoa(v as "PF" | "PJ")}
          className="flex items-end gap-4 pb-2"
        >
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="PJ" />
            Pessoa Jurídica
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="PF" />
            Pessoa Física
          </label>
        </RadioGroup>

        {FORMAS_COM_PARCELAS.includes(formaPagamento) && (
          <div>
            <Label className="mb-1.5 block">Parcelas</Label>
            <Select value={parcelas} onValueChange={onParcelas}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {PARCELAS.map((numero) => (
                  <SelectItem key={numero} value={String(numero)}>
                    {numero}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div>
        <Label className="mb-1.5 block">Observação</Label>
        <Textarea
          rows={4}
          value={observacao}
          onChange={(event) => onObservacao(event.target.value)}
        />
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">
          Total a pré-pagar
        </span>
        <span className="text-lg font-semibold text-emerald-600">
          {formatarMoeda(total)}
        </span>
      </div>
    </div>
  )
}
