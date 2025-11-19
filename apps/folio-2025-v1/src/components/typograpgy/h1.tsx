import { cn } from '@/lib/utils/cn'

export function TH1({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
