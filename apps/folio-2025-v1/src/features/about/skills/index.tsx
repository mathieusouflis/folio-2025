'use client'

import { SectionGridFullPage } from '@/components/base/section-full-page'
import { TDisplay } from '@/components/typograpgy/display'
import { Skill } from '@/payload-types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'
import { useRef } from 'react'

export function AboutSkills(props: { skills: (number | Skill)[] }) {
  const stepsRef = useRef<(HTMLSpanElement | null)[]>([])
  const imagesRef = useRef<(HTMLImageElement | null)[][]>([])
  const imagesContainerRef = useRef<(HTMLDivElement | null)[][]>([])
  const mainContainersRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleContainersRef = useRef<(HTMLDivElement | null)[]>([])

  const imagesCount = props.skills
    .filter((skill) => typeof skill !== 'number')
    .reduce((sum, skill) => sum + (skill.images?.length ?? 0), 0)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    const createdTriggers: ScrollTrigger[] = []

    const imagesPerSkill = props.skills.map((skill) =>
      typeof skill === 'number'
        ? 0
        : (skill.images?.filter((img) => typeof img !== 'number').length ?? 0),
    )

    if (typeof window !== 'undefined') {
      const vh = window.innerHeight

      let cumulative = 0
      imagesPerSkill.forEach((count, idx) => {
        const ref = stepsRef.current[idx]
        if (!ref || count === 0) {
          cumulative += count
          return
        }

        const startPx = cumulative * vh
        const endPx = (cumulative + count) * vh

        const trigger = gsap.fromTo(
          ref,
          { height: '0%' },
          {
            scrollTrigger: {
              trigger: mainContainersRef.current[idx],
              start: `${startPx}px center`,
              end: `${endPx}px bottom`,
              markers: true,
              onUpdate: (self) => {
                const p = Math.max(0, Math.min(1, self.progress))
                ref.style.height = `${p * 100 + 3}%`
              },
            },
          },
        )

        if (trigger.scrollTrigger) {
          createdTriggers.push(trigger.scrollTrigger)
        }
        cumulative += count
      })
    }

    if (typeof window !== 'undefined') {
      const vh = window.innerHeight
      let globalIndex = 0

      for (let skillIndex = 0; skillIndex < imagesRef.current.length; skillIndex++) {
        const imageSet = imagesRef.current[skillIndex]
        if (!imageSet || imageSet.length === 0) {
          continue
        }

        for (let imageIndex = 0; imageIndex < imageSet.length; imageIndex++) {
          const img = imageSet[imageIndex]
          if (!img) {
            globalIndex += 1
            continue
          }
          gsap.set(img, { transformOrigin: 'center center' })

          const startPx = globalIndex * vh
          const endPx = (globalIndex + 1) * vh

          const tween = gsap.fromTo(
            img,
            {
              scale: 0,
              autoAlpha: 0,
            },
            {
              scale: 1,
              autoAlpha: 1000,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: mainContainersRef.current[skillIndex],
                start: `${startPx}px center`,
                end: `${endPx}px center`,
                scrub: 0.5,
              },
            },
          )

          if (tween.scrollTrigger) {
            createdTriggers.push(tween.scrollTrigger)
          }

          globalIndex += 1
        }
      }
    }

    // Set title containers to be visible (no fade animations)
    if (typeof window !== 'undefined') {
      titleContainersRef.current.forEach((container) => {
        if (!container) return
        gsap.set(container, { autoAlpha: 1 })
      })
    }

    // Dynamic title text animation
    if (typeof window !== 'undefined' && titleRef.current) {
      const vh = window.innerHeight
      let cumulative = 0

      const skillsWithImages = props.skills.filter((skill) => {
        if (typeof skill === 'number') return false
        const imageCount = skill.images?.filter((img) => typeof img !== 'number').length ?? 0
        return imageCount > 0
      }) as Skill[]

      skillsWithImages.forEach((skill, idx) => {
        const imageCount = skill.images?.filter((img) => typeof img !== 'number').length ?? 0
        const startPx = cumulative * vh
        const nextStartPx = (cumulative + imageCount) * vh
        const transitionStartPx = nextStartPx - vh * 0.5

        const trigger = ScrollTrigger.create({
          trigger: mainContainersRef.current[idx],
          start: `${startPx}px center`,
          end: `${nextStartPx}px center`,
          onEnter: () => {
            if (titleRef.current) {
              animateTextChange(titleRef.current, skill.name ?? '')
            }
          },
          onEnterBack: () => {
            if (titleRef.current) {
              animateTextChange(titleRef.current, skill.name ?? '')
            }
          },
        })

        createdTriggers.push(trigger)
        cumulative += imageCount
      })
    }

    ScrollTrigger.refresh()

    return () => {
      createdTriggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  const animateTextChange = (element: HTMLElement, newText: string) => {
    const currentText = element.textContent || ''

    if (currentText === newText) return

    // Get existing spans or create from current text
    let existingSpans = Array.from(element.querySelectorAll('span'))

    if (existingSpans.length === 0) {
      // First time: create spans from current text without animation
      element.textContent = ''
      element.style.whiteSpace = 'pre'

      for (let i = 0; i < currentText.length; i++) {
        const span = document.createElement('span')
        span.style.display = 'inline-block'
        span.textContent = currentText[i] || ' '
        element.appendChild(span)
      }
      existingSpans = Array.from(element.querySelectorAll('span'))
    }

    // Animate out old text
    const timeline = gsap.timeline()

    timeline.to(existingSpans, {
      opacity: 0,
      y: -20,
      rotationX: 90,
      duration: 0.3,
      stagger: 0.015,
      ease: 'power2.in',
      onComplete: () => {
        // Clear and create new spans
        element.textContent = ''
        element.style.whiteSpace = 'pre'

        const newSpans: HTMLSpanElement[] = []
        for (let i = 0; i < newText.length; i++) {
          const span = document.createElement('span')
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          span.textContent = newText[i] || ' '
          element.appendChild(span)
          newSpans.push(span)
        }

        // Animate in new text
        gsap.fromTo(
          newSpans,
          {
            opacity: 0,
            y: 20,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: 'power2.out',
          },
        )
      },
    })
  }

  return (
    <SectionGridFullPage
      className="relative scroll-section"
      style={{
        height: `${imagesCount * 100}vh`,
      }}
    >
      <div className="absolute -right-6 flex flex-col h-full">
        <div className="flex flex-col justify-center sticky top-0 gap-1 5 min-h-screen">
          {props.skills.map((skill, idx) => {
            if (typeof skill !== 'number') {
              return (
                <span key={idx} className="relative h-3 w-3 border border-white">
                  <span
                    ref={(el) => {
                      stepsRef.current[idx] = el
                    }}
                    className="absolute top-0 left-0 w-full h-0 bg-white"
                  ></span>
                </span>
              )
            }
            return null
          })}
        </div>
      </div>

      {/* Single title container that changes dynamically */}

      {props.skills.map((skill, skillIndex) => {
        if (typeof skill === 'number') return null
        return (
          <div
            ref={(el) => {
              mainContainersRef.current[skillIndex] = el
            }}
            key={`skill-${skillIndex}`}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div
              ref={(el) => {
                titleContainersRef.current[skillIndex] = el
              }}
              className="sticky top-0 left-0 h-screen w-full"
            >
              {(skill.images ?? []).map((image, imageIndex) => {
                if (typeof image === 'number') return null
                return (
                  <div
                    key={`${skillIndex}-${imageIndex}`}
                    ref={(el) => {
                      if (!imagesContainerRef.current[skillIndex])
                        imagesContainerRef.current[skillIndex] = []
                      imagesContainerRef.current[skillIndex][imageIndex] = el
                    }}
                    className="absolute top-1/2 -translate-y-1/2 flex justify-center items-center w-full aspect-video"
                  >
                    <Image
                      ref={(el) => {
                        if (!imagesRef.current[skillIndex]) imagesRef.current[skillIndex] = []
                        imagesRef.current[skillIndex][imageIndex] = el
                      }}
                      src={image.url ?? ''}
                      alt={image.alt}
                      width={4000}
                      height={4000}
                      className="absolute top-0 left-0 aspect-video object-cover w-full brightness-50"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-center">
          <TDisplay ref={titleRef} className="w-full text-center">
            {props.skills[0] && typeof props.skills[0] !== 'number' ? props.skills[0].name : ''}
          </TDisplay>
        </div>
      </div>
    </SectionGridFullPage>
  )
}
