"use client"

import { Pencil } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { BuscaCatalogo } from "../../contas-tab/busca-catalogo"
import {
  matmedsCatalogoMock,
  procedimentosCatalogoMock,
} from "../../contas-tab/dados-mock"
import {
  ListaItens,
  adicionarItem,
  type ItemSelecionado,
} from "../../contas-tab/pre-pagamento-dialog/lista-itens"
import { formatarMoeda } from "../../formatadores"

interface OrcamentoFormProps {
  modelo: string
  onModelo: (valor: string) => void
  procedimentos: ItemSelecionado[]
  onProcedimentos: (itens: ItemSelecionado[]) => void
  matmeds: ItemSelecionado[]
  onMatmeds: (itens: ItemSelecionado[]) => void
  descontoAdicional: string
  onDescontoAdicional: (valor: string) => void
}

export function OrcamentoForm({
  modelo,
  onModelo,
  procedimentos,
  onProcedimentos,
  matmeds,
  onMatmeds,
  descontoAdicional,
  onDescontoAdicional,
}: OrcamentoFormProps) {
  const totalProcedimentos = procedimentos.reduce(
    (soma, item) => soma + item.item.preco * item.quantidade,
    0
  )
  const totalMatmeds = matmeds.reduce(
    (soma, item) => soma + item.item.preco * item.quantidade,
    0
  )
  const valorTotal = totalProcedimentos + totalMatmeds
  const desconto =
    valorTotal * (Number.parseFloat(descontoAdicional) || 0) / 100
  const total = valorTotal - desconto

  return (
    <div className="space-y-6">
      <div className="max-w-xs">
        <Label className="mb-1.5 block">Modelo</Label>
        <Select value={modelo} onValueChange={onModelo}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="geral">Geral</SelectItem>
            <SelectItem value="estetico">Estético</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-1.5 block">Procedimentos</Label>
        <BuscaCatalogo
          itens={procedimentosCatalogoMock}
          placeholder="Pesquisar procedimento"
          onSelecionar={(item) =>
            onProcedimentos(adicionarItem(procedimentos, item))
          }
        />
        <ListaItens itens={procedimentos} onChange={onProcedimentos} />
      </div>

      <div>
        <Label className="mb-1.5 block">Materiais e medicamentos</Label>
        <BuscaCatalogo
          itens={matmedsCatalogoMock}
          placeholder="Pesquisar material ou medicamento"
          onSelecionar={(item) => onMatmeds(adicionarItem(matmeds, item))}
        />
        <ListaItens itens={matmeds} onChange={onMatmeds} />
      </div>

      <div className="flex flex-col items-end gap-3 border-t pt-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-xs text-muted-foreground">Valor total</span>
          <span className="font-medium">{formatarMoeda(valorTotal)}</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground">Desconto total</span>
          <span className="font-medium text-destructive">
            {formatarMoeda(desconto)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({descontoAdicional || 0}%)
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="flex items-center gap-1 font-semibold text-primary">
            {formatarMoeda(total)}
            <Pencil className="size-3.5" />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-sm">Desconto adicional:</Label>
          <div className="relative w-[120px]">
            <Input
              inputMode="numeric"
              placeholder="0"
              className="pr-6 text-right"
              value={descontoAdicional}
              onChange={(event) =>
                onDescontoAdicional(event.target.value.replace(/\D/g, ""))
              }
            />
            <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-sm text-muted-foreground">
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
