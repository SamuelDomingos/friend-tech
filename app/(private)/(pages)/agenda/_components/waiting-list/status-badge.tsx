"use client"

import { ChevronDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { TAttendanceStatus } from "@/app/(private)/(pages)/agenda/_components/calendar/types"

import { ATTENDANCE_STATUS_CONFIG } from "./status-config"

interface AttendanceStatusBadgeProps {
  status: TAttendanceStatus
  onStatusChange: (status: TAttendanceStatus) => void
}

export function AttendanceStatusBadge({
  status,
  onStatusChange,
}: AttendanceStatusBadgeProps) {
  const config = ATTENDANCE_STATUS_CONFIG[status]
  const Icon = config.icon

  if (config.nextActions.length === 0) {
    return (
      <Badge
        variant="outline"
        className={cn("gap-1 border", config.badgeClassName)}
      >
        <Icon />
        {config.label}
      </Badge>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className={cn(
            "h-6 gap-1 rounded-full border px-2 text-xs font-medium [&_svg]:size-3.5",
            config.badgeClassName
          )}
        >
          <Icon />
          {config.label}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {config.nextActions.map((action) => {
          const ActionIcon = action.icon
          return (
            <DropdownMenuItem
              key={action.status}
              onClick={() => onStatusChange(action.status)}
            >
              <ActionIcon />
              {action.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
