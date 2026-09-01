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

/** Formata um número como moeda brasileira (R$ 0,00). */
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

/** Calcula a idade em anos completos a partir de uma data de nascimento. */
export function calcularIdade(dataNascimento: Date) {
  const hoje = new Date()
  let idade = hoje.getFullYear() - dataNascimento.getFullYear()
  const aindaNaoFezAniversario =
    hoje.getMonth() < dataNascimento.getMonth() ||
    (hoje.getMonth() === dataNascimento.getMonth() &&
      hoje.getDate() < dataNascimento.getDate())

  if (aindaNaoFezAniversario) {
    idade -= 1
  }

  return idade
}
