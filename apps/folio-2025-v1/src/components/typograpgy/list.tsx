import { cn } from '@/lib/utils/cn'

export function TList({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLUListElement>>) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props}>
      {children}
    </ul>
  )
}

export function TOrderedList({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLOListElement>>) {
  return (
    <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props}>
      {children}
    </ol>
  )
}

export function TListItem({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLLIElement>>) {
  return (
    <li className={cn(className)} {...props}>
      {children}
    </li>
  )
}
