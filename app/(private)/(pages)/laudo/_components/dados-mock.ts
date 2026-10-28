export type StatusLaudo = "A_DESCREVER" | "LIBERADO" | "ENTREGUE"

export interface FluxoLaudo {
  id: string
  alias: string
  nome: string
  cor: string
}

export interface Laudo {
  id: string
  attendanceId: string
  fluxoId: string
  data: string
  prazo: string
  pacienteId: string
  pacienteNome: string
  solicitante: string
  procedimento: string
  convenio: string
  classificacao: string
  status: StatusLaudo
  revisado: boolean
  executante: string
  texto: string
}

export const ROTULOS_STATUS: Record<StatusLaudo, string> = {
  A_DESCREVER: "A descrever",
  LIBERADO: "Liberado",
  ENTREGUE: "Entregue",
}

export const FLUXOS: FluxoLaudo[] = [
  { id: "f1", alias: "Rotina", nome: "Fluxo padrão", cor: "#4f46e5" },
  { id: "f2", alias: "Urgente", nome: "Prioridade alta", cor: "#ef4444" },
  { id: "f3", alias: "Revisão", nome: "Achado crítico", cor: "#f59e0b" },
]

export const CONVENIOS_LAUDO = ["AMIL", "BRADESCO", "UNIMED", "Particular"]

export const CLASSIFICACOES_LAUDO = [
  "Rotina",
  "Urgência",
  "Achado crítico",
]

export const laudosMock: Laudo[] = [
  {
    id: "4821",
    attendanceId: "91024",
    fluxoId: "f1",
    data: "2026-10-26T08:15:00",
    prazo: "2026-10-27",
    pacienteId: "1",
    pacienteNome: "Maria Silva",
    solicitante: "Dra. Thaís Alves",
    procedimento: "Ultrassonografia abdominal total",
    convenio: "UNIMED",
    classificacao: "Rotina",
    status: "A_DESCREVER",
    revisado: false,
    executante: "Dr. Alan Robson de Oliveira",
    texto:
      "Exame realizado com transdutor convexo de 3,5 MHz. Fígado de dimensões normais, contornos regulares, ecotextura homogênea. Vesícula biliar de paredes finas, sem cálculos. Vias biliares não dilatadas. Pâncreas de aspecto habitual. Baço de dimensões normais. Rins tópicos, de dimensões e ecotextura preservadas, sem dilatação pielocalicinal. Ausência de líquido livre na cavidade.",
  },
  {
    id: "4818",
    attendanceId: "91011",
    fluxoId: "f2",
    data: "2026-10-25T16:40:00",
    prazo: "2026-10-26",
    pacienteId: "2",
    pacienteNome: "João Pereira",
    solicitante: "Dr. Aaron Guilherme Oliveira Sampaio",
    procedimento: "Eletrocardiograma (ECG)",
    convenio: "BRADESCO",
    classificacao: "Urgência",
    status: "LIBERADO",
    revisado: true,
    executante: "Dra. Luciana Eloia Quintino da Silva",
    texto:
      "Ritmo sinusal, frequência cardíaca de 78 bpm. Intervalo PR de 160 ms. Complexo QRS estreito. Eixo elétrico normal. Repolarização ventricular sem alterações significativas. Conclusão: eletrocardiograma dentro dos limites da normalidade.",
  },
  {
    id: "4812",
    attendanceId: "90987",
    fluxoId: "f1",
    data: "2026-10-24T09:05:00",
    prazo: "2026-10-25",
    pacienteId: "3",
    pacienteNome: "Ana Souza",
    solicitante: "Dra. Thaís Alves",
    procedimento: "Hemograma completo",
    convenio: "Particular",
    classificacao: "Rotina",
    status: "ENTREGUE",
    revisado: true,
    executante: "Dr. Alan Robson de Oliveira",
    texto:
      "Hemoglobina 13,4 g/dL, hematócrito 40,1%, leucócitos 6.800/mm³ com diferencial normal, plaquetas 245.000/mm³. Conclusão: hemograma sem alterações significativas.",
  },
  {
    id: "4805",
    attendanceId: "90942",
    fluxoId: "f3",
    data: "2026-10-22T14:22:00",
    prazo: "2026-10-23",
    pacienteId: "6",
    pacienteNome: "Rafael Costa",
    solicitante: "Dr. Aaron Guilherme Oliveira Sampaio",
    procedimento: "Creatinina",
    convenio: "AMIL",
    classificacao: "Achado crítico",
    status: "A_DESCREVER",
    revisado: false,
    executante: "Dra. Luciana Eloia Quintino da Silva",
    texto:
      "Creatinina sérica de 2,1 mg/dL, acima do valor de referência para a faixa etária. Sugere-se correlação clínica e reavaliação laboratorial em 30 dias.",
  },
  {
    id: "4799",
    attendanceId: "90901",
    fluxoId: "f1",
    data: "2026-10-20T10:48:00",
    prazo: "2026-10-21",
    pacienteId: "5",
    pacienteNome: "Fernanda Lima",
    solicitante: "Dra. Thaís Alves",
    procedimento: "TSH - Hormônio tireoestimulante",
    convenio: "Particular",
    classificacao: "Rotina",
    status: "LIBERADO",
    revisado: false,
    executante: "Dr. Alan Robson de Oliveira",
    texto:
      "TSH de 2,4 mUI/L, dentro dos valores de referência. T4 livre de 1,1 ng/dL. Conclusão: função tireoidiana preservada.",
  },
]
