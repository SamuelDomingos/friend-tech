import z from "zod"

export const feriadoSchema = z.object({
  tipo: z.enum(["recorrente", "especifico"]),
  nome: z.string().min(1, "Informe o nome do feriado"),
  dia: z
    .string()
    .min(1, "Informe o dia")
    .regex(/^\d{1,2}$/, "Dia inválido")
    .refine(
      (value) => {
        const dia = Number(value)
        return dia >= 1 && dia <= 31
      },
      "Dia deve ser entre 1 e 31"
    ),
  mes: z.string().min(1, "Selecione o mês"),
})

export type FeriadoFormData = z.infer<typeof feriadoSchema>
