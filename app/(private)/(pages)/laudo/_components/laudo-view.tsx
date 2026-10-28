"use client"

import {
  ClipboardList,
  Download,
  FileSpreadsheet,
  FileText,
  SearchIcon,
  SlidersHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { DatePicker } from "@/components/ui/date-picker"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useLaudos } from "../_hooks/use-laudos"
import { ROTULOS_STATUS, type StatusLaudo } from "./dados-mock"
import { LaudoFiltros } from "./laudo-filtros"
import { LaudoPreviewDialog } from "./laudo-preview-dialog"
import { LaudoTabela } from "./laudo-tabela"

const ABAS: StatusLaudo[] = ["A_DESCREVER", "LIBERADO", "ENTREGUE"]

export function LaudoView() {
  const laudos = useLaudos()

  return (
    <div className="space-y-4">
      <Tabs
        value={laudos.status}
        onValueChange={(valor) => laudos.setStatus(valor as StatusLaudo)}
      >
        <TabsList variant="line">
          {ABAS.map((aba) => (
            <TabsTrigger key={aba} value={aba} className="gap-2">
              {ROTULOS_STATUS[aba]}
              <span className="rounded-full bg-muted px-1.5 text-[11px] text-muted-foreground">
                {laudos.contagens[aba]}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <InputGroup className="w-64">
            <InputGroupAddon align="inline-start">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Buscar paciente/pedido"
              value={laudos.busca}
              onChange={(event) => laudos.setBusca(event.target.value)}
            />
          </InputGroup>

          <ButtonGroup>
            <DatePicker
              value={laudos.intervalo.inicio}
              onChange={(inicio) =>
                inicio &&
                laudos.setIntervalo((atual) => ({ ...atual, inicio }))
              }
              placeholder="00/00/0000"
              className="w-[150px]"
            />
            <DatePicker
              value={laudos.intervalo.fim}
              onChange={(fim) =>
                fim && laudos.setIntervalo((atual) => ({ ...atual, fim }))
              }
              placeholder="00/00/0000"
              className="w-[150px]"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={laudos.selecionarHoje}
            >
              Hoje
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={laudos.selecionarSemana}
            >
              Semana
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={laudos.selecionarMes}
            >
              Mês
            </Button>
          </ButtonGroup>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => laudos.setFiltrosAberto(true)}
          >
            <SlidersHorizontal className="size-4" />
            Filtros
            {laudos.filtrosAtivos > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
                {laudos.filtrosAtivos}
              </span>
            )}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              disabled={laudos.filtrados.length === 0}
            >
              <Download className="size-4" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={laudos.exportarCsv}>
              <FileSpreadsheet className="size-4" />
              Exportar em XLS
            </DropdownMenuItem>
            <DropdownMenuItem onClick={laudos.exportarPdf}>
              <FileText className="size-4" />
              Exportar em PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {laudos.filtrados.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ClipboardList />
            </EmptyMedia>
            <EmptyTitle>Nenhum registro encontrado</EmptyTitle>
            <EmptyDescription>
              Ajuste a busca, o período ou os filtros aplicados.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <LaudoTabela
          laudos={laudos.filtrados}
          ordenacao={laudos.ordenacao}
          onOrdenar={laudos.alternarOrdenacao}
          onVisualizar={laudos.setVisualizando}
          onImprimir={laudos.imprimir}
          onLiberar={(laudo) => laudos.liberar(laudo.id)}
          onEntregar={(laudo) => laudos.entregar(laudo.id)}
        />
      )}

      <LaudoFiltros
        key={JSON.stringify(laudos.filtros)}
        open={laudos.filtrosAberto}
        onOpenChange={laudos.setFiltrosAberto}
        iniciais={laudos.filtros}
        onAplicar={laudos.aplicarFiltros}
        onLimpar={laudos.limparFiltros}
      />

      <LaudoPreviewDialog
        laudo={laudos.visualizando}
        onOpenChange={(open) => {
          if (!open) laudos.setVisualizando(null)
        }}
      />
    </div>
  )
}
