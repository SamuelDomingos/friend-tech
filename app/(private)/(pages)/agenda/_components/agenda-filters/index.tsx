"use client"

import { UserSelect } from "@/app/(private)/(pages)/agenda/_components/calendar/components/header/user-select"

import { FavoriteProfessionalsBar } from "./favorite-professionals-bar"
import { UnidadesFilter } from "./unidades-filter"

export function AgendaFiltersBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
      <UnidadesFilter />

      <div className="flex flex-wrap items-center gap-2">
        <UserSelect />
        <FavoriteProfessionalsBar />
      </div>
    </div>
  )
}
