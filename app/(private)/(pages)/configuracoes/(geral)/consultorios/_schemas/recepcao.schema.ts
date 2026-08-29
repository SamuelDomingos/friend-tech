import z from "zod"

export const PREFERENCIAS_IDENTIFICACAO = [
  "nome_completo",
  "cpf",
  "primeiro_nome",
] as const

export const recepcaoSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  nomeRecepcao: z.string(),
  salas: z.array(z.string()).min(1, "Selecione ao menos uma sala"),
  unidade: z.string().min(1, "Selecione a unidade"),
  habilitarChamador: z.boolean(),
  codigoChamado: z.string(),
  exibirHistorico: z.boolean(),
  preferenciaIdentificacao: z.enum(PREFERENCIAS_IDENTIFICACAO),
  habilitarTotem: z.boolean(),
  marcarPresenteCpf: z.boolean(),
  qtdGuiches: z.string(),
  tiposSenha: z.array(
    z.object({
      id: z.string(),
      habilitado: z.boolean(),
      nome: z.string(),
      preferencia: z.boolean(),
    })
  ),
})

export type RecepcaoFormData = z.infer<typeof recepcaoSchema>
