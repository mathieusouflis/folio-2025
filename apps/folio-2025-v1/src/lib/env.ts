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
    throw new Error(`Missing required NODE_ENV variable: ${key}`)
  }
  return value
}

function getEnvOptional(key: string, fallback = ''): string {
  if (!process.env[key]) {
    console.warn(`Missing optional NODE_ENV variable: ${key}\nSetting it to ${fallback}`)
  }
  return process.env[key] || fallback
}

export const NODE_ENV = getEnvOptional('NODE_ENV', 'development')
export const IS_PRODUCTION = NODE_ENV === 'production'
export const IS_DEVELOPMENT = NODE_ENV === 'development'

export const DATABASE_URI = IS_PRODUCTION
  ? getEnv('DATABASE_URI')
  : getEnvOptional('DATABASE_DEV_URI', 'postgresql://localhost:5432/payload')

export const PAYLOAD_SECRET = getEnv('PAYLOAD_SECRET')

export const BUCKET_ACCESS_KEY_ID = getEnvOptional('BUCKET_ACCESS_KEY_ID')
export const BUCKET_SECRET_ACCESS_KEY = getEnvOptional('BUCKET_SECRET_ACCESS_KEY')
export const BUCKET_ENDPOINT = getEnvOptional('BUCKET_ENDPOINT')
export const BUCKET_NAME = getEnvOptional('BUCKET_NAME')

export const env = {
  DATABASE_URI,
  PAYLOAD_SECRET,
  NODE_ENV,
  BUCKET_ACCESS_KEY_ID,
  BUCKET_SECRET_ACCESS_KEY,
  BUCKET_ENDPOINT,
  BUCKET_NAME,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
} as const
