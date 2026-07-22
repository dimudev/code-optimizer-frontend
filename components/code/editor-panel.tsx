'use client'

import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CodeXml, Eraser } from "lucide-react"
import { CodeEditor } from "./code-editor"

interface EditorPanelProps {
  code: string
  onChange: (value: string) => void
  onClear: () => void
  readOnly?: boolean
}

export function EditorPanel({ code, onChange, onClear, readOnly = false }: EditorPanelProps) {
  return (
    <Card className="w-1/2 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CodeXml size={18} /> Code
        </CardTitle>
        <CardAction>
          {!readOnly && (
            <Button
              className="cursor-pointer"
              size="xs"
              variant="ghost"
              onClick={onClear}
            >
              <Eraser className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1  overflow-hidden">
        <CodeEditor value={code} onChange={onChange} readOnly={readOnly} />
      </CardContent>
    </Card>
  )
}