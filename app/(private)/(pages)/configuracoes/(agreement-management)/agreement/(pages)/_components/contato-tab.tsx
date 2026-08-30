"use client"

import { Controller, type Control, type Path } from "react-hook-form"

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { formatarTelefone } from "@/lib/masks"

import type { ConvenioFormData } from "../../_schemas/convenio.schema"

interface ContatoTabProps {
  control: Control<ConvenioFormData>
}

interface ContatoBlock {
  id: string
  fields: {
    setor: Path<ConvenioFormData>
    nome: Path<ConvenioFormData>
    email: Path<ConvenioFormData>
    telefone: Path<ConvenioFormData>
  }
}

const BLOCOS: ContatoBlock[] = [
  {
    id: "contato-1",
    fields: {
      setor: "contatoSector",
      nome: "contatoName",
      email: "contatoEmail",
      telefone: "contatoPhone",
    },
  },
  {
    id: "contato-2",
    fields: {
      setor: "contatoSector2",
      nome: "contatoName2",
      email: "contatoEmail2",
      telefone: "contatoPhone2",
    },
  },
  {
    id: "contato-3",
    fields: {
      setor: "contatoSector3",
      nome: "contatoName3",
      email: "contatoEmail3",
      telefone: "contatoPhone3",
    },
  },
]

function CampoTexto({
  control,
  name,
  label,
  placeholder,
  inputMode,
  maxLength,
  formatar,
}: {
  control: Control<ConvenioFormData>
  name: Path<ConvenioFormData>
  label: string
  placeholder?: string
  inputMode?: "text" | "numeric"
  maxLength?: number
  formatar?: (valor: string) => string
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            id={field.name}
            placeholder={placeholder}
            inputMode={inputMode}
            maxLength={maxLength}
            value={field.value as string}
            name={field.name}
            ref={field.ref}
            onChange={(event) =>
              field.onChange(
                formatar
                  ? formatar(event.target.value)
                  : event.target.value
              )
            }
            onBlur={field.onBlur}
          />
        </Field>
      )}
    />
  )
}

export function ContatoTab({ control }: ContatoTabProps) {
  return (
    <section className="space-y-6">
      {BLOCOS.map((bloco, index) => (
        <div key={bloco.id}>
          {index > 0 && <hr className="mb-6" />}

          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <CampoTexto
              control={control}
              name={bloco.fields.setor}
              label="Setor"
              placeholder="Setor"
              maxLength={255}
            />

            <CampoTexto
              control={control}
              name={bloco.fields.nome}
              label="Nome do contato"
              placeholder="Nome do contato"
              maxLength={255}
            />

            <CampoTexto
              control={control}
              name={bloco.fields.email}
              label="Email"
              placeholder="Email"
              maxLength={255}
            />

            <CampoTexto
              control={control}
              name={bloco.fields.telefone}
              label="Telefone"
              placeholder="(DDD) número"
              inputMode="numeric"
              maxLength={15}
              formatar={formatarTelefone}
            />
          </FieldGroup>
        </div>
      ))}
    </section>
  )
}
