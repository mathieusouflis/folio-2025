import type { CollectionConfig } from 'payload'

export const SkillsEnum: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'skill',
    group: 'Custom Enums',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'skill',
      type: 'text',
      required: true,
    },
  ],
}
