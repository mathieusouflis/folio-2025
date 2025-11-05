import type { CollectionConfig } from 'payload'

export const RolesEnum: CollectionConfig = {
  slug: 'roles',
  admin: {
    useAsTitle: 'roleName',
    group: 'Custom Enums',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'roleName',
      type: 'text',
      required: true,
    },
  ],
}
