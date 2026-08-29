"use client"

import { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import {
  Bold,
  Eraser,
  Italic,
  List,
  ListOrdered,
  Underline as UnderlineIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  className?: string
}

function ToolbarButton({
  active,
  label,
  onClick,
  icon: Icon,
}: {
  active: boolean
  label: string
  onClick: () => void
  icon: typeof Bold
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={onClick}
      aria-label={label}
      className={cn(active && "bg-accent text-accent-foreground")}
    >
      <Icon />
    </Button>
  )
}

export function RichTextEditor({
  value,
  onChange,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  if (!editor) {
    return null
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-background",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2 border-b p-1.5">
        <ButtonGroup>
          <ToolbarButton
            active={editor.isActive("bold")}
            label="Negrito"
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={Bold}
          />
          <ToolbarButton
            active={editor.isActive("italic")}
            label="Itálico"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={Italic}
          />
          <ToolbarButton
            active={editor.isActive("underline")}
            label="Sublinhado"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon={UnderlineIcon}
          />
          <ToolbarButton
            active={false}
            label="Limpar formatação"
            onClick={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
            icon={Eraser}
          />
        </ButtonGroup>

        <ButtonGroupSeparator />

        <ButtonGroup>
          <ToolbarButton
            active={editor.isActive("bulletList")}
            label="Lista com marcadores"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={List}
          />
          <ToolbarButton
            active={editor.isActive("orderedList")}
            label="Lista numerada"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={ListOrdered}
          />
        </ButtonGroup>
      </div>

      <EditorContent
        editor={editor}
        className="[&_.tiptap]:min-h-40 [&_.tiptap]:px-3 [&_.tiptap]:py-2 [&_.tiptap]:text-sm [&_.tiptap]:outline-none"
      />
    </div>
  )
}
