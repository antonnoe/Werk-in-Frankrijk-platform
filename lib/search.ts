import type { Beroep, SearchResult } from './types'
import Fuse from 'fuse.js'

export function searchBeroepen(
  query: string, 
  alleBeroepen: Beroep[]
): SearchResult[] {
  if (!query || query.length < 2) return []
  
  const fuse = new Fuse(alleBeroepen, {
    keys: ['naam_nl', 'naam_fr', 'categorie'],
    threshold: 0.3,
    includeScore: true,
  })

  const results = fuse.search(query, { limit: 10 })
  
  return results.map(result => ({
    beroep: result.item,
    score: result.score || 0
  }))
}

export function getBeroepById(
  id: string, 
  alleBeroepen: Beroep[]
): Beroep | undefined {
  return alleBeroepen.find(b => b.id === id)
}

export function getAllCategories(alleBeroepen: Beroep[]): string[] {
  const categories = new Set(alleBeroepen.map(b => b.categorie))
  return Array.from(categories).sort()
}
