import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardsProps {
  totalContratados: number
  totalInativos: number
  totalUsuarios: number
}

export function StatCards({
  totalContratados,
  totalInativos,
  totalUsuarios,
}: StatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Contratados</CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-2xl font-semibold">
            {totalContratados}
            <span className="text-muted-foreground"> / {totalUsuarios}</span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inativos</CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-2xl font-semibold">{totalInativos}</p>
        </CardContent>
      </Card>
    </div>
  )
}
