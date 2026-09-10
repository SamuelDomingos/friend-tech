"use client"

import { useState } from "react"
import { ClipboardList } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { Etiqueta, PacienteDetalhe, Registro } from "../dados-mock"
import { rotuloRegistro } from "../dados-mock"
import { RegistroIcone } from "./registro-icones"
import { EtiquetasPanel } from "./etiquetas-panel"

interface RegistroSidebarProps {
  paciente: PacienteDetalhe
  etiquetas: Etiqueta[]
  onAdicionarEtiqueta: (nome: string) => void
  onRemoverEtiqueta: (id: string) => void
  registros: Registro[]
  onCancelar: () => void
  onSalvar: () => void
}

export function RegistroSidebar({
  paciente,
  etiquetas,
  onAdicionarEtiqueta,
  onRemoverEtiqueta,
  registros,
  onCancelar,
  onSalvar,
}: RegistroSidebarProps) {
  const [abaAtiva, setAbaAtiva] = useState("evolucao")

  const ultimosRegistros = [...registros]
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm))
    .slice(0, 5)

  return (
    <div className="flex h-full flex-col border-l bg-card">
      <ScrollArea className="flex-1 p-4">
        <EtiquetasPanel
          paciente={paciente}
          etiquetas={etiquetas}
          onAdicionar={onAdicionarEtiqueta}
          onRemover={onRemoverEtiqueta}
        />

        <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="evolucao" className="flex-1">
              Evolução atual
            </TabsTrigger>
            <TabsTrigger value="registros" className="flex-1">
              Últimos registros
            </TabsTrigger>
          </TabsList>

          <TabsContent value="evolucao" className="mt-3">
            <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center">
              <p className="text-sm text-muted-foreground">
                A evolução será preenchida ao salvar.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="registros" className="mt-3">
            {ultimosRegistros.length === 0 ? (
              <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center">
                <ClipboardList className="size-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Nenhum registro recente.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {ultimosRegistros.map((registro) => (
                  <div
                    key={registro.id}
                    className="flex items-start gap-2 rounded-md border p-2"
                  >
                    <RegistroIcone tipo={registro.tipo} className="mt-0.5 size-4 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {rotuloRegistro(registro.tipo)}
                      </p>
                      {registro.texto && (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {registro.texto}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </ScrollArea>

      <div className="flex items-center gap-2 border-t p-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancelar}
        >
          Cancelar
        </Button>
        <Button type="button" className="flex-1" onClick={onSalvar}>
          Salvar evolução
        </Button>
      </div>
    </div>
  )
}
