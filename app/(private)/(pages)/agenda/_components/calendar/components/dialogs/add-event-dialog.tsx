"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AddEventDialog({
  children,
  startDate,
  startTime,
}: {
  children: React.ReactNode;
  startDate?: Date;
  startTime?: { hour: number; minute: number };
}) {
  const dataFormatada = startDate
    ? format(startDate, "d 'de' MMMM", { locale: ptBR })
    : undefined;
  const horaFormatada = startTime
    ? `${String(startTime.hour).padStart(2, "0")}:${String(startTime.minute).padStart(2, "0")}`
    : undefined;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo agendamento</DialogTitle>
          <DialogDescription>
            {dataFormatada
              ? `${dataFormatada}${horaFormatada ? ` às ${horaFormatada}` : ""}`
              : "Selecione o tipo de agendamento pelo botão \"Adicionar agenda\"."}
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          A criação de agendamentos por aqui ainda está em construção.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
