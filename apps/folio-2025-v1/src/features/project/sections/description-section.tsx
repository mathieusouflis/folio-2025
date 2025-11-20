import { SectionGridFullPage } from '@/components/base/section-full-page'
import { TH2 } from '@/components/typograpgy/h2'
import { TP } from '@/components/typograpgy/p'
import { isDate } from '@/lib/utils/is-date'
import { Project } from '@/payload-types'
import { CATEGORIES } from '../constants'
import { LaunchButton } from '../components/launch'
import { Grid, GridItem } from '@/components/layout/Grid'

export function ProjectDescriptionSection(params: { project: Project }) {
  return (
    <SectionGridFullPage className="flex-col justify-between py-[100px]">
      <Grid withMargins={false}>
        <GridItem span={7} className="flex flex-col gap-10 ">
          <TH2>{params.project.subtitle}</TH2>
          <TP className="text-base">{params.project.description}</TP>
        </GridItem>
      </Grid>
      <Grid withMargins={false}>
        <GridItem span={5} className="flex flex-col gap-4 w-full">
          {CATEGORIES.map((category, index) => {
            let itemsInCategory: React.ReactNode[] = []
            const categoryValue = params.project[category.key]

            if (Array.isArray(categoryValue)) {
              itemsInCategory = categoryValue.map((item, index) => {
                if (typeof item !== 'number') {
                  return (
                    <TP key={item.id}>
                      {'name' in item ? item.name : item.id}
                      {index + 1 === categoryValue.length ? '' : ','}
                    </TP>
                  )
                }
                return null
              })
            } else if (typeof categoryValue === 'string') {
              itemsInCategory = categoryValue
                ? [
                    <TP key={`${index}-${category}`}>
                      {isDate(categoryValue)
                        ? new Date(categoryValue).getFullYear()
                        : categoryValue}
                    </TP>,
                  ]
                : []
            }

            return (
              <Grid columns={5} withMargins={false} key={index}>
                <GridItem as={TP} span={1} className="font-semibold text-muted ">
                  {category.displayName}
                </GridItem>
                <GridItem as={'span'} span={3} className="flex flex-row gap-2">
                  {itemsInCategory}
                </GridItem>
              </Grid>
            )
          })}
        </GridItem>
        <GridItem start={11} end={13} className="flex items-end justify-end">
          {params.project.projectUrl && <LaunchButton url={params.project.projectUrl} />}
        </GridItem>
      </Grid>
    </SectionGridFullPage>
  )
}
