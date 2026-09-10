const MESES = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
]

export function dataDeISO(iso: string): Date {
  return new Date(iso)
}

export function chaveData(iso: string): string {
  const d = dataDeISO(iso)
  const mes = String(d.getMonth() + 1).padStart(2, "0")
  const dia = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mes}-${dia}`
}

export function anoDeISO(iso: string): number {
  return dataDeISO(iso).getFullYear()
}

export function rotuloDiaMes(iso: string): string {
  const d = dataDeISO(iso)
  return `${String(d.getDate()).padStart(2, "0")} ${MESES[d.getMonth()]}`
}

export function rotuloDataHora(iso: string): string {
  const d = dataDeISO(iso)
  const hh = String(d.getHours()).padStart(2, "0")
  const mm = String(d.getMinutes()).padStart(2, "0")
  return `${String(d.getDate()).padStart(2, "0")} ${MESES[d.getMonth()]} ${d.getFullYear()} às ${hh}:${mm}`
}

export function horaMin(iso: string): string {
  const d = dataDeISO(iso)
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

export function tempoRelativo(iso: string): string {
  const agora = new Date()
  const d = dataDeISO(iso)
  const diffMs = agora.getTime() - d.getTime()
  const diffMin = Math.round(diffMs / 60000)
  const diffHoras = Math.round(diffMin / 60)
  const diffDias = Math.round(diffHoras / 24)
  const diffMeses = Math.floor(diffDias / 30)
  const diffAnos = Math.floor(diffDias / 365)

  if (diffMin < 1) {
    return "agora mesmo"
  }
  if (diffMin < 60) {
    return `há ${diffMin} min`
  }
  if (diffHoras < 24) {
    return `há ${diffHoras} h`
  }
  if (diffDias < 30) {
    return `há ${diffDias} dia${diffDias > 1 ? "s" : ""}`
  }
  if (diffAnos < 1) {
    return `há ${diffMeses} ${diffMeses > 1 ? "meses" : "mês"}`
  }
  return `há ${diffAnos} ${diffAnos > 1 ? "anos" : "ano"}`
}
