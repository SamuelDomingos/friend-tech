import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formata um CPF como 000.000.000-00 (ignora caracteres não numéricos). */
export function formatCPF(cpf: string) {
  const digits = cpf.replace(/\D/g, "").slice(0, 11)
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

/** Formata uma data (string ISO ou Date) como dd/mm/aaaa. */
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("pt-BR")
}
