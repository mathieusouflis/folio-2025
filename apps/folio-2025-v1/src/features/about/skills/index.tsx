'use client'

import { SectionGridFullPage } from '@/components/base/section-full-page'
import { TDisplay } from '@/components/typograpgy/display'
import { Skill } from '@/payload-types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'
import { useRef, useMemo } from 'react'

const ANIMATION_CONFIG = {
  image: {
    scale: { from: 0, to: 1 },
    opacity: { from: 0, to: 1000 },
    scrub: 0.5,
    ease: 'power2.out',
  },
  title: {
    exit: {
      y: -20,
      rotationX: 90,
      duration: 0.3,
      stagger: 0.015,
      ease: 'power2.in',
    },
    enter: {
      y: { from: 20, to: 0 },
      rotationX: { from: -90, to: 0 },
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.out',
    },
  },
  progressBar: {
    heightOffset: 3, // percentage
  },
} as const

interface SkillData {
  skill: Skill
  imageCount: number
  startIndex: number
  endIndex: number
}

/**
 * Filters out number IDs and returns only valid Skill objects
 */
function getValidSkills(skills: (number | Skill)[]): Skill[] {
  return skills.filter((skill): skill is Skill => typeof skill !== 'number')
}

/**
 * Gets the count of valid images for a skill
 */
function getImageCount(skill: Skill): number {
  return skill.images?.filter((img) => typeof img !== 'number').length ?? 0
}

/**
 * Calculates total number of images across all skills
 */
function calculateTotalImages(skills: (number | Skill)[]): number {
  return getValidSkills(skills).reduce((sum, skill) => sum + getImageCount(skill), 0)
}

/**
 * Maps skills to their image counts
 */
function getImageCountsPerSkill(skills: (number | Skill)[]): number[] {
  return skills.map((skill) => (typeof skill === 'number' ? 0 : getImageCount(skill)))
}

/**
 * Creates enriched skill data with position information
 */
function enrichSkillsWithPositions(skills: (number | Skill)[]): SkillData[] {
  const validSkills = getValidSkills(skills)
  let cumulativeIndex = 0

  return validSkills
    .map((skill) => {
      const imageCount = getImageCount(skill)
      if (imageCount === 0) return null

      const skillData: SkillData = {
        skill,
        imageCount,
        startIndex: cumulativeIndex,
        endIndex: cumulativeIndex + imageCount,
      }

      cumulativeIndex += imageCount
      return skillData
    })
    .filter((data): data is SkillData => data !== null)
}

/**
 * Calculates scroll positions in pixels
 */
function calculateScrollPositions(startIndex: number, endIndex: number, viewportHeight: number) {
  return {
    start: startIndex * viewportHeight,
    end: endIndex * viewportHeight,
  }
}

/**
 * Creates character spans from text
 */
function createCharacterSpans(text: string, visible: boolean = true): HTMLSpanElement[] {
  const spans: HTMLSpanElement[] = []

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span')
    span.style.display = 'inline-block'
    if (!visible) {
      span.style.opacity = '0'
    }
    span.textContent = text[i] || ' '
    spans.push(span)
  }

  return spans
}

/**
 * Animates text change with character-by-character transition
 */
function animateTextTransition(element: HTMLElement, newText: string): void {
  const currentText = element.textContent || ''

  if (currentText === newText) return

  const existingSpans = Array.from(element.querySelectorAll('span'))

  if (existingSpans.length === 0) {
    element.textContent = ''
    element.style.whiteSpace = 'pre'

    const spans = createCharacterSpans(currentText, true)
    spans.forEach((span) => element.appendChild(span))
    return
  }

  const timeline = gsap.timeline()
  const { exit, enter } = ANIMATION_CONFIG.title

  timeline.to(existingSpans, {
    opacity: 0,
    y: exit.y,
    rotationX: exit.rotationX,
    duration: exit.duration,
    stagger: exit.stagger,
    ease: exit.ease,
    onComplete: () => {
      element.textContent = ''
      element.style.whiteSpace = 'pre'

      const newSpans = createCharacterSpans(newText, false)
      newSpans.forEach((span) => element.appendChild(span))

      gsap.fromTo(
        newSpans,
        {
          opacity: 0,
          y: enter.y.from,
          rotationX: enter.rotationX.from,
        },
        {
          opacity: 1,
          y: enter.y.to,
          rotationX: enter.rotationX.to,
          duration: enter.duration,
          stagger: enter.stagger,
          ease: enter.ease,
        },
      )
    },
  })
}

