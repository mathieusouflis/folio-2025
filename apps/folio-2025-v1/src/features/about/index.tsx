import { SectionGridFullPage } from '@/components/base/section-full-page'
import { Underline } from '@/components/base/underline-content'
import { Grid, GridItem } from '@/components/layout/Grid'
import { TDisplay } from '@/components/typograpgy/display'
import { TP } from '@/components/typograpgy/p'
import type { AboutPage as AboutPageType, Media } from '@/payload-types'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { ResumeDownload } from './resume-download'

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
  let resume: Media | number | undefined = aboutPage.Header.resumee
  if (typeof sidePhoto === 'number') {
    sidePhoto = typeof sidePhoto !== 'number' ? sidePhoto : undefined
  }

  if (typeof resume === 'number') {
    resume = typeof resume !== 'number' ? resume : undefined
  }

  return (
    <SectionGridFullPage className="pt-10">
      <Grid withMargins={false} className="h-full">
        <Image
          src={sidePhoto?.url ?? ''}
          alt={sidePhoto?.alt ?? ''}
          width={4000}
          height={4000}
          className="absolute left-0 top-0 object-cover h-full w-[calc(var(--grid-margin)+var(--grid-column-width)*4+var(--grid-gap)*2.5)]"
        />
        <GridItem start={6} end={13} className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <TDisplay>{aboutPage.Header.title}</TDisplay>
            <TP className="font-semibold text-muted">- Based in {aboutPage.Header.location}</TP>
          </div>
          <Grid columns={5} withMargins={false} className="!gap-y-5">
            <GridItem span={'full'} className="flex flex-col gap-1">
              <TP className="font-semibold text-muted">Who am i ?</TP>
              <TP className="text-[16px]">{aboutPage.Header.description}</TP>
            </GridItem>
            {aboutPage.Header.socials && aboutPage.Header.socials.length > 0 && (
              <GridItem span={'full'} className="flex flex-col gap-2">
                <TP className="font-semibold text-muted">My socials</TP>
                <div className="flex flex-row gap-4">
                  {aboutPage.Header.socials?.map((social, idx) => (
                    <Link key={idx} href={social.url}>
                      <Underline className="text-[16px]">{social.name}</Underline>
                    </Link>
                  ))}
                </div>
              </GridItem>
            )}
          </Grid>
          <Grid columns={7} withMargins={false} className="w-full mb-4">
            <GridItem span={2} as={ResumeDownload} url={resume?.url ?? ''}>
              My resume
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </SectionGridFullPage>
  )
}
