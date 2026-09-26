"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/utils"

import { maquinetasMock } from "@/app/(private)/(pages)/configuracoes/(financeiro)/cartoes/_components/dados-mock"

import {
  FORMAS_COM_PARCELAS,
  formasPagamentoContasMock,
} from "../../contas-tab/dados-mock"

const PARCELAS = Array.from({ length: 12 }, (_, indice) => indice + 1)

interface PagamentoOrcamento {
  id: string
  forma: string
  valor: number
  maquina?: string
  bandeira?: string
}

interface PagamentoFormProps {
  procedimentosTotal: number
  matmedsTotal: number
  total: number
}

export function PagamentoForm({
  procedimentosTotal,
  matmedsTotal,
  total,
}: PagamentoFormProps) {
  const [fecharSemFinanceiro, setFecharSemFinanceiro] = useState(false)
  const [formaPagamento, setFormaPagamento] = useState("")
  const [valor, setValor] = useState("")
  const [dataTransacao, setDataTransacao] = useState<Date | undefined>()
  const [pessoa, setPessoa] = useState("PF")
  const [parcelas, setParcelas] = useState("1")
  const [observacao, setObservacao] = useState("")
  const [pagamentos, setPagamentos] = useState<PagamentoOrcamento[]>([])

  const [maquinaId, setMaquinaId] = useState("")
  const [bandeira, setBandeira] = useState("")
  const [parcelamento, setParcelamento] = useState("")
  const [nsu, setNsu] = useState("")

  const isCartao = formaPagamento === "Cartão"
  const maquina = maquinetasMock.find((item) => item.id === maquinaId)
  const totalPagamentos = pagamentos.reduce(
    (soma, pagamento) => soma + pagamento.valor,
    0
  )

  function selecionarForma(valorForma: string) {
    setFormaPagamento(valorForma)
    setMaquinaId("")
    setBandeira("")
    setParcelamento("")
    setNsu("")
    setParcelas("1")
  }

  function adicionarPagamento() {
    if (!formaPagamento) {
      return
    }

    const valorNumero = Number.parseFloat(valor.replace(",", ".")) || 0

    setPagamentos((atual) => [
      ...atual,
      {
        id: crypto.randomUUID(),
        forma: formaPagamento,
        valor: valorNumero,
        maquina: isCartao ? maquina?.nome : undefined,
        bandeira: isCartao ? bandeira : undefined,
      },
    ])

    setValor("")
    setFormaPagamento("")
    setMaquinaId("")
    setBandeira("")
    setParcelamento("")
    setNsu("")
    setParcelas("1")
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Procedimentos</p>
          <Separator className="my-2" />
          <p className="text-right text-lg font-medium">
            {formatCurrency(procedimentosTotal)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Materiais e medicamentos
          </p>
          <Separator className="my-2" />
          <p className="text-right text-lg font-medium">
            {formatCurrency(matmedsTotal)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <Separator className="my-2" />
          <p className="text-right text-lg font-semibold text-primary">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Switch
            id="fechar-sem-financeiro"
            checked={fecharSemFinanceiro}
            onCheckedChange={setFecharSemFinanceiro}
          />
          <Label htmlFor="fechar-sem-financeiro" className="font-normal">
            Fechar sem financeiro
          </Label>
        </div>

        <Badge
          variant="secondary"
          className="border-transparent bg-primary/10 text-primary"
        >
          Crédito disponível: {formatCurrency(0)}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field>
          <FieldLabel htmlFor="orcamento-forma">Forma de pagamento</FieldLabel>
          <Select
            value={formaPagamento}
            onValueChange={selecionarForma}
            disabled={fecharSemFinanceiro}
          >
            <SelectTrigger id="orcamento-forma" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {formasPagamentoContasMock.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="orcamento-valor">Valor</FieldLabel>
          <Input
            id="orcamento-valor"
            inputMode="decimal"
            placeholder="R$ 0,00"
            className="text-right"
            value={valor}
            onChange={(event) => setValor(event.target.value)}
            disabled={fecharSemFinanceiro}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="orcamento-data">Data da transação</FieldLabel>
          <DatePicker
            value={dataTransacao}
            onChange={setDataTransacao}
            disabled={fecharSemFinanceiro}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <RadioGroup
          value={pessoa}
          onValueChange={setPessoa}
          className="flex items-end gap-4 pb-2"
        >
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="PJ" />
            Pessoa jurídica
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="PF" />
            Pessoa física
          </label>
        </RadioGroup>

        {FORMAS_COM_PARCELAS.includes(formaPagamento) && (
          <Field>
            <FieldLabel htmlFor="orcamento-parcelas">Parcelas</FieldLabel>
            <Select value={parcelas} onValueChange={setParcelas}>
              <SelectTrigger id="orcamento-parcelas" className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PARCELAS.map((numero) => (
                    <SelectItem key={numero} value={String(numero)}>
                      {numero}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}
      </div>

      {isCartao && (
        <div className="grid gap-3 rounded-lg border p-3 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="orcamento-maquina">Máquina</FieldLabel>
            <Select
              value={maquinaId}
              onValueChange={(valorMaquina) => {
                setMaquinaId(valorMaquina)
                setBandeira("")
                setParcelamento("")
              }}
            >
              <SelectTrigger id="orcamento-maquina" className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {maquinetasMock.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="orcamento-bandeira">Bandeira</FieldLabel>
            <Select
              value={bandeira}
              onValueChange={setBandeira}
              disabled={!maquina}
            >
              <SelectTrigger id="orcamento-bandeira" className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {maquina?.bandeiras.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="orcamento-parcelamento">
              Parcelamento
            </FieldLabel>
            <Select
              value={parcelamento}
              onValueChange={setParcelamento}
              disabled={!maquina}
            >
              <SelectTrigger id="orcamento-parcelamento" className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="DEBIT">À vista (Débito)</SelectItem>
                  {Array.from(
                    { length: maquina?.qtdMaxParcelas ?? 0 },
                    (_, indice) => indice + 1
                  ).map((numero) => (
                    <SelectItem key={numero} value={String(numero)}>
                      {numero}x
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="orcamento-nsu">NSU (DOC/CV/ID)</FieldLabel>
            <Input
              id="orcamento-nsu"
              maxLength={255}
              value={nsu}
              onChange={(event) => setNsu(event.target.value)}
            />
          </Field>
        </div>
      )}

      <Field>
        <FieldLabel htmlFor="orcamento-observacao">Observação</FieldLabel>
        <Textarea
          id="orcamento-observacao"
          rows={3}
          placeholder="Escreva aqui"
          value={observacao}
          onChange={(event) => setObservacao(event.target.value)}
          disabled={fecharSemFinanceiro}
        />
      </Field>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          disabled={fecharSemFinanceiro || !formaPagamento}
          onClick={adicionarPagamento}
        >
          <Plus className="size-4" />
          Adicionar pagamento
        </Button>
      </div>

      <div>
        <Label className="mb-1.5 block">Resumo</Label>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>Forma de pagamento</TableHead>
              <TableHead className="text-right">Valor (R$)</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagamentos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-6 text-center text-sm text-muted-foreground"
                >
                  Nenhum pagamento selecionado
                </TableCell>
              </TableRow>
            ) : (
              pagamentos.map((pagamento, index) => (
                <TableRow key={pagamento.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {pagamento.forma}
                    {pagamento.bandeira && (
                      <span className="text-muted-foreground">
                        {" "}
                        · {pagamento.bandeira}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(pagamento.valor)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Remover pagamento"
                      onClick={() =>
                        setPagamentos((atual) =>
                          atual.filter((item) => item.id !== pagamento.id)
                        )
                      }
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {pagamentos.length > 0 && (
          <p className="mt-2 text-right text-sm">
            Total{" "}
            <span className="ml-1 font-medium text-emerald-600">
              {formatCurrency(totalPagamentos)}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
