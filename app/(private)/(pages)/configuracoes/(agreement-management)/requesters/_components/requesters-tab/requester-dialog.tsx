"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { formatarCnpj, formatarCpf, formatarTelefone } from "@/lib/masks"

import { CONSELHOS, ESTADOS_UF, type Requester } from "../mock-data"

interface RequesterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  requester: Requester | null
  onSave: (requester: Requester) => void
}

function formatarCpfCnpj(valor: string): string {
  const digitos = valor.replace(/\D/g, "")
  return digitos.length > 11 ? formatarCnpj(valor) : formatarCpf(valor)
}

type RequesterFormValues = Omit<Requester, "id" | "atualizadoEm">

const vazio: RequesterFormValues = {
  nome: "",
  cpfCnpj: "",
  email: "",
  telefone: "",
  cnsCnes: "",
  conselho: "",
  numeroConselho: "",
  uf: "",
  cbo: "",
}

function valoresIniciais(requester: Requester | null): RequesterFormValues {
  if (!requester) return vazio

  return {
    nome: requester.nome,
    cpfCnpj: requester.cpfCnpj,
    email: requester.email,
    telefone: requester.telefone,
    cnsCnes: requester.cnsCnes,
    conselho: requester.conselho,
    numeroConselho: requester.numeroConselho,
    uf: requester.uf,
    cbo: requester.cbo,
  }
}

export function RequesterDialog({
  open,
  onOpenChange,
  requester,
  onSave,
}: RequesterDialogProps) {
  const isEdit = !!requester

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar solicitante" : "Adicionar solicitante"}
          </DialogTitle>
          <DialogDescription>
            Configure os dados do solicitante.
          </DialogDescription>
        </DialogHeader>

        <RequesterForm
          key={requester?.id ?? "new"}
          requester={requester}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface RequesterFormProps {
  requester: Requester | null
  onSave: (requester: Requester) => void
  onCancel: () => void
}

function RequesterForm({ requester, onSave, onCancel }: RequesterFormProps) {
  const isEdit = !!requester
  const [form, setForm] = useState<RequesterFormValues>(() =>
    valoresIniciais(requester)
  )

  const numeroConselhoObrigatorio = form.conselho !== "NAO_POSSUO"

  const salvar = () => {
    if (!form.nome.trim()) return
    if (numeroConselhoObrigatorio && !form.numeroConselho.trim()) return

    onSave({
      id: requester?.id ?? `req-${Date.now()}`,
      ...form,
      atualizadoEm: new Date().toISOString(),
    })
  }

  return (
    <>
      <ScrollArea className="min-h-0">
        <div className="grid gap-4 pr-4 pb-1 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="solicitante-nome">
              Nome completo <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="solicitante-nome"
              maxLength={255}
              value={form.nome}
              onChange={(e) =>
                setForm((f) => ({ ...f, nome: e.target.value }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="solicitante-cpf-cnpj">CPF/CNPJ</FieldLabel>
            <Input
              id="solicitante-cpf-cnpj"
              value={form.cpfCnpj}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  cpfCnpj: formatarCpfCnpj(e.target.value),
                }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="solicitante-email">Email</FieldLabel>
            <Input
              id="solicitante-email"
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="solicitante-telefone">Telefone</FieldLabel>
            <Input
              id="solicitante-telefone"
              maxLength={15}
              value={form.telefone}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  telefone: formatarTelefone(e.target.value),
                }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="solicitante-cns-cnes">CNS/CNES</FieldLabel>
            <Input
              id="solicitante-cns-cnes"
              maxLength={255}
              value={form.cnsCnes}
              onChange={(e) =>
                setForm((f) => ({ ...f, cnsCnes: e.target.value }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="solicitante-conselho">
              Conselho <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={form.conselho || "none"}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, conselho: v === "none" ? "" : v }))
              }
            >
              <SelectTrigger id="solicitante-conselho">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">Selecione</SelectItem>
                  <SelectItem value="NAO_POSSUO">NÃO POSSUO</SelectItem>
                  {CONSELHOS.map((conselho) => (
                    <SelectItem key={conselho} value={conselho}>
                      {conselho}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="solicitante-numero-conselho">
              Número do conselho{" "}
              {numeroConselhoObrigatorio && (
                <span className="text-destructive">*</span>
              )}
            </FieldLabel>
            <Input
              id="solicitante-numero-conselho"
              maxLength={25}
              value={form.numeroConselho}
              onChange={(e) =>
                setForm((f) => ({ ...f, numeroConselho: e.target.value }))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="solicitante-uf">
              UF <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={form.uf || "none"}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, uf: v === "none" ? "" : v }))
              }
            >
              <SelectTrigger id="solicitante-uf">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">Selecione</SelectItem>
                  {ESTADOS_UF.map((uf) => (
                    <SelectItem key={uf} value={uf}>
                      {uf}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="solicitante-cbo">
              CBO <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="solicitante-cbo"
              placeholder="Buscar CBO"
              value={form.cbo}
              onChange={(e) =>
                setForm((f) => ({ ...f, cbo: e.target.value }))
              }
            />
          </Field>
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={salvar}>
          {isEdit ? "Salvar" : "Adicionar"}
        </Button>
      </DialogFooter>
    </>
  )
}
