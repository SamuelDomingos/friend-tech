import { addDays, setHours, setMinutes, startOfWeek } from "date-fns"

import { usuariosMock } from "@/app/(private)/(pages)/configuracoes/(geral)/usuarios/_components/dados-mock"
import { unidadesMock } from "@/app/(private)/(pages)/configuracoes/(geral)/unidades/_components/dados-mock"

import type { IUnidade } from "@/components/calendar/contexts/calendar-context"
import type { IEvent, IUser } from "@/components/calendar/interfaces"
import type { TEventColor } from "@/components/calendar/types"

export const professionalsMock: IUser[] = usuariosMock
  .filter((u) => u.tipo === "doctor" && u.status === "active")
  .slice(0, 8)
  .map((u) => ({ id: u.id, name: u.nome, avatar: u.avatarUrl }))

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

interface AgendamentoMock {
  dia: number
  hora: number
  minuto?: number
  duracaoMinutos: number
  titulo: string
  descricao: string
}

const agendamentos: AgendamentoMock[] = [
  { dia: 1, hora: 8, duracaoMinutos: 30, titulo: "Consulta - Maria Fernandes", descricao: "Retorno pós-cirúrgico" },
  { dia: 1, hora: 9, minuto: 30, duracaoMinutos: 30, titulo: "Consulta - João Pereira", descricao: "Primeira consulta" },
  { dia: 1, hora: 14, duracaoMinutos: 60, titulo: "Exame - Ana Costa", descricao: "Exame de rotina" },
  { dia: 2, hora: 8, duracaoMinutos: 30, titulo: "Consulta - Carlos Almeida", descricao: "Avaliação clínica" },
  { dia: 2, hora: 10, duracaoMinutos: 30, titulo: "Retorno - Fernanda Rocha", descricao: "Acompanhamento" },
  { dia: 2, hora: 15, minuto: 30, duracaoMinutos: 45, titulo: "Consulta - Pedro Nascimento", descricao: "Consulta de rotina" },
  { dia: 3, hora: 9, duracaoMinutos: 30, titulo: "Consulta - Juliana Lima", descricao: "Primeira consulta" },
  { dia: 3, hora: 11, duracaoMinutos: 30, titulo: "Retorno - Lucas Araújo", descricao: "Reavaliação" },
  { dia: 3, hora: 16, duracaoMinutos: 60, titulo: "Exame - Beatriz Fernandes", descricao: "Exame complementar" },
  { dia: 4, hora: 8, minuto: 30, duracaoMinutos: 30, titulo: "Consulta - Rafael Carvalho", descricao: "Consulta de rotina" },
  { dia: 4, hora: 13, duracaoMinutos: 30, titulo: "Retorno - Camila Gomes", descricao: "Acompanhamento" },
  { dia: 5, hora: 10, duracaoMinutos: 45, titulo: "Consulta - Rodrigo Martins", descricao: "Avaliação clínica" },
  { dia: 5, hora: 14, minuto: 30, duracaoMinutos: 30, titulo: "Retorno - Patrícia Rocha", descricao: "Reavaliação" },
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
    title: agendamento.titulo,
    description: agendamento.descricao,
    color: cores[index % cores.length],
    user: profissional,
    unidadeId: unidade.id,
  }
})
