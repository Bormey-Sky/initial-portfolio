import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const DATA_PATH = resolve('server/data/stats.json')

  if (!existsSync(DATA_PATH)) return { views: 0, downloads: 0 }

  const stats = JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
  return stats[slug!] ?? { views: 0, downloads: 0 }
})