"use client"

import { Controller } from "react-hook-form"
import { CameraOff, ChevronDown, Video, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

import { useCameraPreview } from "../_hooks/use-camera-preview"
import {
  CANAIS_FLOW,
  useTeleconsultaForm,
} from "../_hooks/use-teleconsulta-form"
import type { PacienteDetalhe } from "./dados-mock"

interface TeleconsultaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paciente: PacienteDetalhe
}

export function TeleconsultaDialog({
  open,
  onOpenChange,
  paciente,
}: TeleconsultaDialogProps) {
  const camera = useCameraPreview(open)

  const {
    form,
    enviarPor,
    telefoneOrigem,
    emailOrigem,
    selecionarTelefoneOrigem,
    selecionarEmailOrigem,
    selecionarEnviarPor,
    onSubmit,
    descartar,
  } = useTeleconsultaForm({
    paciente,
    onConcluir: () => onOpenChange(false),
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(novo) => {
        if (!novo) descartar()
        onOpenChange(novo)
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[92vh] gap-0 overflow-hidden p-0 sm:max-w-[1060px]"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <DialogTitle className="text-base font-semibold">
            Vídeo Chamada
          </DialogTitle>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Fechar"
            onClick={descartar}
          >
            <X className="size-4" />
          </Button>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex max-h-[calc(92vh-8.5rem)] flex-col overflow-y-auto"
          noValidate
        >
          <div className="flex flex-col items-start gap-4 p-4 lg:flex-row">
            <div className="w-full shrink-0 lg:w-[556px]">
              <div className="relative h-[405px] w-full overflow-hidden rounded-lg bg-muted">
                <video
                  id={camera.videoId}
                  autoPlay
                  playsInline
                  muted
                  className={cn(
                    "h-full w-full object-cover",
                    camera.status !== "ready" && "hidden"
                  )}
                />

                {camera.status === "loading" && (
                  <Skeleton className="h-full w-full" />
                )}

                {camera.status === "unavailable" && (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <CameraOff className="size-8 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      Nenhuma webcam detectada
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="sm">
                      <Video className="size-4" />
                      Câmera
                      <ChevronDown className="size-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {camera.dispositivos.length === 0 ? (
                      <DropdownMenuItem disabled>
                        Nenhum dispositivo
                      </DropdownMenuItem>
                    ) : (
                      camera.dispositivos.map((dispositivo) => (
                        <DropdownMenuItem
                          key={dispositivo.id}
                          onClick={() => camera.setCameraId(dispositivo.id)}
                        >
                          {dispositivo.label}
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className="space-y-1">
                <p className="text-lg">Tudo pronto para começar</p>
                <p className="text-sm text-muted-foreground">
                  Selecione os contatos do paciente para envio do link de acesso
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">
                  Selecione ou digite um telefone para envio do link
                </p>

                <Controller
                  name="telefoneOrigem"
                  control={form.control}
                  render={() => (
                    <RadioGroup
                      value={telefoneOrigem}
                      onValueChange={selecionarTelefoneOrigem}
                      className="gap-2"
                    >
                      <label className="flex items-center gap-2 text-sm">
                        <RadioGroupItem value="cadastrado" />
                        Escolha um número de telefone
                      </label>

                      <Controller
                        name="telefoneCadastrado"
                        control={form.control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={telefoneOrigem !== "cadastrado"}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={paciente.telefone}>
                                {paciente.telefone}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      <label className="mt-2 flex items-center gap-2 text-sm">
                        <RadioGroupItem value="novo" />
                        Digite um número novo
                      </label>
                    </RadioGroup>
                  )}
                />

                <div className="flex gap-2">
                  <span className="flex h-9 items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm">
                    +55
                  </span>
                  <Input
                    className="rounded-l-none"
                    placeholder="(99) 99999-9999"
                    disabled={telefoneOrigem !== "novo"}
                    {...form.register("telefoneNovo")}
                  />
                </div>

                <FieldError errors={[form.formState.errors.telefoneNovo]} />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">Enviar por</p>

                <RadioGroup
                  value={enviarPor}
                  onValueChange={selecionarEnviarPor}
                  className="flex gap-4"
                >
                  <label className="flex items-center gap-2 text-sm">
                    <RadioGroupItem value="FLOW" />
                    Amigo Flow
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <RadioGroupItem value="SMS" />
                    SMS
                  </label>
                </RadioGroup>

                {enviarPor === "FLOW" && (
                  <Controller
                    name="canal"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o canal" />
                        </SelectTrigger>
                        <SelectContent>
                          {CANAIS_FLOW.map((canal) => (
                            <SelectItem key={canal.value} value={canal.value}>
                              {canal.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}

                <FieldError errors={[form.formState.errors.canal]} />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">
                  Selecione ou digite um e-mail para envio do link
                </p>

                <RadioGroup
                  value={emailOrigem}
                  onValueChange={selecionarEmailOrigem}
                  className="gap-2"
                >
                  <label className="flex items-center gap-2 text-sm">
                    <RadioGroupItem value="cadastrado" />
                    Utilizar e-mail cadastrado
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <RadioGroupItem value="novo" />
                    Digite um e-mail novo
                  </label>
                </RadioGroup>

                <Input
                  type="email"
                  placeholder="paciente@email.com"
                  disabled={emailOrigem !== "novo"}
                  {...form.register("emailNovo")}
                />

                <FieldError errors={[form.formState.errors.emailNovo]} />
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-end gap-2 border-t px-4 py-3">
            <Button type="button" variant="secondary" onClick={descartar}>
              Fechar
            </Button>
            <Button type="submit">Iniciar chamada</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
