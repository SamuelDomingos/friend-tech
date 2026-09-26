 "use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

import { TIPOS_GUIA } from "../../_schemas/convenio.schema"

interface Procedimento {
  id: string
  codigo: string
  nomeExibicao: string
  tipoGuia: string
  valor: string
  pessoaFisica: boolean
  naoSeAplica: boolean
}

const procedimentosMock: Procedimento[] = [
  {
    id: "pr1",
    codigo: "30802010",
    nomeExibicao: "Consulta médica",
    tipoGuia: "consulta",
    valor: "150,00",
    pessoaFisica: false,
    naoSeAplica: false,
  },
  {
    id: "pr2",
    codigo: "40101012",
    nomeExibicao: "Hemograma completo",
    tipoGuia: "sadt",
    valor: "45,00",
    pessoaFisica: true,
    naoSeAplica: false,
  },
]

export function ProcedimentosTab() {
  const [procedimentos, setProcedimentos] =
    useState<Procedimento[]>(procedimentosMock)

  const atualizar = (id: string, campo: keyof Procedimento, valor: unknown) => {
    setProcedimentos((atual) =>
      atual.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    )
  }

  const adicionar = () => {
    setProcedimentos((atual) => [
      ...atual,
      {
        id: `pr-${Date.now()}`,
        codigo: "",
        nomeExibicao: "",
        tipoGuia: "",
        valor: "",
        pessoaFisica: false,
        naoSeAplica: false,
      },
    ])
  }

  const remover = (id: string) => {
    setProcedimentos((atual) => atual.filter((p) => p.id !== id))
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-end">
        <Button type="button" onClick={adicionar}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome de exibição</TableHead>
              <TableHead>Tipo de Guia</TableHead>
              <TableHead className="w-28">Valor</TableHead>
              <TableHead className="text-center">Pessoa Física</TableHead>
              <TableHead className="text-center">Não se aplica</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {procedimentos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum procedimento cadastrado
                </TableCell>
              </TableRow>
            ) : (
              procedimentos.map((proc) => (
                <TableRow key={proc.id}>
                  <TableCell className="w-28 font-mono text-sm">
                    {proc.codigo || "—"}
                  </TableCell>
                  <TableCell className="min-w-40">
                    {proc.nomeExibicao || "—"}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={proc.tipoGuia}
                      onValueChange={(v) => atualizar(proc.id, "tipoGuia", v)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {TIPOS_GUIA.map((g) => (
                            <SelectItem key={g.value} value={g.value}>
                              {g.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={proc.valor}
                      className="w-24 text-right"
                      placeholder="0,00"
                      inputMode="decimal"
                      onChange={(e) =>
                        atualizar(proc.id, "valor", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={proc.pessoaFisica}
                      onCheckedChange={(checked) =>
                        atualizar(proc.id, "pessoaFisica", checked === true)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={proc.naoSeAplica}
                      onCheckedChange={(checked) =>
                        atualizar(proc.id, "naoSeAplica", checked === true)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon-sm"
                      onClick={() => remover(proc.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
