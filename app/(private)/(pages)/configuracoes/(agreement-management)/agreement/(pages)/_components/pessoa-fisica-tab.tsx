"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Transfer } from "@/components/transfer"

import { MEDICOS_DISPONIVEIS } from "../../_schemas/convenio.schema"

interface RegraNaoFaturar {
  id: string
  profissionais: string[]
  atendimentos: string[]
}

interface RegraFaturar {
  id: string
  profissionais: string[]
  codigoOperadora: string
  nomeContratado: string
}

const ATENDIMENTOS_DISPONIVEIS = [
  "CONSULTA CONVÊNIO",
  "Consulta Base",
  "Consulta Bônus",
  "1º Vez com Exames",
  "1º Vez sem Exames",
  "Consulta 30 dias",
  "Online",
  "Faltou",
  "Compareceu",
  "CORTESIA",
]

const naoFaturarMock: RegraNaoFaturar[] = [
  {
    id: "r1",
    profissionais: ["Alan Robson de Oliveira", "Catarina Ribeiro Moreno"],
    atendimentos: ["CONSULTA CONVÊNIO", "Consulta Base"],
  },
  {
    id: "r2",
    profissionais: ["Gabriela Pinheiro Rebouças Martins", "Laboratório"],
    atendimentos: ["1º Vez com Exames", "1º Vez sem Exames"],
  },
]

const faturarMock: RegraFaturar[] = [
  {
    id: "r3",
    profissionais: ["Medico Externo"],
    codigoOperadora: "EXT-001",
    nomeContratado: "Médico Externo LTDA",
  },
]

export function PessoaFisicaTab() {
  const [subtab, setSubtab] = useState<"not-billing" | "billing">(
    "not-billing"
  )
  const [naoFaturar, setNaoFaturar] = useState<RegraNaoFaturar[]>(naoFaturarMock)
  const [faturar, setFaturar] = useState<RegraFaturar[]>(faturarMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [profissionais, setProfissionais] = useState<string[]>([])
  const [atendimentos, setAtendimentos] = useState<string[]>([])

  const adicionarNaoFaturar = () => {
    setNaoFaturar((atual) => [
      ...atual,
      { id: `nf-${Date.now()}`, profissionais, atendimentos },
    ])
    setProfissionais([])
    setAtendimentos([])
    setModalOpen(false)
  }

  const removerNaoFaturar = (id: string) => {
    setNaoFaturar((atual) => atual.filter((r) => r.id !== id))
  }

  const removerFaturar = (id: string) => {
    setFaturar((atual) => atual.filter((r) => r.id !== id))
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg border bg-muted p-1">
          <Button
            type="button"
            size="sm"
            variant={subtab === "not-billing" ? "default" : "ghost"}
            onClick={() => setSubtab("not-billing")}
          >
            Não faturar
          </Button>
          <Button
            type="button"
            size="sm"
            variant={subtab === "billing" ? "default" : "ghost"}
            onClick={() => setSubtab("billing")}
          >
            Faturar
          </Button>
        </div>

        <Button onClick={() => setModalOpen(true)}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        {subtab === "not-billing" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profissionais</TableHead>
                <TableHead>Tipo(s) de Atendimento(s)</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {naoFaturar.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Nenhuma regra para pessoa física cadastrada
                  </TableCell>
                </TableRow>
              ) : (
                naoFaturar.map((regra) => (
                  <TableRow key={regra.id}>
                    <TableCell className="max-w-52">
                      <span className="line-clamp-2">
                        {regra.profissionais.join(", ")}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-52">
                      <span className="line-clamp-2">
                        {regra.atendimentos.join(", ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" aria-label="Ações">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setProfissionais(regra.profissionais)
                              setAtendimentos(regra.atendimentos)
                              setModalOpen(true)
                            }}
                          >
                            <Pencil className="size-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => removerNaoFaturar(regra.id)}
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
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profissionais</TableHead>
                <TableHead>Código na operadora</TableHead>
                <TableHead>Nome do contratado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faturar.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Nenhuma regra para pessoa física cadastrada
                  </TableCell>
                </TableRow>
              ) : (
                faturar.map((regra) => (
                  <TableRow key={regra.id}>
                    <TableCell className="max-w-52">
                      <span className="line-clamp-2">
                        {regra.profissionais.join(", ")}
                      </span>
                    </TableCell>
                    <TableCell>{regra.codigoOperadora}</TableCell>
                    <TableCell>{regra.nomeContratado}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:text-destructive"
                        onClick={() => removerFaturar(regra.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Regra para Pessoa Física</DialogTitle>
            <DialogDescription>
              Selecione os profissionais e os tipos de atendimento.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-medium">Profissionais</p>
              <Transfer
                disponiveisTitle="Disponíveis"
                inclusosTitle="Selecionados"
                searchPlaceholder="Buscar"
                disponiveis={MEDICOS_DISPONIVEIS.filter(
                  (m) => !profissionais.includes(m)
                )}
                inclusos={profissionais}
                onIncludedChange={setProfissionais}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Atendimentos</p>
              <Transfer
                disponiveisTitle="Disponíveis"
                inclusosTitle="Selecionados"
                searchPlaceholder="Buscar"
                disponiveis={ATENDIMENTOS_DISPONIVEIS.filter(
                  (a) => !atendimentos.includes(a)
                )}
                inclusos={atendimentos}
                onIncludedChange={setAtendimentos}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setProfissionais([])
                setAtendimentos([])
                setModalOpen(false)
              }}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={adicionarNaoFaturar}>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
