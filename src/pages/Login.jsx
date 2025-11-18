import { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const { login, loading } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('demo@cookbook.app')
  const [password, setPassword] = useState('demo123')
  async function submit(e){ e.preventDefault(); try{ await login(email,password); nav('/') } catch(e){ alert(e.message) } }
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-2xl md:grid md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=1200&auto=format&fit=crop"
            alt="Tasty food"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl font-bold leading-tight">Welcome back</h2>
            <p className="mt-1 text-sm text-white/90">Sign in to continue discovering delicious recipes.</p>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
          <p className="mt-1 text-sm text-gray-600">Use the demo credentials or your account to sign in.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm">Email</label>
              <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1 block text-sm">Password</label>
              <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <Button disabled={loading} type="submit" className="w-full">Sign in</Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            No account? <Link to="/register" className="font-medium text-yellow-600 hover:text-yellow-700">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
