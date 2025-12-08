import localFont from 'next/font/local'
import { CursorProvider } from '../contexts/follow-cursor'
import { GridOverlayProvider } from '../contexts/grid-overlay'
import SmoothScrolling from '../contexts/smooth-scroll'
import { ThemeProvider } from '../contexts/theme'
import { Geist } from 'next/font/google'
import { FollowCursor } from '@/features/follow-cursor'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const madeMirage = localFont({
  src: [
    {
      path: '../../assets/fonts/made-mirage-thin.otf',
      weight: '100',
    },
    {
      path: '../../assets/fonts/made-mirage-regular.otf',
      weight: '400',
    },
  ],
  variable: '--font-made-mirage',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export function GlobalLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${madeMirage.variable} ${geist.variable}`}>
      <body className="antialiased bg-background text-foreground transition-colors duration-200">
        <SmoothScrolling>
          <ThemeProvider>
            <GridOverlayProvider>
              <CursorProvider>
                <FollowCursor />
                {children}
              </CursorProvider>
            </GridOverlayProvider>
          </ThemeProvider>
        </SmoothScrolling>
      </body>
    </html>
  )
}
