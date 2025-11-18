import { useEffect, useState } from 'react'
import { useRecipes } from '../context/RecipesContext'
import RecipeGrid from '../components/recipes/RecipeGrid'

export default function MyCookbook(){
  const { favorites } = useRecipes()
  const [items, setItems] = useState([])
  useEffect(() => { favorites().then(setItems) }, [])
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">My Cookbook</h1>
      <RecipeGrid items={items} />
    </div>
  )
}
