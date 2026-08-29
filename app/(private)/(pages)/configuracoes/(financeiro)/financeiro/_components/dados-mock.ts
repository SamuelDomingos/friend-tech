import { GRUPOS_PLANO, type GrupoPlano } from "../_schemas/categoria.schema"

export interface ContaBancaria {
  id: string
  codigo: string
  banco: string
  agencia: string
  conta: string
  digito: string
  saldoInicial: string
  dataSaldoInicial: string
  limiteCredito: string
  principal: boolean
  ativa: boolean
}

export interface CategoriaPlano {
  id: string
  nome: string
  grupo: GrupoPlano
}

export interface ContaPlano {
  id: string
  categoriaId: string
  codigo: string
  nome: string
}

export interface CentroCusto {
  id: string
  nome: string
}

export interface MarcadorFinanceiro {
  id: string
  nome: string
}

export const contasBancariasMock: ContaBancaria[] = [
  {
    id: "cb1",
    codigo: "001",
    banco: "Banco do Brasil",
    agencia: "1234",
    conta: "456789",
    digito: "0",
    saldoInicial: "10.000,00",
    dataSaldoInicial: "2025-01-01",
    limiteCredito: "50.000,00",
    principal: true,
    ativa: true,
  },
  {
    id: "cb2",
    codigo: "002",
    banco: "Caixa Econômica",
    agencia: "5678",
    conta: "987654",
    digito: "1",
    saldoInicial: "5.000,00",
    dataSaldoInicial: "2025-01-01",
    limiteCredito: "20.000,00",
    principal: false,
    ativa: true,
  },
  {
    id: "cb3",
    codigo: "003",
    banco: "Itaú",
    agencia: "9012",
    conta: "123456",
    digito: "2",
    saldoInicial: "0,00",
    dataSaldoInicial: "",
    limiteCredito: "10.000,00",
    principal: false,
    ativa: false,
  },
]

export const categoriasPlanoMock: CategoriaPlano[] = [
  { id: "c1", nome: "OUTRAS RECEITAS", grupo: "INCOME_OPERATING_CASH" },
  { id: "c2", nome: "RECEITA BRUTA", grupo: "INCOME_OPERATING_CASH" },
  { id: "c3", nome: "RECEITA FINANCEIRA", grupo: "INCOME_OPERATING_CASH" },
  { id: "c4", nome: "EMPRÉSTIMOS RECEBIDOS", grupo: "FINANCING_ACTIVITIES" },
  { id: "c5", nome: "RESGATE DE INVESTIMENTOS", grupo: "INVESTING_ACTIVITIES" },
]

export const contasPlanoMock: ContaPlano[] = [
  {
    id: "p1",
    categoriaId: "c1",
    codigo: "3.1.1.10.1",
    nome: "Receita de aluguel",
  },
  {
    id: "p2",
    categoriaId: "c1",
    codigo: "3.1.1.10.2",
    nome: "Receitas a Identificar",
  },
  { id: "p3", categoriaId: "c2", codigo: "04", nome: "Receita Mentoria" },
  {
    id: "p4",
    categoriaId: "c3",
    codigo: "3.3.1.1.07",
    nome: "Rendimentos de Aplicações",
  },
  {
    id: "p5",
    categoriaId: "c4",
    codigo: "2.1.1.5.01",
    nome: "Empréstimo bancário",
  },
  {
    id: "p6",
    categoriaId: "c5",
    codigo: "",
    nome: "Resgate de aplicação financeira",
  },
]

export const centrosCustoMock: CentroCusto[] = [
  { id: "cc1", nome: "Recepção" },
  { id: "cc2", nome: "Consultórios" },
  { id: "cc3", nome: "Laboratório" },
]

export const modelosCentroCustoMock: CentroCusto[] = [
  { id: "m1", nome: "Modelo Padrão" },
  { id: "m2", nome: "Modelo Especial" },
]

export const marcadoresMock: MarcadorFinanceiro[] = [
  { id: "t1", nome: "Emergência" },
  { id: "t2", nome: "Retorno" },
  { id: "t3", nome: "Internação" },
]

export function nomeGrupoPlano(grupo: GrupoPlano): string {
  return GRUPOS_PLANO.find((g) => g.value === grupo)?.label ?? "—"
}
