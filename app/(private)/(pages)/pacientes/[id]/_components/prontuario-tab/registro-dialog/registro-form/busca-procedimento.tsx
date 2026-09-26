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

import { procedimentosExameMock, type ProcedimentoExame } from "../../../dados-mock"

interface BuscaProcedimentoProps {
  valor: string
  placeholder?: string
  onTexto: (texto: string) => void
  onSelecionar: (procedimento: ProcedimentoExame) => void
}

export function BuscaProcedimento({
  valor,
  placeholder = "Buscar procedimentos",
  onTexto,
  onSelecionar,
}: BuscaProcedimentoProps) {
  const [aberto, setAberto] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const termo = valor.trim().toLowerCase()
  const sugestoes = termo
    ? procedimentosExameMock.filter(
        (procedimento) =>
          procedimento.descricao.toLowerCase().includes(termo) ||
          procedimento.codigo.includes(termo)
      )
    : []
  const mostrarSugestoes = aberto && sugestoes.length > 0

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
  }, [mostrarSugestoes])

  return (
    <Popover open={mostrarSugestoes} onOpenChange={setAberto}>
      <PopoverAnchor asChild>
        <InputGroup>
          <InputGroupInput
            placeholder={placeholder}
            value={valor}
            onChange={(event) => {
              onTexto(event.target.value)
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
            {sugestoes.map((procedimento) => (
              <button
                key={procedimento.codigo}
                type="button"
                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                onClick={() => {
                  onSelecionar(procedimento)
                  setAberto(false)
                }}
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {procedimento.codigo}
                </span>
                {" — "}
                {procedimento.descricao}
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
