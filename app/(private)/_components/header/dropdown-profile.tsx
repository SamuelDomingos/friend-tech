"use client"

import Link from "next/link"
import { LogOutIcon, SettingsIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Usuário fictício — substituir pelo usuário autenticado quando houver integração.
const usuarioMock = {
  name: "Maria Silva",
  email: "maria@exemplo.com",
}

const initials = usuarioMock.name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .toUpperCase()
  .slice(0, 2)

export function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Avatar className="rounded-sm after:rounded-[inherit]">
            <AvatarFallback className="rounded-sm after:rounded-[inherit]">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="flex items-center gap-4 px-4 py-2.5 font-normal">
          <Avatar size="lg" className="rounded-sm after:rounded-[inherit]">
            <AvatarFallback className="rounded-sm after:rounded-[inherit]">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-1 flex-col items-start">
            <span className="text-base font-semibold capitalize">
              {usuarioMock.name}
            </span>

            <span className="text-sm text-muted-foreground">
              {usuarioMock.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="gap-2 px-4 py-2.5">
          <Link href="/configuracoes">
            <SettingsIcon className="size-5" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          variant="destructive"
          className="gap-2 px-4 py-2.5"
        >
          <Link href="/auth">
            <LogOutIcon className="size-5" />
            <span>Sair</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
