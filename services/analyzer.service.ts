import { AnalysisResponse, AnalyzeCodeBody, HistoryResponse } from "@/types"


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'



export const analyzeService = {

  addAnalyze: async (
    { code, action }: AnalyzeCodeBody,
    onChunk: (chunk: string) => void
  ): Promise<void> => {
    try {
      const aiResponse = await fetch(`${BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, action }),
      });

      if (!aiResponse.ok) {
        const errorData = await aiResponse.json().catch(() => null);
        throw new Error(
          errorData?.message || `Error en el servidor: ${aiResponse.status} ${aiResponse.statusText}`
        );
      }

      if (!aiResponse.body) {
        throw new Error('El servidor no retornó un ReadableStream');
      }

      const reader = aiResponse.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        onChunk(chunk)
      }

    } catch (error) {
      console.error('Error en addAnalyze:', error)
      throw error instanceof Error ? error : new Error('Error desconocido en addAnalyze');
    }
  },

  readAllAnalyzesHistory: async (): Promise<HistoryResponse> => {
    try {
      const analyzeHistory = await fetch(`${BASE_URL}/analyze/history`, {
        method: 'GET',
      })

      return await analyzeHistory.json()
    } catch (error) {
      console.error(error)
      throw new Error('Error get analyze history')
    }
  },

  readAnalyzeHistoryById: async (id: string): Promise<AnalysisResponse> => {
    try {
      const analyze = await fetch(`${BASE_URL}/analyze/history/${id}`, {
        method: 'GET'
      })

      return analyze.json()
    } catch (error) {
      console.error(error)
      throw new Error('Error get the analyze')
    }
  }


}