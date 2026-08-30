"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

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
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const produtosMock = [
  { id: "p1", nome: "Plano Amil 300" },
  { id: "p2", nome: "Plano Amil 500" },
  { id: "p3", nome: "Plano Odonto Empresarial" },
]

export function ProdutosTab() {
  const [produtos, setProdutos] = useState(produtosMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [nome, setNome] = useState("")

  const adicionar = () => {
    if (!nome.trim()) return
    setProdutos((atual) => [...atual, { id: `p-${Date.now()}`, nome }])
    setNome("")
    setModalOpen(false)
  }

  const remover = (id: string) => {
    setProdutos((atual) => atual.filter((p) => p.id !== id))
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum produto cadastrado para esse convênio
                </TableCell>
              </TableRow>
            ) : (
              produtos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      onClick={() => remover(produto.id)}
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar produto</DialogTitle>
            <DialogDescription>
              Informe o nome do produto do convênio.
            </DialogDescription>
          </DialogHeader>

          <Field>
            <FieldLabel htmlFor="produto-nome">Produto</FieldLabel>
            <Input
              id="produto-nome"
              placeholder="Nome do produto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setNome("")
                setModalOpen(false)
              }}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={adicionar}>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
