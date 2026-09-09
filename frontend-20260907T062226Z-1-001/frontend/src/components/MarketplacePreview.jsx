import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../utils/icons.jsx';
import ProductCard from './ProductCard.jsx';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Books & Notes', label: 'Books' },
  { id: 'Electronics', label: 'Electronics' },
  { id: 'Study Equipment', label: 'Study' },
  { id: 'Stationery', label: 'Stationery' },
  { id: 'Dorm Items', label: 'Dorm' },
  { id: 'Entertainment', label: 'Entertainment' },
  { id: 'Other', label: 'Other' }
];

export default function MarketplacePreview({ activeFilter = 'all', setActiveFilter = () => {}, products = [] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, activeFilter, products]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } }
  };

  return (
    <section id="marketplace" className="section">
      <div className="section__header">
        <h2>Marketplace</h2>
        <p>Browse everything students are listing on campus.</p>
      </div>

      <div className="marketplace-controls">
        <div className="search-bar">
          <Icon name="Search" size={18} />
          <input
            id="marketplace-search"
            type="text"
            placeholder="Search for textbooks, calculators, laptops..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="filter-chips">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-chip${activeFilter === f.id ? ' filter-chip--active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <motion.div
          className="product-grid"
          variants={container}
          initial="hidden"
          animate="show"
          key={activeFilter + query}
        >
          {filtered.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="marketplace-empty">No items match your search yet.</p>
      )}
    </section>
  );
}
