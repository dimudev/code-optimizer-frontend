'use client'

import { useAnalyzerStore } from "@/store/useAnalyzerStore"
import { EditorPanel } from "./editor-panel"
import { ResultPanel } from "./result-panel"

interface CodeWorkspaceProps {
  readOnly?: boolean
}

export function CodeWorkspace({ readOnly = false }: CodeWorkspaceProps) {
  const { code, setCode, currentResult, action } = useAnalyzerStore()

  const badgeVariantMap = {
    optimize: 'default',
    refactor: 'secondary',
    explain: 'outline',
  } as const

  return (
    <div className="flex gap-4 h-full w-full p-4 overflow-hidden">
      <EditorPanel
        code={code}
        onChange={setCode}
        onClear={() => setCode('')}
        readOnly={readOnly}
      />
      <ResultPanel
        result={currentResult}
        action={action}
        badgeVariantMap={badgeVariantMap}
      />
    </div>
  )
}