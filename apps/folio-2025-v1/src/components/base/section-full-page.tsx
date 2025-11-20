import { cn } from '@/lib/utils/cn'
import { Grid } from '../layout/Grid'

export function SectionGridFullPage(
  props: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <Grid as={'section'} className={cn('relative h-screen', props.className)}>
      {props.children}
    </Grid>
  )
}
