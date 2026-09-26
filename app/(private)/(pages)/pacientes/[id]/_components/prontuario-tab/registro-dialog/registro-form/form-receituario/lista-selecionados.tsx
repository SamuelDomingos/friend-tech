"use client"

import { X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ListaSelecionadosProps {
  itens: string[]
  onRemover: (index: number) => void
}

export function ListaSelecionados({
  itens,
  onRemover,
}: ListaSelecionadosProps) {
  return (
    <Card size="sm" className="gap-0 py-0">
      <CardHeader className="flex items-center justify-between gap-4 px-4 py-4">
        <CardTitle className="text-sm font-semibold">
          Medicamentos selecionados ({itens.length})
        </CardTitle>

        <CardAction>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={itens.length === 0}
            onClick={() => toast("Salvar como atalho em breve.")}
          >
            Salvar como atalho
          </Button>
        </CardAction>
      </CardHeader>

      {itens.length === 0 ? (
        <CardContent className="border-t px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Nenhuma Prescrição
          </p>
        </CardContent>
      ) : (
        <CardContent className="border-t p-0">
          <ul>
            {itens.map((nome, index) => (
              <li
                key={`${nome}-${index}`}
                className="flex items-center justify-between gap-3 border-b px-4 py-2.5 last:border-b-0"
              >
                <span className="min-w-0 truncate text-sm">{nome}</span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remover ${nome}`}
                  onClick={() => onRemover(index)}
                >
                  <X className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  )
}
