"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import { cn } from "@/lib/utils"

import type { Usuario } from "../dados-mock"

interface RowActionsProps {
  usuario: Usuario
  onEditar: (usuario: Usuario) => void
  onDeletar: (usuario: Usuario) => void
}

const ACTIONS = [
  { value: "editar", label: "Editar", icon: Pencil, destructive: false },
  { value: "deletar", label: "Deletar", icon: Trash2, destructive: true },
]

export function RowActions({ usuario, onEditar, onDeletar }: RowActionsProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string | null>(null)

  function handleSelect(selecionado: string | null) {
    setValue(null)
    setOpen(false)

    if (selecionado === "editar") {
      onEditar(usuario)
    } else if (selecionado === "deletar") {
      onDeletar(usuario)
    }
  }

  return (
    <div
      className="flex justify-end"
      onClick={(event) => event.stopPropagation()}
    >
      <Combobox
        open={open}
        onOpenChange={setOpen}
        items={["editar", "deletar"]}
        value={value}
        onValueChange={handleSelect}
      >
        <ComboboxTrigger
          render={<Button variant="ghost" size="icon-sm" />}
          aria-label="Ações do usuário"
          className="[&>svg:last-child]:hidden"
        >
          <MoreHorizontal />
        </ComboboxTrigger>

        <ComboboxContent className="w-40" align="end">
          <ComboboxList>
            {(item) => {
              const acao = ACTIONS.find((a) => a.value === item)

              if (!acao) {
                return null
              }

              return (
                <ComboboxItem
                  key={acao.value}
                  value={acao.value}
                  className={cn(acao.destructive && "text-destructive")}
                >
                  <acao.icon
                    className={cn(acao.destructive && "text-destructive")}
                  />
                  {acao.label}
                </ComboboxItem>
              )
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
