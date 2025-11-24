import { cn } from '@/lib/utils/cn'
import { forwardRef } from 'react'

export const TDisplay = forwardRef<
  HTMLHeadingElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>
>(({ children, className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn('font-thin text-9xl h-fit font-made-mirage leading-[normal]', className)}
      {...props}
    >
      {children}
    </h1>
  )
})

TDisplay.displayName = 'TDisplay'
