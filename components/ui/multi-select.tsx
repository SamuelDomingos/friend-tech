"use client"

import { useMemo, useState } from "react"
import { ChevronDown, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface MultiSelectProps {
  label: string
  options: string[]
  value: string[]
  onChange: (valor: string[]) => void
  icon?: LucideIcon
  searchable?: boolean
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
  icon: Icon,
  searchable = true,
}: MultiSelectProps) {
  const [aberto, setAberto] = useState(false)
  const [busca, setBusca] = useState("")

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()

    if (!termo) {
      return options
    }

    return options.filter((opcao) => opcao.toLowerCase().includes(termo))
  }, [options, busca])

  const texto =
    value.length === 0
      ? label
      : value.length === 1
        ? value[0]
        : `${label} (${value.length})`

  function alternar(opcao: string) {
    onChange(
      value.includes(opcao)
        ? value.filter((item) => item !== opcao)
        : [...value, opcao]
    )
  }

  return (
    <Popover
      open={aberto}
      onOpenChange={(novo) => {
        setAberto(novo)
        if (!novo) setBusca("")
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="justify-between gap-2 font-normal"
        >
          <span className="flex min-w-0 items-center gap-2">
            {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" />}
            <span className="truncate">{texto}</span>
          </span>
          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[300px] p-2">
        {searchable && (
          <Input
            placeholder="Pesquisar"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="mb-2 h-8"
          />
        )}

        <div className="max-h-56 space-y-0.5 overflow-y-auto">
          {filtradas.length === 0 ? (
            <p className="px-2 py-3 text-sm text-muted-foreground">
              Nenhuma opção encontrada.
            </p>
          ) : (
            filtradas.map((opcao) => (
              <label
                key={opcao}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
              >
                <Checkbox
                  checked={value.includes(opcao)}
                  onCheckedChange={() => alternar(opcao)}
                />
                {opcao}
              </label>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
