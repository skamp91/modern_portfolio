import { useEffect, useState } from 'react';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';

/**
 * Navigationseinträge – passe IDs bei Bedarf an deine Section-IDs an
 * (z. B. "home" statt "hero").
 */
const NAV_ITEMS = [
  { id: 'about', label: 'Über mich' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Erfahrung' },
  { id: 'projects', label: 'Projekte' },
  { id: 'contact', label: 'Kontakt' },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  // Fixed Navbar ausgleichen: etwas Offset nach oben
  const y = el.getBoundingClientRect().top + window.scrollY - 80;

  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  // Scroll-State für Schatten etc.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Wenn das Viewport groß wird, Menü sicher schließen
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setActiveId(id);
    setIsOpen(false); // auf Mobile nach Klick schließen
  };

  const handleLogoClick = () => {
    handleNavClick('hero');
  };

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${
        isOpen ? 'navbar--open' : ''
      }`}
    >
      <div className='nav-container'>
        {/* Top Bar: Logo + Actions */}
        <div className='nav-bar-top'>
          <button
            className='nav-logo'
            onClick={handleLogoClick}
            aria-label='Zum Start scrollen'
          >
            Work In Progress
          </button>

          <div className='nav-actions'>
            <ThemeToggle />

            <button
              className={`nav-toggle ${isOpen ? 'nav-toggle--open' : ''}`}
              type='button'
              aria-label={isOpen ? 'Navigation schließen' : 'Navigation öffnen'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
            >
              {/* zwei Linien, die zu einem modernen Pfeil / X animieren */}
              <span className='nav-toggle-line nav-toggle-line--top' />
              <span className='nav-toggle-line nav-toggle-line--bottom' />
            </button>
          </div>
        </div>

        {/* Navigationslinks */}
        <nav className='nav-links-wrapper' aria-label='Hauptnavigation'>
          <ul className='nav-links'>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type='button'
                  className={`nav-link ${activeId === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
