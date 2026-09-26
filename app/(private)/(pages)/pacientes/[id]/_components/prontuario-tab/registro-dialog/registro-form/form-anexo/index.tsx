"use client"

import { useEffect, useRef } from "react"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { CampoArquivos, type ArquivoAnexo } from "./arquivos-anexo"

export type { ArquivoAnexo } from "./arquivos-anexo"

export interface EstadoAnexo {
  descricao: string
  arquivos: ArquivoAnexo[]
}

export function estadoAnexoInicial(): EstadoAnexo {
  return { descricao: "", arquivos: [] }
}

interface FormAnexoProps {
  estado: EstadoAnexo
  onChange: (estado: EstadoAnexo) => void
}

export function FormAnexo({ estado, onChange }: FormAnexoProps) {
  const urlsRef = useRef<string[]>([])

  useEffect(() => {
    const urls = urlsRef.current
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  function adicionar(files: FileList | null) {
    if (!files || files.length === 0) {
      return
    }

    const novos: ArquivoAnexo[] = Array.from(files).map((file) => {
      const imagem = file.type.startsWith("image/")
      const previewUrl = imagem ? URL.createObjectURL(file) : undefined
      if (previewUrl) {
        urlsRef.current.push(previewUrl)
      }
      return { nome: file.name, tamanho: file.size, imagem, previewUrl }
    })

    onChange({ ...estado, arquivos: [...estado.arquivos, ...novos] })
  }

  function remover(index: number) {
    const alvo = estado.arquivos[index]
    if (alvo?.previewUrl) {
      URL.revokeObjectURL(alvo.previewUrl)
      urlsRef.current = urlsRef.current.filter((url) => url !== alvo.previewUrl)
    }
    onChange({
      ...estado,
      arquivos: estado.arquivos.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel>Descrição</FieldLabel>
        <Input
          placeholder="Descrição dos arquivos"
          value={estado.descricao}
          onChange={(event) =>
            onChange({ ...estado, descricao: event.target.value })
          }
        />
      </Field>

      <CampoArquivos
        arquivos={estado.arquivos}
        onAdicionar={adicionar}
        onRemover={remover}
      />
    </div>
  )
}
