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
      name: 'email',
      type: 'email',
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Dribble', value: 'dribble' },
            { label: 'Behance', value: 'behance' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'join',
      name: 'relatedProjects',
      collection: 'projects',
      on: 'collaborators.collaborator',
    },
  ],
}
