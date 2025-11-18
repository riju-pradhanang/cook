import sample from '../data/sampleRecipes.json'
import { KEYS, storage } from './localStorage'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function ensureSeed() {
  const seeded = storage.get(KEYS.seed, false)
  if (!seeded) {
    const existing = storage.get(KEYS.recipes, [])
    if (!existing?.length) storage.set(KEYS.recipes, sample)
    const users = storage.get(KEYS.users, [])
    if (!users?.length) storage.set(KEYS.users, [
      { id: 'u_demo', name: 'Demo User', email: 'demo@cookbook.app', password: 'demo123' },
    ])
    storage.set(KEYS.seed, true)
  }
}

export const api = {
  async init() {
    ensureSeed()
    await delay(200)
  },
  async listRecipes({ q = '', cuisine = '', category = '', difficulty = '' } = {}) {
    await delay()
    ensureSeed()
    let items = storage.get(KEYS.recipes, [])
    if (q) {
      const s = q.toLowerCase()
      items = items.filter(r => r.title.toLowerCase().includes(s) || r.description.toLowerCase().includes(s))
    }
    if (cuisine) items = items.filter(r => r.cuisine === cuisine)
    if (category) items = items.filter(r => r.category === category)
    if (difficulty) items = items.filter(r => r.difficulty === difficulty)
    return items
  },
  async getRecipe(id) {
    await delay()
    const items = storage.get(KEYS.recipes, [])
    return items.find(r => r.id === id) || null
  },
  async createRecipe(data, userId) {
    await delay()
    const items = storage.get(KEYS.recipes, [])
    const r = { ...data, id: uid(), createdBy: userId, createdAt: new Date().toISOString() }
    items.unshift(r)
    storage.set(KEYS.recipes, items)
    return r
  },
  async updateRecipe(id, patch) {
    await delay()
    const items = storage.get(KEYS.recipes, [])
    const idx = items.findIndex(r => r.id === id)
    if (idx === -1) throw new Error('Not found')
    items[idx] = { ...items[idx], ...patch }
    storage.set(KEYS.recipes, items)
    return items[idx]
  },
  async deleteRecipe(id) {
    await delay()
    const items = storage.get(KEYS.recipes, [])
    const next = items.filter(r => r.id !== id)
    storage.set(KEYS.recipes, next)
    return true
  },
  async myRecipes(userId) {
    await delay()
    const items = storage.get(KEYS.recipes, [])
    return items.filter(r => r.createdBy === userId)
  },
  async listFavorites(userId) {
    await delay()
    const fav = storage.get(KEYS.favorites, {})
    const ids = Object.keys(fav[userId] || {})
    const items = storage.get(KEYS.recipes, [])
    return items.filter(r => ids.includes(r.id))
  },
  async toggleFavorite(userId, recipeId) {
    await delay(150)
    const fav = storage.get(KEYS.favorites, {})
    fav[userId] = fav[userId] || {}
    if (fav[userId][recipeId]) delete fav[userId][recipeId]
    else fav[userId][recipeId] = true
    storage.set(KEYS.favorites, fav)
    return !!fav[userId][recipeId]
  },
}

export const auth = {
  async login(email, password) {
    await delay(200)
    ensureSeed()
    const users = storage.get(KEYS.users, [])
    const u = users.find(x => x.email === email && x.password === password)
    if (!u) throw new Error('Invalid credentials')
    const { password: _, ...safe } = u
    storage.set(KEYS.user, safe)
    return safe
  },
  async register({ name, email, password }) {
    await delay(200)
    const users = storage.get(KEYS.users, [])
    if (users.some(u => u.email === email)) throw new Error('Email already registered')
    const u = { id: uid(), name, email, password }
    users.push(u)
    storage.set(KEYS.users, users)
    const { password: _, ...safe } = u
    storage.set(KEYS.user, safe)
    return safe
  },
  me() {
    return storage.get(KEYS.user, null)
  },
  logout() {
    storage.remove(KEYS.user)
  },
}
