import { FollowCursor } from '@/features/follow-cursor'
import { Footer } from './footer'
import { GridPreview } from './grid-preview'
import { Nav } from './nav'
import { Time } from './time'

export function MainLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <FollowCursor />
      <GridPreview />
      <Nav />
      <main className="flex flex-col">
        <Time className="fixed left-2 bottom-2 mix-blend-difference" />
        {props.children}
      </main>
      <Footer />
    </>
  )
}
