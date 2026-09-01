"use client";

import { useState } from "react";
import { Building2, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";

export function UnidadeSelect() {
  const { unidades, selectedUnidadeId, setSelectedUnidadeId } = useCalendar();
  const [open, setOpen] = useState(false);

  const selectedUnidade = unidades.find((u) => u.id === selectedUnidadeId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 md:w-48 justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <Building2 className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">
              {selectedUnidadeId === "all" ? "Todas as unidades" : selectedUnidade?.nome}
            </span>
          </div>
          <ChevronsUpDown size={14} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" align="end">
        <ScrollArea className="max-h-64">
          <div className="flex flex-col gap-0.5">
            <Button
              type="button"
              variant="ghost"
              className="justify-start gap-2 px-2"
              onClick={() => { setSelectedUnidadeId("all"); setOpen(false); }}
            >
              <span className="flex-1 truncate text-left">Todas as unidades</span>
              <Check
                size={14}
                className={cn(selectedUnidadeId === "all" ? "opacity-100" : "opacity-0")}
              />
            </Button>

            {unidades.map((unidade) => (
              <Button
                key={unidade.id}
                type="button"
                variant="ghost"
                className="justify-start gap-2 px-2"
                onClick={() => { setSelectedUnidadeId(unidade.id); setOpen(false); }}
              >
                <span className="flex-1 truncate text-left">{unidade.nome}</span>
                <Check
                  size={14}
                  className={cn(selectedUnidadeId === unidade.id ? "opacity-100" : "opacity-0")}
                />
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
