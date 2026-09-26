"use client"

import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

import { formatarMoeda } from "../formatadores"
import type { ItemCatalogo } from "./dados-mock"

interface BuscaCatalogoProps {
  itens: ItemCatalogo[]
  onSelecionar: (item: ItemCatalogo) => void
  placeholder?: string
}

export function BuscaCatalogo({
  itens,
  onSelecionar,
  placeholder = "Buscar",
}: BuscaCatalogoProps) {
  const [termo, setTermo] = useState("")
  const [aberto, setAberto] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const busca = termo.trim().toLowerCase()
  const filtrados = busca
    ? itens.filter((item) => item.nome.toLowerCase().includes(busca))
    : []
  const mostrar = aberto && filtrados.length > 0

  useEffect(() => {
    const el = scrollRef.current
    if (!el) {
      return
    }

    const pararPropagacao = (event: Event) => event.stopPropagation()
    el.addEventListener("wheel", pararPropagacao)
    el.addEventListener("touchmove", pararPropagacao)

    return () => {
      el.removeEventListener("wheel", pararPropagacao)
      el.removeEventListener("touchmove", pararPropagacao)
    }
  }, [mostrar])

  return (
    <Popover open={mostrar} onOpenChange={setAberto}>
      <PopoverAnchor asChild>
        <InputGroup>
          <InputGroupInput
            placeholder={placeholder}
            value={termo}
            onChange={(event) => {
              setTermo(event.target.value)
              setAberto(true)
            }}
            onFocus={() => setAberto(true)}
            autoComplete="off"
          />
          <InputGroupAddon align="inline-start">
            <Search className="size-4" />
          </InputGroupAddon>
        </InputGroup>
      </PopoverAnchor>

      <PopoverContent
        align="start"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => {
          const alvo = event.target as HTMLElement | null
          if (alvo?.closest('[data-slot="input-group"]')) {
            event.preventDefault()
          }
        }}
        className="w-(--radix-popover-trigger-width) gap-0.5 p-1"
      >
        <ScrollArea
          ref={scrollRef}
          className="*:data-[slot=scroll-area-viewport]:max-h-56"
        >
          <div
            className="flex flex-col"
            onMouseDown={(event) => event.preventDefault()}
          >
            {filtrados.map((item) => (
              <button
                key={item.id}
                className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                onClick={() => {
                  onSelecionar(item)
                  setTermo("")
                  setAberto(false)
                }}
              >
                <span className="truncate">{item.nome}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatarMoeda(item.preco)}
                </span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
