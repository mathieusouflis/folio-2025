import { cn } from '@/lib/utils/cn'

function Corner({
  className,
  position,
}: {
  className?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}) {
  return (
    <div
      className={cn(
        'absolute w-1/10 aspect-square',
        'before:block before:absolute before:content-[""] before:w-full before:h-px before:bg-black',
        'after:block after:absolute after:content-[""] after:w-px after:h-full after:bg-black',
        className,
        position === 'top-left' &&
          'top-0 left-0 before:top-0 before:left-0 after:top-0 after:left-0',
        position === 'top-right' &&
          'top-0 right-0 before:top-0 before:right-0 after:top-0 after:right-0 ',
        position === 'bottom-left' &&
          'bottom-0 left-0 before:bottom-0 before:left-0 after:bottom-0 after:left-0',
        position === 'bottom-right' &&
          'bottom-0 right-0 before:bottom-0 before:right-0 after:bottom-0 after:right-0',
      )}
    ></div>
  )
}

export function ShowReel({
  url,
  className,
  ...props
}: { url: string; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-lg w-[calc(25%-9px)] aspect-16/10', className)} {...props}>
      <div className="relative flex p-3 h-full w-full">
        <Corner position="top-left" />
        <Corner position="top-right" />
        <Corner position="bottom-left" />
        <Corner position="bottom-right" />
        <video className="w-full h-full" src={url} />
      </div>
    </div>
  )
}
