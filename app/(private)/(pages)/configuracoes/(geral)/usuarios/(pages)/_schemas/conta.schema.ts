import z from "zod"

export const SEXOS = ["Masculino", "Feminino"] as const

export const TIPOS_PERFIL = [
  { value: "doctor", label: "Profissional de saúde" },
  { value: "finance", label: "Financeiro" },
  { value: "scheduler", label: "Central de Agendamento" },
  { value: "receptionist", label: "Recepcionista" },
] as const

export const PERMISSOES_MODULOS = [
  {
    modulo: "agenda",
    titulo: "Agenda",
    descricao:
      "Configure abaixo as permissões do módulo agenda para o perfil do usuário",
    permissoes: [
      { key: "gerenciarAtendimentos", label: "Gerenciar atendimentos" },
      { key: "reabrirAtendimentos", label: "Reabrir atendimentos" },
      {
        key: "alterarValorParticular",
        label: "Permitir alteração de valor particular",
      },
      {
        key: "alterarValorConvenios",
        label: "Permitir alteração de valor de convênios",
      },
      {
        key: "removerRecibosPessoaFisica",
        label: "Permitir remover recibos de Pessoa Física",
      },
      { key: "removerAtendimento", label: "Permitir remover atendimento" },
      {
        key: "remocaoProcedimentosMatmeds",
        label:
          "Permitir remoção de procedimentos e matmeds no atendimento/contas",
      },
      {
        key: "associarMatmedEstoque",
        label: "Permitir associar matmed a estoque",
      },
      {
        key: "manipularBloqueioAgenda",
        label: "Manipular bloqueio/desbloqueio de agenda",
      },
    ],
  },
  {
    modulo: "convenio",
    titulo: "Convênio",
    descricao:
      "Configure abaixo as permissões do módulo convênio para o perfil do usuário",
    permissoes: [
      { key: "resumo", label: "Resumo" },
      { key: "producao", label: "Produção" },
      { key: "historicoGuias", label: "Histórico de guias" },
      { key: "recebimento", label: "Recebimento" },
      { key: "gestaoGlosa", label: "Gestão de glosa" },
      { key: "relatorios", label: "Relatórios" },
    ],
  },
  {
    modulo: "financeiro",
    titulo: "Financeiro",
    descricao:
      "Configure abaixo as permissões do módulo financeiro para o perfil de usuário",
    permissoes: [
      { key: "dashboard", label: "Dashboard" },
      { key: "resumoFinanceiro", label: "Resumo Financeiro" },
      { key: "caixaBanco", label: "Caixa / Banco" },
      { key: "contasPagar", label: "Contas a pagar" },
      { key: "contasReceber", label: "Contas a receber" },
      { key: "fluxoCaixa", label: "Fluxo de Caixa" },
      { key: "analiseFinanceira", label: "Análise Financeira" },
      { key: "fornecedores", label: "Fornecedores" },
      { key: "producaoIndividual", label: "Produção individual" },
      { key: "producaoGeral", label: "Produção geral" },
      { key: "repasseAtendimento", label: "Repasse por atendimento" },
      { key: "cartoes", label: "Cartões" },
      { key: "ofx", label: "OFX" },
      { key: "contasBancarias", label: "Contas bancárias" },
      { key: "unidades", label: "Unidades" },
    ],
  },
  {
    modulo: "avancadas",
    titulo: "Avançadas",
    descricao:
      "Configure abaixo as permissões do módulo avançadas para o perfil de usuário",
    permissoes: [
      {
        key: "bloquearPagoEm",
        label: 'Bloquear campo "Pago em" (contas a pagar)',
      },
      {
        key: "aprovarOrcamentoSemFinanceiro",
        label: "Aprovar orçamento sem financeiro",
      },
      {
        key: "bloquearRecebidoEm",
        label: 'Bloquear campo "Recebido em" (contas a receber)',
      },
      {
        key: "aprovarLancamentoContasPagar",
        label: "Permitir aprovar lançamento no contas a pagar",
      },
      { key: "descontoOrcamento", label: "Desconto no orçamento" },
      { key: "remocaoPaciente", label: "Permitir remoção de paciente" },
      {
        key: "baixaContasAprovadas",
        label: "Permitir realizar baixa apenas de contas aprovadas",
      },
      {
        key: "vincularDesvincularNfse",
        label: "Permitir vincular e desvincular NFSe nos atendimentos",
      },
      {
        key: "saidaAbaConsumo",
        label: "Permitir realizar saída através da aba consumo",
      },
      {
        key: "exibirInformacoesFinanceiras",
        label: "Exibir informações financeiras",
      },
      {
        key: "fechamentoCaixaRelatorioVendas",
        label: "Fechamento de caixa e Relatório de vendas por usuário",
      },
      {
        key: "importarXmlDemonstrativo",
        label: "Permitir importar XML demonstrativo análise de conta",
      },
      {
        key: "exportarXmlRecursoGlosa",
        label: "Permitir exportar XML de recurso de glosa",
      },
      {
        key: "alterarContaBancariaGuias",
        label: "Permitir alterar conta bancária de guias nos extratos",
      },
      {
        key: "visualizarNotificacoesCriticas",
        label: "Permitir visualizar notificações críticas",
      },
      { key: "exibirHonorarios", label: "Exibir Honorários" },
      {
        key: "incrementarSaidaEstoqueEscaneamento",
        label: "Permitir incrementar saída de estoque via escaneamento",
      },
    ],
  },
  {
    modulo: "estoque",
    titulo: "Estoque",
    descricao:
      "Configure abaixo as permissões do módulo estoque para o perfil do usuário",
    permissoes: [
      { key: "resumo", label: "Resumo" },
      { key: "posicao", label: "Posição" },
      { key: "movimentacoes", label: "Movimentações" },
      { key: "rastreabilidade", label: "Rastreabilidade" },
      { key: "ajusteInventario", label: "Ajuste de Inventário" },
      { key: "solicitacoes", label: "Solicitações" },
      { key: "pedidoCompra", label: "Pedido de Compra" },
      { key: "compras", label: "Compras" },
      { key: "alterarLoteValidade", label: "Alterar Lote/Validade" },
      { key: "desfazerMovimentacoes", label: "Desfazer movimentações" },
    ],
  },
  {
    modulo: "configuracoes",
    titulo: "Configurações",
    descricao:
      "Configure abaixo as permissões do módulo configurações para o perfil do usuário",
    permissoes: [
      { key: "agenda", label: "Agenda" },
      { key: "acoesEspeciais", label: "Ações Especiais" },
      { key: "cartoes", label: "Cartões" },
      { key: "financeiro", label: "Financeiro" },
      { key: "comoConheceu", label: "Como conheceu" },
      { key: "compartilhamentos", label: "Compartilhamentos" },
      { key: "agendamentoOnline", label: "Agendamento on-line" },
      { key: "laudo", label: "Laudo" },
      { key: "consultoriosSalas", label: "Consultórios e Salas" },
      { key: "geral", label: "Geral" },
      { key: "painelChamador", label: "Painel Chamador" },
      { key: "prontuario", label: "Prontuário" },
      { key: "parametrizacao", label: "Parametrização" },
      { key: "camposObrigatorios", label: "Campos obrigatórios" },
      { key: "relacionamento", label: "Relacionamento" },
      { key: "repasse", label: "Repasse" },
      { key: "unidades", label: "Unidades" },
      { key: "usuarios", label: "Usuários" },
      { key: "convenios", label: "Convênios" },
      { key: "procedimentos", label: "Procedimentos" },
      { key: "tabelaPreco", label: "Tabela de Preço" },
      { key: "matmed", label: "MatMed" },
      { key: "executantes", label: "Executantes" },
      { key: "solicitantes", label: "Solicitantes" },
      { key: "hospitais", label: "Hospitais" },
      { key: "regrasFaturamento", label: "Regras de faturamento" },
    ],
  },
] as const

