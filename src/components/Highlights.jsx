import { motion } from 'framer-motion';
import './Highlights.css';

const CARDS = [
  { icon: '⚡', text: 'React' },
  { icon: '🎨', text: 'UI/UX Design' },
  { icon: '🧠', text: 'ISTQB® CTFL' },
  { icon: '🚀', text: 'Agile Development' },
];

export default function Highlights() {
  return (
    <section className='highlights'>
      <div className='container'>
        <div className='section-header'>
          <h2 className='section-title gradient-text'>Fokus & Stärken</h2>
          <p className='section-subtitle'>
            Die Themen, auf die ich mich aktuell im Frontend & Testing besonders
            fokussiere.
          </p>
        </div>

        <div className='highlights-grid'>
          {CARDS.map((card, index) => (
            <motion.div
              key={card.text}
              className='highlight-card'
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <span className='highlight-icon'>{card.icon}</span>
              <span className='highlight-text'>{card.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
