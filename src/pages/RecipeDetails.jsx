import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../utils/fakeApi'
import { useAuth } from '../context/AuthContext'
import { useRecipes } from '../context/RecipesContext'
import Button from '../components/ui/Button'

export default function RecipeDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { favorite, remove } = useRecipes()
  const [r, setR] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.getRecipe(id).then(x => { setR(x); setLoading(false) }) }, [id])
  if (loading) return <div className="py-12 text-center text-sm text-gray-500">Loading...</div>
  if (!r) return <div className="py-12 text-center text-sm text-gray-500">Not found.</div>
  return (
    <div className="space-y-6">
      <img src={r.imageUrl} alt={r.title} className="h-64 w-full rounded-lg object-cover" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{r.title}</h1>
          <p className="mt-1 text-gray-600">{r.description}</p>
          <div className="mt-2 text-sm text-gray-500">{r.cuisine} • {r.category} • {r.difficulty}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={()=>favorite(r.id)}>Save</Button>
          {user && user.id === r.createdBy && (
            <>
              <Button variant="secondary" onClick={()=>navigate(`/edit/${r.id}`)}>Edit</Button>
              <Button variant="danger" onClick={async()=>{ await remove(r.id); navigate('/recipes') }}>Delete</Button>
            </>
          )}
        </div>
      </div>
      <section>
        <h2 className="mb-2 font-semibold">Ingredients</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {r.ingredients.map((i,idx)=>(<li key={idx}>{i.quantity} {i.name}</li>))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 font-semibold">Steps</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          {r.steps.map((s,idx)=>(<li key={idx}>{s}</li>))}
        </ol>
      </section>
    </div>
  )
}
