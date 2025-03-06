import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAppStore = create(persist(
  (set) => ({
    // Global app state
    user: null,
    isLoading: false,
    theme: 'light',

    // Actions
    setUser: (user) => set({ user }),

    setLoading: (isLoading) => set({ isLoading }),

    toggleTheme: () => set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark'

      // Update document class
      const root = window.document.documentElement
      root.classList.remove('dark', 'light')
      root.classList.add(newTheme)

      return { theme: newTheme }
    }),

    // Example of a complex action
    login: async (credentials) => {
      set({ isLoading: true })
      try {
        // Simulated login logic
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials)
        })
        const user = await response.json()
        set({ user, isLoading: false })
        return user
      } catch (error) {
        set({ isLoading: false })
        throw error
      }
    },

    // Example of resetting state
    logout: () => set({ user: null })
  }),
  {
    name: 'app-storage', // unique name
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      // Only persist specific parts of the state
      theme: state.theme,
      user: state.user
    })
  }
))

export default useAppStore
