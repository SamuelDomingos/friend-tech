"use client"

import { Controller } from "react-hook-form"
import { Barcode, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"

import { useConsumoForm } from "../../_hooks/use-consumo-form"
import {
  ORIGENS_CONSUMO,
  PRODUTOS_ESTOQUE,
  type ConsumoItem,
} from "./dados-mock"

interface ConsumoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pacienteNome: string
  onAdicionar: (item: Omit<ConsumoItem, "id" | "exportadoEm">) => void
}

export function ConsumoDialog({
  open,
  onOpenChange,
  pacienteNome,
  onAdicionar,
}: ConsumoDialogProps) {
  const {
    form,
    itensAdicionados,
    adicionarItem,
    removerItem,
    etiquetaAtiva,
    alternarEtiqueta,
    onSubmit,
    descartar,
  } = useConsumoForm({
    onAdicionar,
    onConcluir: () => onOpenChange(false),
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(novo) => {
        if (!novo) descartar()
        onOpenChange(novo)
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Saída de itens</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="consumo-tipo">Tipo de saída</FieldLabel>
              <Input
                id="consumo-tipo"
                value="Consumo do paciente"
                disabled
                readOnly
              />
            </Field>

            <Field data-invalid={!!form.formState.errors.data}>
              <FieldLabel>Data da saída</FieldLabel>
              <Controller
                name="data"
                control={form.control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="00/00/0000"
                    className="w-full"
                  />
                )}
              />
              <FieldError errors={[form.formState.errors.data]} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.origem}>
              <FieldLabel>Origem</FieldLabel>
              <Controller
                name="origem"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={itensAdicionados.length > 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORIGENS_CONSUMO.map((origem) => (
                        <SelectItem key={origem} value={origem}>
                          {origem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[form.formState.errors.origem]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="consumo-destino">Destino</FieldLabel>
              <Input
                id="consumo-destino"
                value={pacienteNome}
                disabled
                readOnly
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="consumo-observacao">Observação</FieldLabel>
            <Textarea
              id="consumo-observacao"
              placeholder="Opcional"
              className="min-h-16 resize-none"
              {...form.register("observacao")}
            />
          </Field>

          <Separator />

          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Busca de produtos</h3>

            <Button
              type="button"
              variant={etiquetaAtiva ? "default" : "secondary"}
              size="sm"
              aria-pressed={etiquetaAtiva}
              onClick={alternarEtiqueta}
            >
              <Barcode className="size-4" />
              Saída por etiqueta
            </Button>
          </div>

          {etiquetaAtiva && (
            <p className="rounded-md border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              Aponte o leitor para a etiqueta do produto. O item é adicionado
              automaticamente à lista.
            </p>
          )}

          <FieldGroup className="grid items-end gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_90px]">
            <Field data-invalid={!!form.formState.errors.produto}>
              <FieldLabel>Produto</FieldLabel>
              <Controller
                name="produto"
                control={form.control}
                render={({ field }) => {
                  const produto = PRODUTOS_ESTOQUE.find(
                    (item) => item.id === field.value
                  )

                  return (
                    <>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Buscar produto" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRODUTOS_ESTOQUE.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id}
                              disabled={item.estoque <= 0}
                            >
                              {item.nome}
                              {item.estoque <= 0 ? " — estoque zerado" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {produto && produto.estoque <= 0 && (
                        <p className="text-xs text-destructive">
                          Esse produto não está disponível no estoque
                          selecionado.
                        </p>
                      )}
                    </>
                  )
                }}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="consumo-lote">Lote</FieldLabel>
              <Input
                id="consumo-lote"
                placeholder="Lote"
                {...form.register("lote")}
              />
            </Field>

            <Field>
              <FieldLabel>Validade</FieldLabel>
              <Controller
                name="validade"
                control={form.control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="00/00/0000"
                    className="w-full"
                  />
                )}
              />
            </Field>

            <Field data-invalid={!!form.formState.errors.quantidade}>
              <FieldLabel htmlFor="consumo-quantidade">Quant.</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="consumo-quantidade"
                  type="number"
                  min={1}
                  {...form.register("quantidade")}
                />
                <InputGroupAddon align="inline-end">un</InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>

          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={adicionarItem}>
              Adicionar item
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Itens adicionados</h4>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="w-[90px] text-center">
                      Est. atual
                    </TableHead>
                    <TableHead className="w-[110px] text-center">
                      Qtd. modelo
                    </TableHead>
                    <TableHead className="w-[100px] text-center">
                      Qtd. saída
                    </TableHead>
                    <TableHead className="w-[120px] text-center">Lote</TableHead>
                    <TableHead className="w-[110px] text-center">
                      Validade
                    </TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {itensAdicionados.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="py-6 text-center text-sm text-muted-foreground"
                      >
                        Nenhum item adicionado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    itensAdicionados.map((item) => (
                      <TableRow key={item.produtoId}>
                        <TableCell className="text-sm">{item.nome}</TableCell>
                        <TableCell className="text-center text-sm">
                          {item.estoque}
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {item.quantidadeModelo || "-"}
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {item.quantidade}
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {item.lote || "-"}
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {item.validade ? formatDate(item.validade) : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Remover ${item.nome}`}
                            onClick={() => removerItem(item.produtoId)}
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
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={descartar}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={itensAdicionados.length === 0}
            >
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
