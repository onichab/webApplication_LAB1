import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../utils/icons.jsx';

const SLOT_HEIGHT = 108; // vertical distance between stacked slots, in px

export default function ProductCarousel({ products, intervalMs = 2800 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % products.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [products.length, intervalMs]);

  // Render a window of 5 slots centered on the active product:
  // offsets [-2, -1, 0(active), +1, +2]. This is what gives the
  // continuous vertical-rotation feel instead of a normal horizontal slider.
  const offsets = [-2, -1, 0, 1, 2];

  return (
    <div className="carousel">
      <div className="carousel__track">
        {offsets.map((offset) => {
          const i = (index + offset + products.length) % products.length;
          const product = products[i];
          const isActive = offset === 0;
          const distance = Math.abs(offset);

          return (
            <motion.div
              key={product.id}
              className={`carousel__slot${isActive ? ' carousel__slot--active' : ''}`}
              animate={{
                y: offset * SLOT_HEIGHT,
                scale: isActive ? 1 : Math.max(0.62, 1 - distance * 0.18),
                opacity: isActive ? 1 : Math.max(0.18, 0.55 - distance * 0.2)
              }}
              transition={{ type: 'spring', stiffness: 210, damping: 26 }}
            >
              <div className="carousel__card">
                <div className="carousel__icon-wrap">
                  <Icon name={product.icon} size={isActive ? 40 : 26} strokeWidth={1.6} />
                </div>
                {isActive && (
                  <motion.div
                    className="carousel__info"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <span className="carousel__category">{product.category}</span>
                    <h3 className="carousel__name">{product.name}</h3>
                    <span className="carousel__price">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
