'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CursorContextType {
  x: number
  y: number
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
  cursorActions: {
    old: CursorActionType[]
    new: CursorActionType[]
  }
  setCursorActions: (actions: CursorActionType[]) => void
  clearCursorActions: () => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export type CursorActionText = {
  type: 'text-out' | 'text-in'
  content: string
}

type CursorActionType =
  | {
      type: 'hover' | 'click'
    }
  | CursorActionText

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [cursorActions, contextSetCursorActions] = useState<{
    old: CursorActionType[]
    new: CursorActionType[]
  }>({
    old: [],
    new: [],
  })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setX(e.clientX)
      setY(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  function setCursorActions(actions: CursorActionType[]) {
    contextSetCursorActions((prevState) => ({
      old: prevState.new,
      new: actions,
    }))
  }

  function clearCursorActions() {
    contextSetCursorActions((prevState) => ({
      old: prevState.new,
      new: [],
    }))
  }

  return (
    <CursorContext.Provider
      value={{
        x,
        y,
        isVisible,
        setIsVisible,
        cursorActions,
        setCursorActions,
        clearCursorActions,
      }}
    >
      {children}
    </CursorContext.Provider>
  )
}

export const useCursor = () => {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
