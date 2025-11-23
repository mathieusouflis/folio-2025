import { cn } from '@/lib/utils/cn'
import { Grid, GridItem } from '../layout/Grid'

export function SectionGridFullPage(
  props: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <Grid as={'section'} className={'relative h-fit'}>
      <GridItem span={'full'} {...props} className={cn('flex flex-col h-screen', props.className)}>
        {props.children}
      </GridItem>
    </Grid>
  )
}
