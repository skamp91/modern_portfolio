import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SKILLS } from '../utils/data'
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations'
import './Skills.css'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div {...fadeInUp} animate={isInView ? fadeInUp.visible : fadeInUp.hidden} className="section-header">
          <h2 className="section-title">Meine <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle">Technologien und Tools, mit denen ich arbeite</p>
        </motion.div>
        <motion.div className="skills-grid" variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {SKILLS.map((skill, i) => (
            <motion.div key={skill.name} className="skill-card" variants={staggerItem} whileHover={{ scale: 1.05, rotateY: 5, z: 50 }} style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-info">
                <h3 className="skill-name">{skill.name}</h3>
                <div className="skill-category">{skill.category}</div>
                <div className="skill-bar">
                  <motion.div className="skill-progress" initial={{ width: 0 }} animate={isInView ? { width: `${skill.level}%` } : {}} transition={{ duration: 1, delay: i * 0.1 }} style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }} />
                </div>
                <div className="skill-level">{skill.level}%</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
