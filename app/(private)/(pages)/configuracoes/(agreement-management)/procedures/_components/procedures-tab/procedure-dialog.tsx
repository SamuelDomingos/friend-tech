"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
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

import { formatarMoeda } from "@/lib/masks"

import { conveniosMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"
import { CBHPM_PORT_CODES } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/price-tables/_components/mock-data"
import { expenseRatingsMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/expenses/_components/mock-data"

import {
  TIPOS_GUIA,
  type Procedure,
  type ProcedureInsurancePrice,
} from "../mock-data"

interface ProcedureDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  procedure: Procedure | null
  onSave: (procedure: Procedure) => void
}

function montarConveniosPreco(
  procedure: Procedure | null
): ProcedureInsurancePrice[] {
  return conveniosMock.map((convenio) => {
    const existente = procedure?.convenios.find(
      (c) => c.convenioId === convenio.id
    )

    return {
      convenioId: convenio.id,
      convenioNome: convenio.nome,
      price: existente?.price ?? "",
      naoSeAplica: existente?.naoSeAplica ?? false,
    }
  })
}

export function ProcedureDialog({
  open,
  onOpenChange,
  procedure,
  onSave,
}: ProcedureDialogProps) {
  const isEdit = !!procedure

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar procedimento" : "Adicionar procedimento"}
          </DialogTitle>
          <DialogDescription>
            Configure os dados do procedimento e os valores por convênio.
          </DialogDescription>
        </DialogHeader>

        <ProcedureForm
          key={procedure?.id ?? "new"}
          procedure={procedure}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface ProcedureFormProps {
  procedure: Procedure | null
  onSave: (procedure: Procedure) => void
  onCancel: () => void
}

function ProcedureForm({ procedure, onSave, onCancel }: ProcedureFormProps) {
  const [codigoTuss, setCodigoTuss] = useState(procedure?.codigoTuss ?? "")
  const [codigoAmb, setCodigoAmb] = useState(procedure?.codigoAmb ?? "")
  const [nome, setNome] = useState(procedure?.nome ?? "")
  const [tipoGuia, setTipoGuia] = useState(procedure?.tipoGuia ?? "SADT")
  const [temAutorizacao, setTemAutorizacao] = useState(
    procedure?.temAutorizacao ?? false
  )
  const [temPorte, setTemPorte] = useState(procedure?.temPorte ?? false)
  const [porte, setPorte] = useState(procedure?.porte ?? "")
  const [custosOperacionais, setCustosOperacionais] = useState<string[]>(
    procedure?.custosOperacionais ?? [""]
  )
  const [temCh, setTemCh] = useState(procedure?.temCh ?? false)
  const [quantidadeCh, setQuantidadeCh] = useState(
    procedure?.quantidadeCh ?? ""
  )
  const [filme, setFilme] = useState(procedure?.filme ?? "")
  const [tempoXmlGuia, setTempoXmlGuia] = useState(
    procedure?.tempoXmlGuia ?? ""
  )
  const [quantidadeProfissionais, setQuantidadeProfissionais] = useState(
    procedure?.quantidadeProfissionais ?? ""
  )
  const [classificacaoId, setClassificacaoId] = useState(
    procedure?.classificacaoId ?? ""
  )
  const [custo, setCusto] = useState(procedure?.custo ?? "")
  const [custoAdicional, setCustoAdicional] = useState(
    procedure?.custoAdicional ?? ""
  )
  const [precoParticular, setPrecoParticular] = useState(
    procedure?.precoParticular ?? ""
  )
  const [convenios, setConvenios] = useState<ProcedureInsurancePrice[]>(() =>
    montarConveniosPreco(procedure)
  )

  const mostrarQuantidadeProfissionais =
    tipoGuia === "SADT" || tipoGuia === "GHI"

  const atualizarConvenio = (
    convenioId: string,
    campo: "price" | "naoSeAplica",
    valor: string | boolean
  ) => {
    setConvenios((atual) =>
      atual.map((c) =>
        c.convenioId === convenioId ? { ...c, [campo]: valor } : c
      )
    )
  }

  const marcarTodos = (naoSeAplica: boolean) => {
    setConvenios((atual) => atual.map((c) => ({ ...c, naoSeAplica })))
  }

  const adicionarCusto = () => {
    if (custosOperacionais.length >= 5) return
    setCustosOperacionais((atual) => [...atual, ""])
  }

  const removerCusto = (index: number) => {
    setCustosOperacionais((atual) => atual.filter((_, i) => i !== index))
  }

  const atualizarCusto = (index: number, valor: string) => {
    setCustosOperacionais((atual) =>
      atual.map((c, i) => (i === index ? valor : c))
    )
  }

  const salvar = () => {
    if (!nome.trim() || !precoParticular.trim()) return

    onSave({
      id: procedure?.id ?? `proc-${Date.now()}`,
      codigoTuss,
      codigoAmb,
      nome,
      tipoGuia,
      temAutorizacao,
      temPorte,
      porte,
      custosOperacionais: temPorte
        ? custosOperacionais.filter((c) => c.trim())
        : [],
      temCh,
      quantidadeCh,
      filme,
      tempoXmlGuia,
      quantidadeProfissionais,
      classificacaoId,
      custo,
      custoAdicional,
      precoParticular,
      convenios,
      criadoEm: procedure?.criadoEm ?? new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <>
      <ScrollArea className="min-h-0">
        <div className="space-y-6 pr-4 pb-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="procedimento-tuss">
                Código TUSS
              </FieldLabel>
              <Input
                id="procedimento-tuss"
                inputMode="numeric"
                value={codigoTuss}
                onChange={(e) =>
                  setCodigoTuss(e.target.value.replace(/\D/g, ""))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="procedimento-amb">Código AMB</FieldLabel>
              <Input
                id="procedimento-amb"
                inputMode="numeric"
                value={codigoAmb}
                onChange={(e) =>
                  setCodigoAmb(e.target.value.replace(/\D/g, ""))
                }
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="procedimento-nome">
              Nome de exibição <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="procedimento-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel>Tipo de Guia</FieldLabel>
            <ButtonGroup>
              {TIPOS_GUIA.map((tipo) => (
                <Button
                  key={tipo.value}
                  type="button"
                  variant={tipoGuia === tipo.value ? "default" : "outline"}
                  onClick={() => setTipoGuia(tipo.value)}
                >
                  {tipo.label}
                </Button>
              ))}
            </ButtonGroup>
          </Field>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <FieldLabel htmlFor="procedimento-autorizacao" className="text-sm">
              Há Autorização
            </FieldLabel>
            <Switch
              id="procedimento-autorizacao"
              checked={temAutorizacao}
              onCheckedChange={setTemAutorizacao}
            />
          </div>

          <div className="space-y-3 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="procedimento-porte" className="text-sm">
                Definir Porte
              </FieldLabel>
              <Switch
                id="procedimento-porte"
                checked={temPorte}
                onCheckedChange={setTemPorte}
              />
            </div>

            {temPorte && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="procedimento-porte-valor">
                    Porte
                  </FieldLabel>
                  <Select value={porte || "none"} onValueChange={(v) => setPorte(v === "none" ? "" : v)}>
                    <SelectTrigger id="procedimento-porte-valor">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">Selecione</SelectItem>
                        {CBHPM_PORT_CODES.map((codigo) => (
                          <SelectItem key={codigo} value={codigo}>
                            {codigo}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Custos operacionais (C.O.)</FieldLabel>
                  <div className="space-y-2">
                    {custosOperacionais.map((valor, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <InputGroup>
                          <InputGroupAddon>R$</InputGroupAddon>
                          <InputGroupInput
                            className="text-right"
                            placeholder="C.O."
                            value={valor}
                            onChange={(e) =>
                              atualizarCusto(
                                index,
                                formatarMoeda(e.target.value)
                              )
                            }
                          />
                        </InputGroup>
                        {custosOperacionais.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => removerCusto(index)}
                          >
                            <X className="size-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {custosOperacionais.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={adicionarCusto}
                      >
                        <Plus className="size-4" />
                        Adicionar C.O.
                      </Button>
                    )}
                  </div>
                </Field>
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="procedimento-ch" className="text-sm">
                Definir CH
              </FieldLabel>
              <Switch
                id="procedimento-ch"
                checked={temCh}
                onCheckedChange={setTemCh}
              />
            </div>

            {temCh && (
              <Field>
                <FieldLabel htmlFor="procedimento-ch-quantidade">
                  Quantidade CH
                </FieldLabel>
                <Input
                  id="procedimento-ch-quantidade"
                  className="text-right"
                  value={quantidadeCh}
                  onChange={(e) =>
                    setQuantidadeCh(formatarMoeda(e.target.value))
                  }
                />
              </Field>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="procedimento-filme">Filme</FieldLabel>
              <InputGroup>
                <InputGroupAddon>R$</InputGroupAddon>
                <InputGroupInput
                  id="procedimento-filme"
                  className="text-right"
                  value={filme}
                  onChange={(e) => setFilme(formatarMoeda(e.target.value))}
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="procedimento-tempo-xml">
                Tempo no XML/Guia
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="procedimento-tempo-xml"
                  inputMode="numeric"
                  value={tempoXmlGuia}
                  onChange={(e) =>
                    setTempoXmlGuia(e.target.value.replace(/\D/g, ""))
                  }
                />
                <InputGroupAddon align="inline-end">minutos</InputGroupAddon>
              </InputGroup>
            </Field>

            {mostrarQuantidadeProfissionais && (
              <Field>
                <FieldLabel htmlFor="procedimento-qtd-profissionais">
                  Quantidade de profissionais
                </FieldLabel>
                <Input
                  id="procedimento-qtd-profissionais"
                  inputMode="numeric"
                  value={quantidadeProfissionais}
                  onChange={(e) =>
                    setQuantidadeProfissionais(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                />
              </Field>
            )}

            <Field>
              <FieldLabel htmlFor="procedimento-classificacao">
                Classificação
              </FieldLabel>
              <Select
                value={classificacaoId || "none"}
                onValueChange={(v) =>
                  setClassificacaoId(v === "none" ? "" : v)
                }
              >
                <SelectTrigger id="procedimento-classificacao">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">Nenhuma</SelectItem>
                    {expenseRatingsMock.map((rating) => (
                      <SelectItem key={rating.id} value={rating.id}>
                        {rating.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="procedimento-custo">Custo</FieldLabel>
              <InputGroup>
                <InputGroupAddon>R$</InputGroupAddon>
                <InputGroupInput
                  id="procedimento-custo"
                  className="text-right"
                  value={custo}
                  onChange={(e) => setCusto(formatarMoeda(e.target.value))}
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="procedimento-custo-adicional">
                Custo Adicional
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>R$</InputGroupAddon>
                <InputGroupInput
                  id="procedimento-custo-adicional"
                  className="text-right"
                  value={custoAdicional}
                  onChange={(e) =>
                    setCustoAdicional(formatarMoeda(e.target.value))
                  }
                />
              </InputGroup>
            </Field>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="procedimento-particular">
                Particular <span className="text-destructive">*</span>
              </FieldLabel>
              <label className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
                <Checkbox
                  checked={
                    convenios.length > 0 &&
                    convenios.every((c) => c.naoSeAplica)
                  }
                  onCheckedChange={(checked) =>
                    marcarTodos(checked === true)
                  }
                />
                Marcar todos como &quot;Não se aplica&quot;
              </label>
            </div>
            <InputGroup>
              <InputGroupAddon>Particular</InputGroupAddon>
              <InputGroupInput
                id="procedimento-particular"
                className="text-right"
                value={precoParticular}
                onChange={(e) =>
                  setPrecoParticular(formatarMoeda(e.target.value))
                }
              />
            </InputGroup>

            {convenios.map((convenio) => (
              <div
                key={convenio.convenioId}
                className="flex items-center gap-3"
              >
                <InputGroup className="flex-1">
                  <InputGroupAddon>{convenio.convenioNome}</InputGroupAddon>
                  <InputGroupInput
                    className="text-right"
                    disabled={convenio.naoSeAplica}
                    value={convenio.price}
                    onChange={(e) =>
                      atualizarConvenio(
                        convenio.convenioId,
                        "price",
                        formatarMoeda(e.target.value)
                      )
                    }
                  />
                </InputGroup>
                <label className="flex shrink-0 items-center gap-2 text-xs whitespace-nowrap text-muted-foreground">
                  <Checkbox
                    checked={convenio.naoSeAplica}
                    onCheckedChange={(checked) =>
                      atualizarConvenio(
                        convenio.convenioId,
                        "naoSeAplica",
                        checked === true
                      )
                    }
                  />
                  Não se aplica
                </label>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={salvar}>
          {procedure ? "Salvar alterações" : "Adicionar"}
        </Button>
      </DialogFooter>
    </>
  )
}
