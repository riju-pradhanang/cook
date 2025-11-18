import { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Register(){
  const { register, loading } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function submit(e){ e.preventDefault(); try{ await register({ name, email, password }); nav('/') } catch(e){ alert(e.message) } }
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-2xl md:grid md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
            alt="Cooking together"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl font-bold leading-tight">Join CookBook</h2>
            <p className="mt-1 text-sm text-white/90">Create an account to save favorites and share your recipes.</p>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-gray-800">Create your account</h1>
          <p className="mt-1 text-sm text-gray-600">It only takes a minute to get started.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm">Name</label>
              <Input value={name} onChange={e=>setName(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1 block text-sm">Email</label>
              <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1 block text-sm">Password</label>
              <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
              <p className="mt-1 text-xs text-gray-500">Use at least 6 characters.</p>
            </div>
            <Button disabled={loading} type="submit" className="w-full">Create account</Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-700">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
