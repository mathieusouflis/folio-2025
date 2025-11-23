import { SectionGridFullPage } from '@/components/base/section-full-page'
import { Grid, GridItem } from '@/components/layout/Grid'
import { TP } from '@/components/typograpgy/p'
import { isDate } from '@/lib/utils/is-date'
import { AboutPage } from '@/payload-types'
import React from 'react'

export function AboutDescription(props: { aboutPage: AboutPage }) {
  const aboutPage = props.aboutPage

  return (
    <SectionGridFullPage className="flex justify-center">
      <Grid withMargins={false} className="gap-y-24!">
        {((aboutPage.Other?.experiences && aboutPage.Other.experiences.length > 0) ||
          (aboutPage.Other?.education && aboutPage.Other.education.length > 0)) && (
          <GridItem span={5}>
            <Grid columns={5} withMargins={false} className="gap-y-24!">
              {aboutPage.Other?.experiences && aboutPage.Other.experiences.length > 0 && (
                <GridItem span={'full'} className="flex flex-col gap-2.5">
                  <TP className="font-semibold text-muted">Experiences</TP>
                  <Grid withMargins={false} columns={3}>
                    {aboutPage.Other?.experiences?.map((experience, idx) => (
                      <React.Fragment key={`experience-${idx}`}>
                        <GridItem as={TP} rowStart={idx + 1} start={1}>
                          {experience.title}
                        </GridItem>
                        <GridItem as={TP} rowStart={idx + 1} start={2}>
                          {experience.company}
                        </GridItem>
                        <GridItem as={TP} rowStart={idx + 1} start={3} className="text-right">
                          {isDate(experience.startDate)
                            ? new Date(experience.startDate).getFullYear()
                            : ''}{' '}
                          -{' '}
                          {experience.endDate && isDate(experience.endDate)
                            ? new Date(experience.endDate).getFullYear()
                            : 'NOW'}
                        </GridItem>
                      </React.Fragment>
                    ))}
                  </Grid>
                </GridItem>
              )}
              {aboutPage.Other?.education && aboutPage.Other.education.length > 0 && (
                <GridItem rowStart={2} span={'full'} className="flex flex-col gap-2.5">
                  <TP className="font-semibold text-muted">Education</TP>
                  <Grid withMargins={false} columns={3}>
                    {aboutPage.Other?.education?.map((education, idx) => (
                      <React.Fragment key={`education-${idx}`}>
                        <GridItem as={TP} rowStart={idx + 1} start={1}>
                          {education.major}
                        </GridItem>
                        <GridItem as={TP} rowStart={idx + 1} start={2}>
                          {education.school}
                        </GridItem>
                        <GridItem as={TP} rowStart={idx + 1} start={3} className="text-right">
                          {isDate(education.startDate)
                            ? new Date(education.startDate).getFullYear()
                            : ''}{' '}
                          -{' '}
                          {education.endDate && isDate(education.endDate)
                            ? new Date(education.endDate).getFullYear()
                            : 'NOW'}
                        </GridItem>
                      </React.Fragment>
                    ))}
                  </Grid>
                </GridItem>
              )}
            </Grid>
          </GridItem>
        )}
        {aboutPage.Other?.awwards && aboutPage.Other.awwards.length > 0 && (
          <GridItem rowStart={2} start={7} span={'full'}>
            <TP className="font-semibold text-muted">Awards</TP>
            <Grid withMargins={false} columns={3}>
              {aboutPage.Other?.awwards?.map((awwards, idx) => (
                <React.Fragment key={`education-${idx}`}>
                  <GridItem as={TP} rowStart={idx + 1} start={1}>
                    {typeof awwards.project !== 'number' && awwards.project.title}
                  </GridItem>
                  <GridItem as={TP} rowStart={idx + 1} start={2}>
                    {awwards.awwarder}
                  </GridItem>
                  <GridItem as={TP} rowStart={idx + 1} start={3} className="text-right">
                    {awwards.mention}
                  </GridItem>
                </React.Fragment>
              ))}
            </Grid>
          </GridItem>
        )}
      </Grid>
    </SectionGridFullPage>
  )
}
