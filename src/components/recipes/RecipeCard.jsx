import Button from '../ui/Button'
import { Link } from 'react-router-dom'
import { useRecipes } from '../../context/RecipesContext'

export default function RecipeCard({ recipe }){
  const { favorite } = useRecipes()
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <img src={recipe.imageUrl} alt={recipe.title} className="h-40 w-full object-cover" />
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 font-semibold">{recipe.title}</h3>
        <p className="line-clamp-2 text-sm text-gray-600">{recipe.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{recipe.cuisine} • {recipe.category}</span>
          <span>{recipe.difficulty}</span>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Link to={`/recipes/${recipe.id}`} className="text-sm text-primary-700">View</Link>
          <Button variant="secondary" onClick={()=>favorite(recipe.id)}>Save</Button>
        </div>
      </div>
    </div>
  )
}
