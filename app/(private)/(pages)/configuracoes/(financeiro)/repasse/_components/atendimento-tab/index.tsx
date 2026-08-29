"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Filter,
  MoreHorizontal,
  Plus,
  SearchIcon,
  SlidersHorizontal,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { cn } from "@/lib/utils"

import {
  regrasMock,
  STATUS_LABELS,
  type RegraRepasse,
  type StatusRegra,
} from "../dados-mock"
import {
  FiltrosDrawer,
  FILTROS_INICIAIS,
  type FiltrosRepasse,
} from "./filtros-drawer"

const statusClass: Record<StatusRegra, string> = {
  EM_VIGENCIA:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  AGUARDANDO:
    "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  DESATIVADO: "bg-destructive/10 text-destructive dark:bg-destructive/20",
  EXPIRADO: "bg-muted text-muted-foreground",
}

const TIPOS_PROFISSIONAL = ["Todos", "Executante", "Solicitante"]

export function AtendimentoTab() {
  const router = useRouter()
  const [regras, setRegras] = useState<RegraRepasse[]>(regrasMock)
  const [search, setSearch] = useState("")
  const [tipoProfissional, setTipoProfissional] = useState("Todos")
  const [filtros, setFiltros] = useState<FiltrosRepasse>(FILTROS_INICIAIS)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = regras.filter((regra) => {
    const termo = search.trim().toLowerCase()
    const correspondeBusca =
      termo.length === 0 || regra.nome.toLowerCase().includes(termo)
    const correspondeTipo =
      tipoProfissional === "Todos" ||
      regra.tipoProfissional === tipoProfissional

    const statusAtivo = filtros.status
    const correspondeStatus =
      regra.status === "EM_VIGENCIA"
        ? statusAtivo.emVigencia
        : regra.status === "AGUARDANDO"
          ? statusAtivo.aguardando
          : regra.status === "DESATIVADO"
            ? statusAtivo.desativado
            : statusAtivo.expirado

    const correspondeFiltros =
      (!filtros.tipoRepasse || regra.tipoRepasse === filtros.tipoRepasse) &&
      (!filtros.tipoProfissional ||
        regra.tipoProfissional === filtros.tipoProfissional)

    return (
      correspondeBusca &&
      correspondeTipo &&
      correspondeStatus &&
      correspondeFiltros
    )
  })

  const desativar = (regra: RegraRepasse) => {
    setRegras((atual) =>
      atual.map((r) =>
        r.id === regra.id ? { ...r, status: "DESATIVADO" as StatusRegra } : r
      )
    )
    toast(`Regra "${regra.nome}" desativada.`)
  }

  const remover = (regra: RegraRepasse) => {
    setRegras((atual) => atual.filter((r) => r.id !== regra.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <InputGroup className="w-full sm:w-72">
            <InputGroupInput
              placeholder="Pesquisar regra..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
          </InputGroup>

          <Select value={tipoProfissional} onValueChange={setTipoProfissional}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Tipo de profissional" />
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

          <Button
            type="button"
            variant="outline"
            onClick={() => setDrawerOpen(true)}
          >
            <Filter data-icon="inline-start" />
            Filtro
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus data-icon="inline-start" />
              Adicionar
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                router.push("/configuracoes/repasse/form?tipo=procedimento")
              }
            >
              <SlidersHorizontal className="size-4" />
              Procedimento
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                router.push("/configuracoes/repasse/form?tipo=matmed")
              }
            >
              <SlidersHorizontal className="size-4" />
              Mat/Med
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo de repasse</TableHead>
              <TableHead>Tipo de profissional</TableHead>
              <TableHead>Início da vigência</TableHead>
              <TableHead>Fim da vigência</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma regra encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((regra) => (
                <TableRow key={regra.id}>
                  <TableCell className="font-medium">{regra.nome}</TableCell>
                  <TableCell>{regra.tipoRepasse}</TableCell>
                  <TableCell>{regra.tipoProfissional}</TableCell>
                  <TableCell>{regra.inicioVigencia}</TableCell>
                  <TableCell
                    className={cn(
                      !regra.fimVigencia && "text-muted-foreground italic"
                    )}
                  >
                    {regra.fimVigencia ?? "Indeterminado"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusClass[regra.status]}
                    >
                      {STATUS_LABELS[regra.status]}
                    </Badge>
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
                        <DropdownMenuItem
                          onClick={() => toast("Regra revalidada.")}
                        >
                          Revalidar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              "/configuracoes/repasse/form?tipo=" +
                                (regra.tipoRepasse === "Procedimento"
                                  ? "procedimento"
                                  : "matmed")
                            )
                          }
                        >
                          Usar como modelo
                        </DropdownMenuItem>

                        {regra.status !== "DESATIVADO" && (
                          <DropdownMenuItem onClick={() => desativar(regra)}>
                            Desativar
                          </DropdownMenuItem>
                        )}

                        {regra.status === "EM_VIGENCIA" &&
                          !regra.fimVigencia && (
                            <DropdownMenuItem
                              onClick={() => toast("Definir fim de vigência.")}
                            >
                              Definir fim de vigência
                            </DropdownMenuItem>
                          )}

                        {(regra.status === "DESATIVADO" ||
                          regra.status === "EXPIRADO") && (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => remover(regra)}
                          >
                            Remover
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <FiltrosDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        initial={filtros}
        onApply={setFiltros}
        onLimpar={() => setFiltros(FILTROS_INICIAIS)}
      />
    </div>
  )
}
