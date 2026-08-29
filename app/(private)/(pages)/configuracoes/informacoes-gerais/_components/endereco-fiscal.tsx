import { MapPinned } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { enderecoFiscalMock } from "./dados-mock"
import { EnderecoForm } from "./endereco-form"

export function EnderecoFiscal() {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <MapPinned className="size-5 text-primary" />
        Endereço Fiscal
      </h2>

      <EnderecoForm endereco={enderecoFiscalMock} fiscal />

      <Separator className="mt-6" />
    </section>
  )
}
