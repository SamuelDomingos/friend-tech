import { pacientesMock, type Paciente } from "../../_components/dados-mock"

export type PacienteDetalhe = Paciente & {
  convenioPrincipal: string
  alergia: boolean
  gravidezData?: string
  lgpd: "ASSINADO" | "ENVIADO" | "PENDENTE"
  notaHeader?: string
}

export interface Profissional {
  id: string
  nome: string
  avatar?: string
}

export interface Etiqueta {
  id: string
  nome: string
}

export type TipoRegistro =
  | "ANAMNESE"
  | "TEXTO"
  | "EVOLUCAO"
  | "PRIVADO"
  | "ANEXO"
  | "RECEITUARIO"
  | "SOLICITACAO_EXAME"
  | "SOLICITACAO_EXAME_GUIA"
  | "LAUDO"
  | "ATESTADO"
  | "ORCAMENTO"
  | "QUESTIONARIO"

export const TIPOS_REGISTRO: { value: TipoRegistro; rotulo: string }[] = [
  { value: "ANAMNESE", rotulo: "Anamnese" },
  { value: "TEXTO", rotulo: "Observações" },
  { value: "EVOLUCAO", rotulo: "Evolução" },
  { value: "PRIVADO", rotulo: "Anotação privada" },
  { value: "ANEXO", rotulo: "Fotos/Arquivos" },
  { value: "RECEITUARIO", rotulo: "Receituário" },
  { value: "SOLICITACAO_EXAME", rotulo: "Solicitação de exames" },
  { value: "SOLICITACAO_EXAME_GUIA", rotulo: "Solicitação de exames com guia" },
  { value: "LAUDO", rotulo: "Laudo" },
  { value: "ATESTADO", rotulo: "Atestado, Declaração e Outros" },
  { value: "ORCAMENTO", rotulo: "Orçamento" },
  { value: "QUESTIONARIO", rotulo: "Questionário Paciente" },
]

export const rotuloRegistro = (tipo: TipoRegistro) =>
  TIPOS_REGISTRO.find((t) => t.value === tipo)?.rotulo ?? tipo

export interface Arquivo {
  id: string
  nome: string
  tipo: "imagem" | "pdf"
  url?: string
}

export interface Comentario {
  id: string
  autorNome: string
  criadoEm: string
  texto: string
}

export interface Registro {
  id: string
  tipo: TipoRegistro
  autorNome: string
  autorAvatar?: string
  criadoEm: string
  texto?: string
  arquivos?: Arquivo[]
  fixado: boolean
  assinado?: boolean
  comentarios: Comentario[]
}

export interface BarraItem {
  tipo: TipoRegistro
  ativo: boolean
}

export interface BarraGrupo {
  id: string
  rotulo: string
  itens: BarraItem[]
}

export const barraGruposMock: BarraGrupo[] = [
  {
    id: "atendimento",
    rotulo: "Atendimento",
    itens: [
      { tipo: "ANAMNESE", ativo: true },
      { tipo: "TEXTO", ativo: true },
      { tipo: "EVOLUCAO", ativo: true },
      { tipo: "PRIVADO", ativo: true },
      { tipo: "ANEXO", ativo: true },
    ],
  },
  {
    id: "impressos",
    rotulo: "Impressos",
    itens: [
      { tipo: "RECEITUARIO", ativo: true },
      { tipo: "SOLICITACAO_EXAME", ativo: true },
      { tipo: "SOLICITACAO_EXAME_GUIA", ativo: true },
      { tipo: "LAUDO", ativo: true },
      { tipo: "ATESTADO", ativo: true },
      { tipo: "ORCAMENTO", ativo: true },
    ],
  },
  {
    id: "personalizado",
    rotulo: "Personalizado",
    itens: [{ tipo: "QUESTIONARIO", ativo: true }],
  },
]

export const equipeMock: Profissional[] = [
  { id: "p1", nome: "Aaron Guilherme Oliveira Sampaio" },
  { id: "p2", nome: "Thaís Alves" },
  { id: "p3", nome: "Luciana Eloia Quintino da Silva" },
  { id: "p4", nome: "Alan Robson de Oliveira" },
]

export const etiquetasMock: Etiqueta[] = [
  { id: "e1", nome: "Retorno em 30 dias" },
]

export type CampoFormulario =
  | { id: string; tipo: "INPUT"; titulo: string; placeholder?: string }
  | { id: string; tipo: "MULTIPLE"; titulo: string; opcoes: string[] }
  | { id: string; tipo: "SELECT"; titulo: string; opcoes: string[] }

