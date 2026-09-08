import { Icon } from '../utils/icons.jsx';
import { categories } from '../data/categories.js';

export default function CategoryGrid() {
  return (
    <section id="categories" className="section">
      <div className="section__header">
        <h2>Categories</h2>
      </div>
      <div className="category-grid">
        {categories.map((cat) => (
          <button key={cat.id} className="category-card">
            <span className="category-card__icon">
              <Icon name={cat.icon} size={22} strokeWidth={1.7} />
            </span>
            <span className="category-card__name">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
