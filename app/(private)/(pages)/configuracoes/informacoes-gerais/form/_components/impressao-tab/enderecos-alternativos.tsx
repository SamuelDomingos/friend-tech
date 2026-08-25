"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { ImpressaoFormData } from "../../_schemas/impressao.schema"
import { EnderecoAlternativoDialog } from "./endereco-alternativo-dialog"

interface EnderecosAlternativosProps {
  form: UseFormReturn<ImpressaoFormData>
}

export function EnderecosAlternativos({ form }: EnderecosAlternativosProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const enderecos = form.watch("enderecosAlternativos")

  const removerEndereco = (id: string) => {
    form.setValue(
      "enderecosAlternativos",
      form
        .getValues("enderecosAlternativos")
        .filter((endereco) => endereco.id !== id)
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Endereços usados como alternativa na impressão.
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="size-4" />
          Adicionar endereço
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endereço</TableHead>
              <TableHead>Complemento</TableHead>
              <TableHead>CEP</TableHead>
              <TableHead>Número</TableHead>
              <TableHead>Bairro</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {enderecos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum endereço alternativo.
                </TableCell>
              </TableRow>
            ) : (
              enderecos.map((endereco) => (
                <TableRow key={endereco.id}>
                  <TableCell className="font-medium">
                    {endereco.endereco}
                  </TableCell>
                  <TableCell>{endereco.complemento || "—"}</TableCell>
                  <TableCell>{endereco.cep || "—"}</TableCell>
                  <TableCell>{endereco.numero || "—"}</TableCell>
                  <TableCell>{endereco.bairro || "—"}</TableCell>
                  <TableCell>{endereco.cidade || "—"}</TableCell>
                  <TableCell>{endereco.estado}</TableCell>
                  <TableCell className="text-right">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removerEndereco(endereco.id)}
                          aria-label="Remover endereço alternativo"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent>Remover</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EnderecoAlternativoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={(endereco) =>
          form.setValue("enderecosAlternativos", [
            ...form.getValues("enderecosAlternativos"),
            endereco,
          ])
        }
      />
    </div>
  )
}
