import type { AboutPage as AboutPageType } from '@/payload-types'
import config from '@/payload.config'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import { AboutHeader } from './about-header'
import { AboutDescription } from './about-description'
import { AboutActivities } from './activities'
import { AboutSkills } from './skills/index'

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

  return (
    <>
      <AboutHeader aboutPage={aboutPage} />
      <AboutDescription aboutPage={aboutPage} />
      {aboutPage.Other?.activities && <AboutActivities activities={aboutPage.Other?.activities} />}
      {aboutPage.Other?.skills && <AboutSkills skills={aboutPage.Other?.skills ?? []} />}
    </>
  )
}
