import { Phone } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { contatoClinicaMock } from "./dados-mock"
import { ReadonlyField } from "./readonly-field"

export function ContatoClinica() {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Phone className="size-5 text-muted-foreground" />
        Contato da clínica
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <ReadonlyField label="Telefone 1" value={contatoClinicaMock.telefone1} />
        <ReadonlyField label="Email" value={contatoClinicaMock.email} />
        <ReadonlyField label="Telefone 2" value={contatoClinicaMock.telefone2} />
        <ReadonlyField label="Site" value={contatoClinicaMock.site} />
      </div>

      <Separator className="mt-6" />
    </section>
  )
}
