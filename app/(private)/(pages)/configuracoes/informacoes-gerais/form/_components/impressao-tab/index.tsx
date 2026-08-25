"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import type { ImpressaoFormData } from "../../_schemas/impressao.schema"
import { ConfiguracaoImpressao } from "./configuracao-impressao"
import { EnderecoPrincipal } from "./endereco-principal"
import { EnderecosAlternativos } from "./enderecos-alternativos"

interface ImpressaoTabProps {
  form: UseFormReturn<ImpressaoFormData>
}

type Secao = "geral" | "enderecos"

export function ImpressaoTab({ form }: ImpressaoTabProps) {
  const [secao, setSecao] = useState<Secao>("geral")

  return (
    <div className="space-y-4">
      <ButtonGroup>
        <Button
          type="button"
          variant={secao === "geral" ? "default" : "outline"}
          onClick={() => setSecao("geral")}
        >
          Geral
        </Button>

        <Button
          type="button"
          variant={secao === "enderecos" ? "default" : "outline"}
          onClick={() => setSecao("enderecos")}
        >
          Endereços alternativos
        </Button>
      </ButtonGroup>

      {secao === "geral" ? (
        <div className="space-y-6">
          <EnderecoPrincipal control={form.control} />

          <ConfiguracaoImpressao form={form} />
        </div>
      ) : (
        <EnderecosAlternativos form={form} />
      )}
    </div>
  )
}
