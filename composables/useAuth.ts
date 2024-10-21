import { useState } from '#app'
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const clearUser = () => {
    user.value = null
  }

  const fetchUser = async () => {
    const supabase = useSupabaseClient()
    try {
      const { data: { user: authUser }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
        clearUser()
      } else if (authUser) {
        setUser(authUser)
      }
      return authUser
    } catch (error) {
      console.error('Error fetching user:', error)
      clearUser()
      return null
    }
  }

  return {
    user,
    setUser,
    clearUser,
    fetchUser
  }
}
