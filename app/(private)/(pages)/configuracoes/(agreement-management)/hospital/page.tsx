import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { HospitalsTab } from "./_components/hospitals-tab"

export default function HospitalManagementPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Hospitais</h1>

        <p className="max-w-2xl text-muted-foreground">
          Gerenciamento de hospitais da sua clínica.
        </p>
      </div>

      <Tabs defaultValue="hospitais">
        <TabsList variant="line">
          <TabsTrigger value="hospitais">Hospitais</TabsTrigger>
        </TabsList>

        <TabsContent value="hospitais" className="mt-4">
          <HospitalsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
