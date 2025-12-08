'use client'
import { Underline } from '@/components/base/underline-content'
import { TP } from '@/components/typograpgy/p'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

export function LaunchButton({
  url,
  className,
  children,
}: {
  url: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Link href={url} className={cn('relative w-fit h-fit px-1 py-0.5', className)}>
      <Underline active={false}>
        <TP className={cn('text-white text-[15px] mix-blend-difference w-max font-medium px-1')}>
          {children || 'Launch Website'}
        </TP>
      </Underline>
    </Link>
  )
}
