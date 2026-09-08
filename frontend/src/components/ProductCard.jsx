import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../utils/icons.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product, showRating = false }) {
  const [favorited, setFavorited] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();
  const outOfStock = product.stock <= 0;

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorited((f) => !f);
  };

  const handleAddToCart = () => {
    if (outOfStock) return;
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__image">
          <Icon name={product.icon} size={36} strokeWidth={1.5} />
          <button
            className={`product-card__fav${favorited ? ' product-card__fav--active' : ''}`}
            aria-label="Favorite"
            onClick={toggleFavorite}
          >
            <Icon name="Heart" size={16} fill={favorited ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="product-card__body">
          <span className="product-card__category">{product.category}</span>
          <h3 className="product-card__name">{product.name}</h3>
          <div className="product-card__meta">
            <span>{product.seller}</span>
            <span className="dot">•</span>
            <span>{product.condition}</span>
          </div>

          {showRating && (
            <div className="product-card__rating">
              <Icon name="Star" size={14} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>
      </Link>

      <div className="product-card__footer-wrap">
        <div className="product-card__footer">
          <span className="product-card__price">Rs. {product.price.toLocaleString()}</span>
          <button
            className="btn btn--small"
            onClick={handleAddToCart}
            disabled={outOfStock}
          >
            <Icon name={justAdded ? 'Star' : 'ShoppingCart'} size={15} />
            {outOfStock ? 'Sold Out' : justAdded ? 'Added' : 'Add to Cart'}
          </button>
        </div>
        <span className="product-card__stock">
          {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
        </span>
      </div>
    </div>
  );
}
