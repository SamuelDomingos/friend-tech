import z from "zod"

export const unidadeSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  prefixo: z.string().min(1, "Informe o prefixo"),
  telefone: z.string(),
  cep: z.string(),
  endereco: z.string().min(1, "Informe o endereço"),
  numero: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  cnes: z.string(),
  grupoId: z.string(),
})

export type UnidadeFormData = z.infer<typeof unidadeSchema>
