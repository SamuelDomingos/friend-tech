"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { daDataISO, paraDataISO } from "@/lib/masks"

const TIPOS_REPASSE = ["Procedimento", "Mat/Med"]
const TIPOS_PROFISSIONAL = ["Executante", "Solicitante"]

export interface FiltrosRepasse {
  inicioVigencia: string
  fimVigencia: string
  tipoRepasse: string
  tipoProfissional: string
  status: {
    emVigencia: boolean
    aguardando: boolean
    desativado: boolean
    expirado: boolean
  }
}

export const FILTROS_INICIAIS: FiltrosRepasse = {
  inicioVigencia: "",
  fimVigencia: "",
  tipoRepasse: "",
  tipoProfissional: "",
  status: {
    emVigencia: true,
    aguardando: true,
    desativado: true,
    expirado: true,
  },
}

interface FiltrosDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial: FiltrosRepasse
  onApply: (filtros: FiltrosRepasse) => void
  onLimpar: () => void
}

export function FiltrosDrawer({
  open,
  onOpenChange,
  initial,
  onApply,
  onLimpar,
}: FiltrosDrawerProps) {
  const [draft, setDraft] = useState<FiltrosRepasse>(initial)

  const set = (campo: Partial<FiltrosRepasse>) =>
    setDraft((atual) => ({ ...atual, ...campo }))

  const toggleStatus = (chave: keyof FiltrosRepasse["status"]) =>
    setDraft((atual) => ({
      ...atual,
      status: { ...atual.status, [chave]: !atual.status[chave] },
    }))

  const aplicar = () => {
    onApply(draft)
    onOpenChange(false)
  }

  const limpar = () => {
    const limpo = {
      inicioVigencia: "",
      fimVigencia: "",
      tipoRepasse: "",
      tipoProfissional: "",
      status: {
        emVigencia: true,
        aguardando: true,
        desativado: true,
        expirado: true,
      },
    }
    setDraft(limpo)
    onLimpar()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filtros avançados</SheetTitle>
          <SheetDescription>
            Refine a listagem das regras de repasse.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4">
          <div className="grid grid-cols-2 gap-2">
            <Field>
              <FieldLabel>Início da vigência</FieldLabel>

              <DatePicker
                value={daDataISO(draft.inicioVigencia)}
                onChange={(data) =>
                  set({ inicioVigencia: data ? paraDataISO(data) : "" })
                }
                placeholder="dd/mm/aaaa"
              />
            </Field>

            <Field>
              <FieldLabel>Fim da vigência</FieldLabel>

              <DatePicker
                value={daDataISO(draft.fimVigencia)}
                onChange={(data) =>
                  set({ fimVigencia: data ? paraDataISO(data) : "" })
                }
                placeholder="dd/mm/aaaa"
              />
            </Field>
          </div>

          <Field>
            <FieldLabel>Tipo de repasse</FieldLabel>

            <Select
              value={draft.tipoRepasse}
              onValueChange={(v) => set({ tipoRepasse: v })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {TIPOS_REPASSE.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Tipo de profissional</FieldLabel>

            <Select
              value={draft.tipoProfissional}
              onValueChange={(v) => set({ tipoProfissional: v })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {TIPOS_PROFISSIONAL.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Status</FieldLabel>

            <div className="space-y-2">
              {(
                [
                  { chave: "emVigencia", label: "Em vigência" },
                  { chave: "aguardando", label: "Aguardando" },
                  { chave: "desativado", label: "Desativado" },
                  { chave: "expirado", label: "Expirado" },
                ] as const
              ).map(({ chave, label }) => (
                <label
                  key={chave}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={draft.status[chave]}
                    onCheckedChange={() => toggleStatus(chave)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </Field>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex w-full items-center justify-between gap-2">
            <Button type="button" variant="ghost" onClick={limpar}>
              <Trash2 data-icon="inline-start" />
              Limpar
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>

              <Button type="button" onClick={aplicar}>
                Aplicar filtros
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
