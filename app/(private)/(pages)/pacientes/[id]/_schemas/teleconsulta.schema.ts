import z from "zod"

export const teleconsultaSchema = z
  .object({
    telefoneOrigem: z.enum(["cadastrado", "novo"]),
    telefoneCadastrado: z.string(),
    telefoneNovo: z.string(),
    enviarPor: z.enum(["FLOW", "SMS"]),
    canal: z.string(),
    emailOrigem: z.enum(["cadastrado", "novo"]),
    emailNovo: z.string(),
  })
  .superRefine((dados, ctx) => {
    const telefone =
      dados.telefoneOrigem === "cadastrado"
        ? dados.telefoneCadastrado
        : dados.telefoneNovo

    const email = dados.emailOrigem === "cadastrado" ? "" : dados.emailNovo

    if (!telefone.trim() && !email.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["telefoneNovo"],
        message: "Informe telefone ou e-mail do paciente",
      })
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      ctx.addIssue({
        code: "custom",
        path: ["emailNovo"],
        message: "Informe um e-mail válido",
      })
    }

    if (dados.enviarPor === "FLOW" && !dados.canal) {
      ctx.addIssue({
        code: "custom",
        path: ["canal"],
        message: "Selecione o canal do Amigo Flow",
      })
    }
  })

export type TeleconsultaFormData = z.infer<typeof teleconsultaSchema>
