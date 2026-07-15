export type CodeAction = 'optimize' | 'bugs' | 'explain'

export interface AnalyzeCodeBody {
  code: string
  action: CodeAction
}

export interface ICodeHistory {
  id: string
  originalCode: string
  action: CodeAction
  aiResponse: string
  createdAt: string
  updatedAt: string
}

export interface AnalysisResponse {
  result: ICodeHistory;
}

export interface HistoryResponse {
  result: ICodeHistory[];
}