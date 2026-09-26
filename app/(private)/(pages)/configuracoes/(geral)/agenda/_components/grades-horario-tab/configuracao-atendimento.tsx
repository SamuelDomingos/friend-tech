"use client"

import { Copy } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import type { GradeHorarioFormData } from "../../_schemas/grade-horario.schema"

interface ConfiguracaoAtendimentoProps {
  form: UseFormReturn<GradeHorarioFormData>
}

export function ConfiguracaoAtendimento({
  form,
}: ConfiguracaoAtendimentoProps) {
  const dias = form.watch("dias")

  const updateDia = (
    key: string,
    patch: Partial<GradeHorarioFormData["dias"][number]>
  ) => {
    form.setValue(
      "dias",
      form.getValues("dias").map((dia) =>
        dia.key === key ? { ...dia, ...patch } : dia
      )
    )
  }

  const todosAtivos = dias.length > 0 && dias.every((dia) => dia.ativo)
  const algumAtivo = dias.some((dia) => dia.ativo)

  const todosDiaTodo =
    dias.length > 0 &&
    dias.every(
      (dia) => dia.inicio === "07:00" && dia.final === "22:00"
    )

  const toggleTodosDias = (checked: boolean) => {
    form.setValue(
      "dias",
      form.getValues("dias").map((dia) => ({ ...dia, ativo: checked }))
    )
  }

  const toggleDiaTodo = (checked: boolean) => {
    form.setValue(
      "dias",
      form.getValues("dias").map((dia) => ({
        ...dia,
        inicio: checked ? "07:00" : "",
        final: checked ? "22:00" : "",
      }))
    )
  }

  const copiarHorarios = (key: string) => {
    const diasAtuais = form.getValues("dias")
    const origem = diasAtuais.find((dia) => dia.key === key)

    if (!origem?.ativo) return

    form.setValue(
      "dias",
      diasAtuais.map((dia) =>
        dia.ativo && dia.key !== key
          ? { ...dia, inicio: origem.inicio, final: origem.final }
          : dia
      )
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">Configurações do atendimento</p>

        <div className="flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
            <Checkbox
              checked={todosAtivos ? true : algumAtivo ? "indeterminate" : false}
              onCheckedChange={(c) => toggleTodosDias(Boolean(c))}
            />
            Todos os dias da semana
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
            <Checkbox
              checked={
                todosDiaTodo ? true : algumAtivo ? "indeterminate" : false
              }
              onCheckedChange={(c) => toggleDiaTodo(Boolean(c))}
            />
            O dia todo
          </label>
        </div>
      </div>

      <ItemGroup className="gap-2">
        {dias.map((dia) => {
          const ativo = dia.ativo
          const temOutroAtivo = dias.some(
            (outro) => outro.ativo && outro.key !== dia.key
          )

          return (
            <Item
              key={dia.key}
              variant="outline"
              data-inactive={!ativo}
              className={cn(!ativo && "opacity-50")}
            >
              <Switch
                checked={ativo}
                onCheckedChange={(c) => updateDia(dia.key, { ativo: Boolean(c) })}
                aria-label={`Habilitar ${dia.rotulo}`}
              />

              <ItemContent>
                <ItemTitle>{dia.rotulo}</ItemTitle>
              </ItemContent>

              <InputGroup className="w-28" data-disabled={!ativo}>
                <InputGroupInput
                  type="time"
                  value={dia.inicio}
                  disabled={!ativo}
                  onChange={(e) => updateDia(dia.key, { inicio: e.target.value })}
                  aria-label={`Início de ${dia.rotulo}`}
                />
              </InputGroup>

              <InputGroup className="w-28" data-disabled={!ativo}>
                <InputGroupInput
                  type="time"
                  value={dia.final}
                  disabled={!ativo}
                  onChange={(e) => updateDia(dia.key, { final: e.target.value })}
                  aria-label={`Final de ${dia.rotulo}`}
                />
              </InputGroup>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    onClick={() => copiarHorarios(dia.key)}
                    disabled={!ativo || !temOutroAtivo}
                    aria-label={`Copiar horário de ${dia.rotulo} para os outros dias ativos`}
                  >
                    <Copy />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Copiar horário para os outros dias ativos
                </TooltipContent>
              </Tooltip>
            </Item>
          )
        })}
      </ItemGroup>
    </div>
  )
}
