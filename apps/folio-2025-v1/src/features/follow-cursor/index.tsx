'use client'

import { useRef } from 'react'
import { useCursor } from '@/components/contexts/follow-cursor'
import { useCursorPoint } from './hooks/useCursorPoint'
import { useTextBox } from './hooks/useTextBox'
import { useTextTransition } from './hooks/useTextTransition'
import { CursorPoint } from './components/CursorPoint'
import { TextBox } from './components/TextBox'

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
    <>
      <CursorPoint ref={pointRef} />
      <TextBox ref={textBoxRef} textContentRef={textContentRef} displayText={displayText} />
    </>
  )
}
