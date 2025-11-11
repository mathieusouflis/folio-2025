import { SectionFullPage } from '@/components/base/section-full-page'
import { TDisplay } from '@/components/typograpgy/display'
import { LaunchButton } from '../components/launch'
import { ShowReel } from '../components/showreel'
import { Media } from '@/payload-types'

export function ProjectHeaderSection(params: {
  title: string
  showreel?: Media | undefined | null | number
}) {
  return (
    <SectionFullPage className="flex-col items-center justify-center">
      <TDisplay className="w-1/2 text-center">{params.title}</TDisplay>
      <LaunchButton url="absolute bottom-0" className="absolute bottom-9" />

      {params.showreel && typeof params.showreel !== 'number' && params.showreel.url && (
        <ShowReel url={params.showreel.url} className="absolute bottom-12 right-0" />
      )}
    </SectionFullPage>
  )
}
