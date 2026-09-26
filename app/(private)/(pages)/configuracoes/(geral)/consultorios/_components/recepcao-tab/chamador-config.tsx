"use client"

import { Controller } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import { Copy, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { RecepcaoFormData } from "../../_schemas/recepcao.schema"

const OPCOES_IDENTIFICACAO = [
  {
    value: "nome_completo",
    label:
      "Chamar pelo nome completo (ou nome social, quando houver)",
  },
  {
    value: "cpf",
    label: "Chamar pelo CPF (ocultando os 5 últimos dígitos)",
  },
  {
    value: "primeiro_nome",
    label:
      "Chamar pelo primeiro nome (ou primeiro nome social, quando houver) abreviando o(s) sobrenome(s)",
  },
]

function gerarCodigoChamado() {
  return String(Math.floor(1000000 + Math.random() * 9000000))
}

export function ChamadorConfig({
  form,
}: {
  form: UseFormReturn<RecepcaoFormData>
}) {
  const habilitado = form.watch("habilitarChamador")
  const codigoChamado = form.watch("codigoChamado")

  const atualizarCodigo = () => {
    form.setValue("codigoChamado", gerarCodigoChamado())
  }

  const copiarCodigo = async () => {
    if (codigoChamado) {
      await navigator.clipboard.writeText(codigoChamado)
    }
  }

  return (
    <div className="space-y-3 rounded-lg border p-3">
      <p className="text-sm font-medium">Configurações de chamador</p>

      <Controller
        name="habilitarChamador"
        control={form.control}
        render={({ field }) => (
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
            <Checkbox
              checked={field.value}
              onCheckedChange={(c) => {
                const next = Boolean(c)

                field.onChange(next)

                if (next && !form.getValues("codigoChamado")) {
                  form.setValue("codigoChamado", gerarCodigoChamado())
                }
              }}
            />
            Habilitar chamador
          </label>
        )}
      />

      {habilitado && (
        <div className="space-y-3">
          <Field>
            <FieldLabel htmlFor="codigo-chamado">Código de chamado</FieldLabel>

            <InputGroup>
              <InputGroupInput
                id="codigo-chamado"
                readOnly
                value={codigoChamado}
                className="font-mono tracking-widest"
              />

              <InputGroupAddon align="inline-end" className="gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={atualizarCodigo}
                      aria-label="Atualizar código de chamado"
                    >
                      <RefreshCw className="size-3.5" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>Atualizar código</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={copiarCodigo}
                      aria-label="Copiar código de chamado"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>Copiar código</TooltipContent>
                </Tooltip>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Controller
            name="exibirHistorico"
            control={form.control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(c) => field.onChange(Boolean(c))}
                />
                Exibir histórico no chamador
              </label>
            )}
          />

          <Controller
            name="preferenciaIdentificacao"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Preferência para identificação do paciente
                </FieldLabel>

                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  {OPCOES_IDENTIFICACAO.map((opcao) => (
                    <label
                      key={opcao.value}
                      className="flex cursor-pointer items-start gap-2 text-sm font-medium"
                    >
                      <RadioGroupItem
                        value={opcao.value}
                        id={opcao.value}
                        className="mt-0.5"
                      />
                      <span>{opcao.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </Field>
            )}
          />
        </div>
      )}
    </div>
  )
}
