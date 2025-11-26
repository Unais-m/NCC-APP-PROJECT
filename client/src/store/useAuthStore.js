import { create } from 'zustand'
import api from '../api/client'

const parseError = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong'

const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  bootstrapComplete: false,
  error: null,

  setUser: (user) => set({ user, error: null }),

  bootstrap: async () => {
    if (get().bootstrapComplete || get().loading) return
    set({ loading: true })
    try {
      const { data } = await api.get('/auth/me')
      if (data.user?._id) {
        localStorage.setItem('userId', data.user._id)
      }
      set({ user: data.user, error: null })
    } catch (error) {
      console.warn('Auth bootstrap failed', error)
      localStorage.removeItem('userId')
      set({ user: null })
    } finally {
      set({ loading: false, bootstrapComplete: true })
    }
  },

  login: async (payload) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.post('/auth/login', payload)
      if (data.user?._id) {
        localStorage.setItem('userId', data.user._id)
      }
      set({ user: data.user })
      return data.user
    } catch (error) {
      const message = parseError(error)
      set({ error: message })
      throw new Error(message)
    } finally {
      set({ loading: false })
    }
  },

  signup: async (payload) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.post('/auth/signup', payload)
      if (data.user?._id) {
        localStorage.setItem('userId', data.user._id)
      }
      set({ user: data.user })
      return data.user
    } catch (error) {
      const message = parseError(error)
      set({ error: message })
      throw new Error(message)
    } finally {
      set({ loading: false })
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('userId')
      set({ user: null })
    }
  },
}))

export default useAuthStore

