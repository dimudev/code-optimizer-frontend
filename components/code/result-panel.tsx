'use client'

import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Terminal, Copy } from "lucide-react"
import { CodeAction } from "@/types"

interface ResultPanelProps {
  result: string | null
  action: CodeAction
  badgeVariantMap: Record<string, "default" | "secondary" | "destructive" | "outline">
}

export function ResultPanel({ result, action, badgeVariantMap }: ResultPanelProps) {
  const handleCopy = () => {
    if (result) navigator.clipboard.writeText(result)
  };

  return (
    <Card className="w-1/2 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal size={18} /> Result{" "}
          <Badge variant={badgeVariantMap[action]}>{action}</Badge>
        </CardTitle>
        <CardAction>
          <Button
            className="cursor-pointer"
            size="xs"
            variant="ghost"
            onClick={handleCopy}
            disabled={!result}
          >
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 overflow-auto">
        {result ? (
          <div></div>
        ) : (
          <p className="text-neutral-500 text-sm">Waiting for analysis...</p>
        )}
      </CardContent>
    </Card>
  )
}