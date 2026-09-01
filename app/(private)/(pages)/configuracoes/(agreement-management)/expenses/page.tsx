"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ExpensesTab } from "./_components/expenses-tab"
import { RatingsTab } from "./_components/ratings-tab"
import { expenseRatingsMock, type ExpenseRating } from "./_components/mock-data"

export default function ExpensesManagementPage() {
  const [ratings, setRatings] = useState<ExpenseRating[]>(expenseRatingsMock)

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Gerenciamento de Despesas</h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode gerenciar outras despesas da sua clínica.
        </p>
      </div>

      <Tabs defaultValue="despesas">
        <TabsList variant="line">
          <TabsTrigger value="despesas">Outras despesas</TabsTrigger>
          <TabsTrigger value="classificacoes">
            Classificações (BrasÍndice)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="despesas" className="mt-4">
          <ExpensesTab ratings={ratings} />
        </TabsContent>

        <TabsContent value="classificacoes" className="mt-4">
          <RatingsTab ratings={ratings} onRatingsChange={setRatings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
