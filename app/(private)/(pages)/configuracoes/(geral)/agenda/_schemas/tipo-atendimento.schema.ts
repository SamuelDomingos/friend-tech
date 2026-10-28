import z from "zod"

export const tipoAtendimentoSchema = z.object({
  nome: z.string().min(1, "Informe o nome do tipo de atendimento"),
  duracao: z
    .string()
    .min(1, "Informe a duração")
    .refine((valor) => {
      const numero = Number(valor)
      return Number.isInteger(numero) && numero >= 5 && numero <= 480
    }, "Duração deve estar entre 5 e 480 minutos"),
  prazoRetorno: z
    .string()
    .min(1, "Informe o prazo de retorno")
    .refine((valor) => {
      const numero = Number(valor)
      return Number.isInteger(numero) && numero >= 0
    }, "Informe um prazo válido em dias"),
  tipo: z.string().min(1, "Selecione o tipo"),
  cor: z
    .string()
    .regex(/^#([0-9a-fA-F]{6})$/, "Informe uma cor hexadecimal válida"),
  ativo: z.boolean(),
})

export type TipoAtendimentoFormData = z.infer<typeof tipoAtendimentoSchema>
