"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { GroupsTab } from "./_components/groups-tab"
import { ProceduresTab } from "./_components/procedures-tab"
import { SubgroupsTab } from "./_components/subgroups-tab"
import {
  procedureGroupsMock,
  procedureSubgroupsMock,
  proceduresMock,
  type Procedure,
  type ProcedureGroup,
  type ProcedureSubgroup,
} from "./_components/mock-data"

export default function ProceduresManagementPage() {
  const [procedures, setProcedures] = useState<Procedure[]>(proceduresMock)
  const [groups, setGroups] = useState<ProcedureGroup[]>(procedureGroupsMock)
  const [subgroups, setSubgroups] = useState<ProcedureSubgroup[]>(
    procedureSubgroupsMock
  )

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">
          Gerenciamento de Procedimentos
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Nesta seção você pode gerenciar os procedimentos da sua clínica.
        </p>
      </div>

      <Tabs defaultValue="procedimentos">
        <TabsList variant="line">
          <TabsTrigger value="procedimentos">Procedimentos</TabsTrigger>
          <TabsTrigger value="grupos">Grupos</TabsTrigger>
          <TabsTrigger value="subgrupos">Subgrupos</TabsTrigger>
        </TabsList>

        <TabsContent value="procedimentos" className="mt-4">
          <ProceduresTab
            procedures={procedures}
            onProceduresChange={setProcedures}
          />
        </TabsContent>

        <TabsContent value="grupos" className="mt-4">
          <GroupsTab
            groups={groups}
            onGroupsChange={setGroups}
            procedures={procedures}
          />
        </TabsContent>

        <TabsContent value="subgrupos" className="mt-4">
          <SubgroupsTab
            subgroups={subgroups}
            onSubgroupsChange={setSubgroups}
            groups={groups}
            procedures={procedures}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
