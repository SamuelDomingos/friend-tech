"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Plus, SearchIcon, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DatePicker } from "@/components/ui/date-picker"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
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

import { daDataISO, paraDataISO } from "@/lib/masks"

import {
  billingRulesMock,
  fieldsTypeLabel,
  tissTypeLabel,
  FIELDS_TYPES,
  type BillingRule,
} from "./_components/mock-data"

export default function BillingRulesPage() {
  const [rules, setRules] = useState<BillingRule[]>(billingRulesMock)
  const [search, setSearch] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [fieldsTypeFiltro, setFieldsTypeFiltro] = useState("")

  const filtered = rules.filter((r) => {
    const termo = search.trim().toLowerCase()
    const combinaBusca = !termo || r.nome.toLowerCase().includes(termo)
    const combinaTipo = !fieldsTypeFiltro || r.fieldsType === fieldsTypeFiltro
    const combinaInicio = !startDate || r.criadoEm >= startDate
    const combinaFim = !endDate || r.criadoEm <= endDate
    return combinaBusca && combinaTipo && combinaInicio && combinaFim
  })

  const excluir = (id: string) => {
    setRules((atual) => atual.filter((r) => r.id !== id))
  }

  const alternarAtiva = (id: string) => {
    setRules((atual) =>
      atual.map((r) => (r.id === id ? { ...r, ativa: !r.ativa } : r))
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Regras de faturamento</h1>

        <p className="max-w-2xl text-muted-foreground">
          Gestão das regras de faturamento dos convênios.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <InputGroup className="sm:max-w-56">
              <InputGroupInput
                placeholder="Buscar por nome"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <SearchIcon className="size-4" />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-2">
              <DatePicker
                className="w-40"
                placeholder="Data inicial"
                value={daDataISO(startDate)}
                onChange={(d) => setStartDate(d ? paraDataISO(d) : "")}
              />
              <DatePicker
                className="w-40"
                placeholder="Data final"
                value={daDataISO(endDate)}
                onChange={(d) => setEndDate(d ? paraDataISO(d) : "")}
              />
            </div>

            <Select
              value={fieldsTypeFiltro || "all"}
              onValueChange={(v) =>
                setFieldsTypeFiltro(v === "all" ? "" : v)
              }
            >
              <SelectTrigger className="sm:w-64">
                <SelectValue placeholder="Tipo de informação" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos</SelectItem>
                  {FIELDS_TYPES.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Link href="/configuracoes/billing-rules/novo">
            <Button type="button">
              <Plus className="size-4" />
              Nova regra
            </Button>
          </Link>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo de guia</TableHead>
                <TableHead>Tipo de informação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Nenhuma regra de faturamento encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/configuracoes/billing-rules/${rule.id}`}
                        className="hover:underline"
                      >
                        {rule.nome}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {tissTypeLabel(rule.tissType)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {fieldsTypeLabel(rule.fieldsType)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={rule.ativa ? "default" : "secondary"}>
                        {rule.ativa ? "Ativa" : "Inativa"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon-sm"
                            aria-label="Ações"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/configuracoes/billing-rules/${rule.id}`}
                            >
                              <Pencil className="size-4" />
                              Editar
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => alternarAtiva(rule.id)}
                          >
                            {rule.ativa ? "Desativar" : "Ativar"}
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => excluir(rule.id)}
                          >
                            <Trash2 className="size-4" />
                            Deletar
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
    </div>
  )
}
