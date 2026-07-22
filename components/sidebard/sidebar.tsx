'use client'

import { useMemo } from 'react'
import { useAnalyzerStore } from '@/store/useAnalyzerStore'
import { SidebarHeader } from './header'
import { HistoryCard } from './history-card'
import { NewSession } from './new-session'

export const Sidebar = () => {
  const history = useAnalyzerStore((state) => state.history)

  const historyList = useMemo(() => Array.from(history.values()), [history])

  return (
    <aside className="flex h-screen w-full flex-col gap-6 p-4">
      <SidebarHeader />

      <NewSession />

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        <span className="px-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
          History
        </span>

        <div className="flex flex-col gap-1.5">
          {historyList.map((item) => (
            <HistoryCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}