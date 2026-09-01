export type SpecialActionCategory = "restore" | "import" | "export" | "unify"

export interface SpecialActionType {
  value: string
  label: string
  category: SpecialActionCategory
  needsDateFilter?: boolean
  needsEndDate?: boolean
  dateLabel?: string
  emptyMessage?: string
}

export const SPECIAL_ACTION_TYPES: SpecialActionType[] = [
  {
    value: "UNDO_CLOSED_ATTENDANCE",
    label: "Reabrir Atendimento Finalizado",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: true,
    dateLabel: "Buscar atendimento pela data",
    emptyMessage: "Nenhum atendimento finalizado neste período",
  },
  {
    value: "UNDO_DELETED_PATIENT",
    label: "Restaurar Paciente Apagado",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: true,
    dateLabel: "Buscar paciente pela data da remoção",
    emptyMessage: "Nenhum paciente apagado neste período",
  },
  {
    value: "UNDO_DELETED_AGENDA_EVENT",
    label: "Restaurar Tipo de atendimento Apagado",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: true,
    dateLabel: "Buscar tipo de atendimento pela data da remoção",
    emptyMessage: "Nenhum tipo de atendimento apagado neste período",
  },
  {
    value: "UNDO_DELETED_PROCEDURE",
    label: "Restaurar Procedimento Apagado",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: true,
    dateLabel: "Buscar procedimento pela data da remoção",
    emptyMessage: "Nenhum procedimento apagado neste período",
  },
  {
    value: "UNDO_DELETED_MATMED",
    label: "Restaurar MatMed Apagado",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: true,
    dateLabel: "Buscar matmed pela data da remoção",
    emptyMessage: "Nenhum matmed apagado neste período",
  },
  {
    value: "UNDO_DELETED_HEALTH_INSURANCE",
    label: "Restaurar Convênio Apagado",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: false,
    dateLabel: "Buscar convênio pela data da remoção",
    emptyMessage: "Nenhum convênio apagado neste período",
  },
  {
    value: "UNDO_DELETED_MEMBER",
    label: "Restaurar Usuário Apagado",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: false,
    dateLabel: "Buscar usuário pela data da remoção",
    emptyMessage: "Nenhum usuário apagado neste período",
  },
  {
    value: "UNDO_FINANCE_PAID",
    label: "Desfazer Baixa",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: true,
    dateLabel: "Buscar finanças pela data da baixa",
    emptyMessage: "Nenhuma finança baixada neste período",
  },
  {
    value: "UNDO_INSURANCE_LOTE_PAID",
    label: "Desfazer Baixa em Lote Convênio",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: true,
    dateLabel: "Buscar lotes pela data da baixa",
    emptyMessage: "Nenhuma finança baixada neste período",
  },
  {
    value: "UNDO_CREDITCARD_LOTE_PAID",
    label: "Desfazer Baixa em Lote Cartão",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: false,
    dateLabel: "Buscar lotes de cartão pela data da baixa",
    emptyMessage: "Nenhum lote de cartão com baixa nesta data",
  },
  {
    value: "UNDO_CREDITCARD_SPLIT_PAID",
    label: "Desfazer Baixa em Parcela de Cartão",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: false,
    dateLabel: "Buscar parcelas de cartão pela data da baixa",
    emptyMessage: "Nenhuma parcela com baixa nesta data",
  },
  {
    value: "UNDO_SPLIT_PAID",
    label: "Desfazer Baixa em Parcela de Cheque, Crédito em conta ou Boleto",
    category: "restore",
    needsDateFilter: true,
    needsEndDate: false,
    dateLabel: "Buscar parcelas pela data da baixa",
    emptyMessage: "Nenhuma parcela com baixa nesta data",
  },
  {
    value: "DELETE_MAGIC_MATCH_TRANSACTIONS",
    label: "Excluir lançamentos Magic Match (Contas Revogadas)",
    category: "restore",
    needsDateFilter: false,
    emptyMessage: "Nenhuma conta revogada",
  },
  {
    value: "IMPORT_PATIENT",
    label: "Importar Paciente",
    category: "import",
  },
  {
    value: "IMPORT_ATTENDANCE_RECORD",
    label: "Importar Prontuário",
    category: "import",
  },
  {
    value: "IMPORT_EXAM_RESULTS",
    label: "Importar Resultado de Exames",
    category: "import",
  },
  {
    value: "IMPORT_MATMEDS",
    label: "Importar Matmeds",
    category: "import",
  },
  {
    value: "IMPORT_USERS",
    label: "Importar Usuários",
    category: "import",
  },
  {
    value: "IMPORT_ATTENDANCES",
    label: "Importar Agenda",
    category: "import",
  },
  {
    value: "EXPORT_PATIENTS",
    label: "Exportar Pacientes",
    category: "export",
  },
  {
    value: "UNIFY_PATIENT",
    label: "Unificar Paciente",
    category: "unify",
  },
]

export function actionTypeLabel(value: string): string {
  return SPECIAL_ACTION_TYPES.find((t) => t.value === value)?.label ?? value
}

export interface LogEntryDetail {
  label: string
  value: string
}

