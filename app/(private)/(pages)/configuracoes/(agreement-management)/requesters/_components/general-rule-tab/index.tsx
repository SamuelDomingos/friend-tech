"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { conveniosMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"

import type { RequesterInsuranceLink } from "../mock-data"

function montarConvenios(): RequesterInsuranceLink[] {
  return conveniosMock.map((convenio) => ({
    convenioId: convenio.id,
    convenioNome: convenio.nome,
    requesterCode: "",
    requesterName: "",
  }))
}

export function GeneralRuleTab() {
  const [convenios, setConvenios] = useState<RequesterInsuranceLink[]>(
    montarConvenios
  )

  const atualizarConvenio = (
    convenioId: string,
    campo: "requesterCode" | "requesterName",
    valor: string
  ) => {
    setConvenios((atual) =>
      atual.map((c) =>
        c.convenioId === convenioId ? { ...c, [campo]: valor } : c
      )
    )
  }

  const salvar = () => {
    toast("Regra geral de solicitantes atualizada com sucesso.")
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Convênio</TableHead>
              <TableHead>Código da Operadora</TableHead>
              <TableHead>Nome do Contratado</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {convenios.map((convenio) => (
              <TableRow key={convenio.convenioId}>
                <TableCell className="font-medium">
                  {convenio.convenioNome}
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Código da Operadora"
                    value={convenio.requesterCode}
                    onChange={(e) =>
                      atualizarConvenio(
                        convenio.convenioId,
                        "requesterCode",
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Nome do Contratado"
                    value={convenio.requesterName}
                    onChange={(e) =>
                      atualizarConvenio(
                        convenio.convenioId,
                        "requesterName",
                        e.target.value
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={salvar}>
          Salvar alterações
        </Button>
      </div>
    </div>
  )
}
