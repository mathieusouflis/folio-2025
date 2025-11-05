import { Footer } from './footer'
import { GridPreview } from './grid-preview'
import { Nav } from './nav'
import { Time } from './time'

export function MainLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <GridPreview />
      <Nav />
      <main className="flex flex-col mx-(--gridMargin)">
        <Time className="fixed left-2 bottom-2" />
        {props.children}
      </main>
      <Footer />
    </>
  )
}
