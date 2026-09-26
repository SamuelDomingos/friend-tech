"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Columns, Grid3x3, List, Grid2x2, CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TodayButton } from "@/app/(private)/(pages)/agenda/_components/calendar/components/header/today-button";
import { DateNavigator } from "@/app/(private)/(pages)/agenda/_components/calendar/components/header/date-navigator";

import type { IEvent } from "@/app/(private)/(pages)/agenda/_components/calendar/interfaces";
import type { TCalendarView } from "@/app/(private)/(pages)/agenda/_components/calendar/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

const viewButtons = [
  { view: "day", icon: List, label: "Dia" },
  { view: "week", icon: Columns, label: "Semana" },
  { view: "month", icon: Grid2x2, label: "Mês" },
  { view: "year", icon: Grid3x3, label: "Ano" },
  { view: "agenda", icon: CalendarRange, label: "Agenda" },
] as const;

export function CalendarHeader({ view, events }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setView = (v: TCalendarView) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", v);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="inline-flex">
        {viewButtons.map((btn, i) => {
          const Icon = btn.icon;
          const isFirst = i === 0;
          const isLast = i === viewButtons.length - 1;
          return (
            <Tooltip key={btn.view}>
              <TooltipTrigger asChild>
                <Button
                  aria-label={btn.label}
                  size="icon-sm"
                  variant={view === btn.view ? "default" : "outline"}
                  className={`[&_svg]:size-5 ${isFirst ? "rounded-r-none" : isLast ? "-ml-px rounded-l-none" : "-ml-px rounded-none"}`}
                  onClick={() => setView(btn.view)}
                >
                  <Icon strokeWidth={1.8} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{btn.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
