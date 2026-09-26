"use client"

import {
  Mail,
  MessageCircle,
  Printer,
  QrCode,
  RotateCcw,
  Share2,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { Registro } from "../../dados-mock"

function Acao({
  onClick,
  icone,
  children,
}: {
  onClick: () => void
  icone: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      className="gap-1 text-xs"
      onClick={onClick}
    >
      {icone}
      {children}
    </Button>
  )
}

interface RegistroAcoesProps {
  registro: Registro
}

export function RegistroAcoes({ registro }: RegistroAcoesProps) {
  return (
    <CardFooter className="flex-wrap justify-start gap-1.5 bg-transparent p-0 px-3 py-2">
      <Acao
        onClick={() => toast("Gerando PDF do registro.")}
        icone={<Printer className="size-3.5" />}
      >
        Imprimir
      </Acao>

      {!registro.assinado && (
        <Acao
          onClick={() => toast("Assinatura digital em breve.")}
          icone={<QrCode className="size-3.5" />}
        >
          Assinar
        </Acao>
      )}

      <Acao
        onClick={() => toast("Revalidação em breve.")}
        icone={<RotateCcw className="size-3.5" />}
      >
        Revalidar
      </Acao>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size="xs" className="gap-1">
            <Share2 className="size-3.5" />
            Compartilhar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => toast("Compartilhar por e-mail.")}>
            <Mail className="size-4" />
            Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast("Compartilhar no WhatsApp.")}>
            <MessageCircle className="size-4" />
            WhatsApp
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardFooter>
  )
}
