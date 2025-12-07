import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PROJECTS } from '../utils/data'
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations'
import './Projects.css'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div {...fadeInUp} animate={isInView ? fadeInUp.visible : fadeInUp.hidden} className="section-header">
          <h2 className="section-title">Meine <span className="gradient-text">Projekte</span></h2>
          <p className="section-subtitle">Eine Auswahl meiner Arbeiten und Projekte</p>
        </motion.div>
        {PROJECTS.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="empty-projects">
            <p>Noch keine Projekte vorhanden.</p>
          </motion.div>
        ) : (
          <motion.div className="projects-grid" variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            {PROJECTS.map(project => (
              <motion.div key={project.id} className="project-card" variants={staggerItem} whileHover={{ scale: 1.05, rotateY: 5, z: 50 }} style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link" onClick={e => e.stopPropagation()}>🔗</a>}
                </div>
                <p className="project-description">{project.description}</p>
                {project.technologies?.length > 0 && (
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => <span key={i} className="tech-tag">{tech}</span>)}
                  </div>
                )}
                <div className="project-glow"></div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
