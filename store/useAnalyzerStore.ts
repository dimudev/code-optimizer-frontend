import { analyzeService } from '@/services/analyzer.service'
import { CodeAction, ICodeHistory } from '@/types'
import { create } from 'zustand'

export interface IAnalyzerState {
  code: string
  action: CodeAction
  currentResult: string | null

  history: Map<string, ICodeHistory>

  isAnalyzing: boolean
  isLoadingHistory: boolean
  error: string | null
}

export interface IAnalyzerActions {
  setCode: (code: string) => void
  setAction: (action: CodeAction) => void
  clearState: () => void

  runAnalysis: () => Promise<void>
  fetchHistory: () => Promise<void>
  fetchHistoryById: (id: string) => Promise<void>
}

const initialCodeState = {
  code: '// Write or paste code here',
  action: 'optimize' as CodeAction,
  currentResult: null,
}

export const useAnalyzerStore = create<IAnalyzerState & IAnalyzerActions>()((set, get) => ({
  ...initialCodeState,
  history: new Map(),
  isAnalyzing: false,
  isLoadingHistory: false,
  error: null,

  setCode: (code) => set({ code }),
  setAction: (action) => set({ action }),
  clearState: () => set({ ...initialCodeState }),

  runAnalysis: async () => {
    const { code, action, history } = get()

    if (!code.trim()) {
      set({ error: 'Please write something of code' })
      return
    }

    set({ isAnalyzing: true, error: null, currentResult: '' })

    try {
      await analyzeService.addAnalyze({ code, action }, (chunk) => {
        set((state) => ({
          currentResult: (state.currentResult ?? '') + chunk,
        }))
      })

      const { currentResult } = get()

      if (!currentResult || !currentResult.trim()) {
        return
      }

      const newHistoryItem: ICodeHistory = {
        id: crypto.randomUUID(), 
        originalCode: code,
        action,
        aiResponse: currentResult,
        createdAt: new Date().toISOString(),
        updatedAt: '',
      }

      const updatedHistory = new Map<string, ICodeHistory>()
    
      updatedHistory.set(newHistoryItem.id, newHistoryItem) 

      history.forEach((value, key) => {
        updatedHistory.set(key, value)
      })

      set({ history: updatedHistory })

    } catch (err: unknown) {
      console.error('Error analyzing code:', err)

      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to analyze code'

      set({ error: errorMessage })
    } finally {
      set({ isAnalyzing: false })
    }
  },

  fetchHistory: async () => {
    set({ isLoadingHistory: true, error: null })

    try {
      const { result } = await analyzeService.readAllAnalyzesHistory()

      const historyMap = new Map<string, ICodeHistory>()
      result.forEach((item) => {
        historyMap.set(item.id, item)
      })

      set({ history: historyMap })

    } catch (err: unknown) {
      console.error('Error fetching all the history:', err)

      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to load all the history details'
      set({ error: errorMessage })
    } finally {
      set({ isLoadingHistory: false })
    }
  },

  fetchHistoryById: async (id: string) => {
    if (!id) {
      set({ error: 'Please provide a valid ID' })
      return
    }

    set({ isAnalyzing: true, error: null })

    try {
      const { result } = await analyzeService.readAnalyzeHistoryById(id)

      if (result) {
        set({
          code: result.originalCode,
          action: result.action,
          currentResult: result.aiResponse,
        })
      }

    } catch (err: unknown) {
      console.error('Error fetching history by ID:', err)

      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to load the history details'
      set({ error: errorMessage })

    } finally {
      set({ isAnalyzing: false })
    }
  }
}))