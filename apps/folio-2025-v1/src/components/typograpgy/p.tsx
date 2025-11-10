import { cn } from '@/lib/utils/cn'

export function TP({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p className={cn('text-sm h-fit', className)} {...props}>
      {children}
    </p>
  )
}
