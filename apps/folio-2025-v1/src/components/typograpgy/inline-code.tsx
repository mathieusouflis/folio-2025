import { cn } from '@/lib/utils/cn'

export function TInlineCode({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  )
}
