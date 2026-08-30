"use client"

import { useState } from "react"
import { Controller, type Control } from "react-hook-form"
import { Info, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { ConvenioFormData } from "../../_schemas/convenio.schema"

interface RegraUrgencia {
  id: string
  dias: string
  feriados: string
  horaInicio: string
  horaFim: string
  qtdProcedimentos: string
  porcentagem: string
}

const regrasMock: RegraUrgencia[] = [
  {
    id: "u1",
    dias: "Sábado e Domingo",
    feriados: "Sim",
    horaInicio: "08:00",
    horaFim: "18:00",
    qtdProcedimentos: "1",
    porcentagem: "50",
  },
]

const DIA_OPTIONS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

interface UrgenciaTabProps {
  control: Control<ConvenioFormData>
}

export function UrgenciaTab({ control }: UrgenciaTabProps) {
  const [regras, setRegras] = useState<RegraUrgencia[]>(regrasMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<RegraUrgencia>({
    id: "",
    dias: "",
    feriados: "",
    horaInicio: "",
    horaFim: "",
    qtdProcedimentos: "",
    porcentagem: "",
  })

  const abrirModal = (regra?: RegraUrgencia) => {
    setForm(
      regra ?? {
        id: "",
        dias: "",
        feriados: "",
        horaInicio: "",
        horaFim: "",
        qtdProcedimentos: "",
        porcentagem: "",
      }
    )
    setModalOpen(true)
  }

  const salvar = () => {
    if (form.id) {
      setRegras((atual) =>
        atual.map((r) => (r.id === form.id ? form : r))
      )
    } else {
      setRegras((atual) => [...atual, { ...form, id: `u-${Date.now()}` }])
    }
    setModalOpen(false)
  }

  const remover = (id: string) => {
    setRegras((atual) => atual.filter((r) => r.id !== id))
  }

  return (
    <section className="space-y-6">
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              Exibir percentual de regra em Red/Acrésc
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" aria-label="Informação">
                  <Info className="size-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                Esta regra altera o funcionamento do valor com regra de
                urgência. Caso desativada, a regra afetará o valor unitário
                exclusivamente. Caso ativa, a regra afetará o campo Red/Acrésc.
                em porcentagem.
              </TooltipContent>
            </Tooltip>
          </div>

          <Controller
            name="showPercentRedAcr"
            control={control}
            render={({ field }) => (
              <Switch
                id={field.name}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">Regras de urgência</h3>

          <Button onClick={() => abrirModal()}>
            <Plus className="size-4" />
            Adicionar
          </Button>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dia(s)</TableHead>
                <TableHead>Feriado(s)</TableHead>
                <TableHead>Hora Início</TableHead>
                <TableHead>Hora Fim</TableHead>
                <TableHead>Qtd. Procedimentos</TableHead>
                <TableHead className="text-right">Porcentagem %</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regras.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Nenhuma regra de urgência cadastrada
                  </TableCell>
                </TableRow>
              ) : (
                regras.map((regra) => (
                  <TableRow key={regra.id}>
                    <TableCell>{regra.dias || "—"}</TableCell>
                    <TableCell>{regra.feriados || "—"}</TableCell>
                    <TableCell>{regra.horaInicio || "—"}</TableCell>
                    <TableCell>{regra.horaFim || "—"}</TableCell>
                    <TableCell>{regra.qtdProcedimentos || "—"}</TableCell>
                    <TableCell className="text-right">
                      {regra.porcentagem || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label="Ações"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => abrirModal(regra)}>
                            <Pencil className="size-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => remover(regra.id)}
                          >
                            <Trash2 className="size-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {form.id ? "Editar regra de urgência" : "Nova regra de urgência"}
            </DialogTitle>
            <DialogDescription>
              Configure a regra de urgência para este convênio.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="urg-dias">Dia(s)</FieldLabel>
              <Select
                value={form.dias}
                onValueChange={(v) => setForm((f) => ({ ...f, dias: v }))}
              >
                <SelectTrigger id="urg-dias">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {DIA_OPTIONS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="urg-feriados">Feriado(s)</FieldLabel>
              <Select
                value={form.feriados}
                onValueChange={(v) => setForm((f) => ({ ...f, feriados: v }))}
              >
                <SelectTrigger id="urg-feriados">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sim">Sim</SelectItem>
                  <SelectItem value="Não">Não</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="urg-inicio">Hora Início</FieldLabel>
              <Input
                id="urg-inicio"
                placeholder="HH:mm"
                value={form.horaInicio}
                onChange={(e) =>
                  setForm((f) => ({ ...f, horaInicio: e.target.value }))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="urg-fim">Hora Fim</FieldLabel>
              <Input
                id="urg-fim"
                placeholder="HH:mm"
                value={form.horaFim}
                onChange={(e) =>
                  setForm((f) => ({ ...f, horaFim: e.target.value }))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="urg-qtd">Qtd. Procedimentos</FieldLabel>
              <Input
                id="urg-qtd"
                inputMode="numeric"
                value={form.qtdProcedimentos}
                onChange={(e) =>
                  setForm((f) => ({ ...f, qtdProcedimentos: e.target.value }))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="urg-pct">Porcentagem %</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="urg-pct"
                  inputMode="decimal"
                  className="text-right"
                  value={form.porcentagem}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, porcentagem: e.target.value }))
                  }
                />
                <InputGroupAddon align="inline-end">%</InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={salvar}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
