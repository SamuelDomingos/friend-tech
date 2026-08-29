"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useContaForm } from "../_hooks/use-conta-form"
import { InformacoesPessoaisTab } from "./informacoes-pessoais-tab"
import { PermissoesTab } from "./permissoes-tab"
import { PreferenciasTab } from "./preferencias-tab"
import { SegurancaTab } from "./seguranca-tab"

export function GerenciamentoContasView() {
  const { form } = useContaForm()
  const { handleSubmit, control } = form
  const router = useRouter()

  const onSubmit = () => {
    toast("Alterações salvas.")
    router.push("/configuracoes/usuarios")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Gerenciamento de contas</h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode configurar e alterar as informações de contas de
          usuários.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="informacoes-pessoais">
          <TabsList variant="line">
            <TabsTrigger value="informacoes-pessoais">
              Informações Pessoais
            </TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="permissoes">Permissões de acesso</TabsTrigger>
            <TabsTrigger value="preferencias">Preferências</TabsTrigger>
          </TabsList>

          <TabsContent value="informacoes-pessoais" className="mt-4">
            <InformacoesPessoaisTab control={control} />
          </TabsContent>

          <TabsContent value="seguranca" className="mt-4">
            <SegurancaTab control={control} />
          </TabsContent>

          <TabsContent value="permissoes" className="mt-4">
            <PermissoesTab control={control} />
          </TabsContent>

          <TabsContent value="preferencias" className="mt-4">
            <PreferenciasTab control={control} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/configuracoes/usuarios")}
          >
            Cancelar
          </Button>

          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </div>
  )
}
