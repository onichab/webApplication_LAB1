import { motion } from 'framer-motion';
import { Icon } from '../utils/icons.jsx';
import { categories } from '../data/categories.js';

export default function CategoryGrid({ onSelectCategory }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
  };

  return (
    <section id="categories" className="section">
      <div className="section__header">
        <h2>Categories</h2>
      </div>
      <motion.div 
        className="category-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {categories.map((cat) => (
          <motion.button 
            key={cat.id} 
            variants={item}
            className="category-card"
            onClick={() => onSelectCategory && onSelectCategory(cat.name)}
          >
            <span className="category-card__icon">
              <Icon name={cat.icon} size={22} strokeWidth={1.7} />
            </span>
            <span className="category-card__name">{cat.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
