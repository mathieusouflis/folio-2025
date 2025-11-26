// NEXT_PUBLIC_LOCAL_ENVIRONEMENT contrôle si on est en environnement local/dev
// true = environnement local/dev, false ou absent = production
const isLocalEnvironment = process.env.NEXT_PUBLIC_LOCAL_ENVIRONEMENT === 'true'

export const IS_LOCAL = isLocalEnvironment
export const IS_PRODUCTION = !isLocalEnvironment
export const IS_DEVELOPMENT = isLocalEnvironment

export const envClient = {
  IS_LOCAL,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
} as const
