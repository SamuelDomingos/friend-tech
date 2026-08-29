export type TipoUsuario = "doctor" | "finance" | "scheduler" | "receptionist"

export type StatusUsuario = "active" | "inactive"

export type TipoFiltroValue = "all" | TipoUsuario

export type StatusFiltroValue = "all" | StatusUsuario

export interface Usuario {
  id: string
  nome: string
  email: string
  tipo: TipoUsuario
  pessoaFisica: boolean
  status: StatusUsuario
  criadoEm: string
  avatarUrl: string
}

export const TIPO_LABELS: Record<TipoUsuario, string> = {
  doctor: "Profissional de saúde",
  finance: "Financeiro",
  scheduler: "Central de Agendamento",
  receptionist: "Recepcionista",
}

const primeirosNomes = [
  "Maria",
  "João",
  "Ana",
  "Carlos",
  "Fernanda",
  "Pedro",
  "Juliana",
  "Lucas",
  "Beatriz",
  "Rafael",
  "Camila",
  "Rodrigo",
  "Patrícia",
  "Marcos",
  "Larissa",
  "Bruno",
  "Aline",
  "Diego",
  "Vanessa",
  "Thiago",
  "Renata",
  "Fábio",
  "Carolina",
  "Gustavo",
  "Mariana",
  "Eduardo",
  "Luciana",
  "André",
  "Paula",
  "Ricardo",
]

const sobrenomes = [
  "Silva",
  "Souza",
  "Oliveira",
  "Santos",
  "Pereira",
  "Costa",
  "Almeida",
  "Nascimento",
  "Lima",
  "Araújo",
  "Fernandes",
  "Carvalho",
  "Gomes",
  "Martins",
  "Rocha",
  "Ribeiro",
  "Alves",
  "Barbosa",
  "Cardoso",
  "Melo",
]

const tipos: TipoUsuario[] = ["doctor", "finance", "scheduler", "receptionist"]

const ATIVOS = 113
const INATIVOS = 53

function dataCriacao(index: number): string {
  const totalDias = 3 * 365
  const atrasoDias = (index * 7) % totalDias
  const data = new Date(2026, 0, 1)
  data.setDate(data.getDate() - atrasoDias)
  return data.toISOString()
}

function slugificar(nome: string): string {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "")
}

export const usuariosMock: Usuario[] = Array.from(
  { length: ATIVOS + INATIVOS },
  (_, index) => {
    const nome = `${primeirosNomes[index % primeirosNomes.length]} ${sobrenomes[(index * 3) % sobrenomes.length]}`
    const slug = slugificar(nome)
    const email = `${slug}${index + 1}@clinica.com`

    return {
      id: `usuario-${index + 1}`,
      nome,
      email,
      tipo: tipos[index % tipos.length],
      pessoaFisica: (index + 1) % 9 !== 0,
      status: index < ATIVOS ? "active" : "inactive",
      criadoEm: dataCriacao(index),
      avatarUrl: `/avatars/avatar-${(index % 12) + 1}.png`,
    }
  }
)

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

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR")
}
