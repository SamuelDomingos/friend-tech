"use client"

import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

export interface BuscaMedicamentoProps {
  placeholder: string
  busca: string
  onBusca: (busca: string) => void
  resultados: string[]
  onSelecionar: (nome: string) => void
  atalhosAbertos: boolean
  onAlternarAtalhos: () => void
}

export function BuscaMedicamento({
  placeholder,
  busca,
  onBusca,
  resultados,
  onSelecionar,
  atalhosAbertos,
  onAlternarAtalhos,
}: BuscaMedicamentoProps) {
  const [aberto, setAberto] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const mostrarResultados = aberto && resultados.length > 0

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
  }, [mostrarResultados])

  function selecionar(nome: string) {
    onSelecionar(nome)
    setAberto(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start gap-3">
        <Popover open={mostrarResultados} onOpenChange={setAberto}>
          <PopoverAnchor asChild>
            <div className="w-full max-w-137">
              <InputGroup>
                <InputGroupInput
                  placeholder={placeholder}
                  value={busca}
                  onChange={(event) => {
                    onBusca(event.target.value)
                    setAberto(true)
                  }}
                  onFocus={() => setAberto(true)}
                  autoComplete="off"
                />
                <InputGroupAddon align="inline-start">
                  <Search className="size-4" />
                </InputGroupAddon>
              </InputGroup>
            </div>
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
              className="*:data-[slot=scroll-area-viewport]:max-h-64"
            >
              <div
                className="flex flex-col"
                onMouseDown={(event) => event.preventDefault()}
              >
                {resultados.map((nome) => (
                  <Button
                    key={nome}
                    variant="ghost"
                    onClick={() => selecionar(nome)}
                  >
                    {nome}
                  </Button>
                ))}

                <Button
                  variant="link"
                  onClick={() => selecionar(busca)}
                >
                  Adicionar manualmente: “{busca.trim()}”
                </Button>
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onAlternarAtalhos}
        >
          Meus atalhos
        </Button>
      </div>

      {atalhosAbertos && (
        <Card size="sm" className="gap-0 py-0">
          <CardContent className="px-4 py-4">
            <p className="text-sm font-semibold">Nenhum atalho cadastrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
