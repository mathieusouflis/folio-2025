'use client'
import { cn } from '@/lib/utils/cn'
import { useEffect, useState } from 'react'

export function Time(props: { className?: string }) {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return <p className="text-white">&nbsp;</p>
  }

  return <p className={cn(props.className, 'text-white')}>{currentTime}</p>
}
