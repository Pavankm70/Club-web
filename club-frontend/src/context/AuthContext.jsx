import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('clubUser')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem('clubUser')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await apiLogin(email, password)
    const data = response.data
    const userData = {
      email: data.email,
      role: data.role,
      token: data.token,
      name: data.name,
    }
    setUser(userData)
    localStorage.setItem('clubUser', JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('clubUser')
  }

  const isAdmin = () => user?.role === 'ADMIN'
  const isMember = () => user?.role === 'MEMBER' || user?.role === 'ADMIN'
  const isAuthenticated = () => user !== null

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAdmin, isMember, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
