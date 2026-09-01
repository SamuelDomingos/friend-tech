"use client"

import { useRef, useState } from "react"
import { Upload } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formatarCnpj, formatarCpf } from "@/lib/masks"

import { conveniosMock, iniciais } from "@/app/(private)/(pages)/configuracoes/(agreement-management)/agreement/_components/dados-mock"
import {
  CONSELHOS,
  ESTADOS_UF,
} from "@/app/(private)/(pages)/configuracoes/(agreement-management)/requesters/_components/mock-data"

import {
  GRAUS_PARTICIPACAO,
  type ExternalDoctor,
  type ExternalDoctorInsuranceLink,
} from "./mock-data"

interface ExternalDoctorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  doctor: ExternalDoctor | null
  onSave: (doctor: ExternalDoctor) => void
}

function formatarCpfCnpj(valor: string): string {
  const digitos = valor.replace(/\D/g, "")
  return digitos.length > 11 ? formatarCnpj(valor) : formatarCpf(valor)
}

function montarConvenios(
  doctor: ExternalDoctor | null
): ExternalDoctorInsuranceLink[] {
  return conveniosMock.map((convenio) => {
    const existente = doctor?.convenios.find(
      (c) => c.convenioId === convenio.id
    )

    return {
      convenioId: convenio.id,
      convenioNome: convenio.nome,
      doctorCode: existente?.doctorCode ?? "",
      doctorName: existente?.doctorName ?? "",
    }
  })
}

export function ExternalDoctorDialog({
  open,
  onOpenChange,
  doctor,
  onSave,
}: ExternalDoctorDialogProps) {
  const isEdit = !!doctor

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto] sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar médico externo" : "Adicionar médico externo"}
          </DialogTitle>
          <DialogDescription>
            Configure os dados do médico externo.
          </DialogDescription>
        </DialogHeader>

        <ExternalDoctorForm
          key={doctor?.id ?? "new"}
          doctor={doctor}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface ExternalDoctorFormProps {
  doctor: ExternalDoctor | null
  onSave: (doctor: ExternalDoctor) => void
  onCancel: () => void
}

function ExternalDoctorForm({
  doctor,
  onSave,
  onCancel,
}: ExternalDoctorFormProps) {
  const [nome, setNome] = useState(doctor?.nome ?? "")
  const [cpfCnpj, setCpfCnpj] = useState(doctor?.cpfCnpj ?? "")
  const [conselho, setConselho] = useState(doctor?.conselho ?? "")
  const [numeroConselho, setNumeroConselho] = useState(
    doctor?.numeroConselho ?? ""
  )
  const [grauParticipacao, setGrauParticipacao] = useState(
    doctor?.grauParticipacao ?? ""
  )
  const [uf, setUf] = useState(doctor?.uf ?? "")
  const [cbo, setCbo] = useState(doctor?.cbo ?? "")
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    doctor?.avatarUrl
  )
  const [convenios, setConvenios] = useState<ExternalDoctorInsuranceLink[]>(
    () => montarConvenios(doctor)
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const atualizarConvenio = (
    convenioId: string,
    campo: "doctorCode" | "doctorName",
    valor: string
  ) => {
    setConvenios((atual) =>
      atual.map((c) =>
        c.convenioId === convenioId ? { ...c, [campo]: valor } : c
      )
    )
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setAvatarUrl(reader.result as string)
    reader.readAsDataURL(file)
    event.target.value = ""
  }

  const salvar = () => {
    if (!nome.trim() || !cpfCnpj.trim() || !conselho || !numeroConselho.trim())
      return

    onSave({
      id: doctor?.id ?? `ed-${Date.now()}`,
      nome,
      cpfCnpj,
      conselho,
      numeroConselho,
      grauParticipacao,
      uf,
      cbo,
      avatarUrl,
      convenios,
    })
  }

  return (
    <>
      <ScrollArea className="min-h-0">
        <div className="space-y-6 pr-4 pb-1">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarImage src={avatarUrl} alt={nome || "Médico externo"} />
              <AvatarFallback>{iniciais(nome || "?")}</AvatarFallback>
            </Avatar>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-4" />
              Carregar
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="ed-nome">
                Nome completo <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="ed-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="ed-cpf-cnpj">
                CPF/CNPJ <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="ed-cpf-cnpj"
                value={cpfCnpj}
                onChange={(e) =>
                  setCpfCnpj(formatarCpfCnpj(e.target.value))
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="ed-conselho">
                Conselho <span className="text-destructive">*</span>
              </FieldLabel>
              <Select
                value={conselho || "none"}
                onValueChange={(v) => setConselho(v === "none" ? "" : v)}
              >
                <SelectTrigger id="ed-conselho">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">Selecione</SelectItem>
                    <SelectItem value="NAO_POSSUO">NÃO POSSUO</SelectItem>
                    {CONSELHOS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="ed-numero-conselho">
                Número do conselho{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="ed-numero-conselho"
                value={numeroConselho}
                onChange={(e) => setNumeroConselho(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="ed-grau-participacao">
                Grau de participação
              </FieldLabel>
              <Select
                value={grauParticipacao || "none"}
                onValueChange={(v) =>
                  setGrauParticipacao(v === "none" ? "" : v)
                }
              >
                <SelectTrigger id="ed-grau-participacao">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">Selecione</SelectItem>
                    {GRAUS_PARTICIPACAO.map((grau) => (
                      <SelectItem key={grau} value={grau}>
                        {grau}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="ed-uf">UF</FieldLabel>
              <Select
                value={uf || "none"}
                onValueChange={(v) => setUf(v === "none" ? "" : v)}
              >
                <SelectTrigger id="ed-uf">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">Selecione</SelectItem>
                    {ESTADOS_UF.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="ed-cbo">CBO</FieldLabel>
              <Input
                id="ed-cbo"
                placeholder="Buscar CBO"
                value={cbo}
                onChange={(e) => setCbo(e.target.value)}
              />
            </Field>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Convênio</TableHead>
                  <TableHead>Código da Operadora</TableHead>
                  <TableHead>Nome do Contratado</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {convenios.map((convenio) => (
                  <TableRow key={convenio.convenioId}>
                    <TableCell className="font-medium">
                      {convenio.convenioNome}
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Código da Operadora"
                        value={convenio.doctorCode}
                        onChange={(e) =>
                          atualizarConvenio(
                            convenio.convenioId,
                            "doctorCode",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Nome do Contratado"
                        value={convenio.doctorName}
                        onChange={(e) =>
                          atualizarConvenio(
                            convenio.convenioId,
                            "doctorName",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={salvar}>
          Salvar alterações
        </Button>
      </DialogFooter>
    </>
  )
}
