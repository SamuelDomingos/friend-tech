import { useState } from "react"
import { toast } from "sonner"

import { usuariosMock, type Usuario } from "../_components/dados-mock"

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosMock)
  const [deletando, setDeletando] = useState<Usuario | null>(null)

  const totalContratados = usuarios.filter(
    (usuario) => usuario.status === "active"
  ).length
  const totalInativos = usuarios.filter(
    (usuario) => usuario.status === "inactive"
  ).length

  function confirmarExclusao() {
    if (!deletando) {
      return
    }

    setUsuarios((atual) => atual.filter((u) => u.id !== deletando.id))
    toast(`Usuário "${deletando.nome}" excluído.`)
    setDeletando(null)
  }

  return {
    usuarios,
    totalContratados,
    totalInativos,
    totalUsuarios: usuarios.length,
    deletando,
    setDeletando,
    confirmarExclusao,
  }
}
