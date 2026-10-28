"use client"

import { Separator } from "@/components/ui/separator"

interface SectionHeaderProps {
  description: string
}

export function SectionHeader({ description }: SectionHeaderProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Separator className="mt-2" />
    </div>
  )
}
