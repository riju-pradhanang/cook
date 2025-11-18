import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../utils/fakeApi'

const AuthCtx = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(auth.me())
  const [loading, setLoading] = useState(false)

  const value = useMemo(() => ({ user, loading,
    async login(email, password){ setLoading(true); try{ const u = await auth.login(email,password); setUser(u); return u } finally{ setLoading(false) } },
    async register(data){ setLoading(true); try{ const u = await auth.register(data); setUser(u); return u } finally{ setLoading(false) } },
    logout(){ auth.logout(); setUser(null) },
  }), [user, loading])

  useEffect(() => { setUser(auth.me()) }, [])

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
export function useAuth(){ return useContext(AuthCtx) }
export function ProtectedRoute({ children }){ const { user } = useAuth(); if (!user) return null; return children }
