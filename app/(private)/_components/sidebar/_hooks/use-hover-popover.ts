"use client"

import { useRef, useState } from "react"

export function useHoverPopover() {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function enter() {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
    setOpen(true)
  }

  function leave() {
    timer.current = setTimeout(() => setOpen(false), 150)
  }

  return { open, setOpen, enter, leave }
}