export function AboutSkills(props: { skills: (number | Skill)[] }) {
  gsap.registerPlugin(ScrollTrigger)

  const progressBarRefs = useRef<(HTMLSpanElement | null)[]>([])
  const imageRefs = useRef<(HTMLImageElement | null)[][]>([])
  const imageContainerRefs = useRef<(HTMLDivElement | null)[][]>([])
  const skillContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const skillContentRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)

  const totalImages = useMemo(() => calculateTotalImages(props.skills), [props.skills])

  const imageCountsPerSkill = useMemo(() => getImageCountsPerSkill(props.skills), [props.skills])

  const enrichedSkills = useMemo(() => enrichSkillsWithPositions(props.skills), [props.skills])

  const validSkills = useMemo(() => getValidSkills(props.skills), [props.skills])

  const firstSkillName = validSkills[0]?.name ?? ''

  useGSAP(() => {
    if (typeof window === 'undefined') return

    const triggers: ScrollTrigger[] = []
    const vh = window.innerHeight

    enrichedSkills.forEach((skillData, index) => {
      const progressBar = progressBarRefs.current[index]
      if (!progressBar) return

      const { start, end } = calculateScrollPositions(skillData.startIndex, skillData.endIndex, vh)

      const trigger = gsap.fromTo(
        progressBar,
        { height: '0%' },
        {
          scrollTrigger: {
            trigger: skillContainerRefs.current[index],
            start: `${start}px center`,
            end: `${end}px bottom`,
            onUpdate: (self) => {
              const progress = Math.max(0, Math.min(1, self.progress))
              progressBar.style.height = `${progress * 100 + ANIMATION_CONFIG.progressBar.heightOffset}%`
            },
          },
        },
      )

      if (trigger.scrollTrigger) {
        triggers.push(trigger.scrollTrigger)
      }
    })

    let globalImageIndex = 0

    imageRefs.current.forEach((imageSet, skillIndex) => {
      if (!imageSet || imageSet.length === 0) return

      imageSet.forEach((img) => {
        if (!img) {
          globalImageIndex++
          return
        }

        gsap.set(img, { transformOrigin: 'center center' })

        const { start, end } = calculateScrollPositions(globalImageIndex, globalImageIndex + 1, vh)

        const tween = gsap.fromTo(
          img,
          {
            scale: ANIMATION_CONFIG.image.scale.from,
            autoAlpha: ANIMATION_CONFIG.image.opacity.from,
          },
          {
            scale: ANIMATION_CONFIG.image.scale.to,
            autoAlpha: ANIMATION_CONFIG.image.opacity.to,
            ease: ANIMATION_CONFIG.image.ease,
            scrollTrigger: {
              trigger: skillContainerRefs.current[skillIndex],
              start: `${start}px center`,
              end: `${end}px center`,
              scrub: ANIMATION_CONFIG.image.scrub,
            },
          },
        )

        if (tween.scrollTrigger) {
          triggers.push(tween.scrollTrigger)
        }

        globalImageIndex++
      })
    })

    skillContentRefs.current.forEach((container) => {
      if (container) {
        gsap.set(container, { autoAlpha: 1 })
      }
    })

    if (titleRef.current) {
      enrichedSkills.forEach((skillData, index) => {
        const { start, end } = calculateScrollPositions(
          skillData.startIndex,
          skillData.endIndex,
          vh,
        )

        const trigger = ScrollTrigger.create({
          trigger: skillContainerRefs.current[index],
          start: `${start}px center`,
          end: `${end}px center`,
          onEnter: () => {
            if (titleRef.current) {
              animateTextTransition(titleRef.current, skillData.skill.name ?? '')
            }
          },
          onEnterBack: () => {
            if (titleRef.current) {
              animateTextTransition(titleRef.current, skillData.skill.name ?? '')
            }
          },
        })

        triggers.push(trigger)
      })
    }

    ScrollTrigger.refresh()

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [enrichedSkills])

  return (
    <SectionGridFullPage
      className="relative scroll-section"
      style={{
        height: `${totalImages * 100}vh`,
      }}
    >
      <div className="absolute -right-6 flex flex-col h-full">
        <div className="flex flex-col justify-center sticky top-0 gap-1.5 min-h-screen">
          {validSkills.map((skill, index) => (
            <span key={index} className="relative h-3 w-3 border border-white">
              <span
                ref={(el) => {
                  progressBarRefs.current[index] = el
                }}
                className="absolute top-0 left-0 w-full h-0 bg-white"
              />
            </span>
          ))}
        </div>
      </div>

      {validSkills.map((skill, skillIndex) => (
        <div
          key={`skill-${skillIndex}`}
          ref={(el) => {
            skillContainerRefs.current[skillIndex] = el
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <div
            ref={(el) => {
              skillContentRefs.current[skillIndex] = el
            }}
            className="sticky top-0 left-0 h-screen w-full"
          >
            {(skill.images ?? []).map((image, imageIndex) => {
              if (typeof image === 'number') return null

              return (
                <div
                  key={`${skillIndex}-${imageIndex}`}
                  ref={(el) => {
                    if (!imageContainerRefs.current[skillIndex]) {
                      imageContainerRefs.current[skillIndex] = []
                    }
                    imageContainerRefs.current[skillIndex][imageIndex] = el
                  }}
                  className="absolute top-1/2 -translate-y-1/2 flex justify-center items-center w-full aspect-video"
                >
                  <Image
                    ref={(el) => {
                      if (!imageRefs.current[skillIndex]) {
                        imageRefs.current[skillIndex] = []
                      }
                      imageRefs.current[skillIndex][imageIndex] = el
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
      ))}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-center">
          <TDisplay ref={titleRef} className="w-full text-center">
            {firstSkillName}
          </TDisplay>
        </div>
      </div>
    </SectionGridFullPage>
  )
}
