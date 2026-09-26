"use client"

import { Plus, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import type { ProcedimentoExame } from "../../../../dados-mock"
import { BuscaProcedimento } from "../busca-procedimento"
import type { EstadoSolicitacaoGuia } from "."

interface ProcedimentosExameProps {
  estado: EstadoSolicitacaoGuia
  onChange: (patch: Partial<EstadoSolicitacaoGuia>) => void
}

export function ProcedimentosExame({
  estado,
  onChange,
}: ProcedimentosExameProps) {
  function selecionarProcedimento(procedimento: ProcedimentoExame) {
    onChange({
      codigo: procedimento.codigo,
      descricao: procedimento.descricao,
    })
  }

  function adicionarProcedimento() {
    const codigo = estado.codigo.trim()
    const descricao = estado.descricao.trim()

    if (!codigo && !descricao) {
      toast("Informe o código ou a descrição do procedimento.")
      return
    }

    const quantidade = Math.max(
      1,
      Number.parseInt(estado.quantidade, 10) || 1
    )

    onChange({
      procedimentos: [
        ...estado.procedimentos,
        { codigo, descricao, quantidade },
      ],
      codigo: "",
      descricao: "",
      quantidade: "1",
    })
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-[130px_1fr_110px_auto]">
        <Field>
          <FieldLabel className="text-xs text-muted-foreground">
            Código
          </FieldLabel>
          <Input
            inputMode="numeric"
            placeholder="Código TUSS"
            value={estado.codigo}
            onChange={(event) =>
              onChange({ codigo: event.target.value.replace(/\D/g, "") })
            }
          />
        </Field>

        <Field>
          <FieldLabel className="text-xs text-muted-foreground">
            Descrição
          </FieldLabel>
          <BuscaProcedimento
            valor={estado.descricao}
            placeholder="Descrição"
            onTexto={(texto) => onChange({ descricao: texto })}
            onSelecionar={selecionarProcedimento}
          />
        </Field>

        <Field>
          <FieldLabel className="text-xs text-muted-foreground">
            Quantidade
          </FieldLabel>
          <Input
            inputMode="numeric"
            placeholder="Quantidade"
            value={estado.quantidade}
            onChange={(event) =>
              onChange({ quantidade: event.target.value.replace(/\D/g, "") })
            }
          />
        </Field>

        <div className="flex items-end">
          <Button
            type="button"
            size="sm"
            onClick={adicionarProcedimento}
            disabled={!estado.codigo.trim() && !estado.descricao.trim()}
          >
            <Plus className="size-4" />
            Adicionar
          </Button>
        </div>
      </div>

      <Card size="sm" className="gap-0 py-0">
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-sm font-semibold">
            {estado.procedimentos.length} PROCEDIMENTO
            {estado.procedimentos.length === 1 ? "" : "S"}
          </CardTitle>
        </CardHeader>

        {estado.procedimentos.length === 0 ? (
          <CardContent className="border-t px-4 py-6">
            <p className="text-center text-sm text-muted-foreground">
              Nenhum procedimento adicionado
            </p>
          </CardContent>
        ) : (
          <CardContent className="border-t p-0">
            <ul>
              {estado.procedimentos.map((procedimento, index) => (
                <li
                  key={`${procedimento.codigo}-${procedimento.descricao}-${index}`}
                  className="flex items-center justify-between gap-3 border-b px-4 py-2.5 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm">
                      {procedimento.descricao || "Procedimento"}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {procedimento.codigo || "—"} · qtd{" "}
                      {procedimento.quantidade}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remover ${procedimento.descricao}`}
                    onClick={() =>
                      onChange({
                        procedimentos: estado.procedimentos.filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                  >
                    <X className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