export interface ActionLogEntry {
  id: string
  userName: string
  actionType: string
  description: string
  date: string
  dateISO: string
  details: LogEntryDetail[]
  canUndoUnify?: boolean
}

export const actionLogMock: ActionLogEntry[] = [
  {
    id: "9154656",
    userName: "Jéssica da Silva Nascimento",
    actionType: "UNIFY_PATIENT",
    description: "Jéssica da Silva Nascimento unificou o paciente",
    date: "01/09/2026 09:56",
    dateISO: "2026-09-01",
    details: [
      { label: "Paciente mantido", value: "16518586 - Maria Anacleta Mendonca de Lima" },
      { label: "Paciente apagado", value: "115022286 - Maria Anacleta Mendonça" },
    ],
    canUndoUnify: true,
  },
  {
    id: "9144591",
    userName: "Leandra Almeida Lima",
    actionType: "UNDO_CLOSED_ATTENDANCE",
    description: "Leandra Almeida Lima reabriu atendimento finalizado",
    date: "31/08/2026 11:00",
    dateISO: "2026-08-31",
    details: [
      { label: "Paciente", value: "96838930 - Douglas Monteiro de Miranda" },
      { label: "Profissional de Saúde", value: "André Vyann Ramalho Guanabara Araujo" },
      { label: "Data", value: "04/09/2026 14:30" },
    ],
  },
  {
    id: "9142219",
    userName: "Leandra Almeida Lima",
    actionType: "UNDO_CLOSED_ATTENDANCE",
    description: "Leandra Almeida Lima reabriu atendimento finalizado",
    date: "31/08/2026 09:02",
    dateISO: "2026-08-31",
    details: [
      { label: "Paciente", value: "100461959 - Marcos André de Lucena Borges" },
      { label: "Profissional de Saúde", value: "Alan Robson de Oliveira" },
      { label: "Data", value: "08/09/2026 14:00" },
    ],
  },
  {
    id: "9136598",
    userName: "Livia De Sousa Angelo",
    actionType: "UNDO_CREDITCARD_SPLIT_PAID",
    description: "Livia De Sousa Angelo desfez a baixa de uma parcela de cartão",
    date: "28/08/2026 15:33",
    dateISO: "2026-08-28",
    details: [
      { label: "Pago em", value: "10/07/2026" },
      { label: "Forma de Pagamento", value: "Cartão" },
      { label: "Parcela", value: "3/3" },
      { label: "Valor", value: "R$570,06" },
    ],
  },
  {
    id: "9136539",
    userName: "Livia De Sousa Angelo",
    actionType: "UNDO_CREDITCARD_SPLIT_PAID",
    description: "Livia De Sousa Angelo desfez a baixa de uma parcela de cartão",
    date: "28/08/2026 15:31",
    dateISO: "2026-08-28",
    details: [
      { label: "Pago em", value: "01/07/2026" },
      { label: "Forma de Pagamento", value: "Cartão" },
      { label: "Parcela", value: "1/1" },
      { label: "Valor", value: "R$1.369,30" },
    ],
  },
  {
    id: "9136147",
    userName: "Ana Denyele Costa Ferreira Silva",
    actionType: "UNDO_FINANCE_PAID",
    description: "Ana Denyele Costa Ferreira Silva desfez a baixa",
    date: "28/08/2026 15:05",
    dateISO: "2026-08-28",
    details: [
      { label: "Pago em", value: "26/08/2026" },
      { label: "Pago a", value: "André Vyann Ramalho Guanabara" },
      { label: "Forma de Pagamento", value: "Dinheiro" },
      { label: "Valor", value: "R$550,00" },
    ],
  },
  {
    id: "9127755",
    userName: "Caio Vinícius Sousa Chaves Galdino",
    actionType: "UNDO_CLOSED_ATTENDANCE",
    description: "Caio Vinícius Sousa Chaves Galdino reabriu atendimento finalizado",
    date: "27/08/2026 16:53",
    dateISO: "2026-08-27",
    details: [
      { label: "Paciente", value: "113188858 - Kalyl Lima Menezes Barbosa" },
      { label: "Profissional de Saúde", value: "AK Wellness" },
      { label: "Data", value: "26/08/2026 10:00" },
    ],
  },
  {
    id: "9124191",
    userName: "Samara Hellen Brito Nascimento",
    actionType: "UNDO_CLOSED_ATTENDANCE",
    description: "Samara Hellen Brito Nascimento reabriu atendimento finalizado",
    date: "27/08/2026 13:32",
    dateISO: "2026-08-27",
    details: [
      { label: "Paciente", value: "22099194 - Vanessa Alencar de Sousa" },
      { label: "Profissional de Saúde", value: "André Vyann Ramalho Guanabara Araujo" },
      { label: "Data", value: "31/08/2026 12:30" },
    ],
  },
  {
    id: "9123900",
    userName: "Sistema",
    actionType: "IMPORT_PATIENT",
    description: "Sistema importou pacientes com sucesso",
    date: "26/08/2026 08:40",
    dateISO: "2026-08-26",
    details: [{ label: "Status", value: "Pacientes importado com sucesso" }],
  },
]
