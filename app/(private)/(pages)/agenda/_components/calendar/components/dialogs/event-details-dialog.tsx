"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Clock, Text, User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { IEvent } from "@/app/(private)/(pages)/agenda/_components/calendar/interfaces";
import type { ReactNode } from "react";

export function EventDetailsDialog({
  event,
  children,
}: {
  event: IEvent;
  children: ReactNode;
}) {
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
            <User className="mt-1 size-4 shrink-0 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Profissional
              </p>
              <p className="text-sm font-semibold">{event.user.name}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Data</span>
              </div>
              <span className="text-sm font-medium">
                {format(startDate, "PPP", { locale: ptBR })}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Horário
                </span>
              </div>
              <span className="text-sm font-medium">
                {format(startDate, "HH:mm", { locale: ptBR })} -{" "}
                {format(endDate, "HH:mm", { locale: ptBR })}
              </span>
            </div>
          </div>

          {event.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Text className="size-4 text-muted-foreground" />
                <p className="text-sm font-medium">Observações</p>
              </div>
              <p className="rounded-md bg-muted/20 p-2 text-sm leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
