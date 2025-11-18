import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="font-bold text-primary-700">CookBook</Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/recipes" className={({isActive})=> isActive? 'text-primary-700 font-medium' : 'text-gray-600'}>All Recipes</NavLink>
          {user && (
            <>
              <NavLink to="/my-cookbook" className={({isActive})=> isActive? 'text-primary-700 font-medium' : 'text-gray-600'}>My Cookbook</NavLink>
              <NavLink to="/my-recipes" className={({isActive})=> isActive? 'text-primary-700 font-medium' : 'text-gray-600'}>My Recipes</NavLink>
              <NavLink to="/add" className={({isActive})=> isActive? 'text-primary-700 font-medium' : 'text-gray-600'}>Add Recipe</NavLink>
            </>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NavLink to="/profile" className="text-sm text-gray-700">{user.name}</NavLink>
              <button onClick={logout} className="rounded-md bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm text-gray-700">Login</NavLink>
              <NavLink to="/register" className="rounded-md bg-yellow-500 px-3 py-1.5 text-sm text-white shadow hover:bg-yellow-600">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
