import { useState } from 'react'
import Input from '../components/ui/Input'
import TextArea from '../components/ui/TextArea'
import Button from '../components/ui/Button'
import Select from '../components/ui/Select'
import { useRecipes } from '../context/RecipesContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const cuisines = ['Italian', 'Indian', 'Mexican', 'Chinese', 'American', 'Thai', 'French']
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']
const difficulties = ['Easy', 'Medium', 'Hard']

export default function AddRecipe() {
  const { create } = useRecipes()
  const nav = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', cuisine: '', category: '', difficulty: '', prepTime: 0, cookTime: 0, servings: 1, ingredients: [], steps: [] })
  const [ingredient, setIngredient] = useState({ name: '', quantity: '' })
  const [step, setStep] = useState('')
  const [imageError, setImageError] = useState('')
  const [imageLoadError, setImageLoadError] = useState(false)

  function addIngredient() { if (!ingredient.name) return; setForm(f => ({ ...f, ingredients: [...f.ingredients, ingredient] })); setIngredient({ name: '', quantity: '' }) }
  function addStep() { if (!step) return; setForm(f => ({ ...f, steps: [...f.steps, step] })); setStep('') }

  function validateImageUrl(url) {
    if (!url) return 'Image URL is required'
    try {
      new URL(url)
    } catch {
      return 'Please enter a valid URL'
    }
    // Check if it's an image URL (basic check)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    const hasImageExtension = imageExtensions.some(ext => url.toLowerCase().includes(ext))
    const isImageHost = url.includes('unsplash.com') || url.includes('images.') || url.includes('imgur') || url.includes('i.imgur') || url.includes('googleusercontent.com') || url.includes('gstatic.com') || url.includes('google.com')
    if (!hasImageExtension && !isImageHost) {
      return 'Please enter a valid image URL'
    }
    return ''
  }

  function handleImageUrlChange(e) {
    const url = e.target.value
    setForm(f => ({ ...f, imageUrl: url }))
    setImageLoadError(false)
    const error = validateImageUrl(url)
    setImageError(error)
  }

  async function submit(e) {
    e.preventDefault()
    const error = validateImageUrl(form.imageUrl)
    if (error) {
      toast.error(error)
      return
    }
    if (form.ingredients.length === 0) {
      toast.error('Please add at least one ingredient')
      return
    }
    if (form.steps.length === 0) {
      toast.error('Please add at least one step')
      return
    }
    try {
      const r = await create(form)
      toast.success('Recipe created')
      nav(`/recipes/${r.id}`)
    } catch (err) {
      toast.error('Failed to create recipe')
    }
  }
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-xl font-semibold">Add Recipe</h1>
      <form onSubmit={submit} className="space-y-4">
        <Input placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
        <TextArea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
        <div>
          <Input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleImageUrlChange}
            required
          />
          {(imageError || imageLoadError) && (
            <p className="mt-1 text-sm text-red-600">
              {imageError || 'Image failed to load. Please check the URL.'}
            </p>
          )}
          {form.imageUrl && !imageError && !imageLoadError && (
            <div className="mt-2">
              <img
                src={form.imageUrl}
                alt="Preview"
                className="h-32 w-full rounded object-cover"
                onError={() => setImageLoadError(true)}
                onLoad={() => setImageLoadError(false)}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Select value={form.cuisine} onChange={e => setForm(f => ({ ...f, cuisine: e.target.value }))}>
            <option value="">Select Cuisine</option>
            {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}>
            <option value="">Select Difficulty</option>
            {difficulties.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
        </div>

        <div>
          <div className="mb-2 font-medium">Ingredients</div>
          <div className="flex gap-2">
            <Input placeholder="Quantity" value={ingredient.quantity} onChange={e => setIngredient(v => ({ ...v, quantity: e.target.value }))} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addIngredient())} />
            <Input placeholder="Name" value={ingredient.name} onChange={e => setIngredient(v => ({ ...v, name: e.target.value }))} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addIngredient())} />
            <Button type="button" variant="secondary" onClick={addIngredient}>Add</Button>
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {form.ingredients.map((i, idx) => (<li key={idx}>{i.quantity} {i.name}</li>))}
          </ul>
        </div>
        <div>
          <div className="mb-2 font-medium">Steps</div>
          <div className="flex gap-2">
            <Input placeholder="Add a step" value={step} onChange={e => setStep(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addStep())} />
            <Button type="button" variant="secondary" onClick={addStep}>Add</Button>
          </div>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
            {form.steps.map((s, idx) => (<li key={idx}>{s}</li>))}
          </ol>
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  )
}
