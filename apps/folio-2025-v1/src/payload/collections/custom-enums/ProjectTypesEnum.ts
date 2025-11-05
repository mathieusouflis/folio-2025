import type { CollectionConfig } from 'payload'

export const ProjectTypesEnum: CollectionConfig = {
  slug: 'projectTypes',
  admin: {
    useAsTitle: 'type',
    group: 'Custom Enums',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      type: 'text',
      required: true,
    },
  ],
}
