"use client"

import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface MultiSelectProps {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Selecione",
  className,
}: MultiSelectProps) {
  const todosSelecionados =
    options.length > 0 && options.every((option) => value.includes(option))
  const algumSelecionado = value.length > 0

  const toggleOption = (option: string) => {
    onChange(
      value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option]
    )
  }

  const toggleTodos = (checked: boolean) => {
    onChange(checked ? [...options] : [])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between font-normal",
            !algumSelecionado && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">
            {algumSelecionado ? value.join(", ") : placeholder}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-2">
        <div className="space-y-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
            <Checkbox
              checked={
                todosSelecionados
                  ? true
                  : algumSelecionado
                    ? "indeterminate"
                    : false
              }
              onCheckedChange={(c) => toggleTodos(Boolean(c))}
            />
            Selecionar todos
          </label>

          {options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium"
            >
              <Checkbox
                checked={value.includes(option)}
                onCheckedChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
