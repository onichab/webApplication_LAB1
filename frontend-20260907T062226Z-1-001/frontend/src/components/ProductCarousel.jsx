import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../utils/icons.jsx';

export default function ProductCarousel({ products, intervalMs = 4000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!products || products.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % products.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [products, intervalMs]);

  if (!products || products.length === 0) {
    return null;
  }

  const product = products[index];

  return (
    <div className="hero-feature">
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="hero-feature__card"
        >
          <div className="hero-feature__image-wrap">
            {product.image && !product.imageError ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="hero-feature__image" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle" style="color: var(--color-text-muted)"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg><span style="font-size: 1rem; color: var(--color-text-muted); font-weight: 600; margin-top: 8px;">Image failed to load</span></div>';
                }}
              />
            ) : (
              <Icon name={product.icon} size={64} strokeWidth={1.2} />
            )}
            <div className="hero-feature__badge">Featured</div>
          </div>
          <div className="hero-feature__info">
            <span className="hero-feature__category">{product.category}</span>
            <h3 className="hero-feature__name">{product.name}</h3>
            <span className="hero-feature__price">Rs. {product.price.toLocaleString()}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
