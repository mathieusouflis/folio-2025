import type { CollectionConfig } from 'payload'

export const SkillsEnum: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    group: 'Custom Enums',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: true,
    },
  ],
}
