import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import { UsuariosView } from "./_components/usuarios-view"

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Usuários</h1>

          <p className="max-w-2xl text-muted-foreground">
            Gerencie os usuários que acessam o sistema e suas permissões.
          </p>
        </div>

        <Button asChild>
          <Link href="/configuracoes/usuarios/novo">
            <Plus data-icon="inline-start" />
            Adicionar
          </Link>
        </Button>
      </div>

      <UsuariosView />
    </div>
  )
}
