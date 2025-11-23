import { TP } from '@/components/typograpgy/p'
import { Activity } from '@/payload-types'
import Image from 'next/image'

export function ActivityCard({ activity }: { activity: Activity }) {
  if (typeof activity.cover === 'number') {
    return null
  }

  return (
    <div className="flex flex-col gap-2 items-center max-h-[500px] h-full">
      <Image
        src={activity.cover.url ?? ''}
        alt={activity.name}
        width={3000}
        height={3000}
        className="w-full h-full object-cover"
      />
      <TP className="text-left w-full">{activity.name}</TP>
    </div>
  )
}
