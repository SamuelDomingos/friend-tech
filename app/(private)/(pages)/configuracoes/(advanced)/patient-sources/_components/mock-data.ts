export interface PatientSource {
  id: string
  nome: string
}

export const patientSourcesMock: PatientSource[] = [
  { id: "ps1", nome: "Indicação" },
  { id: "ps2", nome: "Indicação de amigo" },
  { id: "ps3", nome: "Indicação médica" },
  { id: "ps4", nome: "Através do Instagram" },
  { id: "ps5", nome: "Facebook" },
  { id: "ps6", nome: "Google" },
  { id: "ps7", nome: "Convênio" },
  { id: "ps8", nome: "Passando na rua" },
  { id: "ps9", nome: "Cliente base" },
  { id: "ps10", nome: "Retorno" },
]
