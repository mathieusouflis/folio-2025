import { FollowCursor } from '@/features/follow-cursor'
import { Footer } from './footer'
import { GridPreview } from './grid-preview'
import { Nav } from './nav'
import { GridOverlayToggle } from '@/components/ui/grid-overlay-toggle'

export function MainLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <GridPreview />
      <Nav />
      <main className="flex flex-col">{props.children}</main>
      <GridOverlayToggle className="fixed bottom-2 left-2" />
      <Footer />
    </>
  )
}
