import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'checkbox',
      name: 'archive',
      defaultValue: false,
      required: true,
    },
    {
      type: 'upload',
      name: 'cover',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'upload',
      name: 'showreel',
      relationTo: 'media',
    },
    {
      type: 'text',
      name: 'title',
      required: true,
    },
    {
      type: 'textarea',
      name: 'description',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'clientName',
        },
        {
          type: 'text',
          name: 'clientUrl',
        },
      ],
    },
    {
      type: 'relationship',
      relationTo: 'skills',
      name: 'skills',
      hasMany: true,
    },
    {
      type: 'relationship',
      relationTo: 'projectTypes',
      name: 'projectType',
      hasMany: false,
    },
    {
      type: 'date',
      name: 'endDate',
      required: true,
    },
    {
      type: 'array',
      name: 'collaborators',
      fields: [
        {
          type: 'relationship',
          name: 'collaborator',
          relationTo: 'collaborators',
        },

        {
          type: 'relationship',
          name: 'roles',
          relationTo: 'roles',
          hasMany: true,
          admin: {
            allowCreate: true,
            allowEdit: true,
          },
        },
      ],
    },
    {
      type: 'array',
      name: 'images',
      fields: [
        {
          type: 'upload',
          relationTo: 'media',
          name: 'image',
        },
        {
          type: 'text',
          name: 'description',
        },
      ],
    },
    {
      type: 'blocks',
      name: 'projectContent',
      blocks: [
        {
          slug: 'projectSection',
          fields: [
            {
              type: 'text',
              name: 'title',
              required: true,
            },
            {
              type: 'richText',
              name: 'content',
              required: true,
            },
            {
              type: 'array',
              name: 'images',
              fields: [
                {
                  type: 'upload',
                  name: 'image',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
