import React from 'react'
import './styles.css'
import { MainLayout } from '@/components/layout/Main'
import localFont from 'next/font/local'
import { Geist } from 'next/font/google'
import SmoothScrolling from '@/components/contexts/smooth-scroll'
import { ThemeProvider } from '@/components/contexts/theme'
import { CursorProvider } from '@/components/contexts/follow-cursor'

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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${madeMirage.variable} ${geist.variable}`}>
      <body className="antialiased bg-background text-foreground transition-colors duration-200">
        <SmoothScrolling>
          <ThemeProvider>
            <CursorProvider>
              <MainLayout>{children}</MainLayout>
            </CursorProvider>
          </ThemeProvider>
        </SmoothScrolling>
      </body>
    </html>
  )
}
