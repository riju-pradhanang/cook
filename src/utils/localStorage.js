export const storage = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key)
      return v ? JSON.parse(v) : fallback
    } catch {
      return fallback
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key) {
    localStorage.removeItem(key)
  },
}

export const KEYS = {
  recipes: 'cb_recipes',
  favorites: 'cb_favorites',
  user: 'cb_user',
  users: 'cb_users',
  seed: 'cb_seeded',
}
