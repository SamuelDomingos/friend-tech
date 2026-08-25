"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  BarChart3,
  Calculator,
  CalendarDays,
  ClipboardList,
  Handshake,
  Package,
  Settings,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navigation = [
  { title: "Agenda", url: "/agenda", icon: CalendarDays },
  { title: "Pacientes", url: "/pacientes", icon: Users },
  { title: "Laudo", url: "/laudo", icon: ClipboardList },
  { title: "Convênio", url: "/convenio", icon: Handshake },
  { title: "Financeiro", url: "/financeiro", icon: Wallet },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Contabilidade", url: "/contabilidade", icon: Calculator },
  { title: "Estoque", url: "/estoque", icon: Package },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state } = useSidebar()

  const collapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Stethoscope className="size-5" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Friend Tech</span>

                <span className="truncate text-xs text-muted-foreground">
                  Sistema Clínico
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigation.map((item) => {
                const isActive =
                  item.url === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.url)

                return (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={item.url}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>

                      {collapsed && (
                        <TooltipContent
                          className="[&_svg]:invisible"
                          side="right"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
