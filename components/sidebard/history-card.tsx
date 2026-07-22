import { formatDate } from '@/lib/utils';
import { ICodeHistory } from '@/types';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HistoryCardProps {
  item: ICodeHistory;
}

export const HistoryCard = ({ item }: HistoryCardProps) => {

  const pathName = usePathname()
  const id = pathName.split('/').pop();

  return (
    <Link
      href={`/history/${item.id}`}
      className={`group flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors ${
        item.id === id ? 'bg-zinc-800' : 'bg-zinc-900/60 hover:bg-zinc-800/60'
      }`}
    >
      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-zinc-200">
          {item.originalCode}
        </h3>
        <p className="mt-0.5 text-xs text-zinc-400">
          {item.action} · {formatDate(item.createdAt)}
        </p>
      </div>
    </Link>
  );
};