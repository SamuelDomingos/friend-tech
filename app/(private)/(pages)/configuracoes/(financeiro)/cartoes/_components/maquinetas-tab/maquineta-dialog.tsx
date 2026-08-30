"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { BANDEIRAS, CONTAS_BANCARIAS, FAVORECIDOS, GRUPOS_DISPONIVEIS, type Maquineta } from "../dados-mock"

const requiredMark = (
  <span className="text-destructive text-xs font-normal">*</span>
)

interface MaquinetaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  maquineta: Maquineta | null
}

type Section = "MACHINE" | "FLAGS"

export function MaquinetaDialog({ open, onOpenChange, maquineta }: MaquinetaDialogProps) {
  const [section, setSection] = useState<Section>("MACHINE")
  const isEdit = !!maquineta

  const { control, watch } = useForm({
    defaultValues: {
      tipo: maquineta?.tipo ?? "PJ",
      nome: maquineta?.nome ?? "",
      contaBancaria: maquineta?.contaBancaria ?? "",
      favorecido: maquineta?.favorecido ?? "",
      grupo: maquineta?.grupo ?? "",
      imprimirRecibo: maquineta?.imprimirRecibo ?? false,
      prazoDebito: maquineta?.prazoDebito ?? "",
      prazoPrimeiraParcela: maquineta?.prazoPrimeiraParcela ?? "",
      prazoDemaisParcelas: maquineta?.prazoDemaisParcelas ?? "",
      qtdMaxParcelas: maquineta?.qtdMaxParcelas ?? 12,
      taxaAntecipacao: maquineta?.taxaAntecipacao ?? "",
      prazoAntecipacao: maquineta?.prazoAntecipacao ?? "",
      anteciparAutomaticamente: maquineta?.anteciparAutomaticamente ?? false,
      bandeiras: maquineta?.bandeiras ?? [],
    },
  })

  const tipo = watch("tipo")
  const bandeiras = watch("bandeiras")

  const onSubmit = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl flex flex-col">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar maquineta" : "Adicionar maquineta"}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 min-h-0 max-h-auto">
          <div className="space-y-6 pr-4">
            {!isEdit && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Configurações da maquineta</Label>
                <div className="flex gap-2">
                  <div className="h-2 flex-1 rounded-full bg-primary" />
                  <div className="h-2 flex-1 rounded-full bg-muted" />
                </div>
              </div>
            )}

            {isEdit && (
              <ButtonGroup>
                <Button
                  type="button"
                  variant={section === "MACHINE" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSection("MACHINE")}
                >
                  Maquineta
                </Button>
                <Button
                  type="button"
                  variant={section === "FLAGS" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSection("FLAGS")}
                >
                  Bandeira
                </Button>
              </ButtonGroup>
            )}

            {section === "MACHINE" && (
              <div className="space-y-6">
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-6"
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
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <Controller
                    name="nome"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Nome da maquineta {requiredMark}</FieldLabel>
                        <Input {...field} />
                      </Field>
                    )}
                  />

                  {tipo === "PJ" && (
                    <Controller
                      name="contaBancaria"
                      control={control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Conta Bancária {requiredMark}</FieldLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {CONTAS_BANCARIAS.map((conta) => (
                                  <SelectItem key={conta} value={conta}>
                                    {conta}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                    />
                  )}

                  {tipo === "PF" && (
                    <Controller
                      name="favorecido"
                      control={control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Favorecido {requiredMark}</FieldLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {FAVORECIDOS.map((fav) => (
                                  <SelectItem key={fav} value={fav}>
                                    {fav}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                    />
                  )}

                  <Controller
                    name="grupo"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Grupo</FieldLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {GRUPOS_DISPONIVEIS.map((grupo) => (
                                <SelectItem key={grupo} value={grupo}>
                                  {grupo}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </div>

                {tipo === "PJ" && (
                  <Controller
                    name="imprimirRecibo"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        Imprimir recibo no nome do médico em atendimento
                      </label>
                    )}
                  />
                )}

                <div className="grid gap-4 sm:grid-cols-3">
                  <Controller
                    name="prazoDebito"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Prazo débito</FieldLabel>
                        <InputGroup>
                          <InputGroupInput {...field} />
                          <InputGroupAddon align="inline-end">
                            Dias
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    )}
                  />

                  <Controller
                    name="prazoPrimeiraParcela"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Prazo primeira parcela</FieldLabel>
                        <InputGroup>
                          <InputGroupInput {...field} />
                          <InputGroupAddon align="inline-end">
                            Dias
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    )}
                  />

                  <Controller
                    name="prazoDemaisParcelas"
                    control={control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Prazo demais parcelas</FieldLabel>
                        <InputGroup>
                          <InputGroupInput {...field} />
                          <InputGroupAddon align="inline-end">
                            Dias
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  name="qtdMaxParcelas"
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Qtd. máx. parcelas</FieldLabel>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          onClick={() => field.onChange(Math.max(1, field.value - 1))}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min={1}
                          max={24}
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20 text-center"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          onClick={() => field.onChange(Math.min(24, field.value + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </Field>
                  )}
                />

                <div className="space-y-3">
                  <Label className="text-xs font-medium uppercase text-muted-foreground">
                    Configuração de antecipação
                  </Label>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Controller
                      name="taxaAntecipacao"
                      control={control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Taxa para antecipação</FieldLabel>
                          <InputGroup>
                            <InputGroupInput {...field} />
                            <InputGroupAddon align="inline-end">
                              %
                            </InputGroupAddon>
                          </InputGroup>
                        </Field>
                      )}
                    />

                    <Controller
                      name="prazoAntecipacao"
                      control={control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Prazo para antecipação</FieldLabel>
                          <InputGroup>
                            <InputGroupInput {...field} />
                            <InputGroupAddon align="inline-end">
                              Dias
                            </InputGroupAddon>
                          </InputGroup>
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    name="anteciparAutomaticamente"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        Antecipar automaticamente
                      </label>
                    )}
                  />
                </div>
              </div>
            )}

            {section === "FLAGS" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <FieldLabel>Selecione as bandeiras aceitas {requiredMark}</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {BANDEIRAS.map((bandeira) => (
                      <Button
                        key={bandeira}
                        type="button"
                        variant="outline"
                        size="sm"
                        className={bandeiras.includes(bandeira) ? "border-primary bg-primary/10" : ""}
                      >
                        {bandeira}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase text-muted-foreground">
                    Configure as taxas para as bandeiras selecionadas
                  </Label>

                  <Accordion className="border rounded-md" type="multiple" defaultValue={["debito", "credito", "pix"]}>
                    <AccordionItem value="debito">
                      <AccordionTrigger className="hover:no-underline cursor-default px-2">
                        Débito
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-4 sm:grid-cols-3 px-2 pb-4">
                          <Field>
                            <FieldLabel>Taxa de débito</FieldLabel>
                            <InputGroup>
                              <InputGroupInput />
                              <InputGroupAddon align="inline-end">%</InputGroupAddon>
                            </InputGroup>
                          </Field>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="credito">
                      <AccordionTrigger className="hover:no-underline cursor-default px-2">
                        Crédito
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-4 sm:grid-cols-6 px-2 pb-4">
                          {Array.from({ length: 12 }, (_, i) => (
                            <Field key={i}>
                              <FieldLabel className="text-xs">Taxa {i + 1}x</FieldLabel>
                              <InputGroup>
                                <InputGroupInput className="text-xs" />
                                <InputGroupAddon align="inline-end" className="text-xs">%</InputGroupAddon>
                              </InputGroup>
                            </Field>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="pix">
                      <AccordionTrigger className="hover:no-underline cursor-default px-2">
                        Pix
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-4 sm:grid-cols-3 px-2 pb-4">
                          <Field>
                            <FieldLabel>Taxa de pix</FieldLabel>
                            <InputGroup>
                              <InputGroupInput />
                              <InputGroupAddon align="inline-end">%</InputGroupAddon>
                            </InputGroup>
                          </Field>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="button" onClick={onSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
