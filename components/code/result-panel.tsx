'use client'

import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Terminal, Copy } from "lucide-react"
import { CodeAction } from "@/types"
import { Streamdown } from "streamdown"

interface ResultPanelProps {
  result: string | null
  action: CodeAction
  badgeVariantMap: Record<string, "default" | "destructive" | "outline">
  isAnalyzing: boolean
}

export function ResultPanel({ result, action, badgeVariantMap, isAnalyzing }: ResultPanelProps) {
  const handleCopy = () => {
    if (result) navigator.clipboard.writeText(result)
  };

  return (
    <Card className="w-1/2 flex flex-col h-full min-h-0 min-w-0 overflow-hidden">
      <CardHeader className="shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Terminal size={18} /> Result{" "}
          { result && <Badge variant={badgeVariantMap[action]}>{action}</Badge>}
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

      <Separator className="shrink-0" />

      <CardContent className="flex-1 overflow-y-auto min-h-0 min-w-0 p-4">
        {result ? (
          <div className="max-w-full overflow-x-hidden wrap-break-word">
            <Streamdown isAnimating={isAnalyzing}>
              {result}
            </Streamdown>
          </div>
        ) : (
          <p className="text-neutral-500 text-sm">Waiting for analysis...</p>
        )}
      </CardContent>
    </Card>
  )
}