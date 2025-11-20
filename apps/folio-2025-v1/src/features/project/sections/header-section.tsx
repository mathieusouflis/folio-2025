import { SectionGridFullPage } from '@/components/base/section-full-page'
import { TDisplay } from '@/components/typograpgy/display'
import { LaunchButton } from '../components/launch'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { TP } from '@/components/typograpgy/p'
import { Grid, GridItem } from '@/components/layout/Grid'

export function ProjectHeaderSection(params: {
  title: string
  showreel?: Media | undefined | null | number
}) {
  return (
    <SectionGridFullPage className="ml-0 mr-0">
      <GridItem span="full">
        <div className="relative flex flex-col w-full h-full items-center justify-center">
          <TDisplay className="w-1/2 text-center mix-blend-difference text-white">
            {params.title}
          </TDisplay>
          <Grid withMargins={false} className="w-full absolute bottom-1.5 right-0">
            <GridItem
              start={10}
              end={13}
              as={TP}
              className="text-white flex justify-between  mix-blend-difference uppercase"
            >
              (
              {new Array(4).fill('Scroll').map((scrollText, idx) => {
                return <span key={idx}>{scrollText}</span>
              })}
              )
            </GridItem>
          </Grid>
        </div>
        {params.showreel && typeof params.showreel === 'object' && (
          <Image
            src={params.showreel?.url || ''}
            alt={params.showreel?.alt || ''}
            width={params.showreel?.width || 0}
            height={params.showreel?.height || 0}
            className="absolute pointer-events-none -z-50 top-0 left-0 w-full h-full object-cover brightness-65"
          />
        )}
      </GridItem>
    </SectionGridFullPage>
  )
}
