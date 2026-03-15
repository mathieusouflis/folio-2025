'use client'

import { useRef } from 'react'
import { useCursor } from '@/components/contexts/follow-cursor'
import { useCursorPoint } from './hooks/useCursorPoint'
import { useTextBox } from './hooks/useTextBox'
import { useTextTransition } from './hooks/useTextTransition'
import { CursorPoint } from './components/CursorPoint'

export function FollowCursor() {
  const pointRef = useRef<HTMLDivElement>(null)
  const textBoxRef = useRef<HTMLDivElement>(null)
  const textContentRef = useRef<HTMLParagraphElement>(null)
  const { x, y, isVisible, cursorActions } = useCursor()

  const displayText = useTextTransition(textContentRef)

  useCursorPoint(pointRef, x, y, isVisible, cursorActions)
  useTextBox(textBoxRef, x, y, cursorActions, displayText)

  if (!isVisible) return null

  return (
    <span className='fixed z-1000 pointer-events-none flex items-center justify-center' ref={pointRef}>
      <span className="relative w-full h-full flex-items-center justify-center">
      {/*<CursorContainer>*/}
        <CursorPoint />
      {/*</CursorContainer>*/}
      </span>
    </span>
  )
}
