import { SectionFullPage } from '@/components/base/section-full-page'
import { TDisplay } from '@/components/typograpgy/display'
import { LaunchButton } from '../components/launch'
import { Media } from '@/payload-types'
import Image from 'next/image'

export function ProjectHeaderSection(params: {
  title: string
  showreel?: Media | undefined | null | number
}) {
  return (
    <SectionFullPage className="ml-0 mr-0">
      <div className="flex flex-col w-full items-center justify-center ml-(--gridMargin) mr-(--gridMargin)">
        <TDisplay className="w-1/2 text-center mix-blend-difference text-white">
          {params.title}
        </TDisplay>
        <LaunchButton url="absolute bottom-0" className="absolute bottom-9" />
      </div>
      {params.showreel && typeof params.showreel === 'object' && (
        <Image
          src={params.showreel?.url || ''}
          alt={params.showreel?.alt || ''}
          width={params.showreel?.width || 0}
          height={params.showreel?.height || 0}
          className="absolute pointer-events-none -z-50 top-0 left-0 w-full h-full object-cover"
        />
      )}
    </SectionFullPage>
  )
}
