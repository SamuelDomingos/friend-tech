import z from "zod"

export const CORES_FILA_ESPERA = [
  { id: "red", label: "Vermelho", className: "bg-red-500 dark:bg-red-400" },
  { id: "orange", label: "Laranja", className: "bg-orange-500 dark:bg-orange-400" },
  { id: "amber", label: "Âmbar", className: "bg-amber-500 dark:bg-amber-400" },
  { id: "yellow", label: "Amarelo", className: "bg-yellow-500 dark:bg-yellow-400" },
  { id: "lime", label: "Lima", className: "bg-lime-500 dark:bg-lime-400" },
  { id: "green", label: "Verde", className: "bg-green-500 dark:bg-green-400" },
  { id: "emerald", label: "Esmeralda", className: "bg-emerald-500 dark:bg-emerald-400" },
  { id: "teal", label: "Petróleo", className: "bg-teal-500 dark:bg-teal-400" },
  { id: "cyan", label: "Ciano", className: "bg-cyan-500 dark:bg-cyan-400" },
  { id: "sky", label: "Céu", className: "bg-sky-500 dark:bg-sky-400" },
  { id: "blue", label: "Azul", className: "bg-blue-500 dark:bg-blue-400" },
  { id: "indigo", label: "Índigo", className: "bg-indigo-500 dark:bg-indigo-400" },
  { id: "violet", label: "Violeta", className: "bg-violet-500 dark:bg-violet-400" },
  { id: "purple", label: "Roxo", className: "bg-purple-500 dark:bg-purple-400" },
  { id: "fuchsia", label: "Fúcsia", className: "bg-fuchsia-500 dark:bg-fuchsia-400" },
  { id: "pink", label: "Rosa", className: "bg-pink-500 dark:bg-pink-400" },
  { id: "rose", label: "Rose", className: "bg-rose-500 dark:bg-rose-400" },
  { id: "slate", label: "Cinza", className: "bg-slate-500 dark:bg-slate-400" },
] as const

export function getCorFilaEspera(id: string) {
  return CORES_FILA_ESPERA.find((cor) => cor.id === id)
}

export const filaEsperaSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  cor: z.string().min(1, "Selecione a cor"),
})

export type FilaEsperaFormData = z.infer<typeof filaEsperaSchema>
