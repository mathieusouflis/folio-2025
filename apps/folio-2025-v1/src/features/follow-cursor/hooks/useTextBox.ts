import { useGSAP } from '@gsap/react'
import { RefObject } from 'react'
import { gsap } from 'gsap'
import { ANIMATION_DURATIONS, ANIMATION_EASING, TEXT_BOX_ROTATION } from '../constants'

export function useTextBox(
  textBoxRef: RefObject<HTMLDivElement | null>,
  x: number,
  y: number,
  cursorActions: {
    old: Array<{ type: string }>
    new: Array<{ type: string }>
  },
  displayText: string,
): void {
  // Animate text box position
  useGSAP(() => {
    gsap.to(textBoxRef.current, {
      x,
      y,
      duration: ANIMATION_DURATIONS.textBoxMove,
      ease: ANIMATION_EASING.default,
    })
  }, [x, y])

  // Animate text box appearance/disappearance
  useGSAP(() => {
    const hasTextOut = cursorActions.new.some((action) => action.type === 'text-out')
    const hadTextOut = cursorActions.old.some((action) => action.type === 'text-out')

    if (hasTextOut && !hadTextOut) {
      gsap.killTweensOf(textBoxRef.current)
      gsap.to(textBoxRef.current, {
        opacity: 1,
        rotate: TEXT_BOX_ROTATION.default,
        duration: ANIMATION_DURATIONS.textBoxAppear,
        ease: ANIMATION_EASING.default,
      })
    } else if (!hasTextOut && hadTextOut) {
      if (textBoxRef.current && displayText) {
        gsap.killTweensOf(textBoxRef.current)
        gsap.to(textBoxRef.current, {
          opacity: 0,
          rotate: TEXT_BOX_ROTATION.exit,
          duration: ANIMATION_DURATIONS.textBoxDisappear,
          ease: ANIMATION_EASING.default,
        })
      }
    }
  }, [cursorActions, displayText])
}
