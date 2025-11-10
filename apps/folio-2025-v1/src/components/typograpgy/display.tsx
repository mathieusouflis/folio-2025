import { cn } from '@/lib/utils/cn'

export function TDisplay({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h1
      className={cn('font-thin text-9xl h-fit font-made-mirage leading-[normal]', className)}
      {...props}
    >
      {children}
    </h1>
  )
}
