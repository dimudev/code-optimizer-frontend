'use client'
import { useEffect } from 'react'
import { useAnalyzerStore } from '@/store/useAnalyzerStore'

interface AppProviderProps {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const fetchHistory = useAnalyzerStore((state) => state.fetchHistory)

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  return (
    <>
      {children}
    </>
  )
}