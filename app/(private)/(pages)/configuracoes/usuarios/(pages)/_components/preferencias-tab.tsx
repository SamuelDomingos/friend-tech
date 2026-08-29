"use client"

import { useMemo, useState } from "react"
import { Controller, type Control } from "react-hook-form"

import { Transfer } from "@/components/transfer"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { Switch } from "@/components/ui/switch"

import {
  PREFERENCIAS_AGENDAMENTO,
  PREFERENCIAS_PRONTUARIO,
  type ContaFormData,
} from "../_schemas/conta.schema"
import { usuariosMock } from "../../_components/dados-mock"

interface PreferenciasTabProps {
  control: Control<ContaFormData>
}

export function PreferenciasTab({ control }: PreferenciasTabProps) {
  const [usuariosCompartilhados, setUsuariosCompartilhados] = useState<
    string[]
  >([])

  const usuariosDisponiveis = useMemo(
    () =>
      usuariosMock
        .map((usuario) => usuario.nome)
        .filter((nome) => !usuariosCompartilhados.includes(nome)),
    [usuariosCompartilhados]
  )

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">Preferências</h2>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Prontuário</h3>

        <ItemGroup className="grid grid-cols-3 gap-4">
          {PREFERENCIAS_PRONTUARIO.filter(
            (preferencia) =>
              preferencia.key !== "compartilharProntuario" &&
              preferencia.key !== "ocultarNumeracao"
          ).map((preferencia) => (
            <Controller
              key={preferencia.key}
              name={preferencia.key}
              control={control}
              render={({ field }) => (
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>{preferencia.label}</ItemTitle>
                  </ItemContent>

                  <ItemActions>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label={preferencia.label}
                    />
                  </ItemActions>
                </Item>
              )}
            />
          ))}
        </ItemGroup>

        <ItemGroup className="mt-4 grid items-start gap-4 md:grid-cols-2">
          <Controller
            name="ocultarNumeracao"
            control={control}
            render={({ field }) => (
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>
                    Ocultar numeração no prontuário (receitas)
                  </ItemTitle>
                </ItemContent>

                <ItemActions>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label="Ocultar numeração no prontuário (receitas)"
                  />
                </ItemActions>
              </Item>
            )}
          />

          <Controller
            name="compartilharProntuario"
            control={control}
            render={({ field }) => (
              <Item
                variant="outline"
                className="w-full flex-col items-stretch gap-3"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <ItemContent>
                    <ItemTitle>Compartilhar prontuário</ItemTitle>
                  </ItemContent>

                  <ItemActions>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Compartilhar prontuário"
                    />
                  </ItemActions>
                </div>

                {field.value && (
                  <div className="w-full">
                    <Transfer
                      disponiveis={usuariosDisponiveis}
                      inclusos={usuariosCompartilhados}
                      onIncludedChange={setUsuariosCompartilhados}
                      disponiveisTitle="Usuários disponíveis"
                      inclusosTitle="Usuários selecionados"
                      disponiveisEmpty="Nenhum usuário disponível."
                      inclusosEmpty="Nenhum usuário selecionado."
                    />
                  </div>
                )}
              </Item>
            )}
          />
        </ItemGroup>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Agendamento</h3>

        <ItemGroup>
          {PREFERENCIAS_AGENDAMENTO.map((preferencia) => (
            <Controller
              key={preferencia.key}
              name={preferencia.key}
              control={control}
              render={({ field }) => (
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>{preferencia.label}</ItemTitle>
                  </ItemContent>

                  <ItemActions>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label={preferencia.label}
                    />
                  </ItemActions>
                </Item>
              )}
            />
          ))}
        </ItemGroup>
      </div>
    </section>
  )
}
