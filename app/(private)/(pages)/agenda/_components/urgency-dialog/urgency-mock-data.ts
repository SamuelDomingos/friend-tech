import { pacientesMock } from "@/app/(private)/(pages)/agenda/_components/attendance-dialog/mock-data"

export interface AtendimentoHistorico {
  id: string
  data: string
  unidade: string
  descricao: string
  observacao: string
  status: "Confirmado" | "Realizado" | "Cancelado" | "Faltou"
}

export const historicoPorPacienteMock: Record<string, AtendimentoHistorico[]> = {
  "1": [
    {
      id: "hist-1-1",
      data: "2026-08-20T09:00:00",
      unidade: "Infinity Fortaleza",
      descricao: "Consulta de rotina",
      observacao: "",
      status: "Realizado",
    },
  ],
  "2": [
    {
      id: "hist-2-1",
      data: "2026-08-27T15:00:00",
      unidade: "Infinity Fortaleza",
      descricao: "Retorno",
      observacao: "Trouxe exames anteriores",
      status: "Realizado",
    },
    {
      id: "hist-2-2",
      data: "2026-09-05T10:00:00",
      unidade: "Unidade Central",
      descricao: "Avaliação clínica",
      observacao: "",
      status: "Confirmado",
    },
  ],
  "7": [
    {
      id: "hist-7-1",
      data: "2026-08-15T14:30:00",
      unidade: "Infinity Fortaleza",
      descricao: "Exame de rotina",
      observacao: "",
      status: "Faltou",
    },
    {
      id: "hist-7-2",
      data: "2026-08-30T19:00:00",
      unidade: "Infinity Fortaleza",
      descricao: "Urgência",
      observacao: "Dor abdominal",
      status: "Realizado",
    },
  ],
  "4": [
    {
      id: "hist-4-1",
      data: "2026-07-22T15:00:00",
      unidade: "Unidade Sul",
      descricao: "Consulta",
      observacao: "",
      status: "Cancelado",
    },
  ],
}

export interface UltimoAtendimentoUrgencia {
  id: string
  dataHora: string
  paciente: (typeof pacientesMock)[number]
  pagamento: string
}

export const ultimosAtendimentosUrgenciaMock: UltimoAtendimentoUrgencia[] = [
  {
    id: "urg-1",
    dataHora: "2026-08-30T19:00:00",
    paciente: pacientesMock[6],
    pagamento: "Particular",
  },
  {
    id: "urg-2",
    dataHora: "2026-08-27T15:00:00",
    paciente: pacientesMock[1],
    pagamento: "Convênio",
  },
  {
    id: "urg-3",
    dataHora: "2026-08-22T16:40:00",
    paciente: pacientesMock[2],
    pagamento: "Particular",
  },
  {
    id: "urg-4",
    dataHora: "2026-08-20T09:00:00",
    paciente: pacientesMock[0],
    pagamento: "Pix",
  },
]
