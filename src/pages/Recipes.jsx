import { useState } from 'react'
import RecipeGrid from '../components/recipes/RecipeGrid'
import RecipeFilters from '../components/recipes/RecipeFilters'
import { useRecipes } from '../context/RecipesContext'
import Loader from '../components/ui/Loader'

export default function Recipes(){
  const { recipes, loading, refresh } = useRecipes()
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState({ cuisine:'', category:'', difficulty:'' })
  async function apply(){ await refresh({ q, ...filters }) }
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">All Recipes</h1>
      <RecipeFilters q={q} setQ={setQ} filters={filters} setFilters={setFilters} onApply={apply} />
      {loading ? <Loader /> : <RecipeGrid items={recipes} />}
    </div>
  )
}
