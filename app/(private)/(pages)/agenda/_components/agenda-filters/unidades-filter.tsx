"use client"

import { useState } from "react"
import { MapPin, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { useCalendar } from "@/app/(private)/(pages)/agenda/_components/calendar/contexts/calendar-context"

export function UnidadesFilter() {
  const { unidades, selectedUnidadeIds, setSelectedUnidadeIds } = useCalendar()

  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [draft, setDraft] = useState<Set<string>>(new Set(selectedUnidadeIds))

  // Reseed o rascunho toda vez que o popover abre (padrão "ajustar estado
  // durante a renderização" do React, evitando setState dentro de um efeito).
  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setDraft(new Set(selectedUnidadeIds))
      setSearchTerm("")
    }
  }

  const toggleUnidade = (id: string) => {
    setDraft((atual) => {
      const proximo = new Set(atual)
      if (proximo.has(id)) {
        proximo.delete(id)
      } else {
        proximo.add(id)
      }
      return proximo
    })
  }

  const filtradas = unidades.filter((unidade) =>
    unidade.nome.toLowerCase().includes(searchTerm.trim().toLowerCase())
  )

  const limpar = () => setDraft(new Set())

  const filtrar = () => {
    setSelectedUnidadeIds([...draft])
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="gap-1.5">
          <MapPin className="size-4" />
          Unidades ({selectedUnidadeIds.length})
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-0">
        <div className="p-2.5 pb-0">
          <InputGroup>
            <InputGroupInput
              placeholder="Filtrar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <ul className="max-h-64 space-y-1 overflow-y-auto p-2.5">
          {filtradas.map((unidade) => (
            <li key={unidade.id}>
              <label className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 text-sm font-normal hover:bg-muted">
                <Checkbox
                  checked={draft.has(unidade.id)}
                  onCheckedChange={() => toggleUnidade(unidade.id)}
                />
                {unidade.nome}
              </label>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-2 border-t p-2.5">
          <Button type="button" variant="ghost" size="sm" onClick={limpar}>
            Limpar
          </Button>
          <Button type="button" size="sm" onClick={filtrar}>
            Filtrar ({draft.size})
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
