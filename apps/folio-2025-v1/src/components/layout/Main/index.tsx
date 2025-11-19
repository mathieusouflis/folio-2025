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
      <main className="flex flex-col">{props.children}</main>
      <Footer />
    </>
  )
}
