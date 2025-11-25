import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import './src/lib/env'

const nextConfig: NextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: false,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
