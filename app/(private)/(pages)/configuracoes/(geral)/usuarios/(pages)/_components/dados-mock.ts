import {
  PERMISSOES_MODULOS,
  type ContaFormData,
} from "../_schemas/conta.schema"

const criarPermissoes = (
  modulosAtivos: string[]
): ContaFormData["permissoes"] => {
  const resultado = {} as ContaFormData["permissoes"]

  for (const modulo of PERMISSOES_MODULOS) {
    const ativo = modulosAtivos.includes(modulo.modulo)

    resultado[modulo.modulo] = Object.fromEntries(
      modulo.permissoes.map((permissao) => [permissao.key, ativo])
    )
  }

  return resultado
}

export const contaMock: ContaFormData = {
  nomeCompleto: "Ademar Lima de Sousa",
  cpf: "095.457.103-73",
  dataNascimento: "2004-02-12",
  sexo: "Masculino",
  telefone: "",
  email: "ademarlmsousa@gmail.com",
  emailVerificado: true,
  celularAtivacao: "(85) 98876-0172",
  celularVerificado: true,
  tipoPerfil: "finance",
  usuarioAdministrativo: true,
  administradorSistema: false,
  acessoLiberado: true,
  permissoes: criarPermissoes(["financeiro"]),
  ocultarDataEmissao: false,
  ocultarAssinatura: false,
  ocultarEndereco: false,
  ocultarLaboratorioMedicamento: false,
  ocultarCpfPaciente: false,
  emailClinicaReceituarioEspecial: false,
  ocultarNumeracao: false,
  compartilharProntuario: false,
  rolarPaginaHorarioAtual: false,
}

export const contaAvatar = {
  url: "/avatars/avatar-1.png",
  nome: "Ademar Lima de Sousa",
}

export const CONTAS_BANCARIAS = [
  "Banco do Brasil",
  "Caixa Econômica",
  "Itaú",
  "Bradesco",
  "Santander",
]

export const UNIDADES = [
  "Unidade Central",
  "Unidade Norte",
  "Unidade Sul",
  "Unidade Leste",
  "Unidade Oeste",
]

export function iniciais(nome: string): string {
  const partes = nome.split(" ").filter(Boolean)

  if (partes.length === 0) {
    return "?"
  }

  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase()
  }

  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
}
