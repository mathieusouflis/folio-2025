import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import './src/lib/env'

const nextConfig: NextConfig = {
  // Your Next.js config here
  turbopack: {
    resolveAlias: {
      // Turbopack extension resolution
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    },
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', '.css'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
