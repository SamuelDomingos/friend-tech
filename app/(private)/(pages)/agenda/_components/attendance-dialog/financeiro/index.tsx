"use client"

import { useState } from "react"
import { InfoIcon, PencilIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatCurrency } from "@/lib/utils"

import { maquinetasMock } from "@/app/(private)/(pages)/configuracoes/(financeiro)/cartoes/_components/dados-mock"

import {
  conveniosMock,
  METODOS_COM_PARCELAS,
  metodosPagamentoMock,
  type PagamentoItem,
} from "../mock-data"

interface FinanceiroTabProps {
  procedimentosTotal: number
  pagamentos: PagamentoItem[]
  onChangePagamentos: (pagamentos: PagamentoItem[]) => void
  patientConvenioId: string
}

interface ParcelaEdit {
  valor: string
  data: Date | undefined
  documento: string
}

const LIMITE_PARCELAS: Record<string, number> = {
  Cheque: 24,
  Boleto: 48,
  "Crédito em conta": 48,
}

function novasParcelas(quantidade: number, valorTotal: string): ParcelaEdit[] {
  const total = Number(valorTotal) || 0
  const porParcela = quantidade > 0 ? (total / quantidade).toFixed(2) : "0"

  return Array.from({ length: quantidade }, () => ({
    valor: porParcela,
    data: undefined,
    documento: "",
  }))
}

