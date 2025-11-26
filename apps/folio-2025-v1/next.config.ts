import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import '@/lib/env'
import {env} from "@/lib/env"


const nextConfig: NextConfig = {
  // Your Next.js config here
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  turbopack: {
    resolveAlias: {
      // Turbopack extension resolution
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    },
    resolveExtensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
      '.css',
    ],
  },
  env: Object.fromEntries(
    Object.entries(env).map(([key, value]) => [
      key === 'NODE_ENV' ? 'APP_ENV' : key,
      String(value)
    ])
  )
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
