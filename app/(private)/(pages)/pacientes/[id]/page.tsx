import { notFound } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { PacienteHeader } from "./_components/paciente-header"
import { AbaPlaceholder } from "./_components/aba-placeholder"
import { ProntuarioTab } from "./_components/prontuario-tab"
import { getProntuarioPorPaciente } from "./_components/dados-mock"

export default async function PacienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { paciente, dados } = getProntuarioPorPaciente(id)

  if (!paciente || !dados) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <PacienteHeader paciente={paciente} />

      <Tabs defaultValue="prontuario">
        <TabsList variant="line" className="flex-wrap">
          <TabsTrigger value="prontuario">Prontuário</TabsTrigger>
          <TabsTrigger value="contas">Contas</TabsTrigger>
          <TabsTrigger value="sessoes">Sessões</TabsTrigger>
          <TabsTrigger value="consumo">Consumo</TabsTrigger>
          <TabsTrigger value="atualizacoes">Atualizações</TabsTrigger>
          <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
        </TabsList>

        <TabsContent value="prontuario" className="mt-4">
          <ProntuarioTab paciente={paciente} dados={dados} />
        </TabsContent>

        <TabsContent value="contas" className="mt-4">
          <AbaPlaceholder
            titulo="Contas"
            descricao="Lançamentos financeiros do paciente."
          />
        </TabsContent>

        <TabsContent value="sessoes" className="mt-4">
          <AbaPlaceholder
            titulo="Sessões"
            descricao="Controle de sessões do paciente."
          />
        </TabsContent>

        <TabsContent value="consumo" className="mt-4">
          <AbaPlaceholder
            titulo="Consumo"
            descricao="Consumo de materiais e medicamentos."
          />
        </TabsContent>

        <TabsContent value="atualizacoes" className="mt-4">
          <AbaPlaceholder
            titulo="Atualizações"
            descricao="Histórico de alterações do cadastro."
          />
        </TabsContent>

        <TabsContent value="cadastro" className="mt-4">
          <AbaPlaceholder
            titulo="Cadastro"
            descricao="Dados cadastrais do paciente."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
