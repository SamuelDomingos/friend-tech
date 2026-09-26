"use client"

import { RichTextEditor } from "@/components/rich-text-editor"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { formatarMoeda } from "../../formatadores"
import { BuscaCatalogo } from "../busca-catalogo"
import {
  matmedsCatalogoMock,
  procedimentosCatalogoMock,
  solicitantesContasMock,
  unidadesContasMock,
} from "../dados-mock"
import { ListaItens, adicionarItem, type ItemSelecionado } from "./lista-itens"

interface OrcamentoFormProps {
  unidade: string
  onUnidade: (valor: string) => void
  modelo: string
  onModelo: (valor: string) => void
  aprovarSemFinanceiro: boolean
  onAprovarSemFinanceiro: (valor: boolean) => void
  solicitantePrimario: string
  onSolicitantePrimario: (valor: string) => void
  solicitanteSecundario: string
  onSolicitanteSecundario: (valor: string) => void
  procedimentos: ItemSelecionado[]
  onProcedimentos: (itens: ItemSelecionado[]) => void
  matmeds: ItemSelecionado[]
  onMatmeds: (itens: ItemSelecionado[]) => void
  observacao: string
  onObservacao: (valor: string) => void
}

export function OrcamentoForm({
  unidade,
  onUnidade,
  modelo,
  onModelo,
  aprovarSemFinanceiro,
  onAprovarSemFinanceiro,
  solicitantePrimario,
  onSolicitantePrimario,
  solicitanteSecundario,
  onSolicitanteSecundario,
  procedimentos,
  onProcedimentos,
  matmeds,
  onMatmeds,
  observacao,
  onObservacao,
}: OrcamentoFormProps) {
  const totalProcedimentos = procedimentos.reduce(
    (soma, item) => soma + item.item.preco * item.quantidade,
    0
  )
  const totalMatmeds = matmeds.reduce(
    (soma, item) => soma + item.item.preco * item.quantidade,
    0
  )
  const total = totalProcedimentos + totalMatmeds

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label className="mb-1.5 block">Modelo de orçamento</Label>
          <Select value={modelo} onValueChange={onModelo}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="padrao">Padrão</SelectItem>
              <SelectItem value="estetico">Estético</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1.5 block">Unidade</Label>
          <Select value={unidade} onValueChange={onUnidade}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {unidadesContasMock.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2 pb-2">
          <Switch
            id="aprovar-sem-financeiro"
            checked={aprovarSemFinanceiro}
            onCheckedChange={onAprovarSemFinanceiro}
          />
          <Label htmlFor="aprovar-sem-financeiro" className="font-normal">
            Aprovar sem financeiro
          </Label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1.5 block">Solicitante primário</Label>
          <Select
            value={solicitantePrimario}
            onValueChange={onSolicitantePrimario}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {solicitantesContasMock.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1.5 block">Solicitante secundário</Label>
          <Select
            value={solicitanteSecundario}
            onValueChange={onSolicitanteSecundario}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {solicitantesContasMock.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="mb-1.5 block">Adicionar Procedimentos</Label>
        <BuscaCatalogo
          itens={procedimentosCatalogoMock}
          onSelecionar={(item) =>
            onProcedimentos(adicionarItem(procedimentos, item))
          }
        />
        <ListaItens itens={procedimentos} onChange={onProcedimentos} />
      </div>

      <div>
        <Label className="mb-1.5 block">
          Adicionar Materiais e/ou Medicamentos
        </Label>
        <BuscaCatalogo
          itens={matmedsCatalogoMock}
          onSelecionar={(item) => onMatmeds(adicionarItem(matmeds, item))}
        />
        <ListaItens itens={matmeds} onChange={onMatmeds} />
      </div>

      <div>
        <Label className="mb-1.5 block">Observações</Label>
        <RichTextEditor
          value={observacao}
          onChange={onObservacao}
          className="min-h-48"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Orçamento</p>
          <p className="text-xl font-medium">
            {formatarMoeda(totalProcedimentos)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Materiais e Medicamentos
          </p>
          <p className="text-xl font-medium">{formatarMoeda(totalMatmeds)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-xl font-semibold text-primary">
            {formatarMoeda(total)}
          </p>
        </div>
      </div>
    </div>
  )
}
