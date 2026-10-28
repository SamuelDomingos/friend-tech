"use client"

import Link from "next/link"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { useHoverPopover } from "./_hooks/use-hover-popover"

export interface FlyoutGroup {
  title: string
  items: { title: string; url: string }[]
}

interface NavFlyoutProps {
  children: React.ReactNode
  groups: FlyoutGroup[]
  activeUrl?: string
}

export function NavFlyout({ children, groups, activeUrl }: NavFlyoutProps) {
  const hover = useHoverPopover()

  return (
    <Popover open={hover.open} onOpenChange={hover.setOpen}>
      <div onMouseEnter={hover.enter} onMouseLeave={hover.leave}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
      </div>

      <PopoverContent
        side="right"
        align="start"
        sideOffset={8}
        className="w-64 p-3"
        onMouseEnter={hover.enter}
        onMouseLeave={hover.leave}
      >
        <div className="space-y-3">
          {groups.map((group) => (
            <div key={group.title} className="space-y-1">
              <p className="px-2 text-[11px] font-medium text-muted-foreground uppercase">
                {group.title}
              </p>

              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.url}-${item.title}`}>
                    <Link
                      href={item.url}
                      onClick={() => hover.setOpen(false)}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-sm hover:bg-accent",
                        activeUrl === item.url &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
