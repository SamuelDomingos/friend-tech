"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useConvenioForm } from "../../_hooks/use-convenio-form"
import { ResumoTab } from "../_components/resumo-tab"
import { FaturamentoTab } from "../_components/faturamento-tab"
import { DadosTomadorTab } from "../_components/dados-tomador-tab"
import { ContatoTab } from "../_components/contato-tab"
import { GlosasTab } from "../_components/glosas-tab"

export default function NovoConvenioPage() {
  const { form } = useConvenioForm()
  const { handleSubmit, control } = form
  const router = useRouter()

  const onSubmit = () => {
    toast("Convênio criado com sucesso.")
router.push("/configuracoes/agreement")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Novo convênio</h1>

        <p className="max-w-2xl text-muted-foreground">
          Preencha as informações abaixo para cadastrar um novo convênio.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="resumo">
          <TabsList variant="line">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="faturamento">Faturamento</TabsTrigger>
            <TabsTrigger value="dados-tomador">Dados do tomador</TabsTrigger>
            <TabsTrigger value="contato">Contato</TabsTrigger>
            <TabsTrigger value="glosas">Glosas</TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="mt-4">
            <ResumoTab control={control} />
          </TabsContent>

          <TabsContent value="faturamento" className="mt-4">
            <FaturamentoTab control={control} />
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
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/configuracoes/agreement")}
          >
            Cancelar
          </Button>

          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  )
}
