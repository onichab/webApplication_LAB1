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
            {product.image ? (
              <img src={product.image} alt={product.name} className="hero-feature__image" />
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
