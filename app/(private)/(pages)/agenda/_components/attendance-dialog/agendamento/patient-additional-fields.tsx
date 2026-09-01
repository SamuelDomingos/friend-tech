"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import type { AgendamentoFormValues } from "./types"
import {
  ESTADO_CIVIL_OPTIONS,
  ETNIA_OPTIONS,
  NACIONALIDADE_OPTIONS,
  OUTROS_DOCUMENTOS_OPTIONS,
  RACA_OPTIONS,
  SEXO_OPTIONS,
  TIPO_LOGRADOURO_OPTIONS,
  TIPO_SANGUINEO_OPTIONS,
  UF_OPTIONS,
  UTILIZAR_RN_OPTIONS,
} from "./patient-field-options"

interface PatientAdditionalFieldsProps {
  values: AgendamentoFormValues
  onChange: <K extends keyof AgendamentoFormValues>(
    key: K,
    value: AgendamentoFormValues[K]
  ) => void
}

function OptionSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder = "Selecione",
}: {
  id: string
  value: string
  onValueChange: (value: string) => void
  options: readonly string[]
  placeholder?: string
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function PatientAdditionalFields({
  values,
  onChange,
}: PatientAdditionalFieldsProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="informacoes-adicionais">
        <AccordionTrigger>Informações adicionais</AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="patient-nome-social">Nome Social</FieldLabel>
              <Input
                id="patient-nome-social"
                placeholder="Insira o nome social do paciente"
                value={values.nomeSocial}
                onChange={(e) => onChange("nomeSocial", e.target.value)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="patient-outro-documento-tipo">
                  Outros documentos de identidade
                </FieldLabel>
                <OptionSelect
                  id="patient-outro-documento-tipo"
                  value={values.outroDocumentoTipo}
                  onValueChange={(v) => onChange("outroDocumentoTipo", v)}
                  options={OUTROS_DOCUMENTOS_OPTIONS}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="patient-outro-documento-numero">
                  Número do documento
                </FieldLabel>
                <Input
                  id="patient-outro-documento-numero"
                  value={values.outroDocumentoNumero}
                  onChange={(e) =>
                    onChange("outroDocumentoNumero", e.target.value)
                  }
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="patient-sexo">Sexo</FieldLabel>
              <OptionSelect
                id="patient-sexo"
                value={values.sexo}
                onValueChange={(v) => onChange("sexo", v)}
                options={SEXO_OPTIONS}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-raca">Raça</FieldLabel>
              <OptionSelect
                id="patient-raca"
                value={values.raca}
                onValueChange={(v) => onChange("raca", v)}
                options={RACA_OPTIONS}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-etnia">Etnia</FieldLabel>
              <OptionSelect
                id="patient-etnia"
                value={values.etnia}
                onValueChange={(v) => onChange("etnia", v)}
                options={ETNIA_OPTIONS}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-naturalidade">
                Naturalidade
              </FieldLabel>
              <Input
                id="patient-naturalidade"
                placeholder="Informe a naturalidade"
                value={values.naturalidade}
                onChange={(e) => onChange("naturalidade", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-nacionalidade">
                Nacionalidade
              </FieldLabel>
              <OptionSelect
                id="patient-nacionalidade"
                value={values.nacionalidade}
                onValueChange={(v) => onChange("nacionalidade", v)}
                options={NACIONALIDADE_OPTIONS}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-estado-civil">
                Estado civil
              </FieldLabel>
              <OptionSelect
                id="patient-estado-civil"
                value={values.estadoCivil}
                onValueChange={(v) => onChange("estadoCivil", v)}
                options={ESTADO_CIVIL_OPTIONS}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-plano">Plano</FieldLabel>
              <Input
                id="patient-plano"
                placeholder="Insira o plano"
                value={values.plano}
                onChange={(e) => onChange("plano", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-rn-guia">
                Utilizar RN na Guia?
              </FieldLabel>
              <OptionSelect
                id="patient-rn-guia"
                value={values.utilizarRnGuia}
                onValueChange={(v) => onChange("utilizarRnGuia", v)}
                options={UTILIZAR_RN_OPTIONS}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-telefone-2">Telefone 2</FieldLabel>
              <Input
                id="patient-telefone-2"
                placeholder="Insira o telefone"
                value={values.telefone2}
                onChange={(e) => onChange("telefone2", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-como-conheceu">
                Como conheceu?
              </FieldLabel>
              <Input
                id="patient-como-conheceu"
                placeholder="Escreva como conheceu"
                value={values.comoConheceu}
                onChange={(e) => onChange("comoConheceu", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="patient-profissao">Profissão</FieldLabel>
              <Input
                id="patient-profissao"
                placeholder="Insira a profissão"
                value={values.profissao}
                onChange={(e) => onChange("profissao", e.target.value)}
              />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <p className="text-sm font-medium">Endereço</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="patient-cep">CEP</FieldLabel>
                <Input
                  id="patient-cep"
                  value={values.cep}
                  onChange={(e) => onChange("cep", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-tipo-logradouro">
                  Tipo logradouro
                </FieldLabel>
                <OptionSelect
                  id="patient-tipo-logradouro"
                  value={values.tipoLogradouro}
                  onValueChange={(v) => onChange("tipoLogradouro", v)}
                  options={TIPO_LOGRADOURO_OPTIONS}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-endereco">Endereço</FieldLabel>
                <Input
                  id="patient-endereco"
                  value={values.endereco}
                  onChange={(e) => onChange("endereco", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-numero">Número</FieldLabel>
                <Input
                  id="patient-numero"
                  value={values.numero}
                  onChange={(e) => onChange("numero", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-complemento">
                  Complemento
                </FieldLabel>
                <Input
                  id="patient-complemento"
                  placeholder="Escreva o complemento"
                  value={values.complemento}
                  onChange={(e) => onChange("complemento", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-bairro">Bairro</FieldLabel>
                <Input
                  id="patient-bairro"
                  value={values.bairro}
                  onChange={(e) => onChange("bairro", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-cidade">Cidade</FieldLabel>
                <Input
                  id="patient-cidade"
                  value={values.cidade}
                  onChange={(e) => onChange("cidade", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-estado">Estado</FieldLabel>
                <Select
                  value={values.estado}
                  onValueChange={(v) => onChange("estado", v)}
                >
                  <SelectTrigger id="patient-estado">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {UF_OPTIONS.map((uf) => (
                        <SelectItem key={uf.sigla} value={uf.sigla}>
                          {uf.nome}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <p className="text-sm font-medium">Informações médicas</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="patient-alergias">Alergias</FieldLabel>
                <Input
                  id="patient-alergias"
                  placeholder="Informe a alergia"
                  value={values.alergias}
                  onChange={(e) => onChange("alergias", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-tipo-sanguineo">
                  Tipo Sanguíneo
                </FieldLabel>
                <OptionSelect
                  id="patient-tipo-sanguineo"
                  value={values.tipoSanguineo}
                  onValueChange={(v) => onChange("tipoSanguineo", v)}
                  options={TIPO_SANGUINEO_OPTIONS}
                />
              </Field>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <p className="text-sm font-medium">Dados do Responsável</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="patient-nome-responsavel">
                  Nome do Responsável
                </FieldLabel>
                <Input
                  id="patient-nome-responsavel"
                  placeholder="Insira o nome do responsável"
                  value={values.nomeResponsavel}
                  onChange={(e) => onChange("nomeResponsavel", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-cpf-responsavel">CPF</FieldLabel>
                <Input
                  id="patient-cpf-responsavel"
                  placeholder="Insira o nº do CPF"
                  value={values.cpfResponsavel}
                  onChange={(e) => onChange("cpfResponsavel", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="patient-nome-mae">Mãe</FieldLabel>
                <Input
                  id="patient-nome-mae"
                  placeholder="Insira o nome da mãe do paciente"
                  value={values.nomeMae}
                  onChange={(e) => onChange("nomeMae", e.target.value)}
                />
              </Field>

              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="patient-observacoes-responsavel">
                  Observações
                </FieldLabel>
                <Textarea
                  id="patient-observacoes-responsavel"
                  className="h-20 resize-none"
                  value={values.observacoesResponsavel}
                  onChange={(e) =>
                    onChange("observacoesResponsavel", e.target.value)
                  }
                />
              </Field>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
