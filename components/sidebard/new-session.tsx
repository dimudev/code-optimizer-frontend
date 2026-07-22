import { useAnalyzerStore } from '@/store/useAnalyzerStore';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const NewSession = () => {

  const clearState = useAnalyzerStore(state => state.clearState)

  return (
    <Link
      href={'/'}
      onClick={clearState}
      className="flex w-full items-center justify-start gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-medium text-zinc-950 transition-colors hover:bg-emerald-400 active:bg-emerald-600"
    >
      <Plus className="h-5 w-5" />
      <span>New session</span>
    </Link>
  )
}