import { cn } from '@/lib/utils/cn'

export function TBlockquote({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLQuoteElement>>) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props}>
      {children}
    </blockquote>
  )
}
