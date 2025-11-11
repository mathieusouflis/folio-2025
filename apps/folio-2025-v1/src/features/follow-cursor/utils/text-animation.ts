import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { RefObject } from 'react'
import { ANIMATION_DURATIONS, ANIMATION_EASING } from '../constants'

export function killAllTextAnimations(
  splitTextRef: RefObject<SplitText | null>,
  animationTimelineRef: RefObject<gsap.core.Timeline | null>,
): void {
  if (splitTextRef.current?.chars) {
    gsap.killTweensOf(splitTextRef.current.chars)
  }
  if (animationTimelineRef.current) {
    animationTimelineRef.current.kill()
    animationTimelineRef.current = null
  }
}

export function cleanupSplitText(splitTextRef: RefObject<SplitText | null>): void {
  if (splitTextRef.current) {
    splitTextRef.current.revert()
    splitTextRef.current = null
  }
}

export function wrapCharacters(chars: HTMLElement[]): void {
  chars.forEach((char) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'inline-block'

    if (char.textContent === ' ') {
      wrapper.style.width = '0.25em'
    }

    char.parentNode?.insertBefore(wrapper, char)
    wrapper.appendChild(char)
    gsap.set(char, { x: '-100%', opacity: 0 })
  })
}

export function animateTextIn(
  textContentRef: RefObject<HTMLParagraphElement | null>,
  splitTextRef: RefObject<SplitText | null>,
  animationTimelineRef: RefObject<gsap.core.Timeline | null>,
  isTransitioningRef: RefObject<boolean>,
): void {
  if (!textContentRef.current) return

  killAllTextAnimations(splitTextRef, animationTimelineRef)
  cleanupSplitText(splitTextRef)

  const split = new SplitText(textContentRef.current, { type: 'chars' })
  splitTextRef.current = split

  if (!split.chars || split.chars.length === 0) return

  wrapCharacters(split.chars as HTMLElement[])

  const tl = gsap.timeline({
    onComplete: () => {
      isTransitioningRef.current = false
    },
  })
  animationTimelineRef.current = tl

  tl.to(split.chars, {
    x: 0,
    opacity: 1,
    duration: ANIMATION_DURATIONS.textSlideIn,
    ease: ANIMATION_EASING.out,
  })
}

export function animateTextOut(
  splitTextRef: RefObject<SplitText | null>,
  animationTimelineRef: RefObject<gsap.core.Timeline | null>,
  onComplete: () => void,
): void {
  if (!splitTextRef.current?.chars || splitTextRef.current.chars.length === 0) {
    onComplete()
    return
  }

  const chars = splitTextRef.current.chars
  const oldSplitText = splitTextRef.current

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.delayedCall(ANIMATION_DURATIONS.boxAnimationDelay, () => {
        if (oldSplitText) {
          oldSplitText.revert()
        }
        if (splitTextRef.current === oldSplitText) {
          splitTextRef.current = null
        }
        onComplete()
      })
    },
  })

  animationTimelineRef.current = tl

  tl.to(chars, {
    x: '100%',
    opacity: 0,
    duration: ANIMATION_DURATIONS.textSlideOut,
    ease: ANIMATION_EASING.in,
  })
}
