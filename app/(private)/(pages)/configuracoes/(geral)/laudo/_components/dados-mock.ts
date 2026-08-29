export interface Grupo {
  id: string
  nome: string
}

export interface Modelo {
  id: string
  nome: string
  grupoId: string
  titulo: string
  ocultarTitulo: boolean
  conteudo: string
}

export interface Motivo {
  id: string
  titulo: string
}

export interface Fluxo {
  id: string
  nome: string
  sigla: string
  ordem: string
  cor: string
}

export interface Achado {
  id: string
  nome: string
  grupoId: string
  conteudo: string
}

export const CORES_FLUXO = [
  "#67676C",
  "#E0002D",
  "#FF7700",
  "#FFD500",
  "#40BF4A",
  "#008CFF",
  "#9500FF",
] as const

export const gruposMock: Grupo[] = [
  { id: "g1", nome: "Radiologia" },
  { id: "g2", nome: "Cardiologia" },
  { id: "g3", nome: "Laboratório" },
]

export const modelosMock: Modelo[] = [
  {
    id: "m1",
    nome: "Raio-X padrão",
    grupoId: "g1",
    titulo: "Radiografia de Tórax",
    ocultarTitulo: false,
    conteudo: "<p>Exame sem alterações significativas.</p>",
  },
  {
    id: "m2",
    nome: "Eletrocardiograma",
    grupoId: "g2",
    titulo: "ECG",
    ocultarTitulo: false,
    conteudo: "<p>Ritmo sinusal regular.</p>",
  },
]

export const motivosMock: Motivo[] = [
  { id: "r1", titulo: "Laudo incorreto" },
  { id: "r2", titulo: "Exame trocado" },
  { id: "r3", titulo: "Informações incompletas" },
]

export const fluxosMock: Fluxo[] = [
  { id: "f1", nome: "Laudo pendente", sigla: "LP", ordem: "1", cor: "#FFD500" },
  { id: "f2", nome: "Em revisão", sigla: "ER", ordem: "2", cor: "#008CFF" },
  { id: "f3", nome: "Finalizado", sigla: "FI", ordem: "3", cor: "#40BF4A" },
]

export const achadosMock: Achado[] = [
  {
    id: "a1",
    nome: "Nódulo pulmonar",
    grupoId: "g1",
    conteudo: "<p>Atenção: nódulo pulmonar identificado.</p>",
  },
  {
    id: "a2",
    nome: "Alteração no segmento ST",
    grupoId: "g2",
    conteudo: "<p>Atenção: alteração no segmento ST.</p>",
  },
]
