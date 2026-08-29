export function somenteDigitos(valor: string): string {
  return valor.replace(/\D/g, "")
}

export function formatarCpf(valor: string): string {
  const digitos = somenteDigitos(valor).slice(0, 11)

  return digitos
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
}

export function formatarTelefone(valor: string): string {
  const digitos = somenteDigitos(valor).slice(0, 11)

  if (digitos.length <= 10) {
    return digitos
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2")
  }

  return digitos
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
}

export function formatarCep(valor: string): string {
  const digitos = somenteDigitos(valor).slice(0, 8)

  return digitos.replace(/^(\d{5})(\d)/, "$1-$2")
}

export function daDataISO(iso: string): Date | undefined {
  if (!iso) {
    return undefined
  }

  const [ano, mes, dia] = iso.split("-").map(Number)

  if (!ano || !mes || !dia) {
    return undefined
  }

  return new Date(ano, mes - 1, dia)
}

export function paraDataISO(data: Date): string {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, "0")
  const dia = String(data.getDate()).padStart(2, "0")

  return `${ano}-${mes}-${dia}`
}
