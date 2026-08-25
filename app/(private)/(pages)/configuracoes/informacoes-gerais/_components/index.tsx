import { MapPin } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { CertificadoDigitalConfig } from "./certificado-digital-config"
import { ContatoClinica } from "./contato-clinica"
import { DadosClinica } from "./dados-clinica"
import { enderecoClinica2Mock, enderecoClinicaMock } from "./dados-mock"
import { EcacConfig } from "./ecac-config"
import { EnderecoFiscal } from "./endereco-fiscal"
import { EnderecoForm } from "./endereco-form"
import { LucroPresumidoConfig } from "./lucro-presumido-config"
import { NotaFiscalConfig } from "./nota-fiscal-config"
import { Socios } from "./socios"

export function InformacoesGeraisView() {
  return (
    <div className="space-y-8">
      <DadosClinica />

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="size-5 text-muted-foreground" />
          Endereço da clínica
        </h2>

        <EnderecoForm endereco={enderecoClinicaMock} />

        <Separator className="mt-6" />
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="size-5 text-muted-foreground" />
          Endereço da clínica 2
        </h2>

        <EnderecoForm endereco={enderecoClinica2Mock} />

        <Separator className="mt-6" />
      </section>

      <ContatoClinica />
      <EcacConfig />
      <LucroPresumidoConfig />
      <CertificadoDigitalConfig />
      <EnderecoFiscal />
      <NotaFiscalConfig />
      <Socios />
    </div>
  )
}
