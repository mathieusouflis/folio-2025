import { NavLinks } from '@/components/base/nav-links'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { BrandIcon } from '@/components/base/brand-icon'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-(--gridMargin) py-2 flex flex-row justify-between text-foreground mix-blend-difference transition-colors duration-300">
      <BrandIcon size={'xl'} color="white" />
      <div className="flex flex-row items-center gap-5 text-white">
        <NavLinks href="/">Works</NavLinks>
        <NavLinks href="/archives">Archives</NavLinks>
        <NavLinks href="/about">About</NavLinks>
        <Link
          href="mailto:contact@mathieusouflis.com"
          className="flex items-center text-inherit transition-colors hover:text-muted"
        >
          <Icon icon={Mail} size={'md'} />
        </Link>
        <ThemeToggle className="ml-3 absolute right-1 top-1" />
      </div>
    </nav>
  )
}
