export interface RequiredField {
  id: string
  label: string
}

export interface RequiredFieldGroup {
  title: string
  fields: RequiredField[]
}

export const patientFieldGroups: RequiredFieldGroup[] = [
  {
    title: "Informações de registro",
    fields: [
      { id: "cpf", label: "CPF" },
      { id: "rg", label: "RG" },
      { id: "others_documents", label: "Outros documentos de identidade" },
      { id: "gender", label: "Sexo" },
      { id: "born", label: "Data de nascimento" },
      { id: "sus_ethnicity", label: "Etnia" },
      { id: "sus_race", label: "Raça" },
      { id: "sus_nationality", label: "Nacionalidade" },
      { id: "jobrole", label: "Profissão" },
    ],
  },
  {
    title: "Dados do Responsável",
    fields: [
      { id: "cpf_name_responsible", label: "Nome e documento do Responsável" },
      { id: "mother_name", label: "Nome da Mãe" },
      { id: "father_name", label: "Nome do Pai" },
    ],
  },
  {
    title: "Informações de contato",
    fields: [
      { id: "email", label: "E-mail" },
      { id: "contact_cellphone", label: "Celular" },
      { id: "contact_phone_home", label: "Telefone 1" },
    ],
  },
  {
    title: "Endereço",
    fields: [
      { id: "address_cep", label: "CEP" },
      { id: "address_address", label: "Endereço" },
      { id: "address_city", label: "Cidade" },
      { id: "address_number", label: "Número" },
      { id: "address_district", label: "Bairro" },
      { id: "address_state", label: "Estado" },
    ],
  },
  {
    title: "Informações médicas",
    fields: [
      { id: "blood_type", label: "Tipo Sanguíneo" },
      { id: "weight", label: "Peso" },
      { id: "height", label: "Altura" },
      { id: "allergy", label: "Alergias" },
    ],
  },
  {
    title: "Informações adicionais",
    fields: [
      { id: "newborn_guide", label: "Utilizar RN na Guia?" },
      { id: "source_name", label: "Como conheceu?" },
    ],
  },
]

export const attendanceFieldGroups: RequiredFieldGroup[] = [
  {
    title: "Dados do agendamento",
    fields: [{ id: "doctor_requester", label: "Profissional solicitante" }],
  },
]
