import { cn } from '@/lib/utils/cn'

export function TH4({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props}>
      {children}
    </h2>
  )
}
