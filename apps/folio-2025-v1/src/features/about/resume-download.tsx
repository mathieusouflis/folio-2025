import { TP } from '@/components/typograpgy/p'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

export function ResumeDownload({
  url,
  children,
  className,
}: {
  url: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={url}
      className={cn(`relative w-full py-5 flex items-center justify-center group`, className)}
    >
      <span className="absolute top-0 left-0 w-px h-[15px] bg-muted transition-all duration-200 ease-in-out group-hover:h-[25px]" />
      <span className="absolute top-0 left-0 h-px w-[15px] bg-muted transition-all duration-200 ease-in-out group-hover:w-[25px]" />

      <span className="absolute bottom-0 left-0 h-px w-[15px] bg-muted transition-all duration-200 ease-in-out group-hover:w-[25px]" />
      <span className="absolute bottom-0 left-0 w-px h-[15px] bg-muted transition-all duration-200 ease-in-out group-hover:h-[25px]" />

      <span className="absolute top-0 right-0 h-px w-[15px] bg-muted transition-all duration-200 ease-in-out group-hover:w-[25px]" />
      <span className="absolute top-0 right-0 w-px h-[15px] bg-muted transition-all duration-200 ease-in-out group-hover:h-[25px]" />

      <span className="absolute bottom-0 right-0 w-px h-[15px] bg-muted transition-all duration-200 ease-in-out group-hover:h-[25px]" />
      <span className="absolute bottom-0 right-0 h-px w-[15px] bg-muted transition-all duration-200 ease-in-out group-hover:w-[25px]" />

      <TP className="text-[16px]">{children}</TP>
    </Link>
  )
}
