import type { CollectionConfig } from 'payload'

export const ProjectTypesEnum: CollectionConfig = {
  slug: 'projectTypes',
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
  ],
}
