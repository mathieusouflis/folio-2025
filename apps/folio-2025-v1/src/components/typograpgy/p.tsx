import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export const TP = forwardRef<
  HTMLParagraphElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>
>(({ children, className, ...props }, ref) => {
  return (
    <p ref={ref} className={cn('text-sm h-fit', className)} {...props}>
      {children}
    </p>
  )
})

TP.displayName = 'TP'
