import { useGSAP } from '@gsap/react'
import { RefObject } from 'react'
import { gsap } from 'gsap'
import { calculatePosition } from '../utils/calculations'
import {
  ANIMATION_DURATIONS,
  ANIMATION_EASING,
  CURSOR_SIZES,
} from '../constants'

export function useCursorPoint(
  pointRef: RefObject<HTMLDivElement | null>,
  x: number,
  y: number,
  isVisible: boolean,
  cursorActions: {
    old: Array<{ type: string }>
    new: Array<{ type: string }>
  },
): void {
  // Animate point position
  useGSAP(() => {
    if (!pointRef.current || !isVisible) return

    const { x: pointX, y: pointY } = calculatePosition(pointRef, x, y)
    gsap.to(pointRef.current, {
      x: pointX,
      y: pointY,
      duration: ANIMATION_DURATIONS.pointMove,
      ease: ANIMATION_EASING.default,
    })
  }, [x, y, isVisible])

  // Animate point size on hover
  useGSAP(() => {
    const hasHover = cursorActions.new.some((action) => action.type === 'hover')
    const hadHover = cursorActions.old.some((action) => action.type === 'hover')

    if (hasHover && !hadHover) {
      gsap.killTweensOf(pointRef.current)
      gsap.to(pointRef.current, {
        width: CURSOR_SIZES.hover,
        height: CURSOR_SIZES.hover,
        duration: ANIMATION_DURATIONS.hoverExpand,
        ease: ANIMATION_EASING.default,
      })
    } else if (!hasHover && hadHover) {
      gsap.to(pointRef.current, {
        width: CURSOR_SIZES.default,
        height: CURSOR_SIZES.default,
        duration: ANIMATION_DURATIONS.hoverCollapse,
        ease: ANIMATION_EASING.default,
      })
    }
  }, [cursorActions])
}

