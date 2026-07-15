import { AnalysisResponse, AnalyzeCodeBody, HistoryResponse } from "@/types"


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'



export const analyzeService = {

  addAnalyze: async ({ code, action }: AnalyzeCodeBody): Promise<AnalysisResponse> => {

    try {

      const aiResponse = await fetch(`${BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ code, action })
      })

      return await aiResponse.json()

    } catch (error) {
      console.error(error)
      throw new Error('Error add analyze')
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