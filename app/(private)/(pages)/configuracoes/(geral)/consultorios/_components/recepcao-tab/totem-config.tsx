"use client"

import { Controller } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Item, ItemContent, ItemGroup } from "@/components/ui/item"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { RecepcaoFormData } from "../../_schemas/recepcao.schema"

interface TotemConfigProps {
  form: UseFormReturn<RecepcaoFormData>
}

export function TotemConfig({ form }: TotemConfigProps) {
  const habilitado = form.watch("habilitarTotem")
  const qtdGuiches = form.watch("qtdGuiches")
  const tiposSenha = form.watch("tiposSenha")

  const quantidade = Math.min(Number(qtdGuiches) || 0, 10)

  const atualizarQtdGuiches = (value: string) => {
    const digitos = value.replace(/\D/g, "").slice(0, 2)
    const numero = Number(digitos)

    form.setValue("qtdGuiches", numero > 10 ? "10" : digitos)
  }

  const atualizarItem = (
    id: string,
    patch: Partial<RecepcaoFormData["tiposSenha"][number]>
  ) => {
    form.setValue(
      "tiposSenha",
      form
        .getValues("tiposSenha")
        .map((item) => (item.id === id ? { ...item, ...patch } : item))
    )
  }

  const adicionarTipoSenha = () => {
    form.setValue("tiposSenha", [
      ...form.getValues("tiposSenha"),
      {
        id: crypto.randomUUID(),
        habilitado: true,
        nome: "",
        preferencia: false,
      },
    ])
  }

  const removerTipoSenha = (id: string) => {
    form.setValue(
      "tiposSenha",
      form.getValues("tiposSenha").filter((item) => item.id !== id)
    )
  }

  return (
    <div className="space-y-3 rounded-lg border p-3">
      <p className="text-sm font-medium">Configurações de totem</p>

      <Controller
        name="habilitarTotem"
        control={form.control}
        render={({ field }) => (
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
            <Checkbox
              checked={field.value}
              onCheckedChange={(c) => field.onChange(Boolean(c))}
            />
            Habilitar totem
          </label>
        )}
      />

      {habilitado && (
        <div className="space-y-3">
          <Controller
            name="marcarPresenteCpf"
            control={form.control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(c) => field.onChange(Boolean(c))}
                />
                Marcar atendimentos como presente após informar o CPF
              </label>
            )}
          />

          <Controller
            name="qtdGuiches"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Quantidade de guichês
                </FieldLabel>

                <InputGroup className="max-w-32">
                  <InputGroupInput
                    id={field.name}
                    value={field.value}
                    inputMode="numeric"
                    placeholder="Ex.: 3"
                    onChange={(e) => atualizarQtdGuiches(e.target.value)}
                  />
                </InputGroup>
              </Field>
            )}
          />

          {quantidade > 0 && (
            <>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">Configurações de Guichê</p>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={adicionarTipoSenha}
                >
                  <Plus className="size-4" />
                  Adicionar
                </Button>
              </div>

              <Tabs defaultValue="guiche-1">
                <TabsList
                  variant="line"
                >
                  {Array.from({ length: quantidade }, (_, index) => (
                    <TabsTrigger
                      key={index}
                      value={`guiche-${index + 1}`}
                    >
                      Guichê {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Array.from({ length: quantidade }, (_, index) => (
                  <TabsContent
                    key={index}
                    value={`guiche-${index + 1}`}
                    className="pt-1"
                  >
                    <ItemGroup className="gap-2">
                      {tiposSenha.map((item) => (
                        <Item key={item.id} variant="outline">
                          <Switch
                            checked={item.habilitado}
                            onCheckedChange={(c) =>
                              atualizarItem(item.id, {
                                habilitado: Boolean(c),
                              })
                            }
                            aria-label="Habilitar tipo de senha"
                          />

                          <ItemContent>
                            <InputGroup data-disabled={!item.habilitado}>
                              <InputGroupInput
                                value={item.nome}
                                placeholder="Tipos de senhas"
                                disabled={!item.habilitado}
                                onChange={(e) =>
                                  atualizarItem(item.id, {
                                    nome: e.target.value,
                                  })
                                }
                              />
                            </InputGroup>
                          </ItemContent>

                          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                            <Checkbox
                              checked={item.preferencia}
                              onCheckedChange={(c) =>
                                atualizarItem(item.id, {
                                  preferencia: Boolean(c),
                                })
                              }
                            />
                            Preferência
                          </label>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => removerTipoSenha(item.id)}
                                aria-label="Remover tipo de senha"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TooltipTrigger>

                            <TooltipContent>Remover</TooltipContent>
                          </Tooltip>
                        </Item>
                      ))}
                    </ItemGroup>
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}
        </div>
      )}
    </div>
  )
}
