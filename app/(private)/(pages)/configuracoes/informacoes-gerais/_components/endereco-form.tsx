import type { EnderecoClinica, EnderecoFiscal } from "./dados-mock"
import { ReadonlyField } from "./readonly-field"

interface EnderecoFormProps {
  endereco: EnderecoClinica | EnderecoFiscal
  fiscal?: boolean
}

export function EnderecoForm({ endereco, fiscal = false }: EnderecoFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <ReadonlyField
        label="Endereço"
        value={endereco.endereco}
        className="md:col-span-2"
      />
      <ReadonlyField label="Número" value={endereco.numero} />
      <ReadonlyField label="Complemento" value={endereco.complemento} />
      <ReadonlyField label="Bairro" value={endereco.bairro} />
      <ReadonlyField label="CEP" value={endereco.cep} />
      <ReadonlyField label="Cidade" value={endereco.cidade} />
      <ReadonlyField label="Estado" value={endereco.estado} />

      {fiscal && (
        <>
          <ReadonlyField
            label="Código do Município"
            value={(endereco as EnderecoFiscal).codigoMunicipio}
          />
          <ReadonlyField label="UF" value={(endereco as EnderecoFiscal).uf} />
          <ReadonlyField
            label="Telefone"
            value={(endereco as EnderecoFiscal).telefone}
          />
          <ReadonlyField
            label="Email"
            value={(endereco as EnderecoFiscal).email}
          />
        </>
      )}
    </div>
  )
}
