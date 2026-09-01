import { AgendaTabs } from "./_components/agenda-tabs"
import { CalendarProvider } from "./_components/calendar/contexts/calendar-context"
import { TCalendarView } from "./_components/calendar/types"
import {
  eventsMock,
  professionalsMock,
  unidadesFilterMock,
} from "./_components/mock-data"

interface AgendaPageProps {
  searchParams: Promise<{ view?: string }>
}

export default async function AgendaPage({ searchParams }: AgendaPageProps) {
  const params = await searchParams
  const view = (params.view as TCalendarView) ?? "week"

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Agenda</h1>

        <p className="max-w-2xl text-muted-foreground">
          Visualize e gerencie os agendamentos da sua clínica.
        </p>
      </div>

      <CalendarProvider
        users={professionalsMock}
        unidades={unidadesFilterMock}
        events={eventsMock}
        configData={null}
      >
        <AgendaTabs view={view} />
      </CalendarProvider>
    </div>
  )
}
