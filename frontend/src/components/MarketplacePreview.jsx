import { useMemo, useState } from 'react';
import { Icon } from '../utils/icons.jsx';
import ProductCard from './ProductCard.jsx';
import { products } from '../data/products.js';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Books & Notes', label: 'Books' },
  { id: 'Electronics', label: 'Electronics' },
  { id: 'Study Equipment', label: 'Study' },
  { id: 'Dorm Items', label: 'Dorm' },
  { id: 'Other', label: 'Other' }
];

export default function MarketplacePreview() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, activeFilter]);

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
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="marketplace-empty">No items match your search yet.</p>
      )}
    </section>
  );
}
