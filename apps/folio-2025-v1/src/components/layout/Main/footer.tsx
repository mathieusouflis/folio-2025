import { Underline } from '@/components/base/underline-content'
import { TDisplay } from '@/components/typograpgy/display'
import { TP } from '@/components/typograpgy/p'
import { firstLetterUppercase } from '@/lib/utils/text/first-letter-uppercase'
import Link from 'next/link'

export function Footer() {
  const email = 'contact@mathieusouflis.com'
  const socialLinks = [
    { href: 'https://www.linkedin.com/in/mathieu-souflis/', name: 'linkedin' },
    { href: 'https://github.com/mathieusouflis', name: 'github' },
    { href: 'https://twitter.com/mathieusouflis', name: 'twitter' },
  ]

  return (
    <footer className="h-screen flex flex-col mr-(--gridMargin) ml-(--gridMargin)">
      <span className="flex items-center justify-center h-full w-full mix-blend-difference text-white">
        <Link href={`mailto:contact@${email}`}>
          <Underline active={false} size="sm">
            <TDisplay className="px-3">Work with me !</TDisplay>
          </Underline>
        </Link>
      </span>
      <div className="flex flex-row justify-between items-center mb-3">
        <TP>©2025</TP>
        <div className="flex flex-row gap-4">
          <Link href={`mailto:${email}`}>
            <Underline>
              <TP>Email</TP>
            </Underline>
          </Link>
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              <Underline>
                <TP>{firstLetterUppercase(link.name)}</TP>
              </Underline>
            </Link>
          ))}
        </div>

        <div className="flex flex-row gap-4 items-center">
          <Link href="/privacy-policy">
            <Underline>
              <TP>Privacy Policy</TP>
            </Underline>
          </Link>
          <Link href="/cgu">
            <Underline>
              <TP>CGU</TP>
            </Underline>
          </Link>
        </div>
      </div>
    </footer>
  )
}
