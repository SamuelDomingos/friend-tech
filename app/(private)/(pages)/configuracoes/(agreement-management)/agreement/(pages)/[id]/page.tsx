"use client"

import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useConvenioForm } from "../../_hooks/use-convenio-form"
import { ResumoTab } from "../_components/resumo-tab"
import { FaturamentoTab } from "../_components/faturamento-tab"
import { DadosTomadorTab } from "../_components/dados-tomador-tab"
import { ContatoTab } from "../_components/contato-tab"
import { GlosasTab } from "../_components/glosas-tab"
import { PessoaFisicaTab } from "../_components/pessoa-fisica-tab"
import { ProdutosTab } from "../_components/produtos-tab"
import { ProcedimentosTab } from "../_components/procedimentos-tab"
import { UrgenciaTab } from "../_components/urgencia-tab"

export default function EditarConvenioPage() {
  const params = useParams<{ id: string }>()
  const { form, convenio } = useConvenioForm(params.id)
  const { handleSubmit, control } = form
  const router = useRouter()

  const onSubmit = () => {
    toast("Convênio atualizado com sucesso.")
router.push("/configuracoes/agreement")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          {convenio?.nome ?? "Convênio"}
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Edite as informações do convênio.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="resumo">
          <TabsList variant="line" className="flex flex-wrap">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="faturamento">Faturamento</TabsTrigger>
            <TabsTrigger value="dados-tomador">Dados do tomador</TabsTrigger>
            <TabsTrigger value="contato">Contato</TabsTrigger>
            <TabsTrigger value="glosas">Glosas</TabsTrigger>
            <TabsTrigger value="pessoa-fisica">Pessoa Física</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="procedimentos">Procedimentos</TabsTrigger>
            <TabsTrigger value="urgencia">Urgência</TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="mt-4">
            <ResumoTab control={control} isEdit />
          </TabsContent>

          <TabsContent value="faturamento" className="mt-4">
            <FaturamentoTab control={control} isEdit />
          </TabsContent>

          <TabsContent value="dados-tomador" className="mt-4">
            <DadosTomadorTab control={control} />
          </TabsContent>

          <TabsContent value="contato" className="mt-4">
            <ContatoTab control={control} />
          </TabsContent>

          <TabsContent value="glosas" className="mt-4">
            <GlosasTab control={control} />
          </TabsContent>

          <TabsContent value="pessoa-fisica" className="mt-4">
            <PessoaFisicaTab />
          </TabsContent>

          <TabsContent value="produtos" className="mt-4">
            <ProdutosTab />
          </TabsContent>

          <TabsContent value="procedimentos" className="mt-4">
            <ProcedimentosTab />
          </TabsContent>

          <TabsContent value="urgencia" className="mt-4">
            <UrgenciaTab control={control} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/configuracoes/agreement")}
          >
            Cancelar
          </Button>

          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </div>
  )
}
