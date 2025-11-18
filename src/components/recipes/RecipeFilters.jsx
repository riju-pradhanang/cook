import Input from '../ui/Input'
import Select from '../ui/Select'

const cuisines = ['Italian','Indian','Mexican','Chinese','American','Thai','French']
const categories = ['Breakfast','Lunch','Dinner','Dessert','Snack']
const difficulties = ['Easy','Medium','Hard']

export default function RecipeFilters({ q, setQ, filters, setFilters, onApply }){
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Input placeholder="Search recipes..." value={q} onChange={e=>setQ(e.target.value)} />
      <Select value={filters.cuisine} onChange={e=>setFilters(v=>({...v, cuisine: e.target.value}))}>
        <option value="">All Cuisines</option>
        {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
      </Select>
      <Select value={filters.category} onChange={e=>setFilters(v=>({...v, category: e.target.value}))}>
        <option value="">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </Select>
      <Select value={filters.difficulty} onChange={e=>setFilters(v=>({...v, difficulty: e.target.value}))}>
        <option value="">Any Difficulty</option>
        {difficulties.map(c => <option key={c} value={c}>{c}</option>)}
      </Select>
      <button onClick={onApply} className="rounded-md bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200 sm:col-span-2 lg:col-span-4">Apply Filters</button>
    </div>
  )
}
