"use client"

import { RichTextEditor } from "@/components/rich-text-editor"

interface FormTextoProps {
  value: string
  onChange: (value: string) => void
}

export function FormTexto({
  value,
  onChange,
}: FormTextoProps) {
  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      className="min-h-[200px]"
    />
  )
}
