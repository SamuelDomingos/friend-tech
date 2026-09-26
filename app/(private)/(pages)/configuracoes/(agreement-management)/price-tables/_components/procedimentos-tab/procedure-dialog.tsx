"use client"

import { useState } from "react"
import { Plus, SearchIcon, Upload } from "lucide-react"

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
import { DatePicker } from "@/components/ui/date-picker"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

import { Transfer } from "@/components/transfer"

import { daDataISO, formatarMoeda, paraDataISO } from "@/lib/masks"

import { conveniosMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"

import {
  CBHPM_IMPORT_TABLES,
  CBHPM_PORT_CODES,
  PROCEDURE_TYPES,
  procedureItemsMock,
  type AmbSpecialRule,
  type CbhpmParticipationDegrees,
  type ProcedureItem,
  type ProcedureTable,
} from "../mock-data"

interface ProcedureDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: ProcedureTable | null
  onSave: (table: ProcedureTable) => void
}

export function ProcedureDialog({
  open,
  onOpenChange,
  table,
  onSave,
}: ProcedureDialogProps) {
  const isView = !!table

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Tabela de Preço</DialogTitle>
          <DialogDescription>
            {isView
              ? "Detalhes da tabela de procedimentos."
              : "Cadastre uma nova tabela de procedimentos."}
          </DialogDescription>
        </DialogHeader>

        <ProcedureForm
          key={table?.id ?? "new"}
          table={table}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

const PARTICIPACAO_VAZIA: CbhpmParticipationDegrees = {
  cirurgiao: "",
  auxiliar1: "",
  auxiliar2: "",
  auxiliar3: "",
  auxiliar4: "",
}

interface ProcedureFormProps {
  table: ProcedureTable | null
  onSave: (table: ProcedureTable) => void
  onCancel: () => void
}

function ProcedureForm({ table, onSave, onCancel }: ProcedureFormProps) {
  const isView = !!table
  const [type, setType] = useState(table?.type ?? "CBHPM")
  const [nome, setNome] = useState(table?.nome ?? "")
  const [startDate, setStartDate] = useState(table?.startDate ?? "")
  const [observacao, setObservacao] = useState(table?.observacao ?? "")
  const [convenios, setConvenios] = useState<string[]>(table?.convenios ?? [])

  // CBHPM
  const [cbhpmImportTable, setCbhpmImportTable] = useState("")
  const [cbhpmRedAcr, setCbhpmRedAcr] = useState(
    table?.cbhpm?.redAcr ?? ""
  )
  const [cbhpmUcoAmount, setCbhpmUcoAmount] = useState(
    table?.cbhpm?.ucoAmount ?? ""
  )
  const [cbhpmParticipation, setCbhpmParticipation] =
    useState<CbhpmParticipationDegrees>(
      table?.cbhpm?.participationDegrees ?? PARTICIPACAO_VAZIA
    )
  const [cbhpmPortConfig, setCbhpmPortConfig] = useState<
    Record<string, string>
  >(table?.cbhpm?.portConfig ?? {})

  // AMB
  const [ambChValue, setAmbChValue] = useState(table?.amb?.chValue ?? "")
  const [ambAllowRules, setAmbAllowRules] = useState(false)
  const [ambSpecialRules, setAmbSpecialRules] = useState<AmbSpecialRule[]>(
    table?.amb?.specialRules ?? []
  )
  const [ambNovoCodigo, setAmbNovoCodigo] = useState("")
  const [ambNovoValor, setAmbNovoValor] = useState("")

  // Própria
  const [ownProcedures, setOwnProcedures] = useState<ProcedureItem[]>(
    table?.ownProcedures ?? procedureItemsMock
  )
  const [searchProcedimentos, setSearchProcedimentos] = useState("")

  const convenioNomes = conveniosMock.map((c) => c.nome)
  const convenioIdPorNome = new Map(conveniosMock.map((c) => [c.nome, c.id]))
  const convenioNomePorId = new Map(conveniosMock.map((c) => [c.id, c.nome]))
  const conveniosSelecionados = convenios
    .map((id) => convenioNomePorId.get(id))
    .filter((nome): nome is string => !!nome)

  const atualizarParticipacao = (
    campo: keyof CbhpmParticipationDegrees,
    valor: string
  ) => {
    setCbhpmParticipation((atual) => ({ ...atual, [campo]: valor }))
  }

  const atualizarPortConfig = (codigo: string, valor: string) => {
    setCbhpmPortConfig((atual) => ({ ...atual, [codigo]: valor }))
  }

  const adicionarRegraAmb = () => {
    if (!ambNovoCodigo.trim() || !ambNovoValor.trim()) return
    setAmbSpecialRules((atual) => [
      ...atual,
      { codigo: ambNovoCodigo, valor: ambNovoValor },
    ])
    setAmbNovoCodigo("")
    setAmbNovoValor("")
  }

  const atualizarProcedimento = (
    codigo: string,
    campo: "porte" | "uco" | "filme" | "total",
    valor: string
  ) => {
    setOwnProcedures((atual) =>
      atual.map((p) => (p.codigo === codigo ? { ...p, [campo]: valor } : p))
    )
  }

  const procedimentosFiltrados = ownProcedures.filter((p) => {
    const termo = searchProcedimentos.trim().toLowerCase()
    return (
      !termo ||
      p.codigo.toLowerCase().includes(termo) ||
      p.descricao.toLowerCase().includes(termo)
    )
  })

  const adicionar = () => {
    if (!nome.trim() || !startDate) return

    onSave({
      id: `pt-${Date.now()}`,
      type,
      nome,
      observacao,
      startDate,
      endDate: "",
      convenios,
      importadoPor: "Você",
      importadoEm: new Date().toISOString().slice(0, 10),
      status: "ACTIVE",
      ativa: true,
      cbhpm:
        type === "CBHPM"
          ? {
              importTable: cbhpmImportTable,
              redAcr: cbhpmRedAcr,
              ucoAmount: cbhpmUcoAmount,
              participationDegrees: cbhpmParticipation,
              portConfig: cbhpmPortConfig,
            }
          : undefined,
      amb:
        type === "AMB"
          ? { chValue: ambChValue, specialRules: ambSpecialRules }
          : undefined,
      ownProcedures: type === "DEFAULT_PROCEDURE" ? ownProcedures : undefined,
    })
  }

  return (
    <>
      <ScrollArea className="min-h-0">
        <div className="space-y-6 pr-4 pb-1">
          <ButtonGroup>
            {PROCEDURE_TYPES.map((t) => (
              <Button
                key={t.value}
                type="button"
                variant={type === t.value ? "default" : "outline"}
                disabled={isView && type !== t.value}
                onClick={() => !isView && setType(t.value)}
              >
                {t.label}
              </Button>
            ))}
          </ButtonGroup>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="procedure-nome">Nome</FieldLabel>
              <Input
                id="procedure-nome"
                placeholder="Nome da tabela de preço"
                disabled={isView}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="procedure-vigencia">Vigência</FieldLabel>
              <DatePicker
                value={daDataISO(startDate)}
                onChange={(d) => setStartDate(d ? paraDataISO(d) : "")}
                placeholder="Selecione"
                disabled={isView}
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="procedure-observacao">Observação</FieldLabel>
            <Textarea
              id="procedure-observacao"
              disabled={isView}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </Field>

          <div>
            <FieldLabel className="mb-2">Convênio</FieldLabel>
            {isView ? (
              <p className="text-sm text-muted-foreground">
                {conveniosSelecionados.length > 0
                  ? conveniosSelecionados.join(", ")
                  : "Preencha o convênio"}
              </p>
            ) : (
              <Transfer
                disponiveisTitle="Disponíveis"
                inclusosTitle="Selecionados"
                searchPlaceholder="Preencha o convênio"
                disponiveis={convenioNomes.filter(
                  (nome) => !conveniosSelecionados.includes(nome)
                )}
                inclusos={conveniosSelecionados}
                onIncludedChange={(nomes) =>
                  setConvenios(
                    nomes
                      .map((nome) => convenioIdPorNome.get(nome))
                      .filter((id): id is string => !!id)
                  )
                }
              />
            )}
          </div>

          {type === "CBHPM" && (
            <div className="space-y-4 rounded-lg border p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {!isView && (
                  <Field>
                    <FieldLabel htmlFor="cbhpm-importar">
                      Importar tabela
                    </FieldLabel>
                    <Select
                      value={cbhpmImportTable || "none"}
                      onValueChange={(v) =>
                        setCbhpmImportTable(v === "none" ? "" : v)
                      }
                    >
                      <SelectTrigger id="cbhpm-importar">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="none">Selecione</SelectItem>
                          {CBHPM_IMPORT_TABLES.map((porte) => (
                            <SelectItem key={porte} value={porte}>
                              Porte {porte}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}

                <Field>
                  <FieldLabel htmlFor="cbhpm-red-acr">
                    Redução / Acréscimo
                  </FieldLabel>
                  <Input
                    id="cbhpm-red-acr"
                    className="text-right"
                    disabled={isView}
                    value={cbhpmRedAcr}
                    onChange={(e) =>
                      setCbhpmRedAcr(formatarMoeda(e.target.value))
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="cbhpm-uco">Valor do UCO</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>R$</InputGroupAddon>
                    <InputGroupInput
                      id="cbhpm-uco"
                      className="text-right"
                      disabled={isView}
                      value={cbhpmUcoAmount}
                      onChange={(e) =>
                        setCbhpmUcoAmount(formatarMoeda(e.target.value))
                      }
                    />
                  </InputGroup>
                </Field>
              </div>

              <div className="space-y-2">
                <FieldLabel>Grau de Participação</FieldLabel>
                <div className="grid gap-4 sm:grid-cols-3">
                  {(
                    [
                      ["cirurgiao", "Cirurgião"],
                      ["auxiliar1", "1º Auxiliar"],
                      ["auxiliar2", "2º Auxiliar"],
                      ["auxiliar3", "3º Auxiliar"],
                      ["auxiliar4", "4º Auxiliar"],
                    ] as const
                  ).map(([campo, label]) => (
                    <Field key={campo}>
                      <FieldLabel htmlFor={`cbhpm-part-${campo}`}>
                        {label}
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={`cbhpm-part-${campo}`}
                          className="text-right"
                          disabled={isView}
                          value={cbhpmParticipation[campo]}
                          onChange={(e) =>
                            atualizarParticipacao(
                              campo,
                              e.target.value.replace(/[^0-9,]/g, "")
                            )
                          }
                        />
                        <InputGroupAddon align="inline-end">
                          %
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <FieldLabel>Configuração de portes</FieldLabel>
                <div className="grid gap-2 sm:grid-cols-3">
                  {CBHPM_PORT_CODES.map((codigo) => (
                    <InputGroup key={codigo}>
                      <InputGroupAddon className="w-12 justify-center font-semibold">
                        {codigo}
                      </InputGroupAddon>
                      <InputGroupInput
                        className="text-right"
                        disabled={isView}
                        value={cbhpmPortConfig[codigo] ?? ""}
                        onChange={(e) =>
                          atualizarPortConfig(
                            codigo,
                            formatarMoeda(e.target.value)
                          )
                        }
                      />
                    </InputGroup>
                  ))}
                </div>
              </div>
            </div>
          )}

          {type === "AMB" && (
            <div className="space-y-4 rounded-lg border p-4">
              <Field className="sm:w-1/2">
                <FieldLabel htmlFor="amb-ch">Valor do CH</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>R$</InputGroupAddon>
                  <InputGroupInput
                    id="amb-ch"
                    className="text-right"
                    disabled={isView}
                    value={ambChValue}
                    onChange={(e) =>
                      setAmbChValue(formatarMoeda(e.target.value))
                    }
                  />
                </InputGroup>
              </Field>

              {!isView && (
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={ambAllowRules}
                    onCheckedChange={(checked) =>
                      setAmbAllowRules(checked === true)
                    }
                  />
                  Adicionar regra especial
                </label>
              )}

              {(ambAllowRules || ambSpecialRules.length > 0) && (
                <div className="space-y-3">
                  {!isView && (
                    <div className="flex items-end gap-2">
                      <Field className="flex-1">
                        <FieldLabel htmlFor="amb-regra-codigo">
                          Código
                        </FieldLabel>
                        <Input
                          id="amb-regra-codigo"
                          inputMode="numeric"
                          value={ambNovoCodigo}
                          onChange={(e) =>
                            setAmbNovoCodigo(
                              e.target.value.replace(/\D/g, "")
                            )
                          }
                        />
                      </Field>
                      <Field className="flex-1">
                        <FieldLabel htmlFor="amb-regra-valor">
                          Valor
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupAddon>R$</InputGroupAddon>
                          <InputGroupInput
                            id="amb-regra-valor"
                            className="text-right"
                            value={ambNovoValor}
                            onChange={(e) =>
                              setAmbNovoValor(formatarMoeda(e.target.value))
                            }
                          />
                        </InputGroup>
                      </Field>
                      <Button
                        type="button"
                        size="icon-sm"
                        onClick={adicionarRegraAmb}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  )}

                  {ambSpecialRules.length > 0 && (
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead className="text-right">
                              Valor
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ambSpecialRules.map((regra, index) => (
                            <TableRow key={`${regra.codigo}-${index}`}>
                              <TableCell>{regra.codigo}</TableCell>
                              <TableCell className="text-right">
                                R$ {regra.valor}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {type === "DEFAULT_PROCEDURE" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <FieldLabel>Procedimentos</FieldLabel>

                <div className="flex items-center gap-2">
                  <InputGroup className="w-56">
                    <InputGroupInput
                      placeholder="Buscar código/descrição"
                      value={searchProcedimentos}
                      onChange={(e) =>
                        setSearchProcedimentos(e.target.value)
                      }
                    />
                    <InputGroupAddon align="inline-end">
                      <SearchIcon className="size-4" />
                    </InputGroupAddon>
                  </InputGroup>

                  {!isView && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document
                          .getElementById("procedure-arquivo")
                          ?.click()
                      }
                    >
                      <Upload className="size-4" />
                      Importar tabela
                    </Button>
                  )}
                  <input
                    id="procedure-arquivo"
                    type="file"
                    accept=".xls,.xlsx"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="max-h-72 overflow-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código/Descrição</TableHead>
                      <TableHead className="w-24">Porte</TableHead>
                      <TableHead className="w-28">Uco</TableHead>
                      <TableHead className="w-28">Filme</TableHead>
                      <TableHead className="w-28">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {procedimentosFiltrados.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="h-16 text-center text-muted-foreground"
                        >
                          Nenhum procedimento encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      procedimentosFiltrados.map((proc) => (
                        <TableRow key={proc.codigo}>
                          <TableCell>
                            <span className="font-mono text-xs text-muted-foreground">
                              {proc.codigo}
                            </span>{" "}
                            {proc.descricao}
                          </TableCell>
                          <TableCell>
                            <Input
                              className="w-20 text-right"
                              disabled={isView}
                              value={proc.porte}
                              onChange={(e) =>
                                atualizarProcedimento(
                                  proc.codigo,
                                  "porte",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              className="w-24 text-right"
                              disabled={isView}
                              value={proc.uco}
                              onChange={(e) =>
                                atualizarProcedimento(
                                  proc.codigo,
                                  "uco",
                                  formatarMoeda(e.target.value)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              className="w-24 text-right"
                              disabled={isView}
                              value={proc.filme}
                              onChange={(e) =>
                                atualizarProcedimento(
                                  proc.codigo,
                                  "filme",
                                  formatarMoeda(e.target.value)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              className="w-24 text-right"
                              disabled={isView}
                              value={proc.total}
                              onChange={(e) =>
                                atualizarProcedimento(
                                  proc.codigo,
                                  "total",
                                  formatarMoeda(e.target.value)
                                )
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          {isView ? "Fechar" : "Cancelar"}
        </Button>
        {!isView && (
          <Button type="button" onClick={adicionar}>
            Adicionar
          </Button>
        )}
      </DialogFooter>
    </>
  )
}
