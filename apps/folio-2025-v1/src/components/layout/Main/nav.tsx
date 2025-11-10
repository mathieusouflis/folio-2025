import { NavLinks } from '@/components/base/nav-links'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { BrandIcon } from '@/components/base/brand-icon'

export function Nav() {
  return (
    <nav className="fixed z-50 top-0 left-0 w-full py-2 px-(--gridMargin) flex flex-row justify-between mix-blend-difference">
      <BrandIcon size={'xl'} color="white" />
      <div className="flex flex-row gap-5 items-center text-white">
        <NavLinks href="/">Works</NavLinks>
        <NavLinks href="/archives">Archives</NavLinks>
        <NavLinks href="/about">About</NavLinks>
        <Link href="mailto:contact@mathieusouflis.com" className="flex">
          <Icon icon={Mail} size={'md'} />
        </Link>
      </div>
    </nav>
  )
}
