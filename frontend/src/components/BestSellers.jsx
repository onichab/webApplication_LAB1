import ProductCard from './ProductCard.jsx';
import { bestSellers } from '../data/products.js';

export default function BestSellers() {
  return (
    <section id="best-sellers" className="section section--tinted">
      <div className="section__header">
        <h2>Best Sellers</h2>
        <p>Popular picks other students are grabbing right now.</p>
      </div>
      <div className="product-grid">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} showRating />
        ))}
      </div>
    </section>
  );
}
