import React from 'react'
import './globals.css'
import { MainLayout } from '@/components/layout/Main'
import { GlobalLayout } from '@/components/layout/global'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <GlobalLayout>
      <MainLayout>{children}</MainLayout>
    </GlobalLayout>
  )
}
