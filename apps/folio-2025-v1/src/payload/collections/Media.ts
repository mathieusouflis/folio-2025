import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Root Collections',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: '4/3',
        width: 1920,
        height: (1920 / 4) * 3,
      },
      {
        name: '16/10',
        width: 1920,
        height: (1920 / 16) * 10,
      },
      {
        name: '16/9',
        width: 1920,
        height: (1920 / 16) * 9,
      },
      {
        name: '21/09',
        width: 1920,
        height: (1920 / 21) * 9,
      },
      {
        name: '5/1',
        width: 1920,
        height: 1920 / 5,
      },
    ],
  },
}
