"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import {
  BarChart3,
  Calculator,
  CalendarDays,
  ClipboardList,
  Handshake,
  Package,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
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

import { NavFlyout, type FlyoutGroup } from "./nav-flyout"

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  groups?: FlyoutGroup[]
}

const navigation: NavItem[] = [
  { title: "Agenda", url: "/agenda", icon: CalendarDays },
  { title: "Pacientes", url: "/pacientes", icon: Users },
  { title: "Laudo", url: "/laudo", icon: ClipboardList },
  { title: "Convênio", url: "/convenio", icon: Handshake },
  {
    title: "Financeiro",
    url: "/financeiro",
    icon: Wallet,
    groups: [
      {
        title: "Visão",
        items: [
          { title: "Dashboard", url: "/financeiro" },
          { title: "Caixa / Banco", url: "/financeiro/caixa-banco" },
          { title: "Fluxo de caixa", url: "/financeiro/fluxo-de-caixa" },
        ],
      },
      {
        title: "Contas",
        items: [
          { title: "Contas a pagar", url: "/financeiro/contas-a-pagar" },
          { title: "Contas a receber", url: "/financeiro/contas-a-receber" },
        ],
      },
    ],
  },
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
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={collapsed ? 40 : 120}
                height={collapsed ? 40 : 96}
                className={cn(
                  "rounded-lg transition-all duration-200",
                  collapsed ? "size-10" : "mx-auto size-10"
                )}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.url)

                const trigger = (
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.groups ? (
                      <NavFlyout groups={item.groups} activeUrl={pathname}>
                        {trigger}
                      </NavFlyout>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>{trigger}</TooltipTrigger>

                        {collapsed && (
                          <TooltipContent
                            className="[&_svg]:invisible"
                            side="right"
                          >
                            {item.title}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    )}
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
