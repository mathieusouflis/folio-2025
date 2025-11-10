import { TDisplay } from '@/components/typograpgy/display'
import { TP } from '@/components/typograpgy/p'
import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function ProjectShowcase(props: {
  projectId: number
  title: string
  cover: Media | undefined
  endDate: string
  client: string
  skills: string[]
  projectType: string
}) {
  return (
    <Link href={`projects/${props.projectId}`}>
      <article className="relative flex flex-col h-screen px-(--gridMargin) justify-end">
        <div className="flex flex-row justify-between h-1/3 items-center">
          <TP className="uppercase text-white mix-blend-difference">
            {props.projectType}
            <br />
            {new Date(props.endDate).getFullYear()}
          </TP>
          <TP className="uppercase text-white mix-blend-difference">{props.client}</TP>
          <TP className="uppercase text-right text-white mix-blend-difference">
            {props.skills.map((skill, idx) => (
              <React.Fragment key={idx}>
                {skill} <br />
              </React.Fragment>
            ))}
          </TP>
        </div>
        <div className="flex h-1/3 items-end">
          <TDisplay className="text-white mix-blend-difference">{props.title}</TDisplay>
        </div>
        {props.cover && (
          <Image
            src={props.cover.url!}
            alt={props.cover.alt}
            width={1920}
            height={1080}
            className="absolute top-0 left-0 w-full h-full -z-50 brightness-[30%] object-cover object-center"
          />
        )}
      </article>
    </Link>
  )
}
