'use client'

import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function NavLinks(props: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const [hovered, setHovered] = useState(false)
  const isActive = pathname === props.href

  return (
    <Link
      href={props.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={cn(
          'transition-all duration-200',
          isActive || hovered ? 'opacity-100' : 'opacity-0',
        )}
      >
        ({' '}
      </span>
      {props.children}
      <span
        className={cn(
          'transition-all duration-200',
          isActive || hovered ? 'opacity-100' : 'opacity-0',
        )}
      >
        {' '}
        )
      </span>
    </Link>
  )
}
