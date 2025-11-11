import { cn } from '@/lib/utils/cn'

export function SectionFullPage(
  props: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <section
      className={cn('relative h-screen flex ml-(--gridMargin) mr-(--gridMargin)', props.className)}
    >
      {props.children}
    </section>
  )
}
