import { SectionGridFullPage } from '@/components/base/section-full-page'
import type { AboutPage as AboutPageType, Media } from '@/payload-types'
import config from '@/payload.config'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let aboutPage: AboutPageType

  try {
    aboutPage = await payload.findGlobal({
      slug: 'aboutPage',
      depth: 3,
    })
  } catch (err) {
    console.error(err)
    return redirect('/')
  }

  let sidePhoto: Media | number | undefined = aboutPage.Header.sidePhoto
  if (typeof sidePhoto === 'number') {
    sidePhoto = typeof sidePhoto !== 'number' ? sidePhoto : undefined
  }

  return (
    <SectionGridFullPage className="flex-row relative ml-0 pl-(--gridMargin)">
      <Image
        src={sidePhoto?.url ?? ''}
        alt={sidePhoto?.alt ?? ''}
        width={4000}
        height={4000}
        className="absolute left-0 top-0 object-cover h-full w-4/12 "
      />
    </SectionGridFullPage>
  )
}
