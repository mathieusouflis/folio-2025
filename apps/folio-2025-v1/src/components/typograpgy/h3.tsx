import { cn } from '@/lib/utils/cn'

export function TH3({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight ', className)} {...props}>
      {children}
    </h2>
  )
}
