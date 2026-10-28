import { notFound } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { PacienteHeader } from "./_components/paciente-header"
import { AtualizacoesTab } from "./_components/atualizacoes-tab"
import { CadastroTab } from "./_components/cadastro-tab"
import { ConsumoTab } from "./_components/consumo-tab"
import { ContasTab } from "./_components/contas-tab"
import { OrcamentosTab } from "./_components/orcamentos-tab"
import { ProntuarioTab } from "./_components/prontuario-tab"
import { SessoesTab } from "./_components/sessoes-tab"
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
          <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
          <TabsTrigger value="sessoes">Sessões</TabsTrigger>
          <TabsTrigger value="consumo">Consumo</TabsTrigger>
          <TabsTrigger value="atualizacoes">Atualizações</TabsTrigger>
          <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
        </TabsList>

        <TabsContent value="prontuario" className="mt-4">
          <ProntuarioTab paciente={paciente} dados={dados} />
        </TabsContent>

        <TabsContent value="contas" className="mt-4">
          <ContasTab paciente={paciente} />
        </TabsContent>

        <TabsContent value="orcamentos" className="mt-4">
          <OrcamentosTab paciente={paciente} />
        </TabsContent>

        <TabsContent value="sessoes" className="mt-4">
          <SessoesTab />
        </TabsContent>

        <TabsContent value="consumo" className="mt-4">
          <ConsumoTab pacienteNome={paciente.nome} />
        </TabsContent>

        <TabsContent value="atualizacoes" className="mt-4">
          <AtualizacoesTab />
        </TabsContent>

        <TabsContent value="cadastro" className="mt-4">
          <CadastroTab paciente={paciente} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
