import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp } from '../utils/animations'
import './About.css'

const stats = [
  { number: '3+', label: 'Jahre Erfahrung' },
  { number: '50+', label: 'Projekte' },
  { number: '100%', label: 'Leidenschaft' }
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div {...fadeInUp} animate={isInView ? fadeInUp.visible : fadeInUp.hidden} className="section-header">
          <h2 className="section-title">Über <span className="gradient-text">mich</span></h2>
          <p className="section-subtitle">Leidenschaftlicher Entwickler mit Fokus auf moderne Web-Technologien</p>
        </motion.div>
        <div className="about-content">
          <motion.div className="about-text" initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <p>Als <strong>Fachinformatiker für Anwendungsentwicklung</strong> habe ich mich auf die Frontend-Entwicklung spezialisiert und bringe <strong>3 Jahre praktische Erfahrung</strong> mit modernen Web-Technologien mit.</p>
            <p>Meine Leidenschaft gilt der Erstellung benutzerfreundlicher, performanter und visuell ansprechender Anwendungen. Ich liebe es, komplexe Probleme zu lösen und innovative Lösungen zu entwickeln.</p>
            <p>Aktuell absolviere ich eine <strong>Softwaretester-Zertifizierung</strong>, um meine Fähigkeiten im Bereich Qualitätssicherung zu erweitern und noch bessere, zuverlässigere Software zu entwickeln.</p>
          </motion.div>
          <motion.div className="about-stats" initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
