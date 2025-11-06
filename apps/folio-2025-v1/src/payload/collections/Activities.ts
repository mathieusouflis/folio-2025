import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  access: {
    read: () => true,
  },
  admin: {
    group: 'About',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        {
          slug: 'mediasPage',
          fields: [
            {
              name: 'medias',
              type: 'array',
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
                },
                {
                  name: 'date',
                  type: 'date',
                },
                {
                  name: 'folder',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          slug: 'musicPage',
          fields: [
            {
              name: 'approxMinutesPerYear',
              type: 'number',
              required: true,
            },
            {
              name: 'showcasePlaylists',
              type: 'array',
              maxRows: 3,
              fields: [
                {
                  name: 'playlistUrl',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
