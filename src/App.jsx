import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import RecipeDetails from './pages/RecipeDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import AddRecipe from './pages/AddRecipe'
import EditRecipe from './pages/EditRecipe'
import MyCookbook from './pages/MyCookbook'
import MyRecipes from './pages/MyRecipes'
import Profile from './pages/Profile'
import { useAuth } from './context/AuthContext'

function Protected({ children }){
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected><AddRecipe /></Protected>} />
          <Route path="/edit/:id" element={<Protected><EditRecipe /></Protected>} />
          <Route path="/my-cookbook" element={<Protected><MyCookbook /></Protected>} />
          <Route path="/my-recipes" element={<Protected><MyRecipes /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
