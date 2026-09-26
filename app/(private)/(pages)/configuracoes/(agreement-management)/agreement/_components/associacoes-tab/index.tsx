"use client"

import { useRef, useState } from "react"
import {
  MoreHorizontal,
  Pencil,
  Plus,
  SearchIcon,
  Trash2,
  Upload,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

import { Transfer } from "@/components/transfer"

import {
  associacoesMock,
  conveniosMock,
  iniciais,
  type Associacao,
} from "../dados-mock"

export function AssociacoesTab() {
  const [associacoes, setAssociacoes] =
    useState<Associacao[]>(associacoesMock)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [convenios, setConvenios] = useState<string[]>([])
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filtered = search.trim()
    ? associacoes.filter(
        (a) =>
          a.nome.toLowerCase().includes(search.toLowerCase()) ||
          a.descricao.toLowerCase().includes(search.toLowerCase())
      )
    : associacoes

  const abrirModal = (associacao?: Associacao) => {
    setEditingId(associacao?.id ?? null)
    setNome(associacao?.nome ?? "")
    setDescricao(associacao?.descricao ?? "")
    setConvenios(associacao?.convenios ?? [])
    setAvatarUrl(associacao?.avatarUrl)
    setModalOpen(true)
  }

  const salvar = () => {
    if (!nome.trim()) return

    if (editingId) {
      setAssociacoes((atual) =>
        atual.map((a) =>
          a.id === editingId
            ? { ...a, nome, descricao, convenios, avatarUrl }
            : a
        )
      )
    } else {
      setAssociacoes((atual) => [
        ...atual,
        { id: `a-${Date.now()}`, nome, descricao, convenios, avatarUrl },
      ])
    }

    setModalOpen(false)
  }

  const excluir = (id: string) => {
    setAssociacoes((atual) => atual.filter((a) => a.id !== id))
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setAvatarUrl(reader.result as string)
    reader.readAsDataURL(file)
    event.target.value = ""
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="sm:max-w-xs">
          <InputGroupInput
            placeholder="Pesquisar associação..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Button type="button" onClick={() => abrirModal()}>
          <Plus className="size-4" />
          Adicionar
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Convênios</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma associação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((associacao) => (
                <TableRow key={associacao.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarImage
                          src={associacao.avatarUrl}
                          alt={associacao.nome}
                        />
                        <AvatarFallback>
                          {iniciais(associacao.nome)}
                        </AvatarFallback>
                      </Avatar>
                      {associacao.nome}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {associacao.convenios.length > 0
                      ? associacao.convenios.join(", ")
                      : "Nenhum convênio vinculado"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {associacao.descricao}
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
                        <DropdownMenuItem
                          onClick={() => abrirModal(associacao)}
                        >
                          <Pencil className="size-4" />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => excluir(associacao.id)}
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Editar associação" : "Nova associação"}
            </DialogTitle>
            <DialogDescription>
              Nesta seção você pode gerenciar as associações de convênio da
              sua clínica.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="min-h-0">
            <div className="space-y-6 pr-4 pb-1">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarImage src={avatarUrl} alt={nome || "Associação"} />
                  <AvatarFallback>{iniciais(nome || "?")}</AvatarFallback>
                </Avatar>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="size-4" />
                  Carregar imagem
                </Button>
              </div>

              <Field>
                <FieldLabel htmlFor="assoc-nome">Nome</FieldLabel>
                <Input
                  id="assoc-nome"
                  placeholder="Nome da associação"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="assoc-descricao">Descrição</FieldLabel>
                <Textarea
                  id="assoc-descricao"
                  placeholder="Descrição da associação"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Field>

              <Transfer
                disponiveisTitle="Convênios disponíveis"
                inclusosTitle="Convênios na associação"
                searchPlaceholder="Buscar convênio"
                disponiveis={conveniosMock
                  .map((c) => c.nome)
                  .filter((n) => !convenios.includes(n))}
                inclusos={convenios}
                onIncludedChange={setConvenios}
              />
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={salvar}>
              {editingId ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
