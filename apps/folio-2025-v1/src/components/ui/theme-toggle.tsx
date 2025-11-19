'use client'

import { useCallback } from 'react'

import { cn } from '@/lib/utils/cn'
import { useTheme } from '@/components/contexts/theme'

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { toggleTheme, isReady, isDark } = useTheme()

  const handleToggle = useCallback(() => {
    if (!isReady) return
    toggleTheme()
  }, [isReady, toggleTheme])

  const label = isDark ? 'Activate light theme' : 'Activate dark theme'

  return (
    <button
      type="button"
      disabled={!isReady}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      onClick={handleToggle}
      className={cn(
        'group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50',
        !isReady && 'pointer-events-none select-none opacity-0',
        className,
      )}
    >
      <span
        className={cn(
          'h-3 w-3 rounded-full transition-all duration-500 ease-in-out mix-blend-difference',
          'group-hover:scale-125',
          isDark
            ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:bg-yellow-300 group-hover:shadow-[0_0_15px_rgba(253,224,71,0.8)]'
            : 'bg-white group-hover:bg-neutral-300',
        )}
      />
      <span className="sr-only">{label}</span>
    </button>
  )
}
