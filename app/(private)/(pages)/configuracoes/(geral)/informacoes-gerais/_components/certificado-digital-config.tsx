import { ShieldCheck } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { certificadoDigitalMock } from "./dados-mock"
import { ReadonlyField } from "./readonly-field"

export function CertificadoDigitalConfig() {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <ShieldCheck className="size-5 text-primary" />
        Configuração de Certificado Digital
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <ReadonlyField
          label="Certificado Digital enviado"
          value={certificadoDigitalMock.certificadoEnviado}
        />
        <ReadonlyField
          label="Senha do Certificado Digital"
          value={certificadoDigitalMock.senhaCertificado}
        />
      </div>

      <Separator className="mt-6" />
    </section>
  )
}
