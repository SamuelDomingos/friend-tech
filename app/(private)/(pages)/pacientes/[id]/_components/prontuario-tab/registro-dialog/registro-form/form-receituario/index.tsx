"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { medicamentosMock } from "../../../../dados-mock"
import { BuscaMedicamento } from "./busca-medicamento"
import { ListaSelecionados } from "./lista-selecionados"
import { OpcoesImpressao } from "./opcoes-impressao"

export type AbaReceituario = "CUSTOM" | "FORMULA" | "TEXT"

export interface EstadoReceituario {
  aba: AbaReceituario
  busca: string
  textoLivre: string
  controleEspecial: boolean
  itens: string[]
  ocultar: {
    data: boolean
    assinatura: boolean
    endereco: boolean
    numeracao: boolean
    laboratorio: boolean
    cpf: boolean
  }
}

export function estadoReceituarioInicial(): EstadoReceituario {
  return {
    aba: "CUSTOM",
    busca: "",
    textoLivre: "",
    controleEspecial: false,
    itens: [],
    ocultar: {
      data: false,
      assinatura: false,
      endereco: false,
      numeracao: false,
      laboratorio: false,
      cpf: false,
    },
  }
}

interface FormReceituarioProps {
  estado: EstadoReceituario
  onChange: (estado: EstadoReceituario) => void
}

export function FormReceituario({ estado, onChange }: FormReceituarioProps) {
  const [atalhosAbertos, setAtalhosAbertos] = useState(false)

  const atualizar = (patch: Partial<EstadoReceituario>) =>
    onChange({ ...estado, ...patch })

  const resultados = estado.busca.trim()
    ? medicamentosMock.filter((nome) =>
        nome.toLowerCase().includes(estado.busca.trim().toLowerCase())
      )
    : []

  function adicionar(nome: string) {
    const limpo = nome.trim()
    if (!limpo) {
      return
    }
    if (estado.itens.includes(limpo)) {
      toast("Medicamento já adicionado.")
      return
    }
    atualizar({ itens: [...estado.itens, limpo], busca: "" })
  }

  function adicionarTextoLivre() {
    const limpo = estado.textoLivre.trim()
    if (!limpo) {
      return
    }
    atualizar({ itens: [...estado.itens, limpo], textoLivre: "" })
  }

  function remover(index: number) {
    atualizar({ itens: estado.itens.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <Tabs
        value={estado.aba}
        onValueChange={(valor) => atualizar({ aba: valor as AbaReceituario })}
      >
        <TabsList variant="line">
          <TabsTrigger value="CUSTOM">Medicamento</TabsTrigger>
          <TabsTrigger value="FORMULA">Manipulado</TabsTrigger>
          <TabsTrigger value="TEXT">Texto livre</TabsTrigger>
        </TabsList>

        <TabsContent value="CUSTOM" className="mt-4">
          <BuscaMedicamento
            placeholder="Nome do medicamento / composição"
            busca={estado.busca}
            onBusca={(busca) => atualizar({ busca })}
            resultados={resultados}
            onSelecionar={adicionar}
            atalhosAbertos={atalhosAbertos}
            onAlternarAtalhos={() => setAtalhosAbertos((atual) => !atual)}
          />
        </TabsContent>

        <TabsContent value="FORMULA" className="mt-4">
          <BuscaMedicamento
            placeholder="Nome da fórmula / patologia"
            busca={estado.busca}
            onBusca={(busca) => atualizar({ busca })}
            resultados={resultados}
            onSelecionar={adicionar}
            atalhosAbertos={atalhosAbertos}
            onAlternarAtalhos={() => setAtalhosAbertos((atual) => !atual)}
          />
        </TabsContent>

        <TabsContent value="TEXT" className="mt-4">
          <Field>
            <FieldLabel className="sr-only">Texto livre</FieldLabel>
            <Textarea
              rows={3}
              placeholder="Digite aqui"
              value={estado.textoLivre}
              onChange={(event) =>
                atualizar({ textoLivre: event.target.value })
              }
            />
          </Field>

          <div className="mt-3 flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={estado.controleEspecial}
                onCheckedChange={(checked) =>
                  atualizar({ controleEspecial: checked === true })
                }
              />
              Receituário de controle especial
            </label>

            <Button type="button" size="sm" onClick={adicionarTextoLivre}>
              <Plus className="size-4" />
              Adicionar
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <ListaSelecionados itens={estado.itens} onRemover={remover} />

      {estado.itens.length > 0 && (
        <OpcoesImpressao
          ocultar={estado.ocultar}
          onChange={(ocultar) => atualizar({ ocultar })}
        />
      )}
    </div>
  )
}
