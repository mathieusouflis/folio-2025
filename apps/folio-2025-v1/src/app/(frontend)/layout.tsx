import React from 'react'
import './styles.css'
import { MainLayout } from '@/components/layout/Main'
import localFont from 'next/font/local'
import { Geist } from 'next/font/google'
import SmoothScrolling from '@/components/contexts/smooth-scroll'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const madeMirage = localFont({
  src: '../../assets/fonts/made-mirage-thin.otf',
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
      <body>
        <SmoothScrolling>
          <MainLayout>{children}</MainLayout>
        </SmoothScrolling>
      </body>
    </html>
  )
}
