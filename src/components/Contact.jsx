import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { fadeInUp } from '../utils/animations'
import './Contact.css'

const contactInfo = [
  { icon: '📧', label: 'E-Mail', value: 'portfolio@example.com' },
  { icon: '💼', label: 'Status', value: 'Verfügbar für Projekte' },
  { icon: '📍', label: 'Standort', value: 'Deutschland' }
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Wird gesendet...' })
    // Demo-Versand (ohne Backend)
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Nachricht erfolgreich gesendet! (Demo)' })
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div {...fadeInUp} animate={isInView ? fadeInUp.visible : fadeInUp.hidden} className="section-header">
          <h2 className="section-title">Kontakt <span className="gradient-text">aufnehmen</span></h2>
          <p className="section-subtitle">Lassen Sie uns zusammenarbeiten</p>
        </motion.div>
        <div className="contact-content">
          <motion.div className="contact-info" initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <h3>Lass uns in Kontakt treten</h3>
            <p>Ich bin immer offen für neue Projekte und interessante Zusammenarbeiten. Zögern Sie nicht, mich zu kontaktieren!</p>
            <div className="contact-details">
              {contactInfo.map((info, i) => (
                <div key={i} className="contact-item">
                  <span className="contact-icon">{info.icon}</span>
                  <div>
                    <strong>{info.label}</strong>
                    <p>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.form className="contact-form" onSubmit={handleSubmit} initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            {status.message && <div className={`form-status ${status.type}`}>{status.message}</div>}
            {['name', 'email', 'message'].map(field => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{field === 'name' ? 'Name' : field === 'email' ? 'E-Mail' : 'Nachricht'}</label>
                {field === 'message' ? (
                  <textarea id={field} name={field} value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })} required rows="6" placeholder={field === 'name' ? 'Ihr Name' : field === 'email' ? 'ihre.email@example.com' : 'Ihre Nachricht...'} />
                ) : (
                  <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })} required placeholder={field === 'name' ? 'Ihr Name' : 'ihre.email@example.com'} />
                )}
              </div>
            ))}
            <motion.button type="submit" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={status.type === 'loading'}>
              {status.type === 'loading' ? 'Wird gesendet...' : 'Nachricht senden'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
