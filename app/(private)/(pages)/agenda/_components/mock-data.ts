import { addDays, setHours, setMinutes, startOfWeek } from "date-fns"

import { usuariosMock } from "@/app/(private)/(pages)/configuracoes/(geral)/usuarios/_components/dados-mock"
import { unidadesMock } from "@/app/(private)/(pages)/configuracoes/(geral)/unidades/_components/dados-mock"

import type { IUnidade } from "@/app/(private)/(pages)/agenda/_components/calendar/contexts/calendar-context"
import type { IEvent, IUser } from "@/app/(private)/(pages)/agenda/_components/calendar/interfaces"
import type { TAttendanceStatus, TEventColor } from "@/app/(private)/(pages)/agenda/_components/calendar/types"

export const professionalsMock: IUser[] = usuariosMock
  .filter((u) => u.tipo === "doctor" && u.status === "active")
  .slice(0, 8)
  .map((u, index) => ({
    id: u.id,
    name: u.nome,
    avatar: u.avatarUrl,
    isFavorite: index % 2 === 0,
  }))

export const unidadesFilterMock: IUnidade[] = unidadesMock.map((u) => ({
  id: u.id,
  nome: u.nome,
}))

function horario(diasAPartirDeHoje: number, hora: number, minuto = 0): Date {
  const inicioSemana = startOfWeek(new Date())
  return setMinutes(setHours(addDays(inicioSemana, diasAPartirDeHoje), hora), minuto)
}

const cores: TEventColor[] = [
  "blue",
  "green",
  "purple",
  "orange",
  "red",
  "yellow",
  "gray",
]

const statusRotacao: TAttendanceStatus[] = [
  "scheduled",
  "confirmed",
  "arrived",
  "in_attendance",
  "done",
  "missed",
  "canceled",
]

const pagamentosRotacao = ["Dinheiro", "Pix", "Cartão de Crédito", "Convênio", ""]

interface AgendamentoMock {
  dia: number
  hora: number
  minuto?: number
  duracaoMinutos: number
  procedimento: string
  paciente: string
  descricao: string
  telefone?: string
  idade?: number
}

const agendamentos: AgendamentoMock[] = [
  { dia: 1, hora: 8, duracaoMinutos: 30, procedimento: "Consulta", paciente: "Maria Fernandes", descricao: "Retorno pós-cirúrgico", telefone: "(11) 98765-4321", idade: 42 },
  { dia: 1, hora: 9, minuto: 30, duracaoMinutos: 30, procedimento: "Consulta", paciente: "João Pereira", descricao: "Primeira consulta", telefone: "(11) 91234-5678", idade: 35 },
  { dia: 1, hora: 14, duracaoMinutos: 60, procedimento: "Exame", paciente: "Ana Costa", descricao: "Exame de rotina", idade: 29 },
  { dia: 2, hora: 8, duracaoMinutos: 30, procedimento: "Consulta", paciente: "Carlos Almeida", descricao: "Avaliação clínica", telefone: "(11) 99887-6655", idade: 51 },
  { dia: 2, hora: 10, duracaoMinutos: 30, procedimento: "Retorno", paciente: "Fernanda Rocha", descricao: "Acompanhamento", idade: 38 },
  { dia: 2, hora: 15, minuto: 30, duracaoMinutos: 45, procedimento: "Consulta", paciente: "Pedro Nascimento", descricao: "Consulta de rotina", telefone: "(11) 98111-2233" },
  { dia: 3, hora: 9, duracaoMinutos: 30, procedimento: "Consulta", paciente: "Juliana Lima", descricao: "Primeira consulta", idade: 27 },
  { dia: 3, hora: 11, duracaoMinutos: 30, procedimento: "Retorno", paciente: "Lucas Araújo", descricao: "Reavaliação", telefone: "(11) 97766-5544", idade: 44 },
  { dia: 3, hora: 16, duracaoMinutos: 60, procedimento: "Exame", paciente: "Beatriz Fernandes", descricao: "Exame complementar", idade: 33 },
  { dia: 4, hora: 8, minuto: 30, duracaoMinutos: 30, procedimento: "Consulta", paciente: "Rafael Carvalho", descricao: "Consulta de rotina", telefone: "(11) 96655-4433" },
  { dia: 4, hora: 13, duracaoMinutos: 30, procedimento: "Retorno", paciente: "Camila Gomes", descricao: "Acompanhamento", idade: 31 },
  { dia: 5, hora: 10, duracaoMinutos: 45, procedimento: "Consulta", paciente: "Rodrigo Martins", descricao: "Avaliação clínica", telefone: "(11) 95544-3322", idade: 47 },
  { dia: 5, hora: 14, minuto: 30, duracaoMinutos: 30, procedimento: "Retorno", paciente: "Patrícia Rocha", descricao: "Reavaliação", idade: 39 },
]

export const eventsMock: IEvent[] = agendamentos.map((agendamento, index) => {
  const inicio = horario(agendamento.dia, agendamento.hora, agendamento.minuto)
  const fim = new Date(inicio.getTime() + agendamento.duracaoMinutos * 60 * 1000)
  const profissional = professionalsMock[index % professionalsMock.length]
  const unidade = unidadesFilterMock[index % unidadesFilterMock.length]

  return {
    id: `agenda-evento-${index + 1}`,
    startDate: inicio.toISOString(),
    endDate: fim.toISOString(),
    title: `${agendamento.procedimento} - ${agendamento.paciente}`,
    description: agendamento.descricao,
    color: cores[index % cores.length],
    user: profissional,
    unidadeId: unidade.id,
    patientName: agendamento.paciente,
    procedureName: agendamento.procedimento,
    status: statusRotacao[index % statusRotacao.length],
    paymentMethod: pagamentosRotacao[index % pagamentosRotacao.length],
    patientPhone: agendamento.telefone,
    patientAge: agendamento.idade,
  }
})
