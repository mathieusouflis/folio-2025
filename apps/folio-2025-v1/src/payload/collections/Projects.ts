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
      type: 'text',
      name: 'projectUrl',
    },
    {
      type: 'text',
      name: 'title',
      required: true,
    },
    {
      type: 'text',
      name: 'subtitle',
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
      name: 'projectContents',
      fields: [
        {
          type: 'array',
          name: 'images',
          maxRows: 3,
          fields: [
            {
              type: 'upload',
              name: 'image',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Recommended sizes: (4/3 | 16/10 | 16/9 | 21/9 | 5/1)',
              },
            },
          ],
        },
        {
          type: 'select',
          name: 'display',
          options: [
            { label: 'Columns', value: 'columns' },
            { label: 'Rows', value: 'rows' },
            { label: 'Grid', value: 'grid' },
          ],
        },
        {
          type: 'richText',
          name: 'description',
        },
      ],
    },
  ],
}
