import { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

export default function BestSellers() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        // Sort by rating desc and take top 4
        const sorted = data.sort((a, b) => b.rating - a.rating).slice(0, 4);
        setBestSellers(sorted);
      })
      .catch(err => console.error(err));
  }, []);

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
