import z from "zod"

export const cadastroPacienteSchema = z.object({
  nomeCompleto: z.string().min(1, "Informe o nome completo"),
  nomeSocial: z.string(),
  cpf: z.string(),
  rg: z.string(),
  nascimento: z.string().min(1, "Informe a data de nascimento"),
  sexo: z.string(),
  estadoCivil: z.string(),
  profissao: z.string(),
  nomeMae: z.string(),
  responsavel: z.string(),
  celular: z.string(),
  telefone: z.string(),
  email: z.string().email("Informe um e-mail válido").or(z.literal("")),
  cep: z.string(),
  logradouro: z.string(),
  numero: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  convenio: z.string(),
  plano: z.string(),
  carteirinha: z.string(),
  validadeCarteirinha: z.string(),
  observacoes: z.string(),
})

export type CadastroPacienteFormData = z.infer<typeof cadastroPacienteSchema>
