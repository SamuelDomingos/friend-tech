export function isSolidColorAvatar(value?: string | null) {
  return (
    (value?.startsWith("#") && /^#[0-9A-Fa-f]{6}$/.test(value)) ||
    value?.startsWith("color:") ||
    false
  )
}

export function getAvatarType(value?: string | null) {
  if (!value) return ""
  if (value.startsWith("data:")) return "upload"
  if (isSolidColorAvatar(value)) return "color"
  return value
}

export function iniciais(nome: string): string {
  return nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .join("")
}
