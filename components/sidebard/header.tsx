import { Sparkles } from 'lucide-react'

export const SidebarHeader = () => {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
        <Sparkles className="h-5 w-5" />
      </div>
      <div>
        <h1 className="text-base font-semibold text-white">ACO</h1>
        <p className="text-xs text-zinc-400">AI Code Optimizer</p>
      </div>
    </div>
  )
}