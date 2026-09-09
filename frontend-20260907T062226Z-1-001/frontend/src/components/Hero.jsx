import { motion } from 'framer-motion';
import { Icon } from '../utils/icons.jsx';
import ProductCarousel from './ProductCarousel.jsx';
export default function Hero({ products = [] }) {
  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <motion.div
          className="hero__copy"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.span 
            className="hero__tagline"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
            }}
          >
            Your Campus. Your Marketplace.
          </motion.span>
          <motion.h1 
            className="hero__heading"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
            }}
          >
            Buy, sell and discover useful things from students around you.
          </motion.h1>
          <motion.div 
            className="hero__actions"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
            }}
          >
            <a href="#marketplace" className="btn btn--primary">
              Explore Marketplace
              <Icon name="ArrowRight" size={18} />
            </a>
            <a href="/sell" className="btn btn--secondary">
              Sell an Item
            </a>
          </motion.div>
        </motion.div>

        <div className="hero__visual">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  );
}
