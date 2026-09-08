import { motion } from 'framer-motion';
import { Icon } from '../utils/icons.jsx';
import ProductCarousel from './ProductCarousel.jsx';
import { products } from '../data/products.js';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero__tagline">Your Campus. Your Marketplace.</span>
          <h1 className="hero__heading">
            Buy, sell and discover useful things from students around you.
          </h1>
          <div className="hero__actions">
            <a href="#marketplace" className="btn btn--primary">
              Explore Marketplace
              <Icon name="ArrowRight" size={18} />
            </a>
            <a href="/sell" className="btn btn--secondary">
              Sell an Item
            </a>
          </div>
        </motion.div>

        <div className="hero__visual">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  );
}
