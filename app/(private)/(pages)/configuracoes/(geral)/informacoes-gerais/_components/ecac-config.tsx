import { Landmark } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { ecacConfigMock } from "./dados-mock"
import { ReadonlyField } from "./readonly-field"

export function EcacConfig() {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Landmark className="size-5 text-primary" />
        Configuração do eCAC
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <ReadonlyField label="Código de Acesso" value={ecacConfigMock.codigoAcesso} />
        <ReadonlyField label="Senha do eCAC" value={ecacConfigMock.senhaEcac} />
      </div>

      <Separator className="mt-6" />
    </section>
  )
}
