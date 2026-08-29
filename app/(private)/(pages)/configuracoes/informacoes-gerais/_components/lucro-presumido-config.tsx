import { Percent } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { lucroPresumidoMock } from "./dados-mock"
import { ReadonlyField } from "./readonly-field"

export function LucroPresumidoConfig() {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Percent className="size-5 text-primary" />
        Configuração do Lucro Presumido
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <ReadonlyField label="Base de cálculo" value={lucroPresumidoMock.baseCalculo} />
        <ReadonlyField
          label="Antecipação do IRPF e CSLL"
          value={lucroPresumidoMock.antecipacaoIrpfCsll}
        />
      </div>

      <Separator className="mt-6" />
    </section>
  )
}
