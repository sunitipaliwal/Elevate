"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import { User } from "@/types/user.types"
import { getCurrentUser, logoutUser } from "@/services/auth.service"

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({
  children
}: {
  children: React.ReactNode
}) => {

  const [user, setUser] = useState<User | null>(null)

  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {

      const data = await getCurrentUser()

      setUser(data)

    } catch (error) {

      setUser(null)

    } finally {

      setLoading(false)

    }
  }

  const logout = async () => {

    await logoutUser()

    setUser(null)

  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}