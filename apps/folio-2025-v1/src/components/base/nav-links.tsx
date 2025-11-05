'use client'

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
      <span className={isActive || hovered ? 'opacity-100' : 'opacity-0'}>( </span>
      {props.children}
      <span className={isActive || hovered ? 'opacity-100' : 'opacity-0'}> )</span>
    </Link>
  )
}
