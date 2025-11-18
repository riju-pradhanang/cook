import RecipeCard from './RecipeCard'

export default function RecipeGrid({ items }){
  if (!items?.length) return <div className="py-12 text-center text-sm text-gray-500">No recipes found.</div>
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(r => <RecipeCard key={r.id} recipe={r} />)}
    </div>
  )
}
