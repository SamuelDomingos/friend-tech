"use client"

import { useMemo, useState } from "react"
import { Stethoscope, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { useCalendar } from "@/app/(private)/(pages)/agenda/_components/calendar/contexts/calendar-context"

import { SelectProfessionalsDialog } from "./select-professionals-dialog"

export function FavoriteProfessionalsBar() {
  const { users, events, selectedUserId, setSelectedUserId } = useCalendar()

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    () => new Set(users.filter((user) => user.isFavorite).map((user) => user.id))
  )
  const [viewAll, setViewAll] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const visibleUsers = useMemo(
    () => (viewAll ? users : users.filter((user) => favoriteIds.has(user.id))),
    [viewAll, users, favoriteIds]
  )

  const toggleSelected = (userId: string) => {
    setSelectedUserId(selectedUserId === userId ? "all" : userId)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center -space-x-2">
        {visibleUsers.map((user) => (
          <Tooltip key={user.id}>
            <TooltipTrigger asChild>
              <button type="button" onClick={() => toggleSelected(user.id)}>
                <Avatar
                  className={cn(
                    "ring-2 ring-background transition-all",
                    selectedUserId === user.id && "ring-primary"
                  )}
                >
                  <AvatarImage src={user.avatar ?? undefined} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant={viewAll ? "default" : "outline"}
            onClick={() => setViewAll((atual) => !atual)}
          >
            <Users />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Filtrar todos</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" size="icon" variant="outline" onClick={() => setDialogOpen(true)}>
            <Stethoscope />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Selecionar favoritos</p>
        </TooltipContent>
      </Tooltip>

      <SelectProfessionalsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        users={users}
        events={events}
        favoriteIds={favoriteIds}
        onConfirm={setFavoriteIds}
      />
    </div>
  )
}
