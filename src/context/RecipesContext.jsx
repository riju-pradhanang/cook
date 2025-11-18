import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../utils/fakeApi'
import { useAuth } from './AuthContext'

const RecipesCtx = createContext(null)
export function RecipesProvider({ children }) {
  const { user } = useAuth()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.init().then(async () => {
    const list = await api.listRecipes()
    setRecipes(list)
    setLoading(false)
  }) }, [])

  const value = useMemo(() => ({
    recipes, loading,
    refresh: async (filters) => { setLoading(true); const list = await api.listRecipes(filters); setRecipes(list); setLoading(false) },
    create: async (data) => { if (!user) throw new Error('auth'); const r = await api.createRecipe(data, user.id); setRecipes(prev => [r, ...prev]); return r },
    update: async (id, data) => { const r = await api.updateRecipe(id, data); setRecipes(prev => prev.map(x => x.id===id? r : x)); return r },
    remove: async (id) => { await api.deleteRecipe(id); setRecipes(prev => prev.filter(x => x.id!==id)) },
    myRecipes: async () => { if (!user) return []; return api.myRecipes(user.id) },
    favorite: async (id) => { if (!user) return false; return api.toggleFavorite(user.id, id) },
    favorites: async () => { if (!user) return []; return api.listFavorites(user.id) },
  }), [recipes, loading, user])

  return <RecipesCtx.Provider value={value}>{children}</RecipesCtx.Provider>
}
export function useRecipes(){ return useContext(RecipesCtx) }
