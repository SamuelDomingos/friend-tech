export interface ModuleToggle {
  id: string
  label: string
}

export interface ModuleToggleGroup {
  title?: string
  toggles: ModuleToggle[]
}

export const modulesToggles: ModuleToggle[] = [
  { id: "sus", label: "Gestão de Faturamento SUS" },
  { id: "surgery_request", label: "Gestão de solicitação de cirurgia" },
  { id: "session", label: "Sessões" },
  { id: "report", label: "Gestão de Laudos" },
  { id: "schedule", label: "Central de agendamento" },
  { id: "inventory", label: "Gestão de Estoque" },
  { id: "waiting_list_exam", label: "Controle da fila de exames" },
  { id: "company_room_view", label: "Controle de sala cirúrgica" },
  { id: "insurance_refund", label: "Gestão de reembolso" },
  { id: "patient_treatment_plan", label: "Plano de Tratamento" },
]

export const recordsTypeToggles: ModuleToggle[] = [
  { id: "weight", label: "Prontuário de Bariatria" },
  { id: "ophthalm", label: "Prontuário de Oftalmologia" },
  { id: "pediatrics", label: "Prontuário de Pediatria" },
  { id: "odontogram", label: "Prontuário de Odontologia" },
  { id: "gestation_care", label: "Acompanhamento Gestacional" },
]

export const smsToggleGroups: ModuleToggleGroup[] = [
  {
    title: "Prontuário",
    toggles: [
      { id: "allow_send_medical_record_sms", label: "Envio do prontuário" },
      { id: "allow_send_prescription_sms", label: "Envio de receita" },
      {
        id: "allow_send_exam_request_sms",
        label: "Envio de solicitação de exame",
      },
    ],
  },
  {
    title: "Outros",
    toggles: [
      { id: "allow_send_new_patient_sms", label: "Envio de cadastro" },
      { id: "allow_send_confirmation_sms", label: "Envio de confirmação" },
      { id: "allow_send_telemedicine_sms", label: "Envio de telemedicina" },
    ],
  },
]

export const extraToggles: ModuleToggle[] = [
  { id: "allow_merge_guides", label: "Unificação de Guias" },
  { id: "unimed_fortaleza", label: "Integração UNIMED Fortaleza" },
  {
    id: "block_nfse_fiscal_fields",
    label: "Bloquear campos fiscais na emissão de notas",
  },
  { id: "block_holidays", label: "Bloquear Agenda aos Feriados" },
  {
    id: "allow_finance_pass_through_executants",
    label: "Permitir repasse para executantes",
  },
  {
    id: "callcenter_agenda_behavior",
    label: "Consulta de procedimento na Central de Agendamento",
  },
]
