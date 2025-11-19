import { Project } from '@/payload-types'

export const CATEGORIES: {
  key: keyof Project
  displayName: string
}[] = [
  {
    key: 'clientName',
    displayName: 'Client Name',
  },
  {
    key: 'skills',
    displayName: 'Skills',
  },
  {
    key: 'endDate',
    displayName: 'End Date',
  },
] as const
