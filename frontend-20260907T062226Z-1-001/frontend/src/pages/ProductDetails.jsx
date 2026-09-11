import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Icon } from '../utils/icons.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [justAdded, setJustAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="coming-soon">
          <h1>Loading...</h1>
        </div>
        <Footer />
      </>
    );
  }

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

  const inStock = product ? product.stock > 0 : false;

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
          <div className="product-details__image" style={{ overflow: 'hidden' }}>
            {product.image && !imageError ? (
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={() => setImageError(true)}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px' }}>
                <Icon name="XCircle" size={48} style={{ color: 'var(--color-text-muted)' }} />
                <span style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Image failed to load</span>
              </div>
            )}
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
              {user && user.id === product.seller_id ? (
                <>
                  <button
                    className="btn btn--secondary"
                    onClick={() => {
                      const newStock = prompt('Enter new quantity:', product.stock);
                      if (newStock !== null && !isNaN(newStock)) {
                        fetch(`http://localhost:5000/api/products/${product.id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                          },
                          body: JSON.stringify({ stock: parseInt(newStock, 10) })
                        })
                        .then(async res => {
                          if (!res.ok) {
                            const err = await res.json();
                            throw new Error(err.error || 'Failed to update stock');
                          }
                          window.location.reload();
                        })
                        .catch(err => alert(err.message));
                      }
                    }}
                  >
                    <Icon name="Edit" size={17} />
                    Update Quantity
                  </button>
                  <button
                    className="btn btn--primary"
                    style={{ background: '#E0708C', borderColor: '#E0708C' }}
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this listing?')) {
                        fetch(`http://localhost:5000/api/products/${product.id}`, {
                          method: 'DELETE',
                          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                        })
                        .then(async res => {
                          if (!res.ok) {
                            const err = await res.json();
                            throw new Error(err.error || 'Failed to delete listing');
                          }
                          navigate('/');
                        })
                        .catch(err => alert(err.message));
                      }
                    }}
                  >
                    <Icon name="Trash" size={17} />
                    Delete Listing
                  </button>
                </>
              ) : !inStock ? (
                <button
                  className="btn btn--secondary"
                  disabled
                  style={{ opacity: 0.7, cursor: 'not-allowed', width: '100%' }}
                >
                  <Icon name="XCircle" size={17} />
                  Out of Stock
                </button>
              ) : (
                <>
                  <button
                    className="btn btn--secondary"
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
                    onClick={() => {
                      addToCart(product, 1);
                      navigate('/cart');
                    }}
                  >
                    Buy Now
                  </button>
                </>
              )}
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
