import { ReceiptText } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { notaFiscalMock } from "./dados-mock"
import { ReadonlyField } from "./readonly-field"

export function NotaFiscalConfig() {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <ReceiptText className="size-5 text-muted-foreground" />
        Padronização da Nota Fiscal
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <ReadonlyField
          label="Senha web da prefeitura"
          value={notaFiscalMock.senhaWebPrefeitura}
        />
        <ReadonlyField
          label="CNAE Padrão"
          value={notaFiscalMock.cnaePadrao}
          className="md:col-span-3"
        />
        <ReadonlyField
          label="Código padrão do serviço prestado"
          value={notaFiscalMock.codigoPadraoServico}
          className="md:col-span-3"
        />
        <ReadonlyField
          label="Discriminação padrão do serviço"
          value={notaFiscalMock.discriminacaoPadraoServico}
          className="md:col-span-3"
        />
      </div>

      <Separator className="mt-6" />
    </section>
  )
}
