"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { formatarMoeda } from "../formatadores"
import type { TotaisFinanceiro } from "./dados-mock"

function classeValor(valor: number): string {
  if (valor > 0) {
    return "text-emerald-600 dark:text-emerald-400"
  }
  if (valor < 0) {
    return "text-destructive"
  }
  return "text-muted-foreground"
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground">{children}</p>
}

function Indicador({ children }: { children: React.ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>
}

export function ResumoFinanceiro({ totais }: { totais: TotaisFinanceiro }) {
  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
        <div className="text-right">
          <Rotulo>Atendimentos (R$)</Rotulo>
          <p
            className={cn("font-medium", classeValor(totais.atendimentosDebt))}
          >
            {formatarMoeda(totais.atendimentosDebt, false)}
          </p>
        </div>

        <Indicador>+</Indicador>

        <div className="text-right">
          <Rotulo>Atend. Pagos (R$)</Rotulo>
          <p
            className={cn(
              "font-medium",
              classeValor(totais.atendimentosCredit)
            )}
          >
            {formatarMoeda(totais.atendimentosCredit, false)}
          </p>
        </div>

        <Indicador>=</Indicador>

        <Card
          size="sm"
          className="gap-0 border-0 bg-sky-50 py-0 ring-0 dark:bg-sky-950/40"
        >
          <CardContent className="flex items-center gap-4 px-3 py-2 text-xs">
            <div className="text-right">
              <Rotulo>Saldo atend. (R$)</Rotulo>
              <p
                className={cn(
                  "font-medium",
                  classeValor(totais.saldoAtendimentos)
                )}
              >
                {formatarMoeda(totais.saldoAtendimentos, false)}
              </p>
            </div>

            <Indicador>+</Indicador>

            <div className="text-right">
              <Rotulo>Créditos (R$)</Rotulo>
              <p className={cn("font-medium", classeValor(totais.creditos))}>
                {formatarMoeda(totais.creditos, false)}
              </p>
            </div>

            <Indicador>+</Indicador>

            <div className="text-right">
              <Rotulo>Orçamentos (R$)</Rotulo>
              <p className={cn("font-medium", classeValor(totais.orcamentos))}>
                {formatarMoeda(totais.orcamentos, false)}
              </p>
            </div>

            <Indicador>=</Indicador>

            <div className="text-right">
              <Rotulo>Saldo (R$)</Rotulo>
              <p className={cn("font-semibold", classeValor(totais.saldo))}>
                {formatarMoeda(totais.saldo, false)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        Total nota promissória ={" "}
        <span className="text-destructive">
          {formatarMoeda(totais.notaPromissoria)}
        </span>
      </p>
    </div>
  )
}
