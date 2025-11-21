import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'aboutPage',
  admin: {
    group: 'About',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',

      tabs: [
        {
          name: 'Loader',
          fields: [
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
              name: 'photos',
              type: 'upload',
              relationTo: 'media',
              required: true,
              hasMany: true,
            },
          ],
        },
        {
          name: 'Header',
          fields: [
            {
              name: 'sidePhoto',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'location',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              type: 'array',
              name: 'socials',
              fields: [
                {
                  name: 'name',
                  type: 'text',
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
              name: 'resumee',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'Other',
          fields: [
            {
              type: 'array',
              name: 'experiences',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'company',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'startDate',
                  type: 'date',
                  required: true,
                },
                {
                  name: 'endDate',
                  type: 'date',
                },
              ],
            },
            {
              type: 'array',
              name: 'education',
              fields: [
                {
                  name: 'major',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'school',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'startDate',
                  type: 'date',
                  required: true,
                },
                {
                  name: 'endDate',
                  type: 'date',
                  required: true,
                },
              ],
            },
            {
              type: 'array',
              name: 'awwards',
              fields: [
                {
                  name: 'project',
                  type: 'relationship',
                  relationTo: 'projects',
                  required: true,
                },
                {
                  name: 'awwarder',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'mention',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              type: 'relationship',
              name: 'activities',
              relationTo: 'activities',
              hasMany: true,
              maxRows: 4,
            },
            {
              type: 'relationship',
              name: 'skills',
              relationTo: 'skills',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}
