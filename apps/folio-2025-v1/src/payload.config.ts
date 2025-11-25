import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { PAYLOAD_SECRET, DATABASE_URI, env } from './lib/env'
import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Collaborators } from './payload/collections/Collaborators'
import { Projects } from './payload/collections/Projects'
import { RolesEnum } from './payload/collections/custom-enums/RolesEnum'
import { ProjectTypesEnum } from './payload/collections/custom-enums/ProjectTypesEnum'
import { SkillsEnum } from './payload/collections/custom-enums/SkillsEnum'
import { AboutPage } from './payload/collections/globals/About'
import { Activities } from './payload/collections/Activities'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Media,
    Collaborators,
    Projects,
    RolesEnum,
    ProjectTypesEnum,
    SkillsEnum,
    Activities,
  ],
  globals: [AboutPage],
  editor: lexicalEditor(),
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: DATABASE_URI,
    },
  }),
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  plugins: [
    // payloadCloudPlugin(),
    // storage-adapter-placeholder

    ...(env.IS_PRODUCTION
      ? [
          s3Storage({
            enabled: env.IS_PRODUCTION,
            bucket: env.BUCKET_NAME,
            collections: {
              media: {
                signedDownloads: true,
                prefix: 'media',
              },
            },
            config: {
              endpoint: env.BUCKET_ENDPOINT,
              region: 'eu-central-1',
              credentials: {
                accessKeyId: env.BUCKET_ACCESS_KEY_ID,
                secretAccessKey: env.BUCKET_SECRET_ACCESS_KEY,
              },
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
})
