"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useTheme } from "next-themes"
import { Toaster } from "sonner"

import { ThemeProvider } from "@/components/theme-provider"

function ThemedToaster() {
  const { resolvedTheme } = useTheme()

  return <Toaster theme={resolvedTheme === "dark" ? "dark" : "light"} richColors />
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        <ThemedToaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
