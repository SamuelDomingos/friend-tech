import { GerenciamentoContasView } from "../_components/gerenciamento-contas-view"

export default async function GerenciarContaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await params

  return <GerenciamentoContasView />
}
