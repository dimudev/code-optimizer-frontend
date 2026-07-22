'use client'

import { useAnalyzerStore } from "@/store/useAnalyzerStore"
import { EditorPanel } from "./editor-panel"
import { ResultPanel } from "./result-panel"
import { useShallow } from "zustand/shallow"

interface CodeWorkspaceProps {
  readOnly?: boolean
}

export function CodeWorkspace({ readOnly = false }: CodeWorkspaceProps) {
  const { code, action, currentResult, isAnalyzing, setCode,  } = useAnalyzerStore(
    useShallow(state => ({
      code: state.code,
      action: state.action,
      currentResult: state.currentResult,
      isAnalyzing: state.isAnalyzing,
      setCode: state.setCode
    }))
  )

  const badgeVariantMap = {
    optimize: 'default',
    bugs: 'destructive',
    explain: 'outline',
  } as const

  return (
    <div className="flex gap-4 h-full w-full p-4 overflow-hidden min-h-0">
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
        isAnalyzing={isAnalyzing}
      />
    </div>
  )
}