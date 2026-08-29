import { cookies } from "next/headers"

import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AppSidebar } from "./_components/sidebar"
import { Header } from "./_components/header"

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
    <div className="flex min-h-dvh w-full">
      <TooltipProvider delayDuration={0}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />

          <div className="flex flex-1 flex-col">
            <Header />

            <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}
