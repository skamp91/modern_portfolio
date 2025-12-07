import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SECTIONS } from '../utils/constants'
import { scrollTo } from '../utils/animations'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 150
    let current = 'hero'

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const section = SECTIONS[i]
      const el = document.getElementById(section)
      if (el) {
        const offsetTop = el.offsetTop
        if (scrollPosition >= offsetTop) {
          current = section
          break
        }
      }
    }

    setActiveSection(current)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      updateActiveSection()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateActiveSection()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (section) => {
    setActiveSection(section)
    scrollTo(section)
    // Update nach Scroll-Animation
    setTimeout(() => {
      updateActiveSection()
    }, 1000)
  }

  return (
    <motion.nav className={`navbar ${scrolled ? 'scrolled' : ''}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <div className="nav-container">
        <motion.div className="nav-logo" whileHover={{ scale: 1.05 }} onClick={() => handleNavClick('hero')}>
          <span className="logo-text">Portfolio</span>
        </motion.div>
        <div className="nav-right">
          <ul className="nav-links">
            {SECTIONS.slice(1).map(item => (
              <li key={item}>
                <motion.button
                  className={`nav-link ${activeSection === item ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  )
}
