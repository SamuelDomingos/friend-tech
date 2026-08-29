"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { useImpressaoForm } from "./_hooks/use-impressao-form"
import { GeralTab } from "./_components/geral-tab"
import { ImpressaoTab } from "./_components/impressao-tab"

export default function InformacoesGeraisFormPage() {
  const { form } = useImpressaoForm()
  const { handleSubmit } = form
  const router = useRouter()

  const onSubmit = () => {
    // Sem persistência por enquanto — volta para a página de exibição.
    router.push("/configuracoes/informacoes-gerais")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Configuração Geral</h1>

        <p className="max-w-2xl text-muted-foreground">
          Edite as configurações da sua clínica.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="geral">
          <TabsList variant="line">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="impressao">Impressão</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="mt-4">
            <GeralTab control={form.control} />
          </TabsContent>

          <TabsContent value="impressao" className="mt-4">
            <ImpressaoTab form={form} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/configuracoes/informacoes-gerais")}
          >
            Cancelar
          </Button>

          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </div>
  )
}
