'use client'

import { useGridOverlay } from '@/components/contexts/grid-overlay'
import { cn } from '@/lib/utils/cn'

export function GridPreview() {
  const { isOverlayVisible } = useGridOverlay()

  if (!isOverlayVisible) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 pointer-events-none z-[9998]',
        'w-full h-screen',
        'flex flex-row',
      )}
      style={{
        gap: 'var(--grid-gap)',
        paddingLeft: 'var(--grid-margin)',
        paddingRight: 'var(--grid-margin)',
      }}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="w-full h-full bg-blue-500/10 border-x border-blue-500/30"
          style={{
            width: 'var(--grid-column-width)',
          }}
        />
      ))}
    </div>
  )
}
