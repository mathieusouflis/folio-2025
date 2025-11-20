'use client'

import { useCallback } from 'react'
import { useGridOverlay } from '@/components/contexts/grid-overlay'
import { cn } from '@/lib/utils/cn'

type GridOverlayToggleProps = {
  className?: string
  label?: string
}

export function GridOverlayToggle({
  className,
  label = 'Toggle grid overlay (Ctrl/⌘ + Shift + G)',
}: GridOverlayToggleProps) {
  const { isOverlayVisible, toggleOverlay } = useGridOverlay()

  const handleClick = useCallback(() => {
    toggleOverlay()
  }, [toggleOverlay])

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isOverlayVisible}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em]',
        'bg-background/70 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-muted/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 mix-blend-normal',
        className,
      )}
    >
      <span className="text-[10px] font-medium">Grid</span>
      <span
        className={cn(
          'inline-flex h-2.5 w-2.5 rounded-full transition-colors',
          isOverlayVisible ? 'bg-accent' : 'bg-muted/50',
        )}
      />
    </button>
  )
}
