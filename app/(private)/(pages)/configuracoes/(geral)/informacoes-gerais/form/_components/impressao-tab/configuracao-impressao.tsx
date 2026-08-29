"use client"

import { useRef, useState } from "react"
import { Controller } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import { Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import {
  POSICOES_LOGO,
  POSICOES_QR_CODE,
} from "../../_schemas/impressao.schema"
import type { ImpressaoFormData } from "../../_schemas/impressao.schema"

interface ConfiguracaoImpressaoProps {
  form: UseFormReturn<ImpressaoFormData>
}

const switchConfigs = [
  { name: "esconderCabecalho", label: "Esconder Cabeçalho" },
  { name: "esconderRodape", label: "Esconder Rodapé" },
  { name: "esconderCabecalhoPaciente", label: "Esconder cabeçalho do paciente" },
  { name: "margemSuperiorPersonalizada", label: "Margem superior personalizada" },
  { name: "personalizarTamanhoFonte", label: "Personalizar tamanho da fonte da receita" },
] as const

export function ConfiguracaoImpressao({ form }: ConfiguracaoImpressaoProps) {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [logoNome, setLogoNome] = useState(form.getValues("logoPadrao"))
  const { control } = form

  const removerLogo = () => {
    setLogoNome("")
    if (inputFileRef.current) {
      inputFileRef.current.value = ""
    }
    form.setValue("logoPadrao", "")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">Configuração de impressão</h3>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Controller
          name="posicaoQrCode"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Posição do QR Code</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {POSICOES_QR_CODE.map((posicao) => (
                    <SelectItem key={posicao} value={posicao}>
                      {posicao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="margemEsquerda"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Margem esquerda</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  inputMode="numeric"
                />
                <InputGroupText data-align="inline-end">mm</InputGroupText>
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="posicaoLogo"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Posição da logo</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {POSICOES_LOGO.map((posicao) => (
                    <SelectItem key={posicao} value={posicao}>
                      {posicao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Field>
          <FieldLabel>Logo Padrão</FieldLabel>

          <div className="flex items-center gap-2">
            <input
              ref={inputFileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const arquivo = e.target.files?.[0]
                setLogoNome(arquivo?.name ?? "")
                form.setValue("logoPadrao", arquivo?.name ?? "")
              }}
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => inputFileRef.current?.click()}
            >
              <Upload className="size-4" />
              {logoNome || "Enviar logo"}
            </Button>

            {logoNome && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={removerLogo}
                aria-label="Remover logo"
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {switchConfigs.map((config) => (
          <Controller
            key={config.name}
            name={config.name}
            control={control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <Switch
                  checked={field.value}
                  onCheckedChange={(c) => field.onChange(Boolean(c))}
                />
                {config.label}
              </label>
            )}
          />
        ))}
      </div>
    </div>
  )
}
