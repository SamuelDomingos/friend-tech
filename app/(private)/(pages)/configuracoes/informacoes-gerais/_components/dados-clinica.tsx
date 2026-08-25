import Link from "next/link"
import { Building2, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { dadosClinicaMock } from "./dados-mock"
import { ReadonlyField } from "./readonly-field"

export function DadosClinica() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Building2 className="size-5 text-muted-foreground" />
          Dados da clínica
        </h2>

        <Button asChild variant="outline" size="sm">
          <Link href="/configuracoes/informacoes-gerais/form">
            <Pencil className="size-4" />
            Editar
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <ReadonlyField
          label="Código de acesso externo"
          value={dadosClinicaMock.codigoAcessoExterno}
        />
        <ReadonlyField label="CNPJ" value={dadosClinicaMock.cnpj} />
        <ReadonlyField label="Código do cliente" value={dadosClinicaMock.codigoCliente} />
        <ReadonlyField label="Nome Fantasia" value={dadosClinicaMock.nomeFantasia} />
        <ReadonlyField
          label="Regime Tributário"
          value={dadosClinicaMock.regimeTributario}
        />
        <ReadonlyField label="Razão Social" value={dadosClinicaMock.razaoSocial} />
        <ReadonlyField
          label="Inscrição Municipal"
          value={dadosClinicaMock.inscricaoMunicipal}
        />
        <ReadonlyField
          label="Responsável pela clínica"
          value={dadosClinicaMock.responsavelClinica}
        />
        <ReadonlyField
          label="Contador responsável"
          value={dadosClinicaMock.contadorResponsavel}
        />
        <ReadonlyField
          label="Início do contrato"
          value={dadosClinicaMock.inicioContrato}
        />
      </div>

      <Separator className="mt-6" />
    </section>
  )
}