export function FinanceiroTab({
  procedimentosTotal,
  pagamentos,
  onChangePagamentos,
  patientConvenioId,
}: FinanceiroTabProps) {
  const [metodo, setMetodo] = useState("")
  const [convenioId, setConvenioId] = useState("")
  const [valor, setValor] = useState("")
  const [dataTransacao, setDataTransacao] = useState<Date | undefined>()
  const [tipoPessoa, setTipoPessoa] = useState("PF")
  const [observacao, setObservacao] = useState("")
  const [numeroParcelas, setNumeroParcelas] = useState("")
  const [parcelas, setParcelas] = useState<ParcelaEdit[]>([])
  const [totalOverride, setTotalOverride] = useState<number | null>(null)
  const [editandoTotal, setEditandoTotal] = useState(false)
  const [maquinaId, setMaquinaId] = useState("")
  const [bandeira, setBandeira] = useState("")
  const [parcelamento, setParcelamento] = useState("")
  const [nsu, setNsu] = useState("")

  const usaParcelas = METODOS_COM_PARCELAS.includes(
    metodo as (typeof METODOS_COM_PARCELAS)[number]
  )
  const isConvenio = metodo === "Convênio"
  const isCartao = metodo === "Cartão"
  const maquina = maquinetasMock.find((m) => m.id === maquinaId)

  const metodosDisponiveis = metodosPagamentoMock.filter(
    (m) => m !== "Convênio" || patientConvenioId !== "particular"
  )

  const total = totalOverride ?? procedimentosTotal
  const pagoTotal = pagamentos.reduce((soma, p) => soma + p.valor, 0)
  const aPagar = Math.max(0, total - pagoTotal)
  const podeEditarTotal = !isConvenio && pagamentos.length === 0

  const limparFormulario = () => {
    setMetodo("")
    setConvenioId("")
    setValor("")
    setDataTransacao(undefined)
    setNumeroParcelas("")
    setParcelas([])
    setMaquinaId("")
    setBandeira("")
    setParcelamento("")
    setNsu("")
  }

  const selecionarParcelas = (quantidadeStr: string) => {
    setNumeroParcelas(quantidadeStr)
    setParcelas(novasParcelas(Number(quantidadeStr), valor))
  }

  const atualizarParcela = <K extends keyof ParcelaEdit>(
    index: number,
    campo: K,
    valorCampo: ParcelaEdit[K]
  ) => {
    setParcelas((atual) =>
      atual.map((parcela, i) =>
        i === index ? { ...parcela, [campo]: valorCampo } : parcela
      )
    )
  }

  const adicionarPagamento = () => {
    if (!metodo) return

    if (usaParcelas && parcelas.length > 0) {
      const completas = parcelas.every((p) => Number(p.valor) > 0 && p.data)
      if (!completas) return

      onChangePagamentos([
        ...pagamentos,
        ...parcelas.map((parcela, index) => ({
          id: crypto.randomUUID(),
          metodo,
          valor: Number(parcela.valor),
          data: parcela.data as Date,
          parcela: { numero: index + 1, total: parcelas.length },
          documento: metodo === "Cheque" ? parcela.documento : undefined,
        })),
      ])
      limparFormulario()
      return
    }

    const valorNumerico = Number(valor)
    if (!valorNumerico || !dataTransacao) return

    onChangePagamentos([
      ...pagamentos,
      {
        id: crypto.randomUUID(),
        metodo,
        valor: valorNumerico,
        data: dataTransacao,
        maquina: isCartao ? maquina?.nome : undefined,
        bandeira: isCartao ? bandeira : undefined,
        nsu: isCartao ? nsu : undefined,
      },
    ])
    limparFormulario()
  }

  const removerPagamento = (id: string) => {
    onChangePagamentos(pagamentos.filter((p) => p.id !== id))
  }

  const podeAdicionar = usaParcelas
    ? parcelas.length > 0 && parcelas.every((p) => Number(p.valor) > 0 && p.data)
    : isCartao
      ? !!Number(valor) && !!dataTransacao && !!maquinaId && !!bandeira && !!parcelamento
      : !!metodo && !!Number(valor) && !!dataTransacao

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 py-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-md border p-4">
          <p className="text-xs text-muted-foreground">Procedimentos</p>
          <p className="text-lg font-semibold">
            {formatCurrency(procedimentosTotal)}
          </p>
        </div>

        <div className="rounded-md border p-4">
          <p className="text-xs text-muted-foreground">Outras despesas</p>
          <p className="text-lg font-semibold">{formatCurrency(0)}</p>
        </div>

        <div className="rounded-md border p-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Total
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent className="max-w-64">
                <p>
                  O valor exibido não leva em consideração as reduções,
                  acréscimos de urgência e grau de participação. O valor
                  final é calculado e exibido na guia.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          {editandoTotal ? (
            <Input
              type="number"
              min={0}
              step="0.01"
              autoFocus
              defaultValue={total}
              onBlur={(e) => {
                setTotalOverride(Number(e.target.value) || 0)
                setEditandoTotal(false)
              }}
              className="mt-1 text-lg font-semibold"
            />
          ) : (
            <div className="flex items-center gap-2">
              {podeEditarTotal && (
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => setEditandoTotal(true)}
                >
                  <PencilIcon className="size-3.5" />
                </Button>
              )}
              <p className="text-lg font-semibold text-primary">
                {formatCurrency(total)}
              </p>
            </div>
          )}
        </div>

        {!isConvenio && (
          <div className="rounded-md border p-4">
            <p className="text-xs text-muted-foreground">A Pagar</p>
            <p className="text-lg font-semibold text-destructive">
              {formatCurrency(aPagar)}
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="finance-metodo">Forma de pagamento</FieldLabel>
          <Select
            value={metodo}
            onValueChange={(v) => {
              setMetodo(v)
              setNumeroParcelas("")
              setParcelas([])
              setMaquinaId("")
              setBandeira("")
              setParcelamento("")
              setNsu("")
            }}
          >
            <SelectTrigger id="finance-metodo">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {metodosDisponiveis.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {isConvenio && (
          <Field>
            <FieldLabel htmlFor="finance-convenio">Convênio</FieldLabel>
            <Select value={convenioId} onValueChange={setConvenioId}>
              <SelectTrigger id="finance-convenio">
                <SelectValue placeholder="Selecione o convênio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {conveniosMock.map((convenio) => (
                    <SelectItem key={convenio.id} value={convenio.id}>
                      {convenio.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}

        {!isConvenio && metodo && (
          <Field>
            <FieldLabel htmlFor="finance-valor">Valor</FieldLabel>
            <Input
              id="finance-valor"
              type="number"
              min={0}
              step="0.01"
              value={valor}
              onChange={(e) => {
                setValor(e.target.value)
                if (numeroParcelas) {
                  setParcelas(novasParcelas(Number(numeroParcelas), e.target.value))
                }
              }}
            />
          </Field>
        )}

        {isConvenio ? (
          <div className="sm:col-span-2 flex items-start gap-2 rounded-md border border-dashed p-3 text-xs text-muted-foreground">
            <InfoIcon className="mt-0.5 size-4 shrink-0" />
            <p>
              A geração de guias TISS (SADT, GHI, Consulta, APAC, BPA) será
              liberada quando o módulo de convênios e faturamento estiver
              integrado.
            </p>
          </div>
        ) : (
          metodo && (
            <>
              <Field>
                <FieldLabel htmlFor="finance-data">
                  Data da transação
                </FieldLabel>
                <DatePicker value={dataTransacao} onChange={setDataTransacao} />
              </Field>

              <div className="flex items-end gap-6">
                <RadioGroup
                  value={tipoPessoa}
                  onValueChange={setTipoPessoa}
                  className="flex flex-row gap-6"
                >
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <RadioGroupItem value="PF" />
                    Pessoa física
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <RadioGroupItem value="PJ" />
                    Pessoa jurídica
                  </label>
                </RadioGroup>
              </div>
            </>
          )
        )}

        {usaParcelas && (
          <Field>
            <FieldLabel htmlFor="finance-parcelas">Parcelas</FieldLabel>
            <Select value={numeroParcelas} onValueChange={selecionarParcelas}>
              <SelectTrigger id="finance-parcelas">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from(
                    { length: LIMITE_PARCELAS[metodo] ?? 1 },
                    (_, i) => i + 1
                  ).map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}

        {usaParcelas && parcelas.length > 0 && (
          <div className="sm:col-span-2 grid gap-3">
            {parcelas.map((parcela, index) => (
              <div
                key={index}
                className="grid grid-cols-1 items-end gap-3 rounded-md border p-3 sm:grid-cols-3"
              >
                <Field>
                  <FieldLabel htmlFor={`parcela-valor-${index}`}>
                    Parcela nº {index + 1}
                  </FieldLabel>
                  <Input
                    id={`parcela-valor-${index}`}
                    type="number"
                    min={0}
                    step="0.01"
                    value={parcela.valor}
                    onChange={(e) =>
                      atualizarParcela(index, "valor", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`parcela-data-${index}`}>Data</FieldLabel>
                  <DatePicker
                    value={parcela.data}
                    onChange={(date) => atualizarParcela(index, "data", date)}
                  />
                </Field>
                {metodo === "Cheque" && (
                  <Field>
                    <FieldLabel htmlFor={`parcela-documento-${index}`}>
                      Documento
                    </FieldLabel>
                    <Input
                      id={`parcela-documento-${index}`}
                      maxLength={12}
                      value={parcela.documento}
                      onChange={(e) =>
                        atualizarParcela(index, "documento", e.target.value)
                      }
                    />
                  </Field>
                )}
              </div>
            ))}
          </div>
        )}

        {isCartao && (
          <div className="sm:col-span-2 grid gap-3 rounded-md border p-3 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="finance-maquina">Máquina</FieldLabel>
              <Select
                value={maquinaId}
                onValueChange={(v) => {
                  setMaquinaId(v)
                  setBandeira("")
                  setParcelamento("")
                }}
              >
                <SelectTrigger id="finance-maquina" className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {maquinetasMock.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="finance-bandeira">Bandeira</FieldLabel>
              <Select
                value={bandeira}
                onValueChange={setBandeira}
                disabled={!maquina}
              >
                <SelectTrigger id="finance-bandeira" className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {maquina?.bandeiras.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="finance-parcelamento">
                Parcelamento
              </FieldLabel>
              <Select
                value={parcelamento}
                onValueChange={setParcelamento}
                disabled={!maquina}
              >
                <SelectTrigger id="finance-parcelamento" className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="DEBIT">À vista (Débito)</SelectItem>
                    {Array.from(
                      { length: maquina?.qtdMaxParcelas ?? 0 },
                      (_, i) => i + 1
                    ).map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}x
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="finance-nsu">NSU (DOC/CV/ID)</FieldLabel>
              <Input
                id="finance-nsu"
                maxLength={255}
                value={nsu}
                onChange={(e) => setNsu(e.target.value)}
              />
            </Field>
          </div>
        )}

        {!isConvenio && (
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="finance-observacao">Observação</FieldLabel>
            <Textarea
              id="finance-observacao"
              className="h-20 resize-none"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </Field>
        )}
      </div>

      {!isConvenio && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            disabled={!podeAdicionar}
            onClick={adicionarPagamento}
          >
            Adicionar pagamento
          </Button>
        </div>
      )}

      {!isConvenio && (
        <div>
          <p className="mb-2 text-sm font-semibold">Resumo</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Forma de pagamento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagamentos.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-6 text-center text-muted-foreground"
                  >
                    Nenhum pagamento selecionado
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {pagamentos.map((pagamento) => (
                    <TableRow key={pagamento.id}>
                      <TableCell>
                        {pagamento.metodo}
                        {pagamento.parcela && (
                          <span className="text-muted-foreground">
                            {" "}
                            · Parcela {pagamento.parcela.numero}/
                            {pagamento.parcela.total}
                          </span>
                        )}
                        {pagamento.bandeira && (
                          <span className="text-muted-foreground">
                            {" "}
                            · {pagamento.bandeira}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {pagamento.data.toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(pagamento.valor)}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => removerPagamento(pagamento.id)}
                        >
                          <TrashIcon className="text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} className="text-right font-medium">
                      Total
                    </TableCell>
                    <TableCell
                      className="text-right font-semibold"
                      style={{ color: "#00800B" }}
                    >
                      {formatCurrency(pagoTotal)}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
