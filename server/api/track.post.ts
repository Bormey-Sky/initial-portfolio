import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const DATA_PATH = resolve('server/data/stats.json')

interface LogEntry {
  type: 'view' | 'download'
  ip: string
  ua: string
  ref: string
  at: string
}

interface SlugStats {
  views: number
  downloads: number
  log: LogEntry[]
}

function loadStats(): Record<string, SlugStats> {
  if (!existsSync(DATA_PATH)) return {}
  return JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
}

function saveStats(stats: Record<string, SlugStats>) {
  writeFileSync(DATA_PATH, JSON.stringify(stats, null, 2))
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ slug: string; type: 'view' | 'download' }>(event)
  const stats = loadStats()

  const entry: SlugStats = stats[body.slug] ?? { views: 0, downloads: 0, log: [] }
  if (!entry.log) entry.log = []

  if (body.type === 'view') entry.views++
  if (body.type === 'download') entry.downloads++

  const forwarded = getRequestHeader(event, 'x-forwarded-for')
  const ip = forwarded ? (forwarded.split(',')[0] ?? forwarded).trim() : (event.node.req.socket?.remoteAddress ?? 'unknown')

  entry.log.push({
    type: body.type,
    ip,
    ua: getRequestHeader(event, 'user-agent') ?? 'unknown',
    ref: getRequestHeader(event, 'referer') ?? '',
    at: new Date().toISOString(),
  })

  stats[body.slug] = entry
  saveStats(stats)
  return { views: entry.views, downloads: entry.downloads }
})