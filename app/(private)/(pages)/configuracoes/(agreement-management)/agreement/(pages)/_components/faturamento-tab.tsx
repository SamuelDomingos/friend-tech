"use client"

import {
  Controller,
  useWatch,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import {
  ENCODING_XML,
  GLOSA_METHODS,
  ORDER_GUIDES,
  TISS_METHODS,
  TISS_VERSIONS,
  VIA_OPTIONS,
  type ConvenioFormData,
} from "../../_schemas/convenio.schema"
import { bancosMock } from "../../_components/dados-mock"

interface FaturamentoTabProps {
  control: Control<ConvenioFormData>
  isEdit?: boolean
}

function SwitchRow({
  control,
  name,
  label,
}: {
  control: Control<ConvenioFormData>
  name: Path<ConvenioFormData>
  label: string
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center justify-between gap-3">
          <FieldLabel htmlFor={field.name} className="!mb-0">
            {label}
          </FieldLabel>
          <Switch
            id={field.name}
            checked={field.value as boolean}
            onCheckedChange={(checked) => field.onChange(checked)}
          />
        </div>
      )}
    />
  )
}

function ViaPersonalizada({
  control,
  percentageName,
  viaName,
  label,
}: {
  control: Control<ConvenioFormData>
  percentageName: Path<ConvenioFormData>
  viaName: Path<ConvenioFormData>
  label: string
}) {
  const percentage = useWatch({ control, name: percentageName })

  return (
    <div className="flex items-end gap-2">
      <Controller
        name={percentageName}
        control={control}
        render={({ field }) => (
          <Field className="flex-1">
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={field.name}
                placeholder="0,00"
                inputMode="decimal"
                value={field.value as string}
                name={field.name}
                ref={field.ref}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <InputGroupAddon align="inline-end">%</InputGroupAddon>
            </InputGroup>
          </Field>
        )}
      />

      <Controller
        name={viaName}
        control={control}
        render={({ field }) => (
          <Field className="w-20">
            <Select
              value={field.value as string}
              onValueChange={field.onChange}
              disabled={!percentage}
            >
              <SelectTrigger id={field.name} className="text-center">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {VIA_OPTIONS.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}
      />
    </div>
  )
}

function PeriodoEnvio({
  control,
  label,
  startName,
  endName,
}: {
  control: Control<ConvenioFormData>
  label: string
  startName: Path<ConvenioFormData>
  endName: Path<ConvenioFormData>
}) {
  return (
    <div className="space-y-1">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap items-center gap-2">
        <InputGroup className="w-44">
          <InputGroupAddon align="inline-start">
            a partir do dia
          </InputGroupAddon>
          <Controller
            name={startName}
            control={control}
            render={({ field }) => (
              <InputGroupInput
                maxLength={2}
                inputMode="numeric"
                className="text-right"
                value={field.value as string}
                name={field.name}
                ref={field.ref}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </InputGroup>

        <InputGroup className="w-40">
          <InputGroupAddon align="inline-start">até o dia</InputGroupAddon>
          <Controller
            name={endName}
            control={control}
            render={({ field }) => (
              <InputGroupInput
                maxLength={2}
                inputMode="numeric"
                className="text-right"
                value={field.value as string}
                name={field.name}
                ref={field.ref}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </InputGroup>
      </div>
    </div>
  )
}

function PrazoRecebimento({
  control,
  name,
  label,
}: {
  control: Control<ConvenioFormData>
  name: Path<ConvenioFormData>
  label: string
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id={field.name}
              maxLength={3}
              inputMode="numeric"
              className="text-right"
              value={field.value as string}
              name={field.name}
              ref={field.ref}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
            <InputGroupAddon align="inline-end">dias</InputGroupAddon>
          </InputGroup>
        </Field>
      )}
    />
  )
}

function UltimaGuia({
  control,
  name,
  label,
}: {
  control: Control<ConvenioFormData>
  name: Path<ConvenioFormData>
  label: string
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            id={field.name}
            className="text-right"
            disabled
            value={field.value as string}
            name={field.name}
            ref={field.ref}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        </Field>
      )}
    />
  )
}

export function FaturamentoTab({ control, isEdit }: FaturamentoTabProps) {
  const allowRepeatProcedures = useWatch({
    control,
    name: "allowRepeatProcedures",
  })
  const allowChangeProceduresDate = useWatch({
    control,
    name: "allowChangeProceduresDate",
  })
  const tissVersion = useWatch({ control, name: "tissVersion" })
  const isModernaTiss =
    /^(03\.04|03\.05|04\.)/.test(tissVersion ?? "") || tissVersion === ""

  return (
    <section className="space-y-6">
      <FieldGroup className="grid gap-4 sm:grid-cols-3">
        <Controller
          name="ans"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Registro ANS</FieldLabel>
              <Input
                id={field.name}
                placeholder="Registro ANS"
                maxLength={255}
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="contractCode"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Código na operadora</FieldLabel>
              <Input
                id={field.name}
                placeholder="Código na operadora"
                maxLength={255}
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="contractName"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Nome do contratado</FieldLabel>
              <Input
                id={field.name}
                placeholder="Nome do contratado"
                maxLength={255}
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="cnes"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Código CNES</FieldLabel>
              <Input
                id={field.name}
                placeholder="Código CNES"
                maxLength={255}
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="codification"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Codificação</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="AMB">AMB</SelectItem>
                    <SelectItem value="TUSS">TUSS</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="film"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Valor do Filme</FieldLabel>
              <Input
                id={field.name}
                placeholder="0,00"
                inputMode="decimal"
                {...field}
              />
            </Field>
          )}
        />

        <Controller
          name="coparticipation"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Coparticipação</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  placeholder="0,00"
                  inputMode="decimal"
                  {...field}
                />
                <InputGroupAddon align="inline-end">%</InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="taxes"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Taxas</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  placeholder="0,00"
                  inputMode="decimal"
                  {...field}
                />
                <InputGroupAddon align="inline-end">%</InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />

        <Controller
          name="bankId"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>
                Conta Bancária para recebimento
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bancosMock.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup className="grid gap-4 sm:grid-cols-3">
        <ViaPersonalizada
          control={control}
          percentageName="customProcedureViaPercentage"
          viaName="customProcedureVia"
          label="Via Personalizada 1"
        />

        <ViaPersonalizada
          control={control}
          percentageName="customProcedureViaPercentage2"
          viaName="customProcedureVia2"
          label="Via Personalizada 2"
        />

        <ViaPersonalizada
          control={control}
          percentageName="customProcedureViaPercentage3"
          viaName="customProcedureVia3"
          label="Via Personalizada 3"
        />
      </FieldGroup>

      <div className="space-y-4">
        <h3 className="text-base font-medium">Lotes e guias</h3>

        <FieldGroup className="grid gap-4 sm:grid-cols-3">
          <Controller
            name="autoincrementLastLote"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Número do último lote
                </FieldLabel>
                <Input
                  id={field.name}
                  className="text-right"
                  disabled={!!isEdit}
                  {...field}
                />
              </Field>
            )}
          />
        </FieldGroup>

        <PeriodoEnvio
          control={control}
          label="Período para envio das guias de consulta"
          startName="sendIntervalStartConsulta"
          endName="sendIntervalEndConsulta"
        />

        <PeriodoEnvio
          control={control}
          label="Período para envio das guias SADT"
          startName="sendIntervalStartSadt"
          endName="sendIntervalEndSadt"
        />

        <PeriodoEnvio
          control={control}
          label="Período para envio das guias GHI"
          startName="sendIntervalStartGhi"
          endName="sendIntervalEndGhi"
        />

        <FieldGroup className="grid gap-4 sm:grid-cols-3">
          <PrazoRecebimento
            control={control}
            name="deadlineExpectancyConsulta"
            label="Prazo para recebimento das guias de consulta"
          />
          <PrazoRecebimento
            control={control}
            name="deadlineExpectancySadt"
            label="Prazo para recebimento das guias SADT"
          />
          <PrazoRecebimento
            control={control}
            name="deadlineExpectancyGhi"
            label="Prazo para recebimento das guias GHI"
          />
        </FieldGroup>

        <FieldGroup className="grid gap-4 sm:grid-cols-3">
          <UltimaGuia
            control={control}
            name="autoincrementLastGuiaConsulta"
            label="Número da última guia consulta"
          />
          <UltimaGuia
            control={control}
            name="autoincrementLastGuiaSadt"
            label="Número da última guia SADT"
          />
          <UltimaGuia
            control={control}
            name="autoincrementLastGuiaGhi"
            label="Número da última guia GHI"
          />
        </FieldGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-medium">TISS</h3>

        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="tissVersion"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Versão TISS</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {TISS_VERSIONS.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="tissMethod"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Envio XML</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {TISS_METHODS.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="encodingXml"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Codificação do XML</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ENCODING_XML.map((e) => (
                        <SelectItem key={e.value} value={e.value}>
                          {e.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="orderGuides"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Ordenação de guias em lote</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ORDER_GUIDES.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="deadlineAttendance"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Validade das guias</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    maxLength={2}
                    inputMode="numeric"
                    className="text-right"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">dias</InputGroupAddon>
                </InputGroup>
              </Field>
            )}
          />

          <Controller
            name="deliveryAddress"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Endereço de entrega</FieldLabel>
                <Input
                  id={field.name}
                  placeholder="Endereço de entrega"
                  maxLength={255}
                  {...field}
                />
              </Field>
            )}
          />

          <Controller
            name="deliveryTime"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Horário de Entrega</FieldLabel>
                <Input
                  id={field.name}
                  placeholder="HH:mm"
                  maxLength={255}
                  {...field}
                />
              </Field>
            )}
          />
        </FieldGroup>

        <Field>
          <FieldLabel>Logo para impressão na guia</FieldLabel>
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" size="sm">
              <Upload className="size-4" />
              Carregar logo
            </Button>
            <span className="text-sm text-muted-foreground">
              JPG, JPEG ou PNG
            </span>
          </div>
        </Field>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-medium">Configurações gerais</h3>

        <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          <SwitchRow
            control={control}
            name="allowXml"
            label="Permite envio do arquivo XML"
          />
          <SwitchRow
            control={control}
            name="hideXmlTimezone"
            label="Ocultar fuso horário do XML"
          />
          <SwitchRow
            control={control}
            name="allowAuthorization"
            label="Procedimento somente com autorização"
          />
          <SwitchRow
            control={control}
            name="allowDelivery"
            label="Envio de contas pelos correios"
          />
          <SwitchRow
            control={control}
            name="billSessionsSplitted"
            label="Faturar guias de sessões de forma separada"
          />
          <SwitchRow
            control={control}
            name="billSessionOpen"
            label="Faturar guias de sessões agendadas"
          />
          <SwitchRow
            control={control}
            name="printProceduresAsList"
            label="Exibir os itens de sessões em lista"
          />
          <SwitchRow
            control={control}
            name="hidePrintGuidePrice"
            label="Não exibir valor nas guias"
          />
          <SwitchRow
            control={control}
            name="hideFinances"
            label="Não exibir lançamentos no contas"
          />

          {isModernaTiss && (
            <SwitchRow
              control={control}
              name="allowRepeatProcedures"
              label="Repetir procedimentos"
            />
          )}

          {allowRepeatProcedures && (
            <>
              <SwitchRow
                control={control}
                name="allowChangeProceduresDate"
                label="Permitir alterar data de execução dos procedimentos"
              />
              <SwitchRow
                control={control}
                name="allowChangeMatmedsDate"
                label="Permitir alterar data de execução dos matmeds"
              />
              <SwitchRow
                control={control}
                name="billGroupedProcedureTeam"
                label="Faturar equipe executante de forma agrupada"
              />
              <SwitchRow
                control={control}
                name="techniqueByProcedure"
                label="Técnica por procedimento"
              />
            </>
          )}

          {allowRepeatProcedures && allowChangeProceduresDate && (
            <SwitchRow
              control={control}
              name="allowChangeProceduresTime"
              label="Permitir alterar horário de execução dos procedimentos"
            />
          )}

          {isModernaTiss && (
            <SwitchRow
              control={control}
              name="allowSequentialItem"
              label="Único sequencial item"
            />
          )}

          <SwitchRow
            control={control}
            name="allowFixedPrice"
            label="Cálculo Externo"
          />
          <SwitchRow
            control={control}
            name="hideExecutantInfo"
            label="Faturar guias sem incluir o executante"
          />
          <SwitchRow
            control={control}
            name="hideMainGuideNumber"
            label="Não exibir campo Nº da Guia Principal"
          />
          <SwitchRow
            control={control}
            name="hideItemBilling"
            label="Não exibir procedimento administrativos na Guia / XML"
          />
          <SwitchRow
            control={control}
            name="requiredGuideAuthorization"
            label="Exigir dados da autorização"
          />
          <SwitchRow
            control={control}
            name="requiredGuideRequester"
            label="Exigir dados da solicitação"
          />
          <SwitchRow
            control={control}
            name="showPatientCpfLotResume"
            label="Exibir CPF do paciente no resumo do lote"
          />
          <SwitchRow
            control={control}
            name="showAuthorizationDataOnGloss"
            label="Faturar guias de glosas com os dados da autorização"
          />
          <SwitchRow
            control={control}
            name="allowMatmedCustomRedAcr"
            label="Permite redução/acréscimo em materiais/medicamentos/taxas"
          />
          <SwitchRow
            control={control}
            name="customProcedureViaOverPort"
            label="Vias especiais aplicadas também no porte"
          />
        </div>
      </div>
    </section>
  )
}
