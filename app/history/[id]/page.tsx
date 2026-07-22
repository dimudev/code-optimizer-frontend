'use client'
import { CodeWorkspace } from '@/components/code/code-work-space'
import { useAnalyzerStore } from '@/store/useAnalyzerStore'
import { use, useEffect } from 'react'
 
export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const fetchHistoryById = useAnalyzerStore(state => state.fetchHistoryById)

  useEffect(() => {
    fetchHistoryById(id)
  }, [fetchHistoryById, id])
  
  
  return <CodeWorkspace readOnly={true} />;
}