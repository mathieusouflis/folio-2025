import { cn } from '@/lib/utils/cn'

export function TTable({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLTableElement>>) {
  return (
    <table className={cn('w-full', className)} {...props}>
      {children}
    </table>
  )
}

export function TTableHeader({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  )
}

export function TTableBody({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  )
}

export function TTableRow({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLTableRowElement>>) {
  return (
    <tr className={cn('even:bg-muted m-0 border-t p-0', className)} {...props}>
      {children}
    </tr>
  )
}

export function TTableHead({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.ThHTMLAttributes<HTMLTableCellElement>>) {
  return (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export function TTableCell({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.TdHTMLAttributes<HTMLTableCellElement>>) {
  return (
    <td
      className={cn(
        'border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}
