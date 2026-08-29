"use client"

import { useState } from "react"
import { Controller, type Control } from "react-hook-form"

import { Transfer } from "@/components/transfer"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  PERMISSOES_MODULOS,
  TIPOS_PERFIL,
  type ContaFormData,
} from "../_schemas/conta.schema"
import { CONTAS_BANCARIAS, UNIDADES } from "./dados-mock"

interface PermissoesTabProps {
  control: Control<ContaFormData>
}

export function PermissoesTab({ control }: PermissoesTabProps) {
  const [contasInclusas, setContasInclusas] = useState<string[]>([])
  const [unidadesInclusas, setUnidadesInclusas] = useState<string[]>([])

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">Permissões de acesso</h2>

      <div className="flex flex-wrap items-end gap-4">
        <Controller
          name="tipoPerfil"
          control={control}
          render={({ field }) => (
            <Field className="w-full sm:w-72">
              <FieldLabel htmlFor={field.name}>
                Tipo de perfil <span className="text-destructive">*</span>
              </FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {TIPOS_PERFIL.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          name="usuarioAdministrativo"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label="Usuário para controle administrativo"
              />

              <span className="text-sm font-medium">
                Usuário para controle administrativo
              </span>
            </div>
          )}
        />
      </div>

      <ItemGroup className="grid grid-cols-2">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Administrador do sistema</ItemTitle>
          </ItemContent>

          <ItemActions>
            <Controller
              name="administradorSistema"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label="Administrador do sistema"
                />
              )}
            />
          </ItemActions>
        </Item>

        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Acesso liberado ao sistema</ItemTitle>
          </ItemContent>

          <ItemActions>
            <Controller
              name="acessoLiberado"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label="Acesso liberado ao sistema"
                />
              )}
            />
          </ItemActions>
        </Item>
      </ItemGroup>

      <Tabs defaultValue="agenda">
        <TabsList variant="line" className="flex-wrap">
          {PERMISSOES_MODULOS.map((modulo) => (
            <TabsTrigger key={modulo.modulo} value={modulo.modulo}>
              {modulo.titulo}
            </TabsTrigger>
          ))}
        </TabsList>

        {PERMISSOES_MODULOS.map((modulo) => (
          <TabsContent
            key={modulo.modulo}
            value={modulo.modulo}
            className="mt-4"
          >
            <h4 className="text-base font-semibold">Módulo {modulo.titulo}</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              {modulo.descricao}
            </p>

            <ItemGroup className="mt-4 grid grid-cols-3 gap-4">
              {modulo.permissoes
                .filter(
                  (permissao) =>
                    !(
                      modulo.modulo === "financeiro" &&
                      (permissao.key === "contasBancarias" ||
                        permissao.key === "unidades")
                    )
                )
                .map((permissao) => (
                  <Controller
                    key={permissao.key}
                    name={
                      `permissoes.${modulo.modulo}.${permissao.key}` as const
                    }
                    control={control}
                    render={({ field }) => (
                      <Item variant="outline">
                        <ItemContent>
                          <ItemTitle>{permissao.label}</ItemTitle>
                        </ItemContent>

                        <ItemActions>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-label={permissao.label}
                          />
                        </ItemActions>
                      </Item>
                    )}
                  />
                ))}
            </ItemGroup>

            {modulo.modulo === "financeiro" && (
              <ItemGroup className="mt-4 grid gap-4 md:grid-cols-2">
                {modulo.permissoes
                  .filter(
                    (permissao) =>
                      permissao.key === "contasBancarias" ||
                      permissao.key === "unidades"
                  )
                  .map((permissao) => {
                    const ehConta = permissao.key === "contasBancarias"

                    return (
                      <Controller
                        key={permissao.key}
                        name={`permissoes.financeiro.${permissao.key}` as const}
                        control={control}
                        render={({ field }) => (
                          <Item
                            variant="outline"
                            className="w-full flex-col items-stretch gap-3"
                          >
                            <div className="flex w-full items-center justify-between gap-2">
                              <ItemContent>
                                <ItemTitle>{permissao.label}</ItemTitle>
                              </ItemContent>

                              <ItemActions>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  aria-label={permissao.label}
                                />
                              </ItemActions>
                            </div>

                            {field.value && (
                              <div className="w-full">
                                <Transfer
                                  disponiveis={
                                    ehConta ? CONTAS_BANCARIAS : UNIDADES
                                  }
                                  inclusos={
                                    ehConta ? contasInclusas : unidadesInclusas
                                  }
                                  onIncludedChange={
                                    ehConta
                                      ? setContasInclusas
                                      : setUnidadesInclusas
                                  }
                                  disponiveisTitle={
                                    ehConta
                                      ? "Contas bancárias disponíveis"
                                      : "Unidades disponíveis"
                                  }
                                  inclusosTitle={
                                    ehConta
                                      ? "Contas bancárias permitidas"
                                      : "Unidades permitidas"
                                  }
                                  disponiveisEmpty={
                                    ehConta
                                      ? "Nenhuma conta disponível."
                                      : "Nenhuma unidade disponível."
                                  }
                                  inclusosEmpty={
                                    ehConta
                                      ? "Nenhuma conta selecionada."
                                      : "Nenhuma unidade selecionada."
                                  }
                                />
                              </div>
                            )}
                          </Item>
                        )}
                      />
                    )
                  })}
              </ItemGroup>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
