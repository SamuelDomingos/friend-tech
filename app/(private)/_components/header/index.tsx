"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { ModeToggle } from "./mode-toggle"
import { ProfileDropdown } from "./dropdown-profile"
import { SearchPacientes } from "./search-pacientes"
import { Card, CardContent } from "@/components/ui/card"

const breadcrumbs: Record<
  string,
  { label: string; parent?: { label: string; href: string } }
> = {
  "/": { label: "Bem-vindo" },
  "/agenda": { label: "Agenda" },
  "/pacientes": { label: "Pacientes" },
  "/pacientes/novo": {
    label: "Novo paciente",
    parent: { label: "Pacientes", href: "/pacientes" },
  },
  "/laudo": { label: "Laudo" },
  "/convenio": { label: "Convênio" },
  "/financeiro": { label: "Financeiro" },
  "/relatorios": { label: "Relatórios" },
  "/contabilidade": { label: "Contabilidade" },
  "/estoque": { label: "Estoque" },
  "/configuracoes": { label: "Configurações" },
  "/configuracoes/agenda": {
    label: "Agenda",
    parent: { label: "Configurações", href: "/configuracoes" },
  },
  "/configuracoes/usuarios": {
    label: "Usuários",
    parent: { label: "Configurações", href: "/configuracoes" },
  },
  "/configuracoes/unidades": {
    label: "Unidades",
    parent: { label: "Configurações", href: "/configuracoes" },
  },
  "/configuracoes/laudo": {
    label: "Laudo",
    parent: { label: "Configurações", href: "/configuracoes" },
  },
  "/configuracoes/financeiro": {
    label: "Financeiro",
    parent: { label: "Configurações", href: "/configuracoes" },
  },
  "/configuracoes/repasse": {
    label: "Repasse",
    parent: { label: "Configurações", href: "/configuracoes" },
  },
  "/configuracoes/cartoes": {
    label: "Cartões",
    parent: { label: "Configurações", href: "/configuracoes" },
  },
  "/configuracoes/agreement": {
    label: "Convênios",
    parent: { label: "Configurações", href: "/configuracoes" },
  },
  "/configuracoes/agreement/novo": {
    label: "Novo convênio",
    parent: { label: "Convênios", href: "/configuracoes/agreement" },
  },
}

export function Header() {
  const pathname = usePathname()

  let breadcrumb = breadcrumbs[pathname]

  if (!breadcrumb) {
    // Sub-rotas (ex.: /pacientes/[id]): usa o módulo como breadcrumb pai.
    const segment = pathname.split("/")[1]
    const parent = breadcrumbs[`/${segment}`]

    if (parent) {
      breadcrumb = {
        label: pathname.split("/").filter(Boolean).pop() ?? segment,
        parent: { label: parent.label, href: `/${segment}` },
      }
    }
  }

  return (
    <Card className="mt-2 mb-4 p-0 sticky top-2 z-50">
      <CardContent className="p-0">
        <header>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
            <div className="flex min-w-0 items-center gap-4">
              <SidebarTrigger className="[&_svg]:size-5!" />

              {breadcrumb && (
                <>
                  <Separator
                    orientation="vertical"
                    className="hidden sm:block"
                  />

                  <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                      {breadcrumb.parent && (
                        <>
                          <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                              <Link href={breadcrumb.parent.href}>
                                {breadcrumb.parent.label}
                              </Link>
                            </BreadcrumbLink>
                          </BreadcrumbItem>

                          <BreadcrumbSeparator />
                        </>
                      )}

                      <BreadcrumbItem>
                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </>
              )}
            </div>

            <SearchPacientes />

            <div className="flex items-center gap-1.5">
              <ModeToggle />
              <ProfileDropdown />
            </div>
          </div>
        </header>
      </CardContent>
    </Card>
  )
}
