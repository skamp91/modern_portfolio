import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { scrollTo } from '../utils/animations';
import './Hero.css';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset || 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax-Stärke – kannste nach Geschmack anpassen
  const parallaxStrength = 0.3;

  return (
    <section id='hero' className='hero'>
      <div className='hero-glow' />

      <div className='hero-frame'>
        {/* Vollflächiges Bild im Hintergrund mit Scroll-Parallax */}
        <div
          className='hero-bg'
          style={{
            transform: `translate3d(0, ${scrollY * parallaxStrength}px, 0)`,
          }}
        >
          <img
            src='./me.jpg'
            alt='Portrait von Patrick Skamrahl'
            className='hero-bg-image'
          />
        </div>

        {/* Overlay + Text auf dem Bild */}
        <motion.div
          className='hero-overlay'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className='hero-badge'>
            Softwaretester + 3 Jahre Frontend-Erfahrung
          </span>

          <h1 className='hero-title'>
            Patrick <br /> Skamrahl
          </h1>

          <p className='hero-description'>
            Ich entwickle moderne, performante Webanwendungen mit Fokus auf
            UI/UX. Aktuell erweitere ich mein Profil mit der ISTQB® Certified
            Tester Foundation Level Ausbildung und praktischer Erfahrung in
            agiler Softwareentwicklung.
          </p>

          <div className='hero-buttons'>
            <motion.button
              type='button'
              className='btn btn-primary'
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              Kontakt aufnehmen
            </motion.button>

            <motion.button
              type='button'
              className='btn btn-secondary hero-secondary-btn'
              onClick={() => scrollTo('projects')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              Meine Projekte
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
