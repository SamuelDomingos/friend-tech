"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"

import { StatCards } from "./stat-cards"
import { UsuariosTabela } from "./usuarios-tabela"
import { useUsuarios } from "../_hooks/use-usuarios"
import { DeleteUsuarioDialog } from "./usuarios-tabela/delete-usuario-dialog"

export function UsuariosView() {
  const router = useRouter()
  const {
    usuarios,
    totalContratados,
    totalInativos,
    totalUsuarios,
    deletando,
    setDeletando,
    confirmarExclusao,
  } = useUsuarios()

  const abrirUsuario = useCallback(
    (id: string) => router.push(`/configuracoes/usuarios/${id}`),
    [router]
  )

  return (
    <div className="space-y-6">
      <StatCards
        totalContratados={totalContratados}
        totalInativos={totalInativos}
        totalUsuarios={totalUsuarios}
      />

      <UsuariosTabela
        usuarios={usuarios}
        onEditar={(usuario) => abrirUsuario(usuario.id)}
        onDeletar={setDeletando}
      />

      <DeleteUsuarioDialog
        usuario={deletando}
        onOpenChange={(open) => {
          if (!open) {
            setDeletando(null)
          }
        }}
        onConfirmar={confirmarExclusao}
      />
    </div>
  )
}
