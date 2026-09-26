"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Download,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { GRUPOS_PLANO } from "../../_schemas/categoria.schema"
import {
  categoriasPlanoMock,
  contasPlanoMock,
  type CategoriaPlano,
  type ContaPlano,
} from "../dados-mock"
import { CategoriaDialog } from "./categoria-dialog"
import { ContaPlanoDialog } from "./conta-plano-dialog"

type TipoPlano = "entrada" | "saida"

export function PlanoContasTab() {
  const [tipo, setTipo] = useState<TipoPlano>("entrada")
  const [categorias, setCategorias] =
    useState<CategoriaPlano[]>(categoriasPlanoMock)
  const [contas, setContas] = useState<ContaPlano[]>(contasPlanoMock)
  const [categoriaDialogOpen, setCategoriaDialogOpen] = useState(false)
  const [contaDialogOpen, setContaDialogOpen] = useState(false)

  const excluirConta = (conta: ContaPlano) => {
    setContas((atual) => atual.filter((c) => c.id !== conta.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ButtonGroup className="rounded-lg border">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-pressed={tipo === "entrada"}
            onClick={() => setTipo("entrada")}
          >
            <ArrowDown className="size-4 text-emerald-600" />
            Entrada
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-pressed={tipo === "saida"}
            onClick={() => setTipo("saida")}
          >
            <ArrowUp className="size-4 text-destructive" />
            Saída
          </Button>
        </ButtonGroup>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download data-icon="inline-start" />
                Exportar
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => toast("Exportando apenas entradas.")}
              >
                <ArrowDown className="size-4 text-emerald-600" />
                Entradas
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => toast("Exportando apenas saídas.")}
              >
                <ArrowUp className="size-4 text-destructive" />
                Saídas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Plus data-icon="inline-start" />
                Adicionar
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCategoriaDialogOpen(true)}>
                Categoria
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setContaDialogOpen(true)}>
                Conta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-6">
        {GRUPOS_PLANO.map((grupo) => {
          const categoriasDoGrupo = categorias.filter(
            (categoria) => categoria.grupo === grupo.value
          )

          return (
            <div key={grupo.value}>
              <h3 className="text-lg font-semibold">{grupo.label}</h3>

              <Accordion type="multiple" className="mt-2 space-y-2">
                {categoriasDoGrupo.length === 0 ? (
                  <p className="py-4 text-sm text-muted-foreground">
                    Nenhuma categoria neste grupo.
                  </p>
                ) : (
                  categoriasDoGrupo.map((categoria) => {
                    const contasDaCategoria = contas.filter(
                      (conta) => conta.categoriaId === categoria.id
                    )

                    return (
                      <AccordionItem
                        key={categoria.id}
                        value={categoria.id}
                        className="rounded-lg border"
                      >
                        <AccordionTrigger className="px-3">
                          <span className="flex items-center gap-2">
                            {tipo === "entrada" ? (
                              <ArrowDown className="size-4 text-emerald-600" />
                            ) : (
                              <ArrowUp className="size-4 text-destructive" />
                            )}
                            {categoria.nome}
                          </span>
                        </AccordionTrigger>

                        <AccordionContent className="px-3">
                          <ul className="space-y-1">
                            {contasDaCategoria.length === 0 ? (
                              <li className="py-2 pl-5 text-sm text-muted-foreground">
                                Nenhuma conta.
                              </li>
                            ) : (
                              contasDaCategoria.map((conta) => (
                                <li
                                  key={conta.id}
                                  className="flex items-center justify-between py-1.5"
                                >
                                  <span className="pl-5 text-sm">
                                    {conta.codigo && (
                                      <span className="text-muted-foreground">
                                        {conta.codigo} -{" "}
                                      </span>
                                    )}
                                    {conta.nome}
                                  </span>

                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Ações da conta"
                                      >
                                        <MoreHorizontal className="size-4" />
                                      </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        variant="destructive"
                                        onClick={() => excluirConta(conta)}
                                      >
                                        <Trash2 className="size-4" />
                                        Remover
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </li>
                              ))
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })
                )}
              </Accordion>
            </div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={() => toast("Ordenação salva.")}>
          Salvar ordenação
        </Button>
      </div>

      <CategoriaDialog
        open={categoriaDialogOpen}
        onOpenChange={setCategoriaDialogOpen}
        onSave={(categoria) => {
          setCategorias((atual) => [...atual, categoria])
          setCategoriaDialogOpen(false)
        }}
      />

      <ContaPlanoDialog
        open={contaDialogOpen}
        onOpenChange={setContaDialogOpen}
        onSave={(conta) => {
          setContas((atual) => [...atual, conta])
          setContaDialogOpen(false)
        }}
      />
    </div>
  )
}