export const camposAnamneseMock: CampoFormulario[] = [
  {
    id: "nomeCompleto",
    tipo: "INPUT",
    titulo: "Qual seu nome completo?",
    placeholder: "Escreva sua resposta aqui...",
  },
  {
    id: "objetivo",
    tipo: "MULTIPLE",
    titulo: "Qual seu objetivo em procurar nosso serviço?",
    opcoes: [
      "Perder peso",
      "Ganhar massa muscular",
      "Reeducação alimentar",
      "Saúde",
      "Estética",
      "Melhorar performance esportiva",
    ],
  },
  {
    id: "prazo",
    tipo: "SELECT",
    titulo: "Qual seu prazo para atingir seu objetivo?",
    opcoes: [
      "1 mês",
      "3 meses",
      "6 meses",
      "1 ano",
      "Acima de 1 ano",
    ],
  },
  {
    id: "saude",
    tipo: "MULTIPLE",
    titulo:
      "Possui algum Problema de saúde? Se sim, qual(is)?",
    opcoes: [
      "Has/há",
      "Diabetes",
      "Colesterol Alto",
      "Triglicerídeos Altos",
      "Doença renal",
      "Dislipidemia",
      "Intolerância a lactose",
      "Doença celíaca",
      "Síndrome do intestino irritável",
      "Doença de crohn",
      "Nenhuma das opções acima",
      "Outra",
    ],
  },
  {
    id: "sono",
    tipo: "MULTIPLE",
    titulo:
      "Possui algum Problema de sono? Se sim, qual(is)?",
    opcoes: [
      "Insônia",
      "Dorme pouco",
      "Muitas idas ao banheiro durante a noite",
      "Dificuldade de conciliar o sono",
      "Acorda durante a noite",
      "Acorda cansando",
      "Apneia do sono",
      "Nenhuma das opções acima",
    ],
  },
  {
    id: "fluxoMenstrual",
    tipo: "MULTIPLE",
    titulo:
      "Se for do sexo feminino, como descreveria seu fluxo menstrual? Se for do sexo masculino, descreva como está sua disposição para atividades físicas em geral.",
    opcoes: [
      "Normal",
      "Muito abundante",
      "Pouco abundante",
      "Com cólicas",
      "Sem cólicas",
      "Atrasado",
      "Adiantado",
      "Não se aplica",
    ],
  },
  {
    id: "intestinal",
    tipo: "SELECT",
    titulo: "Como você descreveria seu trânsito intestinal?",
    opcoes: [
      "Acima de 3 vezes ao dia",
      "Uma vez ao dia",
      "Em média 3 vezes por semana",
      "Uma vez por semana",
      "Uma vez a cada 15 dias ou mais",
    ],
  },
]

export interface ProntuarioDados {
  grupos: BarraGrupo[]
  registros: Registro[]
  equipe: Profissional[]
  etiquetas: Etiqueta[]
}

const registrosMock: Registro[] = [
  {
    id: "r1",
    tipo: "ANEXO",
    autorNome: "Aaron Guilherme Oliveira Sampaio",
    criadoEm: "2026-06-25T16:01:00",
    fixado: true,
    arquivos: [
      { id: "f1", nome: "WhatsApp-Image-2026-06-25.jpg", tipo: "imagem" },
      { id: "f2", nome: "AARON-22.pdf", tipo: "pdf" },
    ],
    comentarios: [],
  },
  {
    id: "r2",
    tipo: "TEXTO",
    autorNome: "Thaís Alves",
    criadoEm: "2025-10-22T17:09:00",
    texto: "Cortesia Bodyshape",
    fixado: false,
    comentarios: [],
  },
  {
    id: "r3",
    tipo: "ANEXO",
    autorNome: "Luciana Eloia Quintino da Silva",
    criadoEm: "2025-09-05T18:44:00",
    fixado: false,
    arquivos: [
      {
        id: "f3",
        nome: "PLANO-ALIMENTAR-Aaron-Guilherme-Oliveira-Sampaio.pdf",
        tipo: "pdf",
      },
    ],
    comentarios: [
      {
        id: "c1",
        autorNome: "Alan Robson de Oliveira",
        criadoEm: "2025-09-06T09:12:00",
        texto: "Revisar quantidade de calorias.",
      },
    ],
  },
  {
    id: "r4",
    tipo: "EVOLUCAO",
    autorNome: "Alan Robson de Oliveira",
    criadoEm: "2025-02-07T11:20:00",
    texto:
      "Paciente relata melhora do quadro. Mantém uso de suplementação conforme orientação nutricional.",
    fixado: false,
    comentarios: [],
  },
  {
    id: "r5",
    tipo: "ANAMNESE",
    autorNome: "Aaron Guilherme Oliveira Sampaio",
    criadoEm: "2025-03-05T10:15:00",
    texto: "Anamnese inicial preenchida pelo paciente no agendamento online.",
    fixado: false,
    comentarios: [],
  },
  {
    id: "r6",
    tipo: "TEXTO",
    autorNome: "Thaís Alves",
    criadoEm: "2024-09-03T14:30:00",
    texto: "Orientações de retorno em 30 dias.",
    fixado: false,
    comentarios: [],
  },
  {
    id: "r7",
    tipo: "RECEITUARIO",
    autorNome: "Aaron Guilherme Oliveira Sampaio",
    criadoEm: "2024-08-20T09:45:00",
    fixado: false,
    assinado: true,
    comentarios: [],
  },
]

export function getProntuarioPorPaciente(id: string): {
  paciente: PacienteDetalhe | null
  dados: ProntuarioDados | null
} {
  const base = pacientesMock.find((p) => p.id === id)

  if (!base) {
    return { paciente: null, dados: null }
  }

  const paciente: PacienteDetalhe = {
    ...base,
    convenioPrincipal: base.convenios[0] ?? "Particular",
    alergia: base.id === "1",
    lgpd: base.id === "1" ? "ASSINADO" : "PENDENTE",
    notaHeader: base.id === "1" ? "Cliente VIP desde 2024." : undefined,
  }

  return {
    paciente,
    dados: {
      grupos: barraGruposMock,
      registros: registrosMock,
      equipe: equipeMock,
      etiquetas: etiquetasMock,
    },
  }
}
