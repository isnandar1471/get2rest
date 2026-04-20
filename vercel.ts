import type { VercelConfig } from '@vercel/config/v1'

export const config: VercelConfig = {
  functions: {
    'api/**/*.ts': {
      memory: 1024,
      maxDuration: 30,
    },
  },
}
