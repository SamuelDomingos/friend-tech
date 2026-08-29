"use client"

import { Controller } from "react-hook-form"
import { toast } from "sonner"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { useGeralForm } from "../../_hooks/use-geral-form"
import { INTEGRACOES_PACS, OPCOES_LOGO } from "../../_schemas/geral.schema"

export function GeralTab() {
  const { form } = useGeralForm()
  const { control, handleSubmit, watch } = form

  const integracaoPacs = watch("integracaoPacs")
  const logoImpressao = watch("logoImpressao")

  const onSubmit = () => {
    toast("Alterações salvas.")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Controller
          name="integracaoPacs"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Integração com PACS</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={field.name} className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {INTEGRACOES_PACS.map((opcao) => (
                      <SelectItem key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="urlResultado"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Url do resultado</FieldLabel>

              <Input id={field.name} placeholder="https://..." {...field} />

              <FieldDescription>
                https://www.resultados.app.br/
              </FieldDescription>
            </Field>
          )}
        />
      </FieldGroup>

      {integracaoPacs === "IMAGE_RIS" && (
        <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Controller
            name="risLogin"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Login</FieldLabel>

                <Input id={field.name} {...field} />
              </Field>
            )}
          />

          <Controller
            name="risSenha"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Senha</FieldLabel>

                <Input id={field.name} type="password" {...field} />
              </Field>
            )}
          />
        </FieldGroup>
      )}

      <FieldGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Controller
          name="logoImpressao"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Logo para impressão</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={field.name} className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {OPCOES_LOGO.map((opcao) => (
                      <SelectItem key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="cabecalhoPaciente"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-3 pb-1 sm:mt-6">
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label="Cabeçalho do paciente no laudo"
              />

              <span className="text-sm font-medium">
                Cabeçalho do paciente no laudo
              </span>
            </div>
          )}
        />
      </FieldGroup>

      {logoImpressao === "LOGO_CUSTOM" && (
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" size="sm">
            <Upload data-icon="inline-start" />
            Carregar logo
          </Button>

          <span className="text-xs text-muted-foreground">
            *Altura máxima permitida 55 pixels
          </span>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit">Salvar alterações</Button>
      </div>
    </form>
  )
}
