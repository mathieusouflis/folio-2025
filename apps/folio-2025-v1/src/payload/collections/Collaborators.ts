import type { CollectionConfig } from 'payload'

export const Collaborators: CollectionConfig = {
  slug: 'collaborators',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'displayName',
  },
  hooks: {
    beforeChange: [
      (args) => {
        args.data.displayName = `${args.data.firstName} ${args.data.lastName}`
        return args.data
      },
    ],
  },
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'displayName',
      type: 'text',
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: 'folioOwner',
      type: 'checkbox',
      hidden: false,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      type: 'join',
      name: 'relatedProjects',
      collection: 'projects',
      on: 'collaborators.collaborator',
    },
  ],
}
