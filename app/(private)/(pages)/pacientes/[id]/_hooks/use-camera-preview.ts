"use client"

import { useEffect, useState } from "react"

export type CameraStatus = "loading" | "ready" | "unavailable"

export interface CameraDevice {
  id: string
  label: string
}

const VIDEO_ID = "teleconsulta-video"

export function useCameraPreview(open: boolean) {
  const [status, setStatus] = useState<CameraStatus>("loading")
  const [dispositivos, setDispositivos] = useState<CameraDevice[]>([])
  const [cameraId, setCameraId] = useState("")

  useEffect(() => {
    if (!open) {
      return
    }

    const elemento = document.getElementById(VIDEO_ID) as HTMLVideoElement | null

    if (!elemento) {
      return
    }

    let stream: MediaStream | null = null
    let cancelado = false

    async function iniciar() {
      try {
        const midia = await navigator.mediaDevices.getUserMedia({
          video: cameraId ? { deviceId: { exact: cameraId } } : true,
        })

        if (cancelado) {
          midia.getTracks().forEach((track) => track.stop())
          return
        }

        stream = midia
        elemento!.srcObject = midia

        try {
          await elemento!.play()
        } catch {
          // autoplay bloqueado: mantém o último frame até o play manual
        }

        setStatus("ready")

        const dispositivos = await navigator.mediaDevices.enumerateDevices()
        setDispositivos(
          dispositivos
            .filter((item) => item.kind === "videoinput")
            .map((item, indice) => ({
              id: item.deviceId,
              label: item.label || `Câmera ${indice + 1}`,
            }))
        )
      } catch {
        if (!cancelado) {
          setStatus("unavailable")
        }
      }
    }

    iniciar()

    return () => {
      cancelado = true
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [open, cameraId])

  return { videoId: VIDEO_ID, status, dispositivos, cameraId, setCameraId }
}
