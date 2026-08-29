import { TIPO_LABELS, formatarData, type Usuario } from "./dados-mock"

export function exportarCsv(usuarios: Usuario[]) {
  const header = [
    "Nome",
    "Email",
    "Tipo",
    "Pessoa Física",
    "Status",
    "Criado em",
  ]
  const rows = usuarios.map((usuario) =>
    [
      usuario.nome,
      usuario.email,
      TIPO_LABELS[usuario.tipo],
      usuario.pessoaFisica ? "Sim" : "Não",
      usuario.status === "active" ? "Ativo" : "Inativo",
      formatarData(usuario.criadoEm),
    ]
      .map((valor) => `"${String(valor).replace(/"/g, '""')}"`)
      .join(",")
  )

  const csv = "\uFEFF" + [header.join(","), ...rows].join("\r\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "usuarios.csv"
  link.click()
  URL.revokeObjectURL(url)
}
