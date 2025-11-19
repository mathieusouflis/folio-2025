'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

export type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  isDark: boolean
  isReady: boolean
  setTheme: (theme: Theme, options?: { persist?: boolean }) => void
  toggleTheme: (options?: { persist?: boolean }) => void
}

const STORAGE_KEY = 'folio-theme-preference'

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [isReady, setIsReady] = useState(false)
  const [shouldPersist, setShouldPersist] = useState(false)

  const syncThemeToDocument = useCallback((nextTheme: Theme) => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    if (nextTheme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }

    root.style.colorScheme = nextTheme
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      setThemeState(stored)
      syncThemeToDocument(stored)
      setShouldPersist(true)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const resolvedTheme = prefersDark ? 'dark' : 'light'
      setThemeState(resolvedTheme)
      syncThemeToDocument(resolvedTheme)
      setShouldPersist(false)
    }

    setIsReady(true)
  }, [syncThemeToDocument])

  useEffect(() => {
    if (!isReady || typeof window === 'undefined') return

    if (shouldPersist) {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [theme, isReady, shouldPersist])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (shouldPersist) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const syncWithSystem = (value: boolean) => {
      setThemeState(value ? 'dark' : 'light')
    }

    syncWithSystem(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => {
      syncWithSystem(event.matches)
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener)
      return () => mediaQuery.removeEventListener('change', listener)
    } else {
      mediaQuery.addListener(listener)
      return () => mediaQuery.removeListener(listener)
    }
  }, [shouldPersist])

  useEffect(() => {
    if (!isReady) return

    syncThemeToDocument(theme)
  }, [theme, isReady, syncThemeToDocument])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const body = document.body
    body.classList.add('theme-transition')

    return () => {
      body.classList.remove('theme-transition')
    }
  }, [])

  const setTheme = useCallback((nextTheme: Theme, options?: { persist?: boolean }) => {
    const persistValue = options?.persist ?? true
    setShouldPersist(persistValue)
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = useCallback((options?: { persist?: boolean }) => {
    const persistValue = options?.persist ?? true
    setShouldPersist(persistValue)
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: theme === 'dark',
      isReady,
      setTheme,
      toggleTheme,
    }),
    [theme, isReady, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
