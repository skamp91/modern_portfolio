import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EXPERIENCES } from '../utils/constants'
import { fadeInUp } from '../utils/animations'
import './Experience.css'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <motion.div {...fadeInUp} animate={isInView ? fadeInUp.visible : fadeInUp.hidden} className="section-header">
          <h2 className="section-title">Erfahrung & <span className="gradient-text">Ausbildung</span></h2>
          <p className="section-subtitle">Mein beruflicher Werdegang</p>
        </motion.div>
        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <motion.div key={i} className="timeline-item" initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.2 }}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-year">{exp.year}</div>
                <h3 className="timeline-title">{exp.title}</h3>
                <div className="timeline-company">{exp.company}</div>
                <p className="timeline-description">{exp.description}</p>
                <div className="timeline-tech">
                  {exp.technologies.map((tech, j) => (
                    <span key={j} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
