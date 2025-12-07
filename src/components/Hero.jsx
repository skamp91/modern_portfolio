import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { scrollTo } from '../utils/animations'
import './Hero.css'

const cards = [
  { icon: '⚡', text: 'React' },
  { icon: '🎨', text: 'UI/UX' },
  { icon: '🚀', text: 'Performance' }
]

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20
    })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <motion.div className="hero-content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="hero-badge" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <span>👋 Willkommen</span>
          </motion.div>
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Fachinformatiker für<br /><span className="gradient-text">Anwendungsentwicklung</span>
          </motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            3 Jahre Erfahrung in der Frontend-Entwicklung<br />Aktuell: Softwaretester-Zertifizierung
          </motion.p>
          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <motion.button className="btn btn-primary" onClick={() => scrollTo('contact')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Kontakt aufnehmen
            </motion.button>
            <motion.button className="btn btn-secondary" onClick={() => scrollTo('projects')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Meine Projekte
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div className="hero-visual" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          {cards.map((card, i) => (
            <div key={i} className={`floating-card card-${i + 1}`}>
              <div className="card-icon">{card.icon}</div>
              <div className="card-text">{card.text}</div>
            </div>
          ))}
          <div className="hero-glow"></div>
        </motion.div>
      </div>
      <motion.div className="scroll-indicator" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <span>↓</span>
      </motion.div>
    </section>
  )
}
