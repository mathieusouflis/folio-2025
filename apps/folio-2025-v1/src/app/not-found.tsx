import { Grid, GridItem } from '@/components/layout/Grid'
import './(frontend)/globals.css'
import { cn } from '@/lib/utils/cn'
import { LaunchButton } from '@/features/project/components/launch'
import { GlobalLayout } from '@/components/layout/global'

function BehindLine({ className }: { className?: string }) {
  return (
    <span
      className={cn('absolute -z-10 bg-neutral-800 transition-all duration-300', className)}
    ></span>
  )
}
function PrimaryLine({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'absolute bg-white mix-blend-difference transition-all duration-300',
        className,
      )}
    ></span>
  )
}

export default function NotFound() {
  return (
    <GlobalLayout>
      <Grid className="relative w-screen h-screen items-center overflow-hidden">
        <GridItem start={2} end={3} className="h-[20vh] flex items-end">
          <span className="flex items-center w-full aspect-2/3">
            <LaunchButton url={'/'}>Go Home</LaunchButton>
          </span>
        </GridItem>
        <GridItem start={4} end={9}>
          <Grid withMargins={false} columns={5}>
            <GridItem start={1} end={2} className="h-[20vh] flex items-end">
              <div className="relative aspect-3/7 w-full">
                <div>
                  <PrimaryLine className="animate-grow-h left-0 h-0 w-0.5 bg-white mix-blend-difference "></PrimaryLine>
                  <PrimaryLine className="animate-grow-w bottom-0 h-0.5 w-0 bg-white mix-blend-difference"></PrimaryLine>
                  <PrimaryLine className="animate-grow-h-1-2 -bottom-1/4 right-1/2 h-0 w-0.5 bg-white mix-blend-difference"></PrimaryLine>
                </div>
                <div>
                  <BehindLine className="animate-grow-h-2-screens left-0 -top-[100vh] w-0.5"></BehindLine>
                  <BehindLine className="animate-grow-w-2-screens bottom-0 -left-[100vw] h-0.5"></BehindLine>
                  <BehindLine className="animate-grow-h-2-screens right-1/2 -top-[100vh] w-0.5"></BehindLine>
                </div>
              </div>
            </GridItem>
            <GridItem start={3} end={4} className=" h-[20vh] flex items-end">
              <div className="relative aspect-2/3 w-full">
                <div>
                  <PrimaryLine className="animate-grow-h left-0 h-0 w-0.5 bg-white mix-blend-difference"></PrimaryLine>
                  <PrimaryLine className="animate-grow-w bottom-0 h-0.5 w-0 bg-white mix-blend-difference"></PrimaryLine>
                  <PrimaryLine className="animate-grow-w top-0 h-0.5 w-0 bg-white mix-blend-difference"></PrimaryLine>
                  <PrimaryLine className="animate-grow-h right-0 h-0 w-0.5 bg-white mix-blend-difference"></PrimaryLine>
                </div>
                <div>
                  <BehindLine className="animate-grow-h-2-screens left-0 -top-[100vh] w-0.5"></BehindLine>
                  <BehindLine className="animate-grow-w-2-screens top-0 -left-[100vw] h-0.5"></BehindLine>
                  <BehindLine className="animate-grow-h-2-screens right-0 -top-[100vh] w-0.5"></BehindLine>
                </div>
              </div>
            </GridItem>
            <GridItem start={5} end={6} className="h-[20vh] flex items-end">
              <div className="relative aspect-3/7 w-full">
                <div>
                  <PrimaryLine className="animate-grow-h left-0 h-0 w-0.5 bg-white mix-blend-difference"></PrimaryLine>
                  <PrimaryLine className="animate-grow-w bottom-0 h-0.5 w-0 bg-white mix-blend-difference"></PrimaryLine>
                  <PrimaryLine className="animate-grow-h-1-2 -bottom-1/4 right-1/2 h-0 w-0.5 bg-white mix-blend-difference"></PrimaryLine>
                </div>
                <div>
                  <BehindLine className="animate-grow-h-2-screens left-0 -top-[100vh] w-0.5"></BehindLine>
                  <BehindLine className="animate-grow-h-2-screens right-1/2 -top-[100vh] w-0.5"></BehindLine>
                </div>
              </div>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem start={10} end={11} className="h-[20vh] flex items-end">
          <span className="flex items-center w-full aspect-2/3">
            <LaunchButton url={'/'}>Go Home</LaunchButton>
          </span>
        </GridItem>
      </Grid>
    </GlobalLayout>
  )
}