export const PREFERENCIAS_PRONTUARIO = [
  {
    key: "ocultarDataEmissao",
    label: "Ocultar data de emissão no prontuário (impressos)",
  },
  {
    key: "ocultarAssinatura",
    label: "Ocultar assinatura no prontuário (impressos)",
  },
  {
    key: "ocultarEndereco",
    label: "Ocultar endereço no prontuário (impressos)",
  },
  {
    key: "ocultarLaboratorioMedicamento",
    label: "Ocultar laboratório do medicamento na impressão (receitas)",
  },
  {
    key: "ocultarCpfPaciente",
    label: "Ocultar CPF do paciente no prontuário (impressos)",
  },
  {
    key: "emailClinicaReceituarioEspecial",
    label: "E-mail da clínica de saúde em receituário especial",
  },
  {
    key: "ocultarNumeracao",
    label: "Ocultar numeração no prontuário (receitas)",
  },
  { key: "compartilharProntuario", label: "Compartilhar prontuário" },
] as const

export const PREFERENCIAS_AGENDAMENTO = [
  {
    key: "rolarPaginaHorarioAtual",
    label: "Rolar página até o horário atual (agenda)",
  },
] as const

const permissaoRecord = z.record(z.string(), z.boolean())

export const contaSchema = z.object({
  // Informações Pessoais
  nomeCompleto: z.string().min(1, "Informe o nome completo"),
  cpf: z.string().min(1, "Informe o CPF"),
  dataNascimento: z.string().min(1, "Informe a data de nascimento"),
  sexo: z.string(),
  telefone: z.string(),

  // Segurança
  email: z.string().min(1, "Informe o e-mail").email("E-mail inválido"),
  emailVerificado: z.boolean(),
  celularAtivacao: z.string().min(1, "Informe o celular de ativação"),
  celularVerificado: z.boolean(),

  // Permissões de acesso
  tipoPerfil: z.string(),
  usuarioAdministrativo: z.boolean(),
  administradorSistema: z.boolean(),
  acessoLiberado: z.boolean(),
  permissoes: z.object({
    agenda: permissaoRecord,
    convenio: permissaoRecord,
    financeiro: permissaoRecord,
    avancadas: permissaoRecord,
    estoque: permissaoRecord,
    configuracoes: permissaoRecord,
  }),

  // Preferências
  ocultarDataEmissao: z.boolean(),
  ocultarAssinatura: z.boolean(),
  ocultarEndereco: z.boolean(),
  ocultarLaboratorioMedicamento: z.boolean(),
  ocultarCpfPaciente: z.boolean(),
  emailClinicaReceituarioEspecial: z.boolean(),
  ocultarNumeracao: z.boolean(),
  compartilharProntuario: z.boolean(),
  rolarPaginaHorarioAtual: z.boolean(),
})

export type ContaFormData = z.infer<typeof contaSchema>
