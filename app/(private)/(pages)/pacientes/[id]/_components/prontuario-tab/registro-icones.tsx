import {
  ClipboardCheck,
  ClipboardList,
  FilePlus2,
  FileSearch,
  FileText,
  Image as ImageIcon,
  ListChecks,
  Lock,
  Paperclip,
  Pill,
  Receipt,
  Stethoscope,
  type LucideIcon,
} from "lucide-react"

import type { TipoRegistro } from "../dados-mock"
import { cn } from "@/lib/utils"

const ICONES: Record<TipoRegistro, LucideIcon> = {
  ANAMNESE: ClipboardList,
  TEXTO: FileText,
  EVOLUCAO: Stethoscope,
  PRIVADO: Lock,
  ANEXO: Paperclip,
  RECEITUARIO: Pill,
  SOLICITACAO_EXAME: FilePlus2,
  SOLICITACAO_EXAME_GUIA: FileSearch,
  LAUDO: ClipboardCheck,
  ATESTADO: FileText,
  ORCAMENTO: Receipt,
  QUESTIONARIO: ListChecks,
}

export function RegistroIcone({
  tipo,
  className,
}: {
  tipo: TipoRegistro
  className?: string
}) {
  const Icone = ICONES[tipo] ?? ImageIcon
  return <Icone className={cn("size-4", className)} />
}
