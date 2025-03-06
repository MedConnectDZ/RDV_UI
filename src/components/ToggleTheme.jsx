import React from 'react'
import useAppStore from '../stores/useAppStore'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppStore()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}

export default ThemeToggle
