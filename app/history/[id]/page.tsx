'use client'
import { CodeWorkspace } from '@/components/code/code-work-space'
import { use } from 'react'
 
export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  console.log('id', id)
  
  return <CodeWorkspace readOnly={true} />;
}