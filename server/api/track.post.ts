import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const DATA_PATH = resolve('server/data/stats.json')

function loadStats(): Record<string, { views: number; downloads: number }> {
  if (!existsSync(DATA_PATH)) return {}
  return JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
}

function saveStats(stats: Record<string, { views: number; downloads: number }>) {
  writeFileSync(DATA_PATH, JSON.stringify(stats, null, 2))
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ slug: string; type: 'view' | 'download' }>(event)
  const stats = loadStats()

  const entry = stats[body.slug] ?? { views: 0, downloads: 0 }

  if (body.type === 'view') entry.views++
  if (body.type === 'download') entry.downloads++

  stats[body.slug] = entry
  saveStats(stats)
  return entry
})