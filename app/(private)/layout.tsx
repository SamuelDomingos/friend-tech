import { cookies } from "next/headers"

import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AppSidebar } from "./_components/sidebar"
import { Header } from "./_components/header"
import { Card, CardContent } from "@/components/ui/card"

// Páginas privadas dependem de auth — não pré-renderizar em build time
// (evita criar o client Supabase com env vazio em CI/Docker).
export const dynamic = "force-dynamic"

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />

          <div className="flex flex-1 flex-col mx-4">
            <Header />

            <Card className="flex flex-1 flex-col mb-2">
              <CardContent className="overflow-auto">
                {children}
              </CardContent>
            </Card>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}
