"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { CampoFormulario } from "../../../dados-mock"

interface RegistroCamposProps {
  campos: CampoFormulario[]
  valores: Record<string, string | string[]>
  onChange: (id: string, valor: string | string[]) => void
}

export function RegistroCampos({
  campos,
  valores,
  onChange,
}: RegistroCamposProps) {
  return (
    <FieldGroup className="gap-4">
      {campos.map((campo) => {
        if (campo.tipo === "INPUT") {
          return (
            <Field key={campo.id}>
              <FieldLabel>{campo.titulo}</FieldLabel>
              <Input
                placeholder={campo.placeholder ?? "Escreva sua resposta aqui..."}
                value={(valores[campo.id] as string) ?? ""}
                onChange={(e) => onChange(campo.id, e.target.value)}
              />
            </Field>
          )
        }

        if (campo.tipo === "MULTIPLE") {
          const selecionados = (valores[campo.id] as string[]) ?? []

          return (
            <Field key={campo.id}>
              <FieldLabel>{campo.titulo}</FieldLabel>
              <div className="grid gap-2 sm:grid-cols-2">
                {campo.opcoes.map((opcao) => (
                  <label
                    key={opcao}
                    className="flex items-start gap-2 rounded-md border p-2 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <Checkbox
                      checked={selecionados.includes(opcao)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onChange(campo.id, [...selecionados, opcao])
                        } else {
                          onChange(
                            campo.id,
                            selecionados.filter((s) => s !== opcao)
                          )
                        }
                      }}
                      className="mt-0.5"
                    />
                    <span className="text-sm">{opcao}</span>
                  </label>
                ))}
              </div>
            </Field>
          )
        }

        if (campo.tipo === "SELECT") {
          return (
            <Field key={campo.id}>
              <FieldLabel>{campo.titulo}</FieldLabel>
              <Select
                value={(valores[campo.id] as string) ?? ""}
                onValueChange={(v) => onChange(campo.id, v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {campo.opcoes.map((opcao) => (
                    <SelectItem key={opcao} value={opcao}>
                      {opcao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )
        }

        return null
      })}
    </FieldGroup>
  )
}
