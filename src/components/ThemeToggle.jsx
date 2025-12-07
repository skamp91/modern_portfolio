import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTheme, setTheme, initTheme } from '../utils/theme'
import './ThemeToggle.css'

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState('dark')

  useEffect(() => {
    initTheme()
    setCurrentTheme(getTheme())
  }, [])

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    setCurrentTheme(newTheme)
  }

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Theme wechseln"
    >
      {currentTheme === 'dark' ? '☀️' : '🌙'}
    </motion.button>
  )
}

