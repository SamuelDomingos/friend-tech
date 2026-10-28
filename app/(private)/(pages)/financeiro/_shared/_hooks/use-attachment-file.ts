"use client"

import { useRef, useState } from "react"

export interface AttachmentFile {
  name: string
  size: number
}

function formatSize(size: number) {
  if (size < 1024) {
    return `${size} B`
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export function useAttachmentFile() {
  const [file, setFile] = useState<AttachmentFile | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function select(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]

    if (!selected) {
      return
    }

    setFile({ name: selected.name, size: selected.size })
  }

  function clear() {
    setFile(null)

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return {
    file,
    fileSize: file ? formatSize(file.size) : null,
    inputRef,
    select,
    clear,
  }
}
