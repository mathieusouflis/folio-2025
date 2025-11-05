import { NavLinks } from '@/components/base/nav-links'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { BrandIcon } from '@/components/base/brand-icon'

export function Nav() {
  return (
    <nav className="my-2 mx-(--gridMargin) flex flex-row justify-between">
      <BrandIcon size={'xl'} />
      <div className="flex flex-row gap-5 items-center">
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
