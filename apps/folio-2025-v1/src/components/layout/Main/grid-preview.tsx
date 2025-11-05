import { cn } from '@/lib/utils/cn'

export function GridPreview() {
  const variants = {
    desktop: {
      cols: 12,
      glutter: '12px',
      margin: '120px',
    },
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 pointer-events-none',
        'w-full',
        'h-screen flex flex-row',
        'gap-[12px]',
        'pl-[120px]',
        'pr-[120px]',
      )}
    >
      {Array.from({ length: variants.desktop.cols }, (_, i) => (
        <div
          key={i}
          className="w-full h-full bg-blue-500/30 border border-blue-700/50 border-y-0"
        />
      ))}
    </div>
  )
}
