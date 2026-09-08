import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Icon } from '../utils/icons.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="coming-soon">
          <h1>Item not found</h1>
          <p>This listing may have been sold or removed.</p>
          <Link to="/" className="btn btn--primary">
            Back to Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const inStock = product.stock > 0;

  return (
    <>
      <Navbar />
      <div className="product-details">
        <div className="product-details__breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/#marketplace">Marketplace</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-details__grid">
          <div className="product-details__image">
            <Icon name={product.icon} size={96} strokeWidth={1.3} />
          </div>

          <div className="product-details__info">
            <span className="product-details__category">{product.category}</span>
            <h1 className="product-details__name">{product.name}</h1>

            <div className="product-details__rating">
              <Icon name="Star" size={16} fill="currentColor" />
              <span>{product.rating}</span>
            </div>

            <span className="product-details__price">
              Rs. {product.price.toLocaleString()}
            </span>

            <div className="product-details__facts">
              <div className="fact">
                <span className="fact__label">Condition</span>
                <span className="fact__value">{product.condition}</span>
              </div>
              <div className="fact">
                <span className="fact__label">Availability</span>
                <span className={`fact__value${inStock ? '' : ' fact__value--out'}`}>
                  {inStock ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            <p className="product-details__description">{product.description}</p>

            <div className="product-details__actions">
              <button
                className="btn btn--secondary"
                disabled={!inStock}
                onClick={() => {
                  addToCart(product, 1);
                  setJustAdded(true);
                  setTimeout(() => setJustAdded(false), 1500);
                }}
              >
                <Icon name="ShoppingCart" size={17} />
                {justAdded ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                className="btn btn--primary"
                disabled={!inStock}
                onClick={() => {
                  addToCart(product, 1);
                  navigate('/cart');
                }}
              >
                Buy Now
              </button>
            </div>

            <div className="seller-card">
              <div className="seller-card__avatar">
                <Icon name="User" size={22} />
              </div>
              <div className="seller-card__info">
                <span className="seller-card__name">{product.seller}</span>
                <span className="seller-card__meta">{product.sellerJoined}</span>
              </div>
              <div className="seller-card__rating">
                <Icon name="Star" size={14} fill="currentColor" />
                <span>{product.sellerRating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
