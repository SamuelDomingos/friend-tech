"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ArrowLeft, FileText, Info, UsersRound } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Transfer } from "@/components/transfer"

import { conveniosMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"
import { proceduresMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/procedures/_components/mock-data"
import { externalDoctorsMock } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/external-doctors/_components/mock-data"
import { usuariosMock } from "@/app/(private)/(pages)/configuracoes/(geral)/usuarios/_components/dados-mock"

import {
  APLICACAO_INFORMACOES,
  FIELDS_TYPES,
  TISS_TYPES,
  unidadesMock,
  type BillingRule,
} from "./mock-data"

const usuariosInternosMock = usuariosMock.slice(0, 15)

interface BillingRuleFormProps {
  rule: BillingRule | null
}

const requiredMark = (
  <span className="text-destructive text-xs font-normal">*</span>
)

export function BillingRuleForm({ rule }: BillingRuleFormProps) {
  const isEdit = !!rule
  const router = useRouter()

  const [nome, setNome] = useState(rule?.nome ?? "")
  const [tissType, setTissType] = useState(rule?.tissType ?? "")
  const [fieldsType, setFieldsType] = useState(rule?.fieldsType ?? "")
  const [applier, setApplier] = useState(rule?.applier ?? "")
  const [contractCode, setContractCode] = useState(rule?.contractCode ?? "")
  const [contractName, setContractName] = useState(rule?.contractName ?? "")

  const [unidadeIds, setUnidadeIds] = useState<string[]>(
    rule?.unidadeIds ?? []
  )
  const [convenioIds, setConvenioIds] = useState<string[]>(
    rule?.convenioIds ?? []
  )
  const [procedimentoIds, setProcedimentoIds] = useState<string[]>(
    rule?.procedimentoIds ?? []
  )
  const [usuarioInternoIds, setUsuarioInternoIds] = useState<string[]>(
    rule?.usuarioInternoIds ?? []
  )
  const [usuarioExternoIds, setUsuarioExternoIds] = useState<string[]>(
    rule?.usuarioExternoIds ?? []
  )

  const cancelar = () => router.push("/configuracoes/billing-rules")

  const submeter = () => {
    if (!nome.trim() || !tissType || !fieldsType || !applier) return

    toast(
      isEdit
        ? "Regra de faturamento atualizada com sucesso."
        : "Regra de faturamento criada com sucesso."
    )
    router.push("/configuracoes/billing-rules")
  }

  const transferSelector = (
    items: { id: string; nome: string }[],
    selectedIds: string[],
    onChange: (ids: string[]) => void
  ) => {
    const nomePorId = new Map(items.map((i) => [i.id, i.nome]))
    const idPorNome = new Map(items.map((i) => [i.nome, i.id]))
    const selecionados = selectedIds
      .map((id) => nomePorId.get(id))
      .filter((nome): nome is string => !!nome)

    return (
      <Transfer
        disponiveisTitle="Disponíveis"
        inclusosTitle="Em uso"
        searchPlaceholder="Pesquisar"
        disponiveis={items
          .map((i) => i.nome)
          .filter((nome) => !selecionados.includes(nome))}
        inclusos={selecionados}
        onIncludedChange={(nomes) =>
          onChange(
            nomes
              .map((nome) => idPorNome.get(nome))
              .filter((id): id is string => !!id)
          )
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button type="button" variant="outline" size="sm" onClick={cancelar}>
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
        <span className="text-muted-foreground">|</span>
        <p className="text-base font-semibold">
          {isEdit ? "Editar regra de faturamento" : "Criar regra de faturamento"}
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Info className="size-5 text-primary" />
          </div>
          <p className="text-base font-medium">Informações básicas da regra</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="regra-nome">Nome {requiredMark}</FieldLabel>
            <Input
              id="regra-nome"
              placeholder="Digite um texto para identificação da regra"
              maxLength={255}
              disabled={isEdit}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="regra-tiss">
              Tipo de guia {requiredMark}
            </FieldLabel>
            <Select value={tissType} onValueChange={setTissType}>
              <SelectTrigger id="regra-tiss">
                <SelectValue placeholder="Tipo de guia" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TISS_TYPES.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="regra-fields-type">
              Tipo de informação {requiredMark}
            </FieldLabel>
            <Select value={fieldsType} onValueChange={setFieldsType}>
              <SelectTrigger id="regra-fields-type">
                <SelectValue placeholder="Tipo de informação" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FIELDS_TYPES.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="mt-4">
          <Label className="mb-2 block">
            Alteração das informações {requiredMark}
          </Label>
          <RadioGroup
            value={applier}
            onValueChange={setApplier}
            className="flex flex-wrap gap-6"
          >
            {APLICACAO_INFORMACOES.map((opcao) => (
              <label
                key={opcao.value}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <RadioGroupItem value={opcao.value} />
                {opcao.label}
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-base font-medium">Aplicação aos campos</p>
            <p className="text-sm text-muted-foreground">
              Preencha pelo menos um dos campos que serão utilizados na
              guia. Os campos não preenchidos manterão os dados do
              profissional.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <Field>
            <FieldLabel htmlFor="regra-contract-code">
              Código da Operadora
            </FieldLabel>
            <Input
              id="regra-contract-code"
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
            />
          </Field>
          <Field className="sm:col-span-3">
            <FieldLabel htmlFor="regra-contract-name">
              Nome do Contratado
            </FieldLabel>
            <Input
              id="regra-contract-name"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <UsersRound className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-base font-medium">Grupos inclusos</p>
            <p className="text-sm text-muted-foreground">
              As informações acima serão aplicadas para todos os itens
              selecionados abaixo.
            </p>
          </div>
        </div>

        <Accordion
          className="mt-6 border rounded-md"
          type="multiple"
          defaultValue={["unidades"]}
        >
          <AccordionItem value="unidades">
            <AccordionTrigger className="px-3">Unidades</AccordionTrigger>
            <AccordionContent className="p-4">
              {transferSelector(unidadesMock, unidadeIds, setUnidadeIds)}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="convenios">
            <AccordionTrigger className="px-3">Convênios</AccordionTrigger>
            <AccordionContent className="p-4">
              {transferSelector(conveniosMock, convenioIds, setConvenioIds)}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="procedimentos">
            <AccordionTrigger className="px-3">
              Procedimentos
            </AccordionTrigger>
            <AccordionContent className="p-4">
              {transferSelector(
                proceduresMock,
                procedimentoIds,
                setProcedimentoIds
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="internos">
            <AccordionTrigger className="px-3">
              Profissionais Internos
            </AccordionTrigger>
            <AccordionContent className="p-4">
              {transferSelector(
                usuariosInternosMock,
                usuarioInternoIds,
                setUsuarioInternoIds
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="externos">
            <AccordionTrigger className="px-3">
              Profissionais Externos
            </AccordionTrigger>
            <AccordionContent className="p-4">
              {transferSelector(
                externalDoctorsMock,
                usuarioExternoIds,
                setUsuarioExternoIds
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={cancelar}>
          Cancelar
        </Button>
        <Button type="button" onClick={submeter}>
          {isEdit ? "Salvar alterações" : "Criar regra"}
        </Button>
      </div>
    </div>
  )
}
