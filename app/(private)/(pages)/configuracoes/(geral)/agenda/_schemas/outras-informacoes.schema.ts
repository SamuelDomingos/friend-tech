import z from "zod"

export const outrasInformacoesSchema = z.object({
  agendamentoOnline: z.boolean(),
  exibirFimDeSemana: z.boolean(),
  bloquearEncaixe: z.boolean(),
  antecedenciaCancelamento: z
    .string()
    .min(1, "Informe a antecedência")
    .refine(
      (valor) => Number.isInteger(Number(valor)) && Number(valor) >= 0,
      "Informe um número de horas válido"
    ),
  intervaloAtendimentos: z
    .string()
    .min(1, "Informe o intervalo")
    .refine(
      (valor) => Number.isInteger(Number(valor)) && Number(valor) >= 0,
      "Informe um intervalo válido"
    ),
  observacoes: z.string(),
})

export type OutrasInformacoesFormData = z.infer<
  typeof outrasInformacoesSchema
>
