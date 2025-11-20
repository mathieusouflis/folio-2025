'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from 'react'

type GridOverlayContextValue = {
  isOverlayVisible: boolean
  toggleOverlay: () => void
  showOverlay: () => void
  hideOverlay: () => void
}

const STORAGE_KEY = 'folio-grid-overlay-visible'
const GridOverlayContext = createContext<GridOverlayContextValue | undefined>(undefined)

export function GridOverlayProvider({ children }: PropsWithChildren) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    if (storedValue === 'true') {
      setIsOverlayVisible(true)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, String(isOverlayVisible))
  }, [isOverlayVisible])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === 'g') {
        event.preventDefault()
        setIsOverlayVisible((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleOverlay = useCallback(() => {
    setIsOverlayVisible((prev) => !prev)
  }, [])

  const showOverlay = useCallback(() => {
    setIsOverlayVisible(true)
  }, [])

  const hideOverlay = useCallback(() => {
    setIsOverlayVisible(false)
  }, [])

  const contextValue = useMemo<GridOverlayContextValue>(
    () => ({
      isOverlayVisible,
      toggleOverlay,
      showOverlay,
      hideOverlay,
    }),
    [isOverlayVisible, toggleOverlay, showOverlay, hideOverlay],
  )

  useEffect(() => {
    const root = document.documentElement
    if (isOverlayVisible) {
      root.setAttribute('data-grid-overlay', 'true')
    } else {
      root.removeAttribute('data-grid-overlay')
    }
  }, [isOverlayVisible])

  return <GridOverlayContext.Provider value={contextValue}>{children}</GridOverlayContext.Provider>
}

export function useGridOverlay(): GridOverlayContextValue {
  const context = useContext(GridOverlayContext)

  if (!context) {
    throw new Error('useGridOverlay must be used within a GridOverlayProvider')
  }

  return context
}
