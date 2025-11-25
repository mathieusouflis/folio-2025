import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '../../../../')

config({ path: resolve(rootDir, '.env') })
config({ path: resolve(rootDir, '.env.local'), override: true })

function getEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

function getEnvOptional(key: string, fallback = ''): string {
  return process.env[key] || fallback
}

export const DATABASE_URI = getEnvOptional(
  'DATABASE_URI',
  getEnvOptional('DATABASE_DEV_URI', 'postgresql://localhost:5432/payload'),
)

export const PAYLOAD_SECRET = getEnv('PAYLOAD_SECRET')

export const BLOB_READ_WRITE_TOKEN = getEnvOptional('BLOB_NEXT_READ_WRITE_TOKEN')

export const NODE_ENV = getEnvOptional('NODE_ENV', 'development')
export const IS_PRODUCTION = NODE_ENV === 'production'
export const IS_DEVELOPMENT = NODE_ENV === 'development'

export const env = {
  DATABASE_URI,
  PAYLOAD_SECRET,
  BLOB_READ_WRITE_TOKEN,
  NODE_ENV,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
} as const
