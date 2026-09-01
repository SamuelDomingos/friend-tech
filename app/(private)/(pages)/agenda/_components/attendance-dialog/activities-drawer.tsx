"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface Atividade {
  hora: string
  autor: string
  descricao: string
}

interface GrupoAtividades {
  data: string
  atividades: Atividade[]
}

// Dados fictícios — substituir pelo histórico real do agendamento quando existir.
const atividadesMock: GrupoAtividades[] = [
  {
    data: "Hoje",
    atividades: [
      {
        hora: "15:59",
        autor: "Itamara Letícia Silva Sales",
        descricao: "criou o agendamento",
      },
      {
        hora: "16:04",
        autor: "Itamara Letícia Silva Sales",
        descricao: "alterou o horário do agendamento",
      },
    ],
  },
]

interface ActivitiesDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActivitiesDrawer({ open, onOpenChange }: ActivitiesDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Atividades do agendamento</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
          {atividadesMock.map((grupo) => (
            <div key={grupo.data} className="flex flex-col gap-3">
              <p className="text-xs font-medium text-muted-foreground">
                {grupo.data}
              </p>

              <ul className="flex flex-col gap-3">
                {grupo.atividades.map((atividade, index) => (
                  <li
                    key={index}
                    className="flex items-start justify-between gap-3 rounded-md border p-3"
                  >
                    <div>
                      <p className="text-sm">{atividade.autor}</p>
                      <p className="text-xs text-muted-foreground">
                        {atividade.descricao}
                      </p>
                    </div>
                    <p className="shrink-0 text-xs text-muted-foreground">
                      {atividade.hora}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
