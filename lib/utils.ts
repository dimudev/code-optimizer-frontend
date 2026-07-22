import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FormatDateOptions {
  includeTime?: boolean
  locale?: string
}

export function formatDate(
  isoDate: string | Date,
  options: FormatDateOptions = {}
): string {
  if (!isoDate) return ''

  const { includeTime = true, locale = 'en-US' } = options
  const date = typeof isoDate === 'string' ? new Date(isoDate) : isoDate

  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(includeTime && {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
  })

  return formatter.format(date)
}