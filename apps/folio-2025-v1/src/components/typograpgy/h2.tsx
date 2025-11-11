import { cn } from '@/lib/utils/cn'

export function TH2({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2
      className={cn('font-normal text-[40px] h-fit font-made-mirage leading-[normal]', className)}
      {...props}
    >
      {children}
    </h2>
  )
}
