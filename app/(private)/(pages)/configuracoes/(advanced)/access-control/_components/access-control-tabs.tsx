"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  extraToggles,
  modulesToggles,
  recordsTypeToggles,
  smsToggleGroups,
} from "./mock-data"
import { ToggleGrid } from "./toggle-grid"

export function AccessControlTabs() {
  const [enabled, setEnabled] = useState<Set<string>>(new Set())

  const onToggle = (id: string, valor: boolean) => {
    setEnabled((atual) => {
      const proximo = new Set(atual)
      if (valor) proximo.add(id)
      else proximo.delete(id)
      return proximo
    })
  }

  return (
    <Tabs defaultValue="modules">
      <TabsList variant="line">
        <TabsTrigger value="modules">Módulos</TabsTrigger>
        <TabsTrigger value="records-type">Tipos de prontuário</TabsTrigger>
        <TabsTrigger value="sms">SMS</TabsTrigger>
        <TabsTrigger value="extra">Extras</TabsTrigger>
      </TabsList>

      <TabsContent value="modules" className="mt-4">
        <ToggleGrid
          toggles={modulesToggles}
          enabled={enabled}
          onToggle={onToggle}
        />
      </TabsContent>

      <TabsContent value="records-type" className="mt-4">
        <ToggleGrid
          toggles={recordsTypeToggles}
          enabled={enabled}
          onToggle={onToggle}
        />
      </TabsContent>

      <TabsContent value="sms" className="mt-4 space-y-6">
        {smsToggleGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-3 text-sm font-semibold">{group.title}</p>
            <ToggleGrid
              toggles={group.toggles}
              enabled={enabled}
              onToggle={onToggle}
            />
          </div>
        ))}
      </TabsContent>

      <TabsContent value="extra" className="mt-4">
        <ToggleGrid
          toggles={extraToggles}
          enabled={enabled}
          onToggle={onToggle}
        />
      </TabsContent>
    </Tabs>
  )
}
