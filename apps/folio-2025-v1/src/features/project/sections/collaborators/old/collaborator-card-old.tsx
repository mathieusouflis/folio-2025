'use client'

import { Collaborator, Role } from '@/payload-types'
import { TP } from '@/components/typograpgy/p'
import { TH2 } from '@/components/typograpgy/h2'
import Image from 'next/image'
import { useCursor } from '@/components/contexts/follow-cursor'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

export function CollaboratorCard(props: {
  collaborator: Collaborator
  roles: (number | Role)[]
  id: string
}) {
  const { setCursorActions, clearCursorActions } = useCursor()
  const [hovering, setHovering] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rolesRef = useRef<HTMLSpanElement>(null)

  gsap.registerPlugin(SplitText)

  useGSAP(() => {
    const nameSplit = SplitText.create(nameRef.current, {
      type: 'chars',
    })
    const rolesSplit = SplitText.create(rolesRef.current, {
      type: 'lines',
    })

    if (hovering) {
      gsap.to(imageRef.current, {
        scale: 1.2,
        filter: 'brightness(0.7)',
        duration: 0.5,
        ease: 'power2',
      })

      gsap.to(containerRef.current, {
        width: '150%',
        maxWidth: '150%',
        duration: 0.5,
        ease: 'power2',
      })
      gsap.to(nameSplit.chars, {
        y: '-100%',
        duration: 0.4,
        stagger: 0.02,
      })
      gsap.to(rolesSplit.lines, {
        y: '-100%',
        duration: 0.5,
        stagger: 0.02,
      })
    } else {
      gsap.to(containerRef.current, {
        width: '100%',
        maxWidth: 'calc(100%/3)',
        duration: 0.5,
        ease: 'power2',
      })

      gsap.to(nameSplit.chars, {
        y: '100%',
        duration: 0.4,
        stagger: 0.02,
      })
      gsap.to(rolesSplit.lines, {
        y: '100%',
        duration: 0.5,
        stagger: 0.02,
      })

      gsap.to(imageRef.current, {
        scale: 1.1,
        filter: 'brightness(1)',
        duration: 0.5,
        ease: 'power2',
      })
    }
  }, [hovering])

  const avatar = typeof props.collaborator.avatar !== 'number' && props.collaborator.avatar?.url
  const collaboratorName = props.collaborator.displayName ?? 'No Name'
  const rolesNames = props.roles.map((role) => typeof role !== 'number' && role.name)

  if (!avatar) {
    return (
      <span className="w-1/3 flex items-center justify-center bg-blue-400">
        <TH2>{collaboratorName ?? 'No Name'}</TH2>
      </span>
    )
  }

  return (
    <div
      className="relative max-w-1/3 w-full h-full group overflow-hidden"
      ref={containerRef}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <span className="overflow-hidden w-full h-full flex">
        <Image
          ref={imageRef}
          src={avatar || ''}
          alt={`${collaboratorName} photo.`}
          width={1920}
          height={1080}
          className="object-cover object-center w-full h-full scale-110"
          onMouseOver={() =>
            setCursorActions([
              {
                type: 'text-out',
                content: collaboratorName,
              },
            ])
          }
          onMouseLeave={clearCursorActions}
        />
      </span>
      <div
        ref={aboutRef}
        className="absolute pointer-events-none translate-y-1/2 translate-x-1/2 bottom-1/2 right-1/2"
      >
        <div className="flex flex-col items-center gap-5">
          <TP
            ref={nameRef}
            className="w-max font-made-mirage text-5xl text-foreground font-thin overflow-hidden"
          >
            {collaboratorName}
          </TP>

          {rolesNames.length && (
            <span ref={rolesRef} className="flex flex-row w-max overflow-hidden">
              <TP className="w-max text-muted overflow-hidden">( {rolesNames.join(' / ')} )</TP>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
