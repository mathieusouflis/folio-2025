'use client'
import { TP } from '@/components/typograpgy/p'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

export function LaunchButton({ url, className }: { url: string; className?: string }) {
  return (
    <Link href={url} className={cn('relative w-fit h-fit group px-1 py-0.5', className)}>
      <span className="absolute bg-black w-full h-0 left-0 -bottom-px transition-all duration-300 group-hover:h-full"></span>
      <TP className={cn('text-white mix-blend-difference w-max font-medium')}>Launch Website</TP>
    </Link>
  )
}
