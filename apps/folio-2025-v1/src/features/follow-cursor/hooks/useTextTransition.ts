import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { CursorActionText, useCursor } from '@/components/contexts/follow-cursor'
import { SplitText } from 'gsap/SplitText'
import { gsap } from 'gsap'
import {
  killAllTextAnimations,
  cleanupSplitText,
  animateTextIn,
  animateTextOut,
} from '../utils/text-animation'

export function useTextTransition(textContentRef: React.RefObject<HTMLParagraphElement | null>) {
  const { cursorActions } = useCursor()
  const pathname = usePathname()

  const [displayText, setDisplayText] = useState('')
  const splitTextRef = useRef<SplitText | null>(null)
  const isTransitioningRef = useRef(false)
  const nextTextRef = useRef<string | null>(null)
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Cleanup on route change
  useEffect(() => {
    return () => {
      killAllTextAnimations(splitTextRef, animationTimelineRef)
      cleanupSplitText(splitTextRef)
      setDisplayText('')
      isTransitioningRef.current = false
      nextTextRef.current = null
    }
  }, [pathname])

  // Handle text changes
  useEffect(() => {
    const newTextAction = cursorActions.new.find(
      (action) => action.type === 'text-out',
    ) as CursorActionText
    const newText = newTextAction?.content || ''

    if (newText && newText !== displayText) {
      handleNewText(newText)
    } else if (!newText && displayText) {
      handleTextDisappear()
    }
  }, [cursorActions, displayText])

  function handleNewText(newText: string) {
    if (isTransitioningRef.current) {
      interruptTransition(newText)
    } else {
      transitionToNewText(newText)
    }
  }

  function interruptTransition(newText: string) {
    nextTextRef.current = null
    isTransitioningRef.current = false
    killAllTextAnimations(splitTextRef, animationTimelineRef)
    cleanupSplitText(splitTextRef)
    setDisplayText(newText)
    requestAnimationFrame(() => {
      animateTextIn(
        textContentRef,
        splitTextRef,
        animationTimelineRef,
        isTransitioningRef,
      )
    })
  }

  function transitionToNewText(newText: string) {
    killAllTextAnimations(splitTextRef, animationTimelineRef)
    const oldSplitText = splitTextRef.current
    setDisplayText(newText)
    isTransitioningRef.current = true

    if (oldSplitText) {
      oldSplitText.revert()
    }
    if (splitTextRef.current === oldSplitText) {
      splitTextRef.current = null
    }

    requestAnimationFrame(() => {
      animateTextIn(
        textContentRef,
        splitTextRef,
        animationTimelineRef,
        isTransitioningRef,
      )
    })
  }

  function handleTextDisappear() {
    if (isTransitioningRef.current) {
      queueExit()
    } else {
      exitText()
    }
  }

  function queueExit() {
    nextTextRef.current = ''
    isTransitioningRef.current = false
    killAllTextAnimations(splitTextRef, animationTimelineRef)
  }

  function exitText() {
    if (nextTextRef.current !== null && nextTextRef.current !== '') {
      showQueuedText()
    } else {
      animateTextOut(splitTextRef, animationTimelineRef, cleanup)
    }
  }

  function showQueuedText() {
    const queuedText = nextTextRef.current!
    nextTextRef.current = null
    cleanupSplitText(splitTextRef)
    setDisplayText(queuedText)
    requestAnimationFrame(() => {
      animateTextIn(textContentRef, splitTextRef, animationTimelineRef, isTransitioningRef)
    })
  }

  function cleanup() {
    if (nextTextRef.current === null || nextTextRef.current === '') {
      setDisplayText('')
    }
    cleanupSplitText(splitTextRef)
    killAllTextAnimations(splitTextRef, animationTimelineRef)
  }

  return displayText
}
