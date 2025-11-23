import { SectionGridFullPage } from '@/components/base/section-full-page'
import { Activity } from '@/payload-types'
import { ActivityCard } from './activity-card'
import { Grid, GridItem } from '@/components/layout/Grid'
import { TH2 } from '@/components/typograpgy/h2'

export function AboutActivities(props: { activities: (number | Activity)[] }) {
  return (
    <SectionGridFullPage className="justify-center py-36 gap-14 h-fit">
      <TH2>I like</TH2>
      <Grid withMargins={false} className="h-full">
        {props.activities?.map((activity, idx) => {
          if (typeof activity === 'number') {
            return null
          }
          return (
            <GridItem key={idx} span={12 / props.activities.length}>
              <ActivityCard activity={activity} />
            </GridItem>
          )
        })}
      </Grid>
    </SectionGridFullPage>
  )
}
